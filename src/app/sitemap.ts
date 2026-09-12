import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/brand/site-config";
import { routes } from "@/content/site-content";

/**
 * Routes that ship a `robots: { index: false }` meta must not appear in the
 * sitemap. Submitting them causes Search Console "Submitted URL marked
 * noindex" conflicts. The brand page is the only deliberate noindex route.
 */
const noindexRoutes = new Set<string>(["/brand"]);

/**
 * Last meaningful content change per route (fallback when git history is not
 * available in the build environment, e.g. shallow CI clones).
 */
const fallbackLastmod: Record<string, string> = {
  "/": "2026-09-12",
  "/about": "2026-09-12",
  "/sectors": "2026-09-12",
  "/sectors/construction": "2026-09-12",
  "/sectors/technology": "2026-09-12",
  "/sectors/cooling": "2026-09-12",
  "/sectors/logistics": "2026-09-12",
  "/sectors/energy": "2026-09-12",
  "/sectors/tourism": "2026-09-12",
  "/services": "2026-09-12",
  "/services/electric-fencing": "2026-09-12",
  "/services/walls-precast": "2026-09-12",
  "/services/gate-automation": "2026-09-12",
  "/services/general-construction": "2026-09-12",
  "/work": "2026-09-12",
  "/updates": "2026-09-12",
  "/compliance": "2026-09-12",
  "/community": "2026-09-12",
  "/contact": "2026-09-12",
  "/blog": "2026-09-12",
  "/blog/mendozer-windhoek-satellite-office": "2026-09-12",
  "/privacy": "2026-09-12",
  "/terms": "2026-09-12",
  "/blog/namibia-heroes-day-2026": "2026-09-12",
  "/blog/otjiwarongo-sports-bonanza-2026": "2026-09-12",
  "/blog/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments": "2026-09-12",
  "/blog/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification": "2026-09-12",
};

/** Source files whose changes should bump each route's lastmod. */
function sourcesForRoute(route: string): string[] {
  if (route === "/") return ["src/app/page.tsx", "src/content/site-content.ts", "src/components/HomeHero.tsx"];
  if (route.startsWith("/sectors/")) return ["src/content/site-content.ts"];
  if (route === "/sectors") return ["src/app/sectors/page.tsx", "src/content/site-content.ts"];
  if (route.startsWith("/services/")) return ["src/content/site-services.ts"];
  if (route === "/services") return ["src/app/services/page.tsx", "src/content/site-services.ts"];
  return [`src/app${route}/page.tsx`];
}

/**
 * Ask git for the last commit date that touched the route's sources. Build
 * environments without usable git history fall back to the static map, so
 * lastmod dates stay meaningful instead of collapsing onto the build day.
 */
function lastmodFor(route: string): string {
  for (const source of sourcesForRoute(route)) {
    try {
      const date = execSync(`git log -1 --format=%cs -- ${source}`, {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    } catch {
      // No git history available; use the fallback below.
    }
  }
  return fallbackLastmod[route] ?? new Date().toISOString().slice(0, 10);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((route) => !noindexRoutes.has(route))
    .map((route) => {
      // Normalise: root has no trailing slash to match the rendered canonical.
      // All other routes keep their path as-is (no trailing slash in Next.js default).
      const normalized = route === "/" ? siteConfig.url : new URL(route, siteConfig.url).toString().replace(/\/$/, "");
      return {
        url: normalized,
        lastModified: lastmodFor(route),
        changeFrequency: route === "/" || route.includes("blog") ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route.startsWith("/blog") ? 0.9 : 0.8,
      };
    });
}
