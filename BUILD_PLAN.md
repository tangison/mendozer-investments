# BUILD_PLAN.md — Mendozer Investments

## Scope change (this revision)
Original plan assumed a lean, rush-timeline brochure site. Scope is now upgraded: this is a **large, high-production corporate website**, not a shallow brochure. Still static (no CMS, no database — smallest architecture that satisfies the requirement per `tangison-web-plan` principles), but significantly deeper per page and heavier on generated/real visual assets.

## What "big" means here, concretely
- Each of the 6 sector pages gets full section depth (hero, services breakdown, proof section, CTA) — not a single scroll card
- Homepage carries more visual weight: multiple image-led sections, not just a hero + grid
- Community/Sponsorship page gets real gallery treatment, not a single strip
- Social sharing is a first-class deliverable: Open Graph images per major page, not just a favicon
- Heavier use of generated brand-gradient graphics and vector dividers (via `tangison-vectorgraphics`) as placeholder visual weight until real photography lands, so the site never looks thin while waiting on client assets

## Architecture (unchanged, confirmed)
- Static site, Next.js + Tailwind + Vercel
- No auth, no payments, no database
- Domain: mendozer.com (confirmed)
- Model: Branded House, one site, dedicated sector pages (see `site-architecture.md`)

## Rejected alternatives
- Subdomains per sector — rejected, adds build/maintenance cost without benefit for a static site
- Separate domains per sector — rejected, undermines "one accountable group" positioning
- CMS-backed dynamic site — rejected for now, content update frequency doesn't justify it; revisit if Mendozer wants self-service editing later

## Asset generation plan
Per `tangison-vectorgraphics` and image-first direction in `brand-guidelines.md`:
- Vector dividers/section breaks: build as real SVG (potrace/hand-authored), not raster
- Icon set for sector pages: one coherent family, sourced from brand geometry (angular motif echoing the logo mark), not generic icon packs
- Section hero imagery: brand-gradient graphics until real photography arrives, generated via image model only where explicitly needed, always labelled placeholder in `ASSET_MANIFEST.md`
- Social assets: Open Graph image per page (homepage, each sector, community, contact), sized per platform requirements, built from brand tokens not ad hoc

## Milestones
1. Content return from Johannes (onboarding form) — blocking
2. `tangison-web-content` + `tangison-copywriting-master` pass — produces `CONTENT_PLAN.md` and approved page copy
3. Section-by-section image generation (homepage first, per earlier image-first workflow)
4. `tangison-web-build` implementation, vertical slice first (home → sector → contact)
5. `tangison-web-audit` full pass (accessibility, performance, SEO, responsive, content accuracy)
6. Social asset generation (OG images, sharing metadata)
7. `tangison-web-deploy` to mendozer.com — requires explicit authorization

## Acceptance criteria
- All 6 sector pages (pending final count) built to full depth, not stub cards
- No placeholder copy in anything presented as final
- Every generated image labelled in `ASSET_MANIFEST.md`
- Passes `tangison-web-audit` before any deploy authorization request
