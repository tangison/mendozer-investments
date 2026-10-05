#!/usr/bin/env node
/**
 * Lab metrics via Playwright + CDP (Lighthouse CLI crashes in this sandbox).
 * Conditions: production build on 127.0.0.1:3000, mobile emulation 390x844 DPR3,
 * NO network/CPU throttling. LCP/CLS via PerformanceObserver (buffered), TBT
 * approximated from long-task durations (sum of dur - 50ms), transfer weight
 * from CDP Network.loadingFinished encodedDataLength.
 */
import { chromium, devices } from "@playwright/test";

const BASE = "http://127.0.0.1:3000";
const PAGES = [
  ["/", "home"],
  ["/careers", "careers"],
  ["/about", "about"],
  ["/certifications", "certifications"],
  ["/work", "work"],
  ["/sectors/construction", "construction"],
  ["/contact", "contact"],
];

const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const context = await browser.newContext({ ...devices["Pixel 7"], reducedMotion: "no-preference" });

console.log("page             LCP(ms)  CLS     TBT~(ms)  transfer(KB)  requests");
for (const [path, label] of PAGES) {
  const page = await context.newPage();
  let transferKB = 0;
  let requests = 0;
  page.on("response", async () => { /* counted via CDP below */ });

  const cdp = await page.context().newCDPSession(page);
  const sizes = new Map();
  cdp.on("Network.loadingFinished", (e) => {
    sizes.set(e.requestId, e.encodedDataLength);
  });
  await cdp.send("Network.enable");

  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0, tbt: 0 };
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length) window.__metrics.lcp = entries[entries.length - 1].startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__metrics.tbt += Math.max(0, entry.duration - 50);
      }
    }).observe({ type: "longtask", buffered: true });
  });

  await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  requests = sizes.size;
  transferKB = Math.round([...sizes.values()].reduce((a, b) => a + b, 0) / 1024);
  const metrics = await page.evaluate(() => window.__metrics);
  console.log(
    `${label.padEnd(17)}${Math.round(metrics.lcp).toString().padEnd(9)}${metrics.cls.toFixed(3).padEnd(8)}${Math.round(metrics.tbt).toString().padEnd(10)}${String(transferKB).padEnd(14)}${requests}`,
  );
  await page.close();
}
await browser.close();
