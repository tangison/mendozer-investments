import { expect, test } from "@playwright/test";

const coreRoutes = ["/", "/about", "/sectors/construction", "/sectors/technology", "/sectors/cooling", "/sectors/logistics", "/sectors/energy", "/sectors/tourism", "/community", "/contact"];

test.describe("core routes", () => {
  for (const route of coreRoutes) {
    test(`${route} loads with a primary heading`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1").first()).toBeVisible();
      await expect(page).toHaveTitle(/Mendozer Investments/);
    });
  }
});

test("mobile and desktop home layouts do not create horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 720 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `horizontal overflow at ${viewport.width}px`).toBeFalsy();
    await expect(page.locator(".site-header__brand")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
  }
});

test("floating two-line navigation opens, traps access to the group menu, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Open navigation" });
  await expect(toggle).toBeVisible();
  await toggle.click();

  const dialog = page.getByRole("dialog", { name: "Mendozer group navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Contact" }).first()).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Tourism & Agriculture" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
});

test("off-canvas navigation remains contained at the 320px Hallmark floor", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog", { name: "Mendozer group navigation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "horizontal overflow in 320px off-canvas navigation").toBeFalsy();
});
