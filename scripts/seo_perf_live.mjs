/** Live-site lab metrics (mobile, throttled-none): LCP, CLS, transferred bytes. */
import { chromium } from "@playwright/test";

const routes = process.argv[2] ? process.argv[2].split(",") : ["/", "/sectors/construction", "/work", "/blog", "/careers", "/blog/corner-spa"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

for (const route of routes) {
  const url = route.startsWith("http") ? route : `https://mendozer.com${route}`;
  let bytes = 0;
  const onResponse = (res) => {
    const h = res.headers();
    const len = Number(h["content-length"] || 0);
    bytes += len || 0;
  };
  page.on("response", onResponse);
  await page.goto(url, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(2500);

  const metrics = await page.evaluate(() => new Promise((resolve) => {
    let lcp = 0, cls = 0;
    try {
      new PerformanceObserver((l) => { const e = l.getEntries(); lcp = e[e.length - 1]?.startTime ?? 0; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    } catch {}
    setTimeout(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      resolve({ lcp, cls, ttfb: nav ? nav.responseStart : 0, domContentLoaded: nav ? nav.domContentLoadedEventEnd : 0 });
    }, 800);
  }));

  const title = await page.title();
  console.log(`${route} | LCP ${metrics.lcp.toFixed(0)}ms | CLS ${metrics.cls.toFixed(4)} | TTFB ${metrics.ttfb.toFixed(0)}ms | wire(content-length sum) ${(bytes / 1024).toFixed(0)}KB`);
  page.off("response", onResponse);
}

await browser.close();
