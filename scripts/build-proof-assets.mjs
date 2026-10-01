#!/usr/bin/env node
/**
 * build-proof-assets.mjs — Proof of Work document pipeline.
 *
 * Input:  a directory containing `pdf/` (source scans) and `manifest.csv`
 *         (file,client,type,notes — source of truth for client names and types).
 * Output: - public/documents/pdf/<file>.pdf        metadata-stripped download copies
 *         - public/documents/images/<slug>-p<N>.webp  full-size page renders (max 1400w, q82)
 *         - public/documents/thumbs/<slug>-p<N>.webp  thumbnails (480w, q75)
 *         - src/content/proof-documents.json         generated document data
 *         - src/content/proof-documents.ts           typed wrapper for the app
 *
 * Usage:
 *   node scripts/build-proof-assets.mjs --input <proof-dir> [--mask-values]
 *
 * MASK_VALUES: draws a solid box over contract values on the IMAGE versions and
 * produces a rasterised masked PDF. Default OFF until the owner confirms. Enable:
 *   MASK_VALUES=true node scripts/build-proof-assets.mjs --input <proof-dir>
 * When enabled, documents 01 and 02 (Roads Authority) additionally get
 * <slug>.masked.pdf copies and the JSON points at those for download and display.
 *
 * Notes:
 * - Metadata stripping uses `qpdf --empty --pages` (rebuilds the catalog: docinfo
 *   and XMP from the scanner never reach the download copy; visible pages unchanged).
 * - Auto-crop trims only uniform white borders (sharp trim) and re-adds a 16px
 *   margin, so stamps or signatures sitting near the edge keep their surroundings.
 *   Trims that would remove more than 30% of the page area are rejected.
 * - Never upscales: `withoutEnlargement` on every resize.
 * - Raw inputs stay outside the repository; only cleaned deliverables are written.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, statSync } from "node:fs";
import { join, basename, resolve } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
function argValue(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}
const MASK_VALUES = process.env.MASK_VALUES === "true" || args.includes("--mask-values");

const inputDir = resolve(argValue("--input") ?? "proof");
const projectRoot = resolve(argValue("--project") ?? process.cwd());
const pdfOut = join(projectRoot, "public/documents/pdf");
const imageOut = join(projectRoot, "public/documents/images");
const thumbOut = join(projectRoot, "public/documents/thumbs");
const contentOut = join(projectRoot, "src/content");
const scratch = join(projectRoot, ".proof-scratch");

const RENDER_DPI = 200;
const PDF_DPI = 72;
const FULL_MAX_WIDTH = 1400;
const THUMB_WIDTH = 480;
const FULL_QUALITY = 82;
const THUMB_QUALITY = 75;
const EDGE_PADDING = 16;
const MAX_TRIM_AREA_FRACTION = 0.3;

for (const dir of [pdfOut, imageOut, thumbOut, scratch]) mkdirSync(dir, { recursive: true });

/** Parse the manifest. Fields contain no quoted commas; trim stray whitespace/BOM. */
function readManifest() {
  const raw = readFileSync(join(inputDir, "manifest.csv"), "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const header = lines.shift();
  if (!header || !header.startsWith("file,")) throw new Error(`Unexpected manifest header: ${header}`);
  return lines.map((line) => {
    const [file, client, type, notes = ""] = line.split(",").map((part) => part.trim());
    return { file, client, type, notes };
  });
}

/** Rebuild the PDF without its document info dictionary and XMP metadata. */
function stripMetadata(sourcePdf, outputPdf) {
  execFileSync("qpdf", ["--warning-exit-0", "--empty", "--pages", sourcePdf, "1-z", "--", outputPdf], { stdio: "pipe" });
}

function pageCount(pdfPath) {
  const info = execFileSync("pdfinfo", [pdfPath], { encoding: "utf8" });
  const match = info.match(/^Pages:\s+(\d+)$/m);
  return match ? Number(match[1]) : 1;
}

/** Word bounding boxes from pdftotext, in PDF points. */
function wordBoxes(pdfPath) {
  const xml = execFileSync("pdftotext", ["-bbox", "-layout", pdfPath, "-"], { encoding: "utf8" });
  const pages = [];
  const pageRegex = /<page width="([\d.]+)" height="([\d.]+)">([\s\S]*?)<\/page>/g;
  let pageMatch;
  while ((pageMatch = pageRegex.exec(xml)) !== null) {
    const words = [];
    const wordRegex = /<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/g;
    let wordMatch;
    while ((wordMatch = wordRegex.exec(pageMatch[3])) !== null) {
      words.push({
        xMin: Number(wordMatch[1]),
        yMin: Number(wordMatch[2]),
        xMax: Number(wordMatch[3]),
        yMax: Number(wordMatch[4]),
        text: wordMatch[5],
      });
    }
    pages.push({ width: Number(pageMatch[1]), height: Number(pageMatch[2]), words });
  }
  return pages;
}

/**
 * Locate contract-value regions: any line whose text matches an N$ amount,
 * restricted to lines that sit near a contract/value/amount keyword when one
 * exists on the page. Returns rects in render pixels for the given scale.
 */
function valueRectsForPage(page, scale) {
  const lines = new Map();
  for (const word of page.words) {
    const key = `${Math.round(word.yMin / 4)}:${Math.round(word.xMin / 400)}`;
    if (!lines.has(key)) lines.set(key, []);
    lines.get(key).push(word);
  }
  const keyword = /(contract|value|amount|sum|tender|award)/i;
  const keywordBoxes = page.words.filter((word) => keyword.test(word.text));
  const rects = [];
  for (const words of lines.values()) {
    const text = words.map((word) => word.text).join(" ");
    const amountMatch = text.match(/N\$|\bNAD\b/);
    const hasDigits = /\d/.test(text);
    if (!amountMatch || !hasDigits) continue;
    const nearKeyword = keywordBoxes.some((box) =>
      words.some((word) => Math.abs(word.yMin - box.yMin) < 40),
    );
    // Mask when the line carries an amount, or when it sits near a value keyword.
    if (!nearKeyword && !/\d[\d,.]{2,}/.test(text)) continue;
    const xMin = Math.min(...words.map((word) => word.xMin));
    const xMax = Math.max(...words.map((word) => word.xMax));
    const yMin = Math.min(...words.map((word) => word.yMin));
    const yMax = Math.max(...words.map((word) => word.yMax));
    rects.push({
      x: Math.max(0, Math.floor(xMin * scale) - 6),
      y: Math.max(0, Math.floor(yMin * scale) - 6),
      width: Math.ceil((xMax - xMin) * scale) + 12,
      height: Math.ceil((yMax - yMin) * scale) + 12,
    });
  }
  return rects;
}

/** Trim uniform white borders, re-add breathing room, keep the result conservative. */
async function cleanPage(pngPath, log) {
  const image = sharp(pngPath);
  const meta = await image.metadata();
  const trimmed = image.clone().trim({ background: "#ffffff", threshold: 22 });
  const trimmedBuffer = await trimmed.toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  const originalArea = meta.width * meta.height;
  const trimmedArea = trimmedMeta.width * trimmedMeta.height;
  let finalBuffer = trimmedBuffer;
  let width = trimmedMeta.width;
  let height = trimmedMeta.height;
  if (trimmedArea / originalArea < 1 - MAX_TRIM_AREA_FRACTION) {
    log(`    trim rejected (${Math.round((1 - trimmedArea / originalArea) * 100)}% area) — keeping full page`);
    finalBuffer = await sharp(pngPath).toBuffer();
    width = meta.width;
    height = meta.height;
  } else if (trimmedArea !== originalArea) {
    finalBuffer = await sharp(trimmedBuffer)
      .extend({
        top: EDGE_PADDING,
        bottom: EDGE_PADDING,
        left: EDGE_PADDING,
        right: EDGE_PADDING,
        background: "#ffffff",
      })
      .toBuffer();
    width += EDGE_PADDING * 2;
    height += EDGE_PADDING * 2;
  }
  return { buffer: finalBuffer, width, height };
}

const manifest = readManifest();
const documents = [];
const summary = { pdfBytesBefore: 0, pdfBytesAfter: 0, pages: 0 };

for (const [index, entry] of manifest.entries()) {
  const slug = entry.file.replace(/\.pdf$/i, "");
  const sourcePdf = join(inputDir, "pdf", entry.file);
  if (!existsSync(sourcePdf)) throw new Error(`Manifest file missing from pdf/: ${entry.file}`);

  const log = (message) => console.log(message);
  log(`[${index + 1}/${manifest.length}] ${entry.file} — ${entry.client} / ${entry.type}`);

  const cleanedPdf = join(scratch, `${slug}.clean.pdf`);
  stripMetadata(sourcePdf, cleanedPdf);

  const beforeBytes = statSync(sourcePdf).size;
  summary.pdfBytesBefore += beforeBytes;

  // Render every page at 200 DPI.
  rmSync(join(scratch, slug), { recursive: true, force: true });
  mkdirSync(join(scratch, slug), { recursive: true });
  execFileSync("pdftoppm", ["-r", String(RENDER_DPI), "-png", cleanedPdf, join(scratch, slug, "page")]);
  const pageFiles = existsSync(join(scratch, slug, "page-1.png"))
    ? [...Array(64).keys()].map((n) => join(scratch, slug, `page-${n + 1}.png`)).filter(existsSync)
    : [join(scratch, slug, "page-1.png")].filter(existsSync);

  const boxes = MASK_VALUES ? wordBoxes(cleanedPdf) : null;
  const scale = RENDER_DPI / PDF_DPI;
  const maskedPageBuffers = [];
  let rectsFound = 0;

  const imagePaths = [];
  const thumbPaths = [];
  const pageDims = [];

  for (const [pageIndex, pageFile] of pageFiles.entries()) {
    const pageNumber = pageIndex + 1;
    const pageLog = (message) => log(`${message}`);
    const cleaned = await cleanPage(pageFile, (m) => pageLog(`  p${pageNumber}: ${m.trim()}`));
    let working = cleaned;

    if (MASK_VALUES && boxes[pageIndex]) {
      const rects = valueRectsForPage(boxes[pageIndex], scale);
      rectsFound += rects.length;
      if (rects.length > 0) {
        const composite = await Promise.all(rects.map(async (rect) => ({
          input: await sharp({
            create: { width: rect.width, height: rect.height, channels: 3, background: "#111111" },
          }).png().toBuffer(),
          left: rect.x,
          top: rect.y,
        })));
        const maskedBuffer = await sharp(cleaned.buffer).composite(composite).toBuffer();
        log(`  p${pageNumber}: masked ${rects.length} value region(s)`);
        working = { buffer: maskedBuffer, width: cleaned.width, height: cleaned.height };
      }
    }
    maskedPageBuffers.push(working.buffer);

    const imageTarget = join(imageOut, `${slug}-p${pageNumber}.webp`);
    const thumbTarget = join(thumbOut, `${slug}-p${pageNumber}.webp`);

    const fullMeta = await sharp(working.buffer)
      .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: FULL_QUALITY })
      .toFile(imageTarget);
    await sharp(working.buffer)
      .resize({ width: Math.min(THUMB_WIDTH, fullMeta.width), withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbTarget);

    imagePaths.push(`/documents/images/${slug}-p${pageNumber}.webp`);
    thumbPaths.push(`/documents/thumbs/${slug}-p${pageNumber}.webp`);
    pageDims.push({ width: fullMeta.width, height: fullMeta.height });
    summary.pages += 1;
  }

  let pdfFilename = entry.file;
  let pdfPath = `/documents/pdf/${entry.file}`;
  const wantsMaskedPdf = MASK_VALUES && rectsFound > 0 && /0[12]-roads-authority/.test(entry.file);
  if (wantsMaskedPdf) {
    pdfFilename = entry.file.replace(/\.pdf$/i, ".masked.pdf");
    pdfPath = `/documents/pdf/${pdfFilename}`;
  }

  // Write the download copy. Default: linearised cleaned PDF. With MASK_VALUES on
  // for 01/02: rasterised masked PDF instead of the original, per the brief.
  if (MASK_VALUES && pdfPath.endsWith(".masked.pdf")) {
    // Rasterised masked PDF: masked page images as pages (visible content identical to masked renders).
    const pilInput = maskedPageBuffers.map((buffer, i) => {
      const path = join(scratch, `${slug}.masked-p${i + 1}.png`);
      writeFileSync(path, buffer);
      return path;
    });
    execFileSync("python3", ["-c", `import sys; from PIL import Image; pages=[Image.open(p).convert("RGB") for p in sys.argv[1:]]; pages[0].save(sys.argv[-1], save_all=True, append_images=pages[1:], resolution=${RENDER_DPI})`, ...pilInput, join(pdfOut, pdfFilename)], { stdio: "pipe" });
    log(`  masked PDF written (rasterised): ${pdfFilename}`);
  } else {
    // qpdf linearised copy without metadata.
    execFileSync("qpdf", ["--warning-exit-0", cleanedPdf, join(pdfOut, entry.file)], { stdio: "pipe" });
  }

  const finalPdfBytes = statSync(join(pdfOut, pdfFilename)).size;
  summary.pdfBytesAfter += finalPdfBytes;

  documents.push({
    id: String(index + 1).padStart(2, "0"),
    slug,
    client: entry.client,
    type: entry.type,
    category: categoryFor(entry.type, entry.client),
    pageCount: pageFiles.length,
    imagePaths,
    thumbPath: thumbPaths[0],
    pageDims,
    pdfPath,
    pdfFilename,
    pdfSizeKB: Math.round(finalPdfBytes / 1024),
    altText: `${entry.type} from ${entry.client}`,
    showPublic: true,
  });
  log(`  pages: ${pageFiles.length}, pdf: ${Math.round(beforeBytes / 1024)}KB -> ${Math.round(finalPdfBytes / 1024)}KB`);
}

/** Filter grouping per the brief; BIPA certificate lives under company credentials. */
function categoryFor(type, client) {
  const t = type.toLowerCase();
  if (t.includes("credential") || (client === "Mendozer Investments CC" && t.includes("good standing"))) return "credentials";
  if (t.includes("reference") || t.includes("testimonial")) return "references";
  if (t.includes("completion") || t.includes("acceptance")) return "completion";
  if (t.includes("award")) return "awards";
  return "references";
}

const jsonPath = join(contentOut, "proof-documents.json");
writeFileSync(jsonPath, `${JSON.stringify(documents, null, 2)}\n`);

const tsPath = join(contentOut, "proof-documents.ts");
writeFileSync(
  tsPath,
  `import documents from "./proof-documents.json";

export type ProofDocumentPage = { width: number; height: number };

export type ProofDocument = {
  id: string;
  slug: string;
  client: string;
  type: string;
  category: "references" | "completion" | "awards" | "credentials";
  pageCount: number;
  imagePaths: readonly string[];
  thumbPath: string;
  pageDims: readonly ProofDocumentPage[];
  pdfPath: string;
  pdfFilename: string;
  pdfSizeKB: number;
  altText: string;
  showPublic: boolean;
};

export const proofDocuments = documents as readonly ProofDocument[];
`,
);

console.log(
  `Done. ${documents.length} documents, ${summary.pages} pages. PDF bytes ${summary.pdfBytesBefore} -> ${summary.pdfBytesAfter}. MASK_VALUES=${MASK_VALUES}`,
);
