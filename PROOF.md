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
| Staging custom domain | `mendozer.tangison.com` alias/TLS verification only | **PASS**: public CNAME resolves to the Vercel target, Vercel reports `misconfigured: false`, and `https://mendozer.tangison.com` returns HTTPS 200 with configured security headers. **mendozer.com is excluded.** |

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
- **Staging DNS and TLS:** the external Cloudflare zone now resolves `mendozer.tangison.com` by CNAME to `d518d3e54da4658b.vercel-dns-017.com`. Vercel reports `misconfigured: false`; both public DNS-over-HTTPS resolvers and HTTPS return the authorised staging site successfully. No production-domain action has been taken or authorised.

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
| Deployment | Published the verified navigation and footer refinement through GitHub/Vercel | `main`, `mendozer-tangison-preview.vercel.app` | Git push, SHA comparison, Vercel `inspect --wait`, HTTPS smoke check | Commit `83819b7134c22433ff4ae01a181cf70c31012b25` matched local and `origin/main`. Vercel deployment reached `READY`; the custom preview serves the floating navigation and pill enquiry control over TLS. The first automation attempt was blocked because the temporary local commit email was not associated with GitHub; the commit was rewritten with the verified GitHub noreply identity and redeployed successfully. | `https://mendozer-tangison-preview.vercel.app`; Vercel deployment `mendozer-tangison-preview-ijv69zxzn-tangison-s-projects.vercel.app` | 2026-08-09 22:51 UTC | Complete |

## Experience, legal-information, and readiness pass: 2026-08-09

| Phase | Action | Target | Command or method | Result | Evidence path or URL | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| Checklist mapping | Mapped the supplied industry-standard checklist to the approved static corporate scope | Strategy, content, UX, SEO, trust, operations | Repository and approved-plan review | Added a factual readiness register that distinguishes complete items, intentional exclusions, and work that requires client or service-provider authority. | `LAUNCH_READINESS.md` | 2026-08-09 22:54 UTC | Complete |
| Hero widget | Added a six-direction sector slider to the homepage hero | Home hero | Native React state, accessible tab roles, approved sector data, local image assets | Desktop presents a vertical selector; mobile presents a horizontal scroll-snap tab rail. Keyboard arrows, Home, End, and click selection update the active sector and actual approved hero image. | `src/components/HomeHero.tsx`, `src/app/page.tsx`, `src/app/globals.css` | 2026-08-09 22:57 UTC | Complete |
| FAQ widget | Added native FAQ disclosures with actionable enquiry guidance | Homepage | Semantic native `details` and `summary` elements, external vector plus mark | Four guidance questions answer sector selection, enquiry content, group contact, and published project detail without invented business claims. | `src/components/AccordionList.tsx`, `src/content/site-content.ts` | 2026-08-09 22:59 UTC | Complete |
| Vectorgraphics | Added accordion control asset through the existing vector system | FAQ control | Reusable SVG source/public pair | `accordion-plus.svg` added and source/public equality is checked alongside the navigation icon assets. | `/assets/vectors/accordion-plus.svg`, `/public/assets/vectors/accordion-plus.svg` | 2026-08-09 22:59 UTC | Complete |
| Legal information | Added public Privacy Notice and Website Terms routes, then linked them from footer and contact form | `/privacy`, `/terms`, contact flow | Reusable legal-page template and factual content records | Pages describe only the present mailto/static hosting workflow. They contain no invented legal statute, service guarantee, client, or project claim. Client/legal review remains listed before the production-domain cutover. | `src/components/LegalPageTemplate.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | 2026-08-09 23:02 UTC | Complete |
| Structured data | Added crawlable Organization and FAQ JSON-LD from verified data | Root layout and homepage | Server-rendered JSON-LD | Organization schema uses verified company name, URL, email, registration, VAT, and official logo. FAQ schema mirrors visible HTML answers. | `src/app/layout.tsx`, `src/app/page.tsx` | 2026-08-09 23:03 UTC | Complete |
| Mobile correction | Corrected hero grid min-width behavior exposed by direct 390px visual inspection | Homepage hero | CSS grid/flex containment fix and explicit regression assertion | Heading and hero navigator now stay within the viewport at 320px, 375px, 390px, 414px, 768px, and desktop. | `src/app/globals.css`, `tests/responsive.spec.ts`, `/tmp/mendozer-widget-audit/mobile-final-tabs.png` | 2026-08-09 23:08 UTC | Complete |
| Verification | Re-ran technical, route, accessibility, responsive, schema, and performance gates | Full public route set | TypeScript, ESLint, content check, Next build, Axe, Playwright, curl, Lighthouse | 17 static outputs built; 8 accessibility tests and 25 route/responsive/widget tests passed. All 15 public routes/assets smoke-tested. Sitemap includes Privacy and Terms; FAQ and Organization schemas are present. Warm Lighthouse: Performance 94, Accessibility 100, Best Practices 100, SEO 100. | Terminal verification record, `tests/accessibility.spec.ts`, `tests/responsive.spec.ts` | 2026-08-09 23:12 UTC | Complete |
| Deployment | Published the verified completion pass through GitHub/Vercel | `main`, preview and authorised staging hostname | Git push, SHA comparison, Vercel `inspect --wait`, preview/staging HTTPS smoke | Commit `566ea6a41b074a933298eba72ad1fdb9c7755617` matched local and `origin/main`. Vercel deployment reached `READY`; both the custom preview and `https://mendozer.tangison.com` serve the sector explorer, FAQ, Privacy Notice, Terms, and JSON-LD over HTTPS. | `https://mendozer-tangison-preview.vercel.app`; `https://mendozer.tangison.com`; Vercel deployment `mendozer-tangison-preview-lxya4ogf2-tangison-s-projects.vercel.app` | 2026-08-09 23:18 UTC | Complete |

## Services hub, SEO, and operations continuation: 2026-08-09

| Phase | Action | Target | Command or method | Result | Evidence path or URL | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| Services hub | Added a crawlable sector-directory route and linked primary navigation to it | `/sectors` | Reused sector data and approved real project-context photography | The hub makes the six sector routes discoverable without relying only on the homepage anchor. It is a public services-directory route with a focused CTA. | `src/app/sectors/page.tsx`, `src/content/site-content.ts` | 2026-08-09 23:23 UTC | Complete |
| Breadcrumbs | Added semantic breadcrumb navigation to individual sector routes | `/sectors/[slug]` | Reusable `Breadcrumbs` component | Sector pages expose Home, Sectors, and current-sector hierarchy for user orientation and crawlable internal linking. | `src/components/Breadcrumbs.tsx`, `src/components/SectorPageTemplate.tsx` | 2026-08-09 23:24 UTC | Complete |
| SEO strategy | Added a transparent page-intent map and follow-up register | Search optimization | Documented keyword-intent hypotheses without invented volume data | The strategy maps primary intent to every public route, records current technical SEO, and separates external Search Console/local-business work from code changes. | `SEO_STRATEGY.md` | 2026-08-09 23:26 UTC | Complete |
| Operations handover | Added content, image, verification, deployment, rollback, and maintenance instructions | Ongoing support | Factual workflow documentation | The manual documents npm verification commands, env variables, image/vector rules, mailto limitations, deployment process, maintenance cadence, and ownership safeguards. | `OPERATIONS_MANUAL.md` | 2026-08-09 23:27 UTC | Complete |
| Verification | Rebuilt and re-tested the continuation pass | 18 static outputs and public route set | TypeScript, ESLint, content check, production build, Axe, Playwright, curl route smoke | All checks passed. 8 accessibility tests and 26 responsive/route/widget tests passed. Services hub, breadcrumbs, sitemap, Privacy, and Terms smoke checks passed. | Terminal verification record; `tests/accessibility.spec.ts`, `tests/responsive.spec.ts` | 2026-08-09 23:30 UTC | Complete |
| Deployment | Published verified services hub and operations continuation | `main`, preview and authorised staging hostname | Git push, SHA comparison, Vercel `inspect --wait`, preview/staging HTTPS smoke | Commit `f0b7f1ed530d0ece76da01d00bd204e9aa5fab73` matched local and `origin/main`. Vercel deployment reached `READY`; both preview and staging serve the sector hub and breadcrumb hierarchy over HTTPS. | `https://mendozer-tangison-preview.vercel.app`; `https://mendozer.tangison.com`; Vercel deployment `mendozer-tangison-preview-2owjxjply-tangison-s-projects.vercel.app` | 2026-08-09 23:34 UTC | Complete |

## Editorial navigation refinement: 2026-08-10

| Phase | Action | Target | Command or method | Result | Evidence path or URL | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| Collins-inspired study application | Reworked the navigation using only the previously documented public-reference design DNA | Global header and mobile navigation | In-place Hallmark redesign, preserving Mendozer tokens, logo assets, and off-canvas information architecture | Replaced the rounded always-visible desktop nav links and CTA with a sparse logo-plus-two-line-menu composition. No Collins markup, text, logo, CSS, or pixel layout was copied. | `src/components/SiteHeader.tsx`, `src/app/globals.css` | 2026-08-10 05:16 UTC | Complete |
| Header behavior | Added contextual logo treatment and scroll-state transition | Home, sector, community, contact, legal pages | Path-aware header state and token-driven CSS | Dark hero routes use the supplied dark-theme logo at rest. The header becomes a compact floating Mendozer bar after scroll. Light introductory routes retain the supplied light logo treatment. | `src/components/SiteHeader.tsx` | 2026-08-10 05:17 UTC | Complete |
| Mobile optimization | Centered the brand mark on small screens and retained an isolated two-line menu target | 320px through 414px mobile layouts | Responsive CSS and browser inspection | Mobile header no longer uses the desktop capsule treatment. The two-line control remains touch-safe and the off-canvas directory remains fully accessible. | `src/app/globals.css`, `/tmp/mendozer-collins-nav/overview.jpg` during build session | 2026-08-10 05:18 UTC | Complete |
| Navigation QA | Added scroll-state regression coverage and re-ran the full checks | Header, off-canvas menu, routes | Playwright, Axe, TypeScript, ESLint, content check, production build | 8 accessibility tests and 27 responsive/route/widget tests passed. New test verifies the header condenses into the floating scroll state. | `tests/responsive.spec.ts`, `tests/accessibility.spec.ts` | 2026-08-10 05:24 UTC | Complete |
| Deployment | Publish verified editorial navigation refinement | `main`, preview and authorised staging hostname | Pending commit, SHA match, Vercel Git deployment, HTTPS smoke | Local refinement is verified and ready to publish. | Git/Vercel release record above | 2026-08-10 05:25 UTC | Pending |
