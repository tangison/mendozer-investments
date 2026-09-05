import { expect, test } from "@playwright/test";

const widths = [320, 360, 390, 414];

for (const width of widths) {
  test(`contact page has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflow, `scrollWidth ${overflow}px wider than viewport at ${width}px`).toBeLessThanOrEqual(1);
  });
}

test("form fields stay at 16px on phone widths so iOS does not zoom on focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  for (const kind of ["input", "textarea", "select"] as const) {
    const first = page.locator(`.contact-form ${kind}`).first();
    if ((await first.count()) === 0) continue;
    const size = await first.evaluate((el) => getComputedStyle(el).fontSize);
    expect(size, `${kind} font-size`).toBe("16px");
  }
});

test("the map iframe is visible and fits inside the phone viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const frame = page.locator('iframe[title*="Mendozer"]');
  await expect(frame).toBeVisible();
  const box = await frame.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThan(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(391);
});

test("office announcement map route stays contained at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/mendozer-windhoek-satellite-office", { waitUntil: "domcontentloaded" });
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow).toBeLessThanOrEqual(1);
});
