#!/usr/bin/env node
/**
 * Mendozer home hero motion loop builder.
 *
 * Stitches the nine supplied 7-second sector clips into one seamless 63-second
 * loop, grades every clip to the brand navy (#0B1E3D), applies the 0.3 opacity
 * navy legibility veil, and writes desktop + mobile deliverables.
 *
 * Outputs (all under /public/media):
 *   mendozer-hero-motion.webm        1920x1080 VP9  - primary
 *   mendozer-hero-motion.mp4         1920x1080 H.264 - fallback
 *   mendozer-hero-motion-720.webm    1280x720  VP9  - mobile, budget < 3 MB
 *   mendozer-hero-motion-720.mp4     1280x720  H.264 - mobile, budget < 3 MB
 *   mendozer-hero-motion-poster.webp first graded frame, used as <video poster>
 *
 * Usage:
 *   node scripts/build-hero-motion.mjs [--src <dir>] [--keep-temp]
 *
 * Source resolution: each clip is matched from --src (default media-source/)
 * by its canonical name, then by its ordinal prefix (01..09), then by the
 * n-th video file in sorted order. Any container ffmpeg can read works.
 */

import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, existsSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const require = createRequire(import.meta.url);

const ROOT = process.cwd();
const NAVY = "0x0B1E3D";
const CLIP_SECONDS = 7;
const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 25;
/** Dip-to-navy at each clip boundary: makes every cut land on the same solid
 *  navy frame, so cut 9 -> 1 is invisible and the loop reads as continuous. */
const DIP = 0.4;

/** Canonical clip order. Index is the ordinal used in the loop. */
const CLIPS = [
  { slug: "construction", name: "construction" },
  { slug: "technology", name: "technology" },
  { slug: "cooling", name: "cooling" },
  { slug: "logistics", name: "logistics" },
  { slug: "tourism", name: "tourism" },
  { slug: "dunes", name: "dunes" },
  { slug: "ocean", name: "ocean" },
  { slug: "bird", name: "bird" },
  { slug: "energy_flash", name: "energy flash", aliases: ["energy-flash", "energyflash", "energy"] },
];

const VIDEO_EXT = new Set([".webm", ".mp4", ".mov", ".m4v", ".mkv", ".avi", ".webp", ".gif"]);

function parseArgs(argv) {
  const args = { src: "media-source", keepTemp: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--src") { args.src = argv[i + 1]; i += 1; }
    else if (argv[i] === "--keep-temp") args.keepTemp = true;
  }
  return args;
}

function resolveBinary(kind) {
  const envKey = kind === "ffmpeg" ? "FFMPEG" : "FFPROBE";
  if (process.env[envKey]) return process.env[envKey];
  for (const id of [`@${kind}-installer/${kind}`, `${kind}-static`]) {
    try {
      const mod = require(id);
      const bin = typeof mod === "string" ? mod : mod?.path;
      if (bin && existsSync(bin)) return bin;
    } catch { /* not installed, fall through */ }
  }
  return kind; // rely on PATH
}

const FFMPEG = resolveBinary("ffmpeg");
const FFPROBE = resolveBinary("ffprobe");

async function ffmpeg(args) {
  return run(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { maxBuffer: 1 << 28 });
}

async function probeDuration(file) {
  const { stdout } = await run(FFPROBE, [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file,
  ]);
  const value = Number.parseFloat(stdout.trim());
  return Number.isFinite(value) ? value : 0;
}

function listVideos(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => VIDEO_EXT.has(extname(f).toLowerCase()))
    .filter((f) => !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

/** Match each canonical clip to a real file on disk. */
function resolveSources(srcDir) {
  const files = listVideos(srcDir);
  const taken = new Set();
  const pick = (predicate) => files.find((f) => !taken.has(f) && predicate(f.toLowerCase()));

  return CLIPS.map((clip, index) => {
    const ordinal = String(index + 1).padStart(2, "0");
    const names = [clip.slug, ...(clip.aliases ?? [])];
    const match =
      pick((f) => names.some((n) => basename(f, extname(f)).toLowerCase() === n)) ??
      pick((f) => names.some((n) => f.includes(n))) ??
      pick((f) => f.startsWith(`${ordinal}`) || f.startsWith(`${index + 1}-`) || f.startsWith(`${index + 1}_`)) ??
      files.filter((f) => !taken.has(f))[0];
    if (match) taken.add(match);
    return { ...clip, index, ordinal, file: match ? join(srcDir, match) : null };
  });
}

/**
 * Per-clip normalisation:
 *   scale/crop to exact 1920x1080, constant fps, exactly 7s
 *   grade toward brand navy, then the 0.3 navy legibility veil
 *   dip in/out of solid navy so every boundary matches
 */
function clipFilter(seconds) {
  const outPoint = Math.max(seconds - DIP, 0);
  return [
    `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase:flags=lanczos`,
    `crop=${WIDTH}:${HEIGHT}`,
    `fps=${FPS}`,
    "format=gbrp",
    // Grade: calm the source, then bias mids/shadows to the navy base.
    "eq=saturation=0.62:contrast=1.05:brightness=-0.015:gamma=0.98",
    "colorbalance=rs=-0.10:gs=-0.03:bs=0.16:rm=-0.07:gm=-0.01:bm=0.12:rh=-0.04:gh=0.00:bh=0.07",
    // Required legibility veil: solid #0B1E3D at 0.3 opacity over the whole frame.
    `drawbox=x=0:y=0:w=${WIDTH}:h=${HEIGHT}:color=${NAVY}@0.3:t=fill`,
    // Boundary dip so cut-to-cut (and 9 -> 1) lands on identical navy.
    `fade=t=in:st=0:d=${DIP}:color=${NAVY}`,
    `fade=t=out:st=${outPoint.toFixed(3)}:d=${DIP}:color=${NAVY}`,
    "format=yuv420p",
    "setsar=1",
  ].join(",");
}

async function normaliseClip(clip, tempDir) {
  const out = join(tempDir, `${clip.ordinal}-${clip.slug}.mp4`);
  const duration = await probeDuration(clip.file);
  const isStill = duration === 0 || duration < 0.2;

  const input = isStill
    ? ["-loop", "1", "-t", String(CLIP_SECONDS), "-i", clip.file]
    : ["-i", clip.file];

  // Short clips loop back on themselves rather than freezing on a last frame.
  const needsLoop = !isStill && duration > 0 && duration < CLIP_SECONDS - 0.05;
  const loopArgs = needsLoop ? ["-stream_loop", String(Math.ceil(CLIP_SECONDS / duration))] : [];
  const source = needsLoop ? ["-stream_loop", loopArgs[1], "-i", clip.file] : input;

  await ffmpeg([
    ...source,
    "-an", "-sn", "-dn",
    "-t", String(CLIP_SECONDS),
    "-vf", clipFilter(CLIP_SECONDS),
    "-c:v", "libx264", "-preset", "slow", "-crf", "16",
    "-pix_fmt", "yuv420p",
    "-r", String(FPS),
    "-video_track_timescale", "90000",
    out,
  ]);

  return { ...clip, normalised: out, sourceDuration: duration, wasLooped: needsLoop, wasStill: isStill };
}

async function concatClips(clips, tempDir) {
  const listFile = join(tempDir, "concat.txt");
  writeFileSync(listFile, clips.map((c) => `file '${c.normalised.replace(/'/g, "'\\''")}'`).join("\n"));
  const master = join(tempDir, "master.mp4");
  await ffmpeg([
    "-f", "concat", "-safe", "0", "-i", listFile,
    "-c:v", "libx264", "-preset", "slow", "-crf", "16",
    "-pix_fmt", "yuv420p", "-r", String(FPS), "-an",
    master,
  ]);
  return master;
}

const mb = (file) => statSync(file).size / (1024 * 1024);

async function encodeWebm(master, out, { width, height, crf, bitrate }) {
  const scale = `scale=${width}:${height}:flags=lanczos`;
  const pass = (n) => ffmpeg([
    "-i", master, "-vf", scale, "-an",
    "-c:v", "libvpx-vp9", "-b:v", bitrate, "-crf", String(crf),
    "-row-mt", "1", "-tile-columns", "2", "-frame-parallel", "0",
    "-g", String(FPS * 5), "-deadline", "good", "-cpu-used", n === 1 ? "4" : "2",
    "-pass", String(n), "-passlogfile", `${out}.log`,
    ...(n === 1 ? ["-f", "null", "-"] : [out]),
  ]);
  await pass(1);
  await pass(2);
  for (const suffix of ["-0.log", ".log-0.log", ".log"]) {
    const stray = `${out}${suffix}`;
    if (existsSync(stray)) rmSync(stray, { force: true });
  }
}

async function encodeMp4(master, out, { width, height, crf, maxrate }) {
  await ffmpeg([
    "-i", master, "-vf", `scale=${width}:${height}:flags=lanczos`, "-an",
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
    "-preset", "slow", "-crf", String(crf),
    "-maxrate", maxrate, "-bufsize", "8M",
    "-pix_fmt", "yuv420p", "-g", String(FPS * 5),
    "-movflags", "+faststart",
    out,
  ]);
}

/**
 * Encode to a hard file-size ceiling. Content complexity decides the first
 * attempt's size, so if the result overshoots we re-encode against a bitrate
 * derived from the budget actually available. This keeps the mobile promise
 * (< 3 MB) true for any footage rather than only for well-behaved clips.
 */
async function encodeWithinBudget(encode, master, out, opts, budgetMb, label) {
  const attempts = [opts, ...opts.retries ?? []];
  for (let i = 0; i < attempts.length; i += 1) {
    await encode(master, out, attempts[i]);
    const size = mb(out);
    if (size < budgetMb) return size;
    if (i < attempts.length - 1) {
      console.log(`  ${label} ${size.toFixed(2)} MB over ${budgetMb} MB budget, re-encoding tighter`);
    }
  }
  return mb(out);
}

/** Bitrate (kbps) that fits `mb` megabytes across `seconds`, with headroom. */
function budgetBitrate(mbTarget, seconds, headroom = 0.88) {
  return `${Math.floor(((mbTarget * 8 * 1024) / seconds) * headroom)}k`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const srcDir = resolve(ROOT, args.src);
  const outDir = resolve(ROOT, "public/media");
  const tempDir = resolve(ROOT, ".tmp-hero-motion");

  const sources = resolveSources(srcDir);
  const missing = sources.filter((c) => !c.file);
  if (missing.length) {
    console.error(`\nMissing ${missing.length} of ${CLIPS.length} source clips in ${srcDir}\n`);
    for (const clip of sources) {
      console.error(`  ${clip.ordinal}. ${clip.name.padEnd(14)} ${clip.file ? basename(clip.file) : "NOT FOUND"}`);
    }
    console.error(`\nDrop the nine clips into ${args.src}/ and re-run.\n`);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  rmSync(tempDir, { recursive: true, force: true });
  mkdirSync(tempDir, { recursive: true });

  console.log(`\nffmpeg  ${FFMPEG}`);
  console.log(`source  ${srcDir}\n`);
  console.log("Normalising nine clips to 1920x1080 / 7s / navy grade");

  const normalised = [];
  for (const clip of sources) {
    const done = await normaliseClip(clip, tempDir);
    normalised.push(done);
    const note = done.wasStill ? "still -> 7s" : done.wasLooped ? `looped from ${done.sourceDuration.toFixed(1)}s` : `trimmed from ${done.sourceDuration.toFixed(1)}s`;
    console.log(`  ${done.ordinal}. ${done.name.padEnd(14)} ${basename(done.file).padEnd(34)} ${note}`);
  }

  console.log("\nStitching 63s master (hard cuts, navy-matched boundaries)");
  const master = await concatClips(normalised, tempDir);

  const desktopWebm = join(outDir, "mendozer-hero-motion.webm");
  const desktopMp4 = join(outDir, "mendozer-hero-motion.mp4");
  const mobileWebm = join(outDir, "mendozer-hero-motion-720.webm");
  const mobileMp4 = join(outDir, "mendozer-hero-motion-720.mp4");
  const poster = join(outDir, "mendozer-hero-motion-poster.webp");

  const loopSeconds = CLIPS.length * CLIP_SECONDS;
  const MOBILE_BUDGET_MB = 2.8; // stay clearly under the 3 MB promise

  console.log("Encoding desktop 1080p webm");
  await encodeWebm(master, desktopWebm, { width: WIDTH, height: HEIGHT, crf: 34, bitrate: "1500k" });
  console.log("Encoding desktop 1080p mp4");
  await encodeMp4(master, desktopMp4, { width: WIDTH, height: HEIGHT, crf: 25, maxrate: "2400k" });

  console.log("Encoding mobile 720p webm (size-capped)");
  await encodeWithinBudget(encodeWebm, master, mobileWebm, {
    width: 1280, height: 720, crf: 38, bitrate: "600k",
    retries: [
      { width: 1280, height: 720, crf: 44, bitrate: budgetBitrate(MOBILE_BUDGET_MB, loopSeconds) },
      { width: 1280, height: 720, crf: 50, bitrate: budgetBitrate(MOBILE_BUDGET_MB * 0.8, loopSeconds) },
    ],
  }, MOBILE_BUDGET_MB, "720p webm");

  console.log("Encoding mobile 720p mp4 (size-capped)");
  await encodeWithinBudget(encodeMp4, master, mobileMp4, {
    width: 1280, height: 720, crf: 30, maxrate: "1100k",
    retries: [
      { width: 1280, height: 720, crf: 34, maxrate: budgetBitrate(MOBILE_BUDGET_MB, loopSeconds) },
      { width: 1280, height: 720, crf: 38, maxrate: budgetBitrate(MOBILE_BUDGET_MB * 0.8, loopSeconds) },
    ],
  }, MOBILE_BUDGET_MB, "720p mp4");

  console.log("Writing poster frame");
  await ffmpeg(["-i", master, "-vf", "select=eq(n\\,12),scale=1600:-2", "-frames:v", "1", "-q:v", "82", poster]);

  const duration = await probeDuration(desktopMp4);
  const outputs = [desktopWebm, desktopMp4, mobileWebm, mobileMp4, poster];

  console.log("\nOutputs");
  for (const file of outputs) console.log(`  ${basename(file).padEnd(38)} ${mb(file).toFixed(2)} MB`);
  console.log(`\nLoop duration ${duration.toFixed(2)}s (target ${CLIPS.length * CLIP_SECONDS}s)`);

  const budget = Math.max(mb(mobileWebm), mb(mobileMp4));
  if (budget >= 3) console.warn(`WARNING mobile build is ${budget.toFixed(2)} MB, over the 3 MB budget`);
  else console.log(`Mobile budget OK: largest 720p file ${budget.toFixed(2)} MB (< 3 MB)`);

  if (Math.abs(duration - CLIPS.length * CLIP_SECONDS) > 0.5) {
    console.warn(`WARNING duration drifted from ${CLIPS.length * CLIP_SECONDS}s`);
  }

  if (!args.keepTemp) rmSync(tempDir, { recursive: true, force: true });
  console.log("");
}

main().catch((error) => {
  console.error(error.stderr?.toString?.() || error.message || error);
  process.exit(1);
});
