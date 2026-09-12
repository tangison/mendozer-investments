import type { MetadataRoute } from "next";
import { siteConfig } from "@/brand/site-config";
import { routes } from "@/content/site-content";

/**
 * Pages that ship a `robots: { index: false }` meta must not appear in the
 * sitemap. Submitting them causes Search Console "Submitted URL marked
 * noindex" conflicts.
 */
const noindexRoutes = new Set<string>(["/privacy", "/terms"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((route) => !noindexRoutes.has(route))
    .map((route) => {
      // Normalise: root has no trailing slash to match the rendered canonical.
      // All other routes keep their path as-is (no trailing slash in Next.js default).
      const normalized = route === "/" ? siteConfig.url : new URL(route, siteConfig.url).toString().replace(/\/$/, "");
      return {
        url: normalized,
        lastModified: new Date(),
        changeFrequency: route === "/" || route.includes("blog") ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route.startsWith("/blog") ? 0.9 : 0.8,
      };
    });
}
