/**
 * Corner Spa announcement QA (owner brief verification).
 * Run with the production server already listening on 127.0.0.1:3000.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
mkdirSync("/tmp/render", { recursive: true });

const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` :: ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

const consoleErrors = [];
page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
page.on("pageerror", (err) => consoleErrors.push(String(err)));

// --- Announcement page, mobile width ---
await page.goto(`${BASE}/blog/corner-spa`, { waitUntil: "load" });
await page.waitForTimeout(600);

check("announcement: one h1", (await page.locator("main h1").count()) === 1);
check("announcement: h1 text", (await page.locator("main h1").innerText()).trim() === "Corner Spa is now online");

const bodyText = await page.locator("main").innerText();
check("announcement: owner body copy verbatim", bodyText.includes("Corner Spa is a calm place in Windhoek for massage, hot stone treatments, nails and waxing."));
check("announcement: roles copy verbatim", bodyText.includes("Mendozer Investments is the financing partner. Oryx Institute leads operations."));

const visitBtn = page.locator("main a", { hasText: "Visit Corner Spa" }).first();
check("announcement: Visit Corner Spa button", (await visitBtn.count()) === 1, await visitBtn.getAttribute("href"));
check("announcement: Visit href", (await visitBtn.getAttribute("href")) === "https://spa.mendozer.com");
check("announcement: Visit rel noopener", ((await visitBtn.getAttribute("rel")) ?? "").includes("noopener"));
check("announcement: Visit target blank", (await visitBtn.getAttribute("target")) === "_blank");

const oryxBtn = page.locator("main a", { hasText: "About Oryx Institute" }).first();
check("announcement: About Oryx button", (await oryxBtn.count()) === 1, await oryxBtn.getAttribute("href"));
check("announcement: Oryx href", (await oryxBtn.getAttribute("href")) === "https://oryxinstitute.org");
check("announcement: Oryx rel noopener", ((await oryxBtn.getAttribute("rel")) ?? "").includes("noopener"));

const waLink = page.locator("main a[href='https://wa.me/264816234788']");
check("announcement: WhatsApp booking link", (await waLink.count()) === 1);
check("announcement: WhatsApp visible text", (await waLink.innerText()).trim() === "+264 81 623 4788");

const heroImg = page.locator("main img[alt='Smooth wet stones and soft light at Corner Spa']").first();
check("announcement: hero image present with exact alt", (await heroImg.count()) === 1);
check("announcement: hero image lazy", (await heroImg.getAttribute("loading")) === "lazy");
await heroImg.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
const decoded = await heroImg.evaluate((el) => el.complete && el.naturalWidth > 100);
check("announcement: hero image decodes", decoded);

for (const btn of [visitBtn, oryxBtn]) {
  const box = await btn.boundingBox();
  check("announcement: button fits mobile viewport", box !== null && box.x >= 0 && box.x + box.width <= 375.5, JSON.stringify(box));
}

const cls = await page.evaluate(() => new Promise((resolve) => {
  let total = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) total += entry.value;
  }).observe({ type: "layout-shift", buffered: true });
  setTimeout(() => resolve(total), 900);
}));
check("announcement: CLS < 0.02", cls < 0.02, String(cls));

const mixed = await page.evaluate(() => {
  if (location.protocol !== "https:") return []; // local http server: same-origin http is not mixed content
  return performance.getEntriesByType("resource").filter((r) => r.name.startsWith("http://")).map((r) => r.name);
});
check("announcement: no mixed content", mixed.length === 0, mixed.join(", "));

await page.screenshot({ path: "/tmp/render/corner-spa-mobile.png", fullPage: true });

// --- Footer link on the announcement page ---
const footerSpa = page.locator("footer a[aria-label='Corner Spa website']");
check("footer: quiet Corner Spa link", (await footerSpa.count()) === 1);
check("footer: Corner Spa href", (await footerSpa.getAttribute("href")) === "https://spa.mendozer.com");
check("footer: Corner Spa rel noopener", ((await footerSpa.getAttribute("rel")) ?? "").includes("noopener"));

// --- Home page: announcement block (mobile) ---
await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.waitForTimeout(600);
const homeH2 = page.locator("main h2", { hasText: "Corner Spa is now online" });
check("home: announcement heading", (await homeH2.count()) === 1);
const homeBlock = page.locator("section.home-announcement");
check("home: one announcement block only", (await homeBlock.count()) === 1);
check("home: block copy verbatim", (await homeBlock.innerText()).includes("Corner Spa, a concept by Mendozer Investments and the first project of Oryx Institute, is now online."));
check("home: block has no image", (await homeBlock.locator("img").count()) === 0);
const homeLink = homeBlock.locator("a", { hasText: "Read the announcement" });
check("home: block link href", (await homeLink.getAttribute("href")) === "/blog/corner-spa");
await page.screenshot({ path: "/tmp/render/home-mobile-top.png", clip: { x: 0, y: 0, width: 375, height: 1400 } });

// Home desktop: header nav entry
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.waitForTimeout(400);
const navSpa = page.locator("nav[aria-label='Primary'] a", { hasText: "Corner Spa" });
check("header: nav lists Corner Spa", (await navSpa.count()) === 1, await navSpa.getAttribute("href"));
check("header: nav href", (await navSpa.getAttribute("href")) === "/blog/corner-spa");
await page.screenshot({ path: "/tmp/render/home-desktop-top.png", clip: { x: 0, y: 0, width: 1280, height: 1000 } });

// --- Mobile off-canvas menu contains Corner Spa ---
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.click("button[aria-label='Open navigation']");
await page.waitForTimeout(300);
const menuSpa = page.locator(".site-menu a", { hasText: "Corner Spa" });
check("menu: off-canvas lists Corner Spa", (await menuSpa.count()) === 1, await menuSpa.getAttribute("href"));
await page.keyboard.press("Escape");

// --- Blog listing card ---
await page.goto(`${BASE}/blog`, { waitUntil: "load" });
const card = page.locator("article.blog-index__card", { hasText: "Corner Spa is now online" });
check("blog: listing card present", (await card.count()) === 1);
check("blog: card is first", (await page.locator("article.blog-index__card").first().innerText()).includes("Corner Spa"));
check("blog: card link", (await card.locator("a").first().getAttribute("href")) === "/blog/corner-spa");

// --- Work page venture entry ---
await page.goto(`${BASE}/work`, { waitUntil: "load" });
const venture = page.locator("article.work-context-card", { hasText: "Corner Spa, Windhoek" });
check("work: venture card present", (await venture.count()) === 1);
check("work: venture link label", (await venture.locator("a.text-link").innerText()).trim().startsWith("Read the announcement"));
check("work: venture link href", (await venture.locator("a.text-link").getAttribute("href")) === "/blog/corner-spa");
check("work: venture eyebrow", (await venture.locator("p.eyebrow").innerText()).trim().toLowerCase() === "venture");
await page.screenshot({ path: "/tmp/render/work-venture.png", fullPage: false });

// --- Announcement page desktop screenshot ---
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`${BASE}/blog/corner-spa`, { waitUntil: "load" });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/render/corner-spa-desktop.png", fullPage: true });

// --- Console errors across the run ---
check("no console errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) process.exit(1);
