import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const content = readFileSync(resolve(root, "src/content/site-content.ts"), "utf8");
const assetManifest = readFileSync(resolve(root, "ASSET_MANIFEST.md"), "utf8");
const requiredSlugs = ["construction", "technology", "cooling", "logistics", "energy", "tourism"];
const failures = [];
const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

for (const slug of requiredSlugs) {
  if (!content.includes(`slug: "${slug}"`)) failures.push(`Missing sector content record: ${slug}`);
  if (!existsSync(resolve(root, `src/app/sectors/[slug]/page.tsx`))) failures.push("Missing reusable sector route template");
  if (!content.includes(`/og/${slug}.png`) && !existsSync(resolve(root, `public/og/${slug}.png`))) failures.push(`Missing Open Graph asset: ${slug}`);
}

// Active asset-policy enforcement: no brand-gradient photo substitute may survive in application data.
if (content.includes('status: "placeholder"')) failures.push("Placeholder media status remains in content data");
if (content.includes("community-sport-gradient") || content.includes("BrandArtwork")) failures.push("Retired brand-gradient visual remains in content data");
if (!content.includes("W/188/2017") || !content.includes("Namibia Government Gazette No. 8287")) failures.push("Verified wholesale fuel licence fact/citation is missing from content data");
if (!assetManifest.includes("GEN-001") || !assetManifest.includes("community-otjiwarongo-sport-context.png") || !assetManifest.includes("Exact prompt used")) failures.push("Generated asset ledger is incomplete for GEN-001");

const vectorAssets = [
  "arrow-right.svg", "close-two-line.svg", "connected-network.svg", "cta-accent.svg", "eyebrow-rule-blue.svg", "eyebrow-rule-navy.svg", "menu-two-line.svg", "section-orbit.svg", "sector-cooling.svg", "sector-energy.svg", "sector-landscape.svg", "sector-route.svg", "sector-signal.svg", "sector-structure.svg", "vertical-rule.svg",
];
for (const filename of vectorAssets) {
  const source = resolve(root, "assets/vectors", filename);
  const served = resolve(root, "public/assets/vectors", filename);
  if (!existsSync(source) || !existsSync(served) || hash(source) !== hash(served)) failures.push(`Vector source/public mismatch: ${filename}`);
}

const assetPaths = [...content.matchAll(/src:\s*"(\/images\/(?:projects|generated)\/[^"\n]+)"/g)].map((match) => match[1]);
for (const assetPath of assetPaths) {
  if (!existsSync(resolve(root, "public", assetPath.slice(1)))) failures.push(`Content asset does not exist: ${assetPath}`);
}

for (const ogName of ["home", "about", "construction", "technology", "cooling", "logistics", "energy", "tourism", "community", "contact"]) {
  if (!existsSync(resolve(root, `public/og/${ogName}.png`))) failures.push(`Missing social asset: /og/${ogName}.png`);
}

const sourceLogo = resolve(root, "assets/logos/mendozer-logo-full.svg");
const publicLogo = resolve(root, "public/assets/logos/mendozer-logo-full.svg");
if (!existsSync(sourceLogo) || !existsSync(publicLogo) || hash(sourceLogo) !== hash(publicLogo)) {
  failures.push("Public Mendozer primary logo is not byte-identical to supplied source asset");
}

const appSources = [
  "src/brand/site-config.ts",
  "src/content/site-content.ts",
  "src/app/layout.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
].map((path) => readFileSync(resolve(root, path), "utf8")).join("\n");
if (!appSources.includes("NEXT_PUBLIC_SITE_URL")) failures.push("Canonical URL is not environment-configurable");
if (appSources.includes("https://mendozer.com")) failures.push("Production mendozer.com was hardcoded into application sources");

if (failures.length) {
  console.error("Content integrity checks failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content integrity passed: ${requiredSlugs.length} sectors, ${assetPaths.length} mapped assets, 10 OG images, supplied logo verified.`);
