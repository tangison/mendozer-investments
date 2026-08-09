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
    { width: 390, height: 844 },
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

test("mobile menu is available and exposes contact route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator(".site-header__menu");
  await expect(menu).toBeVisible();
  await menu.locator("summary").click();
  await expect(menu.getByRole("link", { name: "Contact" })).toBeVisible();
});
