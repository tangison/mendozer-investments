/**
 * Render scripts/careers-flyer.html to a 1080x1350 PNG, then encode WebP q85.
 * Stopgap flyer typeset from the owner's exact vacancy copy (2026-10-05).
 * Swap with the client's original flyer JPG in src/app/careers/page.tsx when provided.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, "careers-flyer.html");
const pngPath = resolve(here, "careers-flyer.png");
const outDir = resolve(here, "../public/images/careers");
const webpPath = resolve(outDir, "office-administrator-flyer.webp");

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(250);
await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
await browser.close();

const meta = await sharp(pngPath).webp({ quality: 85, effort: 6 }).toFile(webpPath);
console.log(JSON.stringify({ png: pngPath, webp: webpPath, width: meta.width, height: meta.height, bytes: meta.size }));
