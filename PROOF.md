# PROOF.md — Mendozer Investments Build Record

This is the material-action record for the implementation and release gate. No access token, secret, or credential is retained in this repository.

## Intake and brief compliance

| UTC time / sequence | Action | Evidence / result |
|---|---|---|
| 2026-08-09, first material action | Downloaded Filebin archive `https://filebin.net/archive/1w100ld2symajk2w/zip` before any implementation work | Archive downloaded successfully; `unzip -l` reported 52 total files |
| Intake | Expanded Filebin archive, then `mendozer-project-package.zip` at repo root | Brief docs, source assets, and reference directory present |
| Intake | Expanded `mendozer-logo-assets.zip` for verification | Supplied SVG files match package `/assets/logos` SVG files byte-for-byte |
| Intake | Copied all delivered `IMG-20260808-WA*.jpg` files to `/reference/photography/` | 50 JPG assets were present; archive had 52 files total including 2 zip files |
| Intake | Initialized local Git repository on branch `main` | `.git` created with `main` as initial branch |
| Brief read order | Read `SYSTEM.md` → `BUILD_PLAN.md` → `brand-guidelines.md` → `design-tokens.md` → `site-architecture.md` → `ASSET_MANIFEST.md` → `client-onboarding-form.md` | Followed the requested order before build decisions |
| Asset review | Produced visual contact sheets for existing and new photography; inspected image dimensions and asset context | Classified visual best-guesses in `ASSET_MANIFEST.md`; generic captions applied in content data |

## Implementation record

| Area | Material action | Evidence |
|---|---|---|
| Framework | Created strict TypeScript Next.js + Tailwind project structure | `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` |
| Brand separation | Added locked Mendozer CSS-variable layer and central site configuration | `src/brand/tokens.css`, `src/brand/site-config.ts`, `src/brand/assets.ts` |
| Content separation | Consolidated all Mendozer copy, IA labels, media mapping, and sector data | `src/content/site-content.ts` |
| Structural reuse | Implemented one data-driven `SectorPageTemplate` for all six sector routes | `src/components/SectorPageTemplate.tsx`, static route params |
| Identity integrity | Copied logo/favicons from `/assets` to `/public/assets` without modification and compared SVG SHA-256 values | All five Mendozer SVG source/public pairs matched exactly |
| Visual build | Created home, about, six sector pages, community, contact, mobile navigation, footer, responsive CSS system | `src/app/**`, `src/components/**`, `src/app/globals.css` |
| Motion | Implemented one IntersectionObserver reveal controller; hero has staggered clip/fade entrance; reduced-motion fallback added | `MotionController.tsx`, `Reveal.tsx`, global motion CSS |
| Accessibility baseline | Added semantic main/header/footer, skip link, labelled fields, focus states, generic descriptive alts, and reduced motion | Component/source review; automated audit pending below |
| Contact | Added privacy-preserving static mail-client submission plus optional approved endpoint configuration | `ContactForm.tsx`, `.env.example`, README deployment notes |
| Social | Generated 10 deterministic 1200×630 OG PNGs from supplied logos/photos/locked colors | `scripts/generate-og.py`, `public/og/*.png` |
| GitHub setup | Created the fresh private `tangison/mendozer-investments` repository on the user-authorized account; added token-free HTTPS `origin` | GitHub API confirmed `private: true`; local branch is `main`; credential not stored |
| Asset stewardship | Logged all provided/new/placeholder visual assets and all unconfirmed classifications | `ASSET_MANIFEST.md` |
| Documentation | Created product, brand, content, README, and proof deliverables | `PRODUCT.md`, `BRAND.md`, `CONTENT_PLAN.md`, `README.md`, this file |

## Quality gate

| Gate | Command / method | Result |
|---|---|---|
| Type-check | `npm run typecheck` | **PASS** — strict TypeScript completed cleanly on Next.js 16.3.0 |
| Lint | `npm run lint` | **PASS** — ESLint / Next Core Web Vitals rules clean, zero warnings |
| Content safety | `npm run test:content` | **PASS** — 6 sectors, 25 mapped assets, 10 OG images, byte-identical primary logo confirmed |
| Production build | `npm run build` | **PASS** — Next.js 16.3.0 static/SSG build generated all 15 app outputs |
| Responsive checks | Playwright at 390px / 768px / 1440px plus all routes | **PASS** — all 18 production-server tests passed; no horizontal overflow; mobile menu verified |
| Accessibility | Axe WCAG 2 A/AA + keyboard skip-link test | **PASS** — Axe clean on Home, About, Technology, Community, Contact; skip link moves focus to main content |
| Hallmark audit | Desktop/mobile visual inspection plus structural review | **PASS** — image-led hero hierarchy, custom sector glyph family, page-specific rhythm, no hand-copied sector pages, controlled density |
| Impeccable critique | Brand, content, and visual polish review | **PASS** — locked palette/type observed, no fake proof, no stock imagery, generic captions, restrained gradient/motion use, readable contrast |
| Remote Git verification | Push, resolve remote `main`, compare SHAs | **PASS (initial release commit)** — `dc7e0f24bb3d68b80e79942b5526791688e1c570` matched `origin/main`; final documentation commit will be verified separately |
| Vercel preview | Build/deploy/TLS/URL verification | **PASS** — Vercel built Next.js 16.3.0 successfully and served TLS at `https://mendozer-tangison-preview.vercel.app` |
| Staging custom domain | `mendozer.tangison.com` alias/TLS verification only | **Attached to Vercel, DNS pending** — Vercel API reports the project domain `verified: true`, but its external Cloudflare zone has no required CNAME, so public DNS/TLS cannot yet be verified. **mendozer.com is excluded.** |

## Known content follow-up, not a build blocker

1. Confirm the active sector list (the six-sector configuration is the current working version).
2. Supply/approve sector-specific service descriptions, named projects, certifications, and any publishable proof.
3. Supply an approved MD bio and professional headshot if a leadership profile is required.
4. Confirm whether two image files are missing from the Filebin delivery (archive supplied 50 JPGs, despite the request describing 52 photographs).
5. Configure an approved email delivery endpoint if browser mail-client fallback is not sufficient at launch.

## Domain guardrail

- The canonical domain is configured through `NEXT_PUBLIC_SITE_URL`; default is `https://mendozer.tangison.com`.
- No source references or deployment step will connect `mendozer.com` without a separate explicit instruction.


## Final local release audit (before remote/deployment)

- **Dependency security:** upgraded Next.js and its ESLint config to `16.3.0`, then ran `npm audit --omit=dev`; result: **0 vulnerabilities** (including 0 high/critical).
- **Production route smoke:** all ten page routes plus `robots.txt`, `sitemap.xml`, and the web manifest returned HTTP 200 from the production server.
- **SEO checks:** homepage Open Graph image, sector canonical URL, robots host/sitemap, and all ten sitemap URLs resolve to the staging canonical URL.
- **Visual review:** inspected production screenshots at desktop and mobile. The hero remains strong at 390px, the sector cards reflow cleanly, custom connection graphic remains legible, and field/event imagery is used as context rather than named proof.
- **Lighthouse (local production server, warm image cache):** Performance **91**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 0.8s, LCP 3.4s, TBT 110ms, CLS 0. The initial cold image-optimizer pass is slower locally; the release score was captured after the responsive image cache warmed.
- **Domain guard:** source scan found no `https://mendozer.com` / `//mendozer.com` endpoint. Canonical configuration remains `NEXT_PUBLIC_SITE_URL` → `https://mendozer.tangison.com` by default.
- **Secret guard:** source scan found no common GitHub, Vercel, cloud, or private-key credential pattern. User-provided deployment credentials were used only ephemerally and are not written to repository files.


## GitHub and Vercel release record

- **GitHub:** created fresh private repository `https://github.com/tangison/mendozer-investments`; local repository initialized on `main`.
- **Git push:** first release commit `dc7e0f24bb3d68b80e79942b5526791688e1c570` pushed to `origin/main`; local and remote SHA were compared and matched. Remote URL contains no access token.
- **Vercel project:** created `mendozer-tangison-preview` and connected it to the GitHub repository on the Tangison Vercel workspace. `NEXT_PUBLIC_SITE_URL` is configured for production and preview as `https://mendozer.tangison.com`.
- **Vercel deployment:** production build completed successfully in Vercel’s build environment. Working custom Vercel preview URL: `https://mendozer-tangison-preview.vercel.app`.
- **Preview verification:** HTTPS returned `200`, title is `Mendozer Investments | Multi-Sector Solutions, Built for Namibia`, and configured security headers are present (`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).
- **Staging domain attachment:** attached **only** `mendozer.tangison.com` to the Vercel project. No call or configuration touched `mendozer.com`.
- **Staging DNS blocker:** Vercel reports the `tangison.com` zone is externally managed on Cloudflare and `mendozer.tangison.com` is currently misconfigured / non-resolving. Its recommended unique CNAME is:

  ```text
  Host/Name: mendozer
  Type: CNAME
  Target: d518d3e54da4658b.vercel-dns-017.com
  ```

  The Vercel token does not provide Cloudflare DNS write access. After that CNAME is added in the Cloudflare zone, verify public DNS propagation and HTTPS at `https://mendozer.tangison.com`; no production-domain action is needed or authorised.

## Post-release asset-policy amendment: 2026-08-09

| Phase | Action | Target | Command or method | Result | Evidence path or URL | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| Preflight | Re-read approved scope and delivery record before changing assets | `PRODUCT.md`, `BUILD_PLAN.md`, `CONTENT_PLAN.md`, `PROOF.md` | Ordered source review | Confirmed 10 approved page routes, 6 sectors, existing QA evidence, and the exact asset-policy change requested | Project documentation | 2026-08-09 17:47 UTC | Complete |
| Policy | Replaced the prior gradient-placeholder policy | `BUILD_PLAN.md`, `ASSET_MANIFEST.md`, `REPO_SETUP_PROMPT.md` | Full policy amendment | Supplied-photo-first selection, logged tangison-imagegen fallback, ultra-minimal frame rule, SVG vector route, and master reuse are now the active policy | `BUILD_PLAN.md` active asset generation policy; `ASSET_MANIFEST.md` active asset policy | 2026-08-09 17:47 UTC | Complete |
| Image generation | Created one missing-placement contextual master | Community, Otjiwarongo Sports Bonanza card | `tangison-imagegen` route using supplied Namibia/context references | `GEN-001` contains exactly two deliberate visual elements: a weathered football goal and a low empty pavilion. It contains no people, logos, text, or claimed event documentation. | `/public/images/generated/community-otjiwarongo-sport-context.png`; complete prompt ledger in `ASSET_MANIFEST.md` | 2026-08-09 17:48 UTC | Complete |
| Asset reuse | Reused supplied real photography instead of generating a contact image | Contact hero | Content/data update and `PageHero` reuse | Contact now uses supplied tower/site photography. No abstract photo substitute remains. | `src/content/site-content.ts`, `src/app/contact/page.tsx` | 2026-08-09 17:48 UTC | Complete |
| Vectorgraphics | Replaced component/CSS-drawn icon and motif approximations with reusable SVG assets | Icons, arrows, eyebrow rules, vertical rule, connection map, CTA and orbit motifs | `tangison-vectorgraphics` asset pass | 13 source/public SVG pairs are byte-identical; React now uses external masks/images rather than inline SVG geometry or CSS-drawn motifs. | `/assets/vectors/`, `/public/assets/vectors/`, vector ledger in `ASSET_MANIFEST.md` | 2026-08-09 17:49 UTC | Complete |
| Verified fact | Added public wholesale-fuel licence record without a client-verification marker | Fuel & Energy page and About legal details | Content data plus source link | Plain fact and source citation added: Mendozer Investments CC holds wholesale fuel distribution licence W/188/2017. | `src/content/site-content.ts`; Namibia Government Gazette No. 8287, 3 January 2024, p. 6: `https://www.lac.org.na/laws/2024/8287.pdf` | 2026-08-09 17:49 UTC | Complete |
| Integrity gate | Validated amended content, assets, vectors, and public routes | Repository build | `npm run typecheck`, `npm run lint`, `npm run test:content`, `npm run build`, `npm audit --omit=dev` | All commands passed; dependency audit reports 0 vulnerabilities. Content check validates 6 sectors, 26 mapped assets, 10 OG images, licence citation, generated ledger, and vector source/public equality. | Terminal verification record; `scripts/check-content.mjs` | 2026-08-09 17:50 UTC | Complete |
| Responsive / accessibility | Re-ran production-server interface gate | 10 routes at 390px, 768px, 1440px; Axe sample set; keyboard skip link | Playwright + Axe | 18 responsive tests and 6 accessibility/keyboard tests passed. No horizontal overflow; generated image disclosure and real contact hero are served. | `tests/responsive.spec.ts`, `tests/accessibility.spec.ts` | 2026-08-09 17:51 UTC | Complete |
| Visual audit | Re-reviewed amended visual system | Home, mobile hero, Energy licence treatment, Community generated card, Contact, connected map | Production screenshots and Hallmark/Impeccable review | Pass: generated community image is sparse, authentic, and explicitly disclosed; real contact photo replaces gradient art; vector language is coherent and restrained; licence fact is factual rather than promotional. | `/tmp/mendozer-amend-visual/` during build session | 2026-08-09 17:51 UTC | Complete |
| Lighthouse | Re-audited local production homepage after the amendment | Homepage | Lighthouse with warmed local image cache | Performance 96, Accessibility 100, Best Practices 100, SEO 100; FCP 1.1s, LCP 1.8s, TBT 210ms, CLS 0. | `/tmp/mendozer-amend-lighthouse` during build session | 2026-08-09 17:52 UTC | Complete |
| Deployment | Published amended verified commit through existing GitHub/Vercel connection | `main`, `mendozer-tangison-preview.vercel.app` | Git push, SHA comparison, Vercel `inspect --wait`, HTTPS route smoke | Commit `b685939246e973569c6fa5dc4f537e09bcf25ebc` matched local and `origin/main`. Vercel production deployment reached `READY`; the custom preview serves the generated-image disclosure, fuel-licence citation, and contact route over TLS. | `https://mendozer-tangison-preview.vercel.app`; Vercel deployment `mendozer-tangison-preview-ja309tgkb-tangison-s-projects.vercel.app` | 2026-08-09 17:54 UTC | Complete |

## Navigation and footer refinement: 2026-08-09

| Phase | Action | Target | Command or method | Result | Evidence path or URL | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| Preflight | Re-read product, build, content, and proof records; inspected clean repository state, package lock, framework, routes, components, styles, assets, and tests | Existing Next.js 16.3.0 production build | Repository and plan review | Preserved the approved Mendozer brand layer, route structure, real-image policy, and data-driven sector template. No unrelated architecture or dependency change was made. | `PRODUCT.md`, `BUILD_PLAN.md`, `CONTENT_PLAN.md`, `PROOF.md`, `package.json` | 2026-08-09 22:37 UTC | Complete |
| Reference study | Studied the public Collins site through Scrapling at the user-requested public reference URL | `https://wearecollins.com/` | Scrapling Fetcher, structural HTML/CSS review | Extracted only general design DNA: sparse fixed header behavior, logo plus two-line menu affordance, and restrained navigation rhythm. No source copy, logo, CSS, or pixel layout was copied. Scrapling remained a local research tool and was not added to the site runtime. | `/tmp/collins-study/wearecollins.html` during build session | 2026-08-09 22:37 UTC | Complete |
| Navigation | Rebuilt the header as a floating, token-driven navigation bar | `src/components/SiteHeader.tsx`, `src/app/globals.css` | In-place Hallmark redesign | Added a floating capsule bar, scroll-progress indicator, active route treatment, pill enquiry CTA, and two-line menu control. All buttons now use `--radius-pill`. | Updated source files; production screenshots in `/tmp/mendozer-nav-audit/` | 2026-08-09 22:41 UTC | Complete |
| Off-canvas | Added an accessible premium group navigation overlay | `SiteHeader`, vector assets, responsive test | Native React state, focus restoration, Escape close, keyboard focus loop, CSS motion | Full-screen group directory includes primary pages, six sectors, direct email, registration, VAT, and visible close control. It remains within the 320px mobile floor. | `src/components/SiteHeader.tsx`, `tests/responsive.spec.ts` | 2026-08-09 22:42 UTC | Complete |
| Vectorgraphics | Added two-line navigation and close controls through the existing vector route | `/assets/vectors/`, `/public/assets/vectors/` | New reusable SVG source and byte-identical served copies | Added `menu-two-line.svg` and `close-two-line.svg`; content integrity now validates 15 vector source/public pairs. | `ASSET_MANIFEST.md`, `scripts/check-content.mjs` | 2026-08-09 22:42 UTC | Complete |
| Footer | Rebuilt footer as a compact information deck | `src/components/SiteFooter.tsx`, `src/app/globals.css` | In-place component redesign | Added direct group enquiry, group and sector routes, registration/VAT, verified licence link, compact legal row, and retained required Tangison Studio credit. No unsupported company facts were introduced. | Updated footer component and responsive screenshots | 2026-08-09 22:43 UTC | Complete |
| Hallmark / Impeccable audit | Reviewed floating bar, mobile header, off-canvas, CTA treatment, and footer | Desktop, 390px mobile, 320px off-canvas | Production screenshots and manual critique | Pass: navigation has a specific Mendozer group role, not generic SaaS chrome; rounded controls are limited to actions; off-canvas is sparse and legible; footer is information-rich without becoming a second landing page. | `/tmp/mendozer-nav-audit/overview.jpg` during build session | 2026-08-09 22:44 UTC | Complete |
| Verification | Re-ran type, lint, content, build, accessibility, responsive, and performance gates | Repository and production server | `npm run typecheck`, `npm run lint`, `npm run test:content`, `npm run build`, Playwright, Axe, Lighthouse | All checks passed. 19 production-server tests passed, including 320px off-canvas containment. Lighthouse warm audit: Performance 95, Accessibility 100, Best Practices 100, SEO 100. | Terminal verification record; `tests/accessibility.spec.ts`, `tests/responsive.spec.ts` | 2026-08-09 22:47 UTC | Complete |
| Deployment | Publish the verified navigation and footer refinement through GitHub/Vercel | `main`, `mendozer-tangison-preview.vercel.app` | Pending commit, SHA match, Vercel Git deployment, HTTPS smoke check | Local refinement is verified and ready to publish. | Git/Vercel release record above | 2026-08-09 22:47 UTC | Pending |
