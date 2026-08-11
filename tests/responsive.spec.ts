import { expect, test } from "@playwright/test";

const coreRoutes = ["/", "/about", "/sectors", "/sectors/construction", "/sectors/technology", "/sectors/cooling", "/sectors/logistics", "/sectors/energy", "/sectors/tourism", "/work", "/updates", "/compliance", "/community", "/contact", "/privacy", "/terms"];

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
    const heroHeadingOverflows = await page.locator(".home-hero h1").evaluate((heading) => {
      const rect = heading.getBoundingClientRect();
      return rect.left < -1 || rect.right > window.innerWidth + 1 || heading.scrollWidth > heading.clientWidth + 1;
    });
    expect(heroHeadingOverflows, `hero heading overflow at ${viewport.width}px`).toBeFalsy();
  }
});

test("hero sector navigator behaves as an accessible tabbed slider", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(6);
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Technology & Systems");
  await expect(page.locator(".home-hero__slide-image")).toHaveAttribute("src", /technology/);
  const resumeControl = page.getByRole("button", { name: "Resume sector rotation" });
  await expect(resumeControl).toHaveAttribute("aria-pressed", "true");
  await resumeControl.click();
  await expect(page.getByRole("button", { name: "Pause sector rotation" })).toBeVisible();
});

test("home FAQ disclosures open with useful enquiry guidance", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const firstDisclosure = page.locator(".accordion-item").first();
  await firstDisclosure.locator("summary").click();
  await expect(firstDisclosure).toHaveAttribute("open", "");
  await expect(firstDisclosure).toContainText("Group enquiry");
});

test("editorial navigation condenses into a floating bar after scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(page.locator(".site-header")).toHaveClass(/site-header--scrolled/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
});

test("mobile hero remains intentionally focused while the sector directory stays in page content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".home-hero__navigator")).toBeHidden();
  const menuBox = await page.getByRole("button", { name: "Open navigation" }).boundingBox();
  expect(menuBox?.width).toBeGreaterThanOrEqual(44);
  expect(menuBox?.height).toBeGreaterThanOrEqual(44);
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
  expect(await page.locator("#main-content").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();
  expect(await page.locator("footer").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  expect(await page.locator("#main-content").evaluate((element) => element.hasAttribute("inert"))).toBeFalsy();
});

test("off-canvas navigation remains contained at the 320px Hallmark floor", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog", { name: "Mendozer group navigation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "horizontal overflow in 320px off-canvas navigation").toBeFalsy();
});
