/**
 * Careers page behaviour tests (production build on :3000).
 * 1. Countdown shows values, has role="timer", ticks every second, and
 *    matches the fixed deadline 2026-10-17T17:00:00+02:00.
 * 2. With a faked device clock after the deadline the countdown switches to
 *    "Applications are now closed" (same production code path).
 * 3. Flyer image lazy-loads with the exact alt text.
 * 4. Map iframe is present, lazy, titled, and the embed request succeeds.
 * 5. JobPosting JSON-LD carries the required fields.
 * 6. No phone numbers anywhere in the page content.
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000/careers";
const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"} ${name}${detail ? ` :: ${detail}` : ""}`);
};

const browser = await chromium.launch({ headless: true, executablePath: "/home/z/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome" });

// ---------- Pass 1: normal clock ----------
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const embedResponses = [];
page.on("response", (res) => {
  if (res.url().includes("google.com/maps")) embedResponses.push(res.status());
});
await page.goto(BASE, { waitUntil: "networkidle" });

// countdown role + structure
const timer = page.locator('[role="timer"]');
check("countdown has role=timer", (await timer.count()) === 1);
const label = await page.locator(".vacancy-countdown__label").textContent();
check("countdown label exact", label === "Applications close in", JSON.stringify(label));

// values present and numeric
const values = await page.locator(".vacancy-countdown__value").allTextContents();
check("countdown renders 4 numeric units", values.length === 4 && values.every((v) => /^\d{2,3}$/.test(v)), values.join(":"));

// correctness against the fixed instant
const expected = await page.evaluate(() => {
  const target = new Date("2026-10-17T17:00:00+02:00").getTime();
  const diff = Math.max(0, target - Date.now()) / 1000;
  return {
    days: String(Math.floor(diff / 86400)).padStart(2, "0"),
    hours: String(Math.floor((diff % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((diff % 3600) / 60)).padStart(2, "0"),
    seconds: String(Math.floor(diff % 60)).padStart(2, "0"),
  };
});
const [d, h, m, s] = values;
const secOk = Number(s) <= Number(expected.seconds) + 2 || Number(s) >= 58; // tolerate tick boundary
check("days+hours match fixed deadline", d === expected.days && h === expected.hours, `got ${d}:${h} want ${expected.days}:${expected.hours}`);
check("minutes/seconds within tolerance", (m === expected.minutes || Number(m) === Number(expected.minutes) - 1) && secOk, `got ${m}:${s} want ${expected.minutes}:${expected.seconds}`);

// ticks every second
const s1 = await page.locator(".vacancy-countdown__unit").nth(3).textContent();
await page.waitForTimeout(2100);
const s2 = await page.locator(".vacancy-countdown__unit").nth(3).textContent();
check("countdown ticks", s1 !== s2, `${s1} -> ${s2}`);

// flyer image: lazy, alt exact, natural size
const flyer = page.locator(".vacancy__flyer img");
check("flyer present", (await flyer.count()) === 1);
check("flyer alt exact", (await flyer.getAttribute("alt")) === "Mendozer Investments urgent vacancy: Office Administrator. Applications close 17 October 2026.");
check("flyer lazy-loaded", (await flyer.evaluate((el) => el.loading)) === "lazy");
check("flyer decoded with 4:5 ratio", await flyer.evaluate((el) => el.complete && el.naturalWidth >= 375 && Math.abs(el.naturalWidth / el.naturalHeight - 0.8) < 0.02), `natural ${await flyer.evaluate((el) => `${el.naturalWidth}x${el.naturalHeight}`)}`);

// map iframe: lazy + title + successful embed response
const map = page.locator(".vacancy__map iframe");
check("map iframe present", (await map.count()) === 1);
check("map iframe lazy", (await map.getAttribute("loading")) === "lazy");
const mapTitle = await map.getAttribute("title");
check("map iframe titled", !!mapTitle && mapTitle.length > 10, mapTitle ?? "");
const okEmbed = embedResponses.filter((code) => code === 200).length > 0;
check("map embed request succeeded", okEmbed, `statuses: ${embedResponses.join(",") || "none"}`);

// "Open in Google Maps" link exact text + href + safe attrs
const mapLink = page.getByRole("link", { name: /Open in Google Maps/ });
check("open-in-maps link exists", (await mapLink.count()) === 1);
check("open-in-maps href exact", (await mapLink.getAttribute("href")) === "https://www.google.com/maps/search/?api=1&query=Continental+Building+Judge+JP+Karuaihe+Street+Windhoek+Namibia");

// mailto link
const mail = page.locator('a[href="mailto:careers@mendozer.com"]');
check("enquiries mailto link", (await mail.count()) === 1);

// JSON-LD JobPosting
const ld = await page.evaluate(() => {
  const tags = [...document.querySelectorAll('script[type="application/ld+json"]')];
  const parsed = tags.map((t) => { try { return JSON.parse(t.textContent); } catch { return null; } });
  return parsed.find((p) => p && p["@type"] === "JobPosting") ?? null;
});
check("JobPosting JSON-LD present", !!ld);
if (ld) {
  check("JobPosting title", ld.title === "Office Administrator");
  check("JobPosting org+sameAs", ld.hiringOrganization?.name === "Mendozer Investments CC" && ld.hiringOrganization?.sameAs === "https://www.mendozer.com");
  check("JobPosting jobLocation NA", ld.jobLocation?.address?.addressCountry === "NA" && ld.jobLocation?.address?.addressLocality === "Windhoek");
  check("JobPosting employmentType TEMPORARY", ld.employmentType === "TEMPORARY");
  check("JobPosting validThrough", ld.validThrough === "2026-10-17T17:00:00+02:00");
  check("JobPosting datePosted", ld.datePosted === "2026-10-05");
  check("JobPosting directApply false", ld.directApply === false);
  check("JobPosting has no baseSalary", !("baseSalary" in ld));
}

// wording spot checks (exact required strings)
const body = await page.locator("main").innerText();
const requiredStrings = [
  "URGENT VACANCY",
  "Office Administrator",
  "Mendozer Investments is hiring an Office Administrator for a 6-month fixed-term contract in Windhoek. Read the requirements below, then submit your application before the countdown ends.",
  "Market-related, in line with industry standards",
  "Project Manager",
  "We are looking for an organised and dependable Office Administrator to support the Project Manager and keep our Windhoek office running smoothly.",
  "Other reasonable duties assigned by the Project Manager",
  "Applicants must meet all of the minimum requirements below. Applications that do not meet them will not be considered.",
  "Grade 12",
  "Eligible to work in Namibia",
  "At least 2 years' experience in an administrative or office support role",
  "Working knowledge of Microsoft Word, Excel and Outlook",
  "Experience in a construction or project environment",
  "Submit a hard copy of your CV, a short cover letter and copies of your ID and qualifications at:",
  "Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek",
  "Submissions are accepted until 17:00 on 17 October 2026. Applications are not accepted by email.",
  "Email enquiries only: careers@mendozer.com",
  "Please do not send CVs to this address.",
  "Only shortlisted candidates will be contacted.",
  "persons with disabilities are encouraged to apply",
  "does not charge a fee at any stage of recruitment",
];
for (const str of requiredStrings) check(`wording: ${str.slice(0, 42)}...`, body.includes(str));

check("key fact: Reports to present", (await page.locator(".vacancy-facts__item dt", { hasText: "Reports to" }).count()) === 1);

// no phone numbers pattern (+264, or 8x/85 sequences) in main content
const phoneHit = body.match(/(\+?264[\s-]?\d)|(\b08\d\h?\d)/) || body.match(/85\s?777\s?7077/);
check("no phone numbers on page", !phoneHit, phoneHit ? phoneHit[0] : "");

// em dash check
check("no em dashes in content", !body.includes("\u2014"));

// screenshots
await page.screenshot({ path: "/tmp/careers-desktop-top.png" });
await page.screenshot({ path: "/tmp/careers-desktop-full.png", fullPage: true });
await page.close();

// ---------- Pass 2: faked device clock AFTER the deadline ----------
const future = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await future.clock.setFixedTime(new Date("2026-10-18T09:00:00+02:00"));
await future.goto(BASE, { waitUntil: "domcontentloaded" });
const closed = future.locator(".vacancy-closed");
await closed.waitFor({ state: "visible", timeout: 5000 });
check("closed message appears after deadline", (await closed.textContent()) === "Applications are now closed");
check("closed state removes countdown grid", (await future.locator(".vacancy-countdown__grid").count()) === 0);
check("listing still visible when closed", await future.locator(".vacancy__title").isVisible());
check("closed badge/label replaced, listing intact", (await future.locator("main").innerText()).includes("Office Administrator"));
await future.screenshot({ path: "/tmp/careers-closed.png" });
await future.close();

// ---------- Pass 3: mobile ----------
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(BASE, { waitUntil: "networkidle" });
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
check("no horizontal overflow on mobile", !overflow);
const timerBox = await mobile.locator('[role="timer"]').boundingBox();
check("countdown sized for mobile", !!timerBox && timerBox.height > 80, `height ${timerBox?.height}px`);
const valFont = await mobile.locator(".vacancy-countdown__value").first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
check("countdown value large on mobile", valFont >= 28, `${valFont}px`);
await mobile.screenshot({ path: "/tmp/careers-mobile.png", fullPage: true });
await mobile.close();

await browser.close();
writeFileSync("/tmp/careers-tests.json", JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
