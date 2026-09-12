#!/usr/bin/env node
/**
 * Image integrity check for mendozer-investments:
 * 1. Every /images/... , /media/..., /og/..., /videos/..., /assets/... reference in src/**  must exist in public/
 * 2. Every file in public/images must be referenced somewhere in src (orphans reported as info)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const PUB = path.join(ROOT, "public");

function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(p);
  }
  return out;
}

const srcFiles = walk(SRC, [".ts", ".tsx", ".css"]);
const referenced = new Map(); // publicPath -> [files]
const refRe = /"(\/(?:images|media|og|videos|assets|documents)\/[^"'\s?]+)"/g;

for (const f of srcFiles) {
  const text = fs.readFileSync(f, "utf8");
  let m;
  while ((m = refRe.exec(text)) !== null) {
    const p = m[1];
    if (!referenced.has(p)) referenced.set(p, []);
    referenced.get(p).push(path.relative(ROOT, f));
  }
}

let missing = 0;
for (const [p, files] of [...referenced.entries()].sort()) {
  const fsPath = path.join(PUB, p);
  if (!fs.existsSync(fsPath)) {
    console.log(`MISSING: ${p}  (referenced in ${[...new Set(files)].join(", ")})`);
    missing++;
  }
}
console.log(`\nReferenced static assets: ${referenced.size} | missing on disk: ${missing}`);

// orphans in public/images (info only)
const pubImgs = walk(path.join(PUB, "images"), [".webp", ".png", ".jpg", ".jpeg", ".avif", ".svg"]);
const orphans = pubImgs.map((p) => "/" + path.relative(PUB, p).split(path.sep).join("/")).filter((p) => !referenced.has(p));
console.log(`public/images files: ${pubImgs.length} | not referenced in src (orphans): ${orphans.length}`);
if (orphans.length) console.log(orphans.join("\n"));
