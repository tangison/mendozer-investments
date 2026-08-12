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

test("hero uses supplied-photo motion with a simple text hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator(".home-hero h1")).toContainText("One group.");
  await expect(page.locator(".home-hero h1")).toContainText("Six directions.");
  await expect(page.locator(".home-hero video source[type='video/webm']")).toHaveAttribute("src", "/media/mendozer-hero-motion.webm");
  await expect(page.locator(".home-hero__navigator")).toHaveCount(0);
  await expect(page.locator(".home-hero").getByRole("link", { name: /See the six directions/ })).toBeVisible();
});

test("sector directory behaves as an accessible tabbed explorer on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const explorer = page.locator(".sector-explorer__desktop").first();
  const tabs = explorer.getByRole("tab");
  await expect(tabs).toHaveCount(6);
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(explorer.getByRole("tabpanel")).toContainText("Technology & Systems");
  await expect(explorer.locator(".sector-explorer__media img")).toHaveAttribute("src", /technology/);

  await tabs.nth(1).press("ArrowDown");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});

test("mobile direction directory uses native disclosure controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const explorer = page.locator(".sector-explorer__mobile").first();
  await expect(explorer).toBeVisible();
  const firstDisclosure = explorer.locator("details").first();
  await firstDisclosure.locator("summary").click();
  await expect(firstDisclosure).toHaveAttribute("open", "");
  await expect(firstDisclosure).toContainText("Construction & Infrastructure");
});

test("home FAQ disclosures open with useful enquiry guidance", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const firstDisclosure = page.locator(".home-faq .accordion-item").first();
  await firstDisclosure.locator("summary").click();
  await expect(firstDisclosure).toHaveAttribute("open", "");
  await expect(firstDisclosure).toContainText("Group enquiry");
});

test("header becomes a quiet fixed navigation state after scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(page.locator(".site-header")).toHaveClass(/site-header--scrolled/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
});

test("full-screen navigation exposes group, sector, and contact panels", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();

  const dialog = page.getByRole("dialog", { name: "Mendozer group navigation" });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(389);
  expect(box?.height).toBeGreaterThanOrEqual(843);
  expect(await page.locator("#main-content").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();
  expect(await page.locator("footer").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();

  const tabs = dialog.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await expect(dialog.getByRole("link", { name: "About" })).toBeVisible();

  await tabs.filter({ hasText: "Sectors" }).click();
  await expect(tabs.filter({ hasText: "Sectors" })).toHaveAttribute("aria-selected", "true");
  const sectorDisclosure = dialog.locator(".site-menu__sector").first();
  await sectorDisclosure.locator("summary").click();
  await expect(sectorDisclosure).toHaveAttribute("open", "");
  await expect(sectorDisclosure.getByRole("link", { name: /Explore Construction/ })).toBeVisible();

  await tabs.filter({ hasText: "Contact" }).click();
  await expect(dialog.getByRole("link", { name: "Licences and records" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Prepare an enquiry" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  expect(await page.locator("#main-content").evaluate((element) => element.hasAttribute("inert"))).toBeFalsy();
});

test("full-screen navigation remains contained at the 320px floor", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog", { name: "Mendozer group navigation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "horizontal overflow in 320px full-screen navigation").toBeFalsy();
});
