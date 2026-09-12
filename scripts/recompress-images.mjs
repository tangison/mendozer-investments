#!/usr/bin/env node
/**
 * Recompress public/images files larger than 200KB in place.
 * - webp: sharp webp quality 72 (effort 6)
 * - jpg/jpeg: sharp mozjpeg quality 78
 * Dimensions are preserved. Originals remain recoverable via git.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "public", "images");
const MIN_BYTES = 200 * 1024;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(TARGET).filter((f) => /\.(webp|jpe?g)$/i.test(f));
let saved = 0;
let changed = 0;

for (const file of files) {
  const before = fs.statSync(file).size;
  if (before <= MIN_BYTES) continue;
  const ext = path.extname(file).toLowerCase();
  let output;
  if (ext === ".webp") {
    output = await sharp(file, { animated: false }).webp({ quality: 72, effort: 6 }).toBuffer();
  } else {
    output = await sharp(file, { animated: false }).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  }
  if (output.length < before) {
    fs.writeFileSync(file, output);
    saved += before - output.length;
    changed += 1;
    console.log(`${(before / 1024).toFixed(0)}KB -> ${(output.length / 1024).toFixed(0)}KB  ${path.relative(ROOT, file)}`);
  } else {
    console.log(`skip (no gain)  ${path.relative(ROOT, file)}`);
  }
}

console.log(`\nRecompressed ${changed} file(s), saved ${(saved / 1024).toFixed(0)}KB total.`);
