# Impeccable Technical Quality Audit: Mendozer Investments

**Audit date:** 2026-08-10  
**Scope:** Current Next.js 16 production build, source review, automated accessibility and responsive suites, static analysis, package audit, and local Lighthouse runs.  
**Mode:** Audit only. No production implementation fixes were made as part of this report.

## Context gathered

- Framework: Next.js 16.3.0, App Router, static and SSG routes
- Package manager: npm with `package-lock.json`
- Brand context: locked Mendozer token layer in `src/brand/tokens.css`
- Rendering: server-rendered public pages plus focused client widgets for navigation, contact form, and hero sector explorer
- Deployment: Vercel with custom preview and `mendozer.tangison.com` staging host
- Test coverage reviewed: Axe, keyboard skip link, 27 responsive and route/widget checks
- Existing design system: supplied Mendozer logo, Poppins, verified palette, spacing scale, vector asset route, real project context photography

## Audit Health Score

| Dimension | Score | Key finding |
|---|---:|---|
| 1. Accessibility | **3/4** | Automated WCAG AA checks pass, but the auto-advancing hero requires a user pause control and a few mobile targets fall below the 44px design target. |
| 2. Performance | **3/4** | Warm local Lighthouse is strong, but cold image optimization produced a 4.1s LCP and the scroll header re-renders React state on every animation-frame update. |
| 3. Responsive Design | **3/4** | No horizontal overflow across tested widths, but the menu control and sector-tab controls are 42px and 38px high on small screens. |
| 4. Theming | **4/4** | Runtime styling is token-led. The only literal runtime colours are static PWA/theme metadata values. |
| 5. Anti-Patterns | **4/4** | The design is specific to Mendozer, avoids fake metrics and generic proof, and uses a restrained visual system. |

**Total: 17/20, Good**  
Address the P1 launch-readiness issues before a final production-domain release. Address P2 items in the next refinement pass.

## Anti-Patterns Verdict

**Pass:** The implementation does not read as generic AI landing-page output.

Positive signals:

- Official logo assets are used without regeneration or redraw.
- Real Mendozer-context images lead the sector experience.
- Generated imagery is disclosed and logged rather than passed off as project proof.
- The navigation is an intentional editorial system, not a generic SaaS navbar.
- The site avoids fake metrics, testimonials, client logos, pricing, and “trusted by” proof bars.
- Buttons are rounded by request, but content cards retain restrained radii and are not all converted into pills.
- No gradient text, purple default palette, dashboard mockup, stock-team scene, or meaningless counter appears.

## Executive Summary

The site is technically solid and visually coherent. Type-checking, linting, build output, package audit, live staging headers, automated Axe coverage, and responsive route tests all pass. The existing token system is strong, the image treatment is disciplined, and the code avoids unnecessary UI dependencies.

The most meaningful remaining concerns are operational rather than visual:

- The hero sector slider changes automatically without a visible pause control.
- The static mailto contact workflow cannot provide server-side validation, anti-spam, recipient delivery confirmation, rate limiting, or conversion tracking.
- The current Vercel security-header set lacks a Content Security Policy.
- Mobile controls in the header and hero sector rail do not meet the project’s own preferred 44px touch-target floor.

## Detailed Findings

### [P1] Auto-advancing hero does not expose a pause or stop control

**Location:** `src/components/HomeHero.tsx:23-31`  
**Category:** Accessibility  
**Impact:** The sector image and selected sector content change every 7.2 seconds. A visitor reading the sector panel can lose the current content before completing it. Reduced-motion users are protected, but other users cannot pause the update.  
**WCAG/Standard:** WCAG 2.2.2 Pause, Stop, Hide applies to auto-updating content that starts automatically and lasts longer than five seconds.  
**Recommendation:** Add a visible pause/play control adjacent to the hero sector tabs. Persist the user selection for the page session and stop auto-rotation after direct interaction.  
**Suggested command:** `/quieter` followed by `/adapt`

### [P1] Contact conversion path is not production-grade lead handling

**Location:** `src/components/ContactForm.tsx:35-54`  
**Category:** Forms and lead handling  
**Impact:** The default workflow opens a visitor email application. It does not provide server-side validation, spam protection, rate limiting, recipient delivery confirmation, lead storage, confirmation email, or measurable form conversion. The optional public endpoint variable is not sufficient without an approved backend.  
**WCAG/Standard:** Operational launch requirement and lead-handling best practice.  
**Recommendation:** Before `mendozer.com` is connected, provision an approved server-side mail or form provider. Validate on the server, rate limit, add spam protection, send confirmation, notify the group, and update Privacy Notice and Terms.  
**Suggested command:** `/harden`

### [P2] Mobile menu and hero tabs are below the 44px preferred touch target

**Location:** `src/app/globals.css:431-432`, `src/app/globals.css:443`  
**Category:** Responsive Design and Accessibility  
**Impact:** The mobile menu control is 2.65rem, about 42px. Hero tab controls are 2.4rem, about 38px high. They remain usable and exceed WCAG 2.5.8 minimum size, but they fall short of the project’s stated 44px Hallmark touch-target floor.  
**WCAG/Standard:** WCAG 2.5.8 Target Size Minimum is met; 44px is a stronger mobile usability target.  
**Recommendation:** Raise menu and tab minimum heights to at least 2.75rem. Retain the horizontal scroll-snap behavior.  
**Suggested command:** `/adapt`

### [P2] Header scroll-progress behavior re-renders React state throughout scrolling

**Location:** `src/components/SiteHeader.tsx:40-61`  
**Category:** Performance  
**Impact:** The requestAnimationFrame handler updates `isScrolled` and `scrollProgress` state while scrolling. This is controlled by one frame guard, but it still re-renders the client header and hidden menu tree frequently on long pages.  
**WCAG/Standard:** Render efficiency best practice.  
**Recommendation:** Keep the threshold state in React only when it changes. Write scroll-progress directly to a CSS custom property on the progress element through a ref, or use a dedicated minimal component that avoids re-rendering the menu tree.  
**Suggested command:** `/optimize`

### [P2] Cold local Lighthouse shows costly initial image optimization

**Location:** `src/components/HomeHero.tsx:52-61`, Vercel and Next image delivery path  
**Category:** Performance  
**Impact:** The first local Lighthouse run scored Performance 61 with LCP 4.1s and TBT 1,100ms. A warm run improved to Performance 93 with LCP 3.1s and TBT 50ms. The variance indicates initial image transformation and local cold-start cost rather than a layout problem, but first-visit production behavior should be measured on staging over a throttled mobile network.  
**WCAG/Standard:** Core Web Vitals and first-visit performance best practice.  
**Recommendation:** Measure the staging host on a cold cache. Consider pre-generating a hero WebP/AVIF derivative, preloading only the first hero image, and keeping slider image changes non-priority after initial render.  
**Suggested command:** `/optimize`

### [P2] Off-canvas dialog does not inert the background document

**Location:** `src/components/SiteHeader.tsx:107-177`  
**Category:** Accessibility  
**Impact:** The menu uses `role="dialog"`, `aria-modal="true"`, focus restoration, and a local focus loop. These are strong practices. However, the rest of the page is not marked inert or hidden while the overlay is open, so screen-reader behavior can vary by browser and assistive technology.  
**WCAG/Standard:** ARIA dialog pattern and modal isolation best practice.  
**Recommendation:** Apply `inert` to the main content and footer while the menu is open, or use a dialog implementation that manages background isolation natively.  
**Suggested command:** `/harden`

### [P2] No Content Security Policy is configured

**Location:** `vercel.json:8-18`  
**Category:** Security  
**Impact:** HSTS, type protection, referrer policy, frame policy, and permissions policy are present. A CSP is absent, leaving a meaningful defense-in-depth gap against injected scripts or unexpected third-party content if the site evolves.  
**WCAG/Standard:** OWASP secure headers best practice.  
**Recommendation:** Design and test a restrictive CSP compatible with Next.js output, local fonts, optimized images, and any approved future form endpoint. Apply it first on staging.  
**Suggested command:** `/harden`

### [P3] Static PWA theme values duplicate token colors

**Location:** `src/app/layout.tsx:50-53`, `src/app/manifest.ts:11-12`  
**Category:** Theming  
**Impact:** Runtime CSS is fully token-driven. The manifest and viewport metadata use literal brand hex values because browser manifests do not consume CSS variables. This is a contained duplication, not a broad token-system failure.  
**WCAG/Standard:** Token consistency best practice.  
**Recommendation:** Document these platform-required values alongside the token source or generate them from a single metadata constant.  
**Suggested command:** `/colorize`

### [P3] Breadcrumbs are semantic but do not emit BreadcrumbList JSON-LD

**Location:** `src/components/Breadcrumbs.tsx:11-24`, `src/components/SectorPageTemplate.tsx`  
**Category:** Technical SEO  
**Impact:** Visible breadcrumbs and internal linking are already useful to visitors and crawlers. BreadcrumbList schema is optional but would strengthen deep-sector route interpretation.  
**WCAG/Standard:** Schema.org BreadcrumbList best practice.  
**Recommendation:** Add BreadcrumbList JSON-LD per sector route after confirming the canonical route hierarchy will remain stable.  
**Suggested command:** `/optimize`

### [P3] Social image specificity is incomplete for utility routes

**Location:** `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/sectors/page.tsx`  
**Category:** Social sharing and SEO  
**Impact:** Core pages have dedicated Open Graph assets. The sectors hub reuses home imagery, while Privacy and Terms inherit global social metadata. This is acceptable but less precise when utility pages are shared.  
**WCAG/Standard:** Open Graph and X card completeness best practice.  
**Recommendation:** Decide whether utility pages should be shareable. If yes, provide restrained dedicated social cards. If not, consider `noindex` only if the legal pages are not intended for public search.  
**Suggested command:** `/optimize`

## Patterns and Systemic Issues

1. **Launch operations need external authority.** Mail delivery, analytics, consent, Search Console, Google Business Profile, email DNS, backups, monitoring, public contact details, and legal approval are documented in `LAUNCH_READINESS.md`. They cannot be truthfully completed from code alone.
2. **Motion has been added intentionally but needs one ownership control.** The hero slider is carefully scoped, but the lack of pause control is a systemic pattern to avoid as future widgets are introduced.
3. **Responsive testing is strong, but the visual target floor is stricter than the minimum standard.** No overflow was detected across 320px through desktop, yet a few targets fall below the project’s 44px preference.
4. **The token system is healthy.** Color usage is centralized in `src/brand/tokens.css`. Static browser metadata is the only meaningful token duplication.

## Positive Findings

- Full TypeScript, ESLint, content-integrity, production build, and production dependency-audit checks pass.
- npm production audit reports zero vulnerabilities.
- Automated Axe checks pass on Home, About, Technology, Community, Contact, Privacy, and Terms.
- Keyboard skip navigation, two-line menu open/close, Escape behavior, and focus restoration are covered.
- Responsive tests cover 320px, 375px, 390px, 414px, 768px, and desktop. No horizontal overflow is detected.
- Official logo assets are preserved and source/public asset equality is checked.
- Images are served through Next.js optimization, non-critical media is lazy-loaded, and no raw `<img>` tag is used in source components.
- The site uses semantic links, buttons, details/summary accordions, landmarks, labels, canonical URLs, sitemap, robots, Open Graph, X metadata, Organization schema, and FAQ schema.
- Vercel headers provide HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, and Permissions-Policy.
- The site avoids fabricated proof and documents unresolved client-content dependencies instead of pretending they are final.

## Recommended Actions

1. **[P1] `/quieter`**: Add a visible pause/play control and stop auto-rotation after direct sector-tab interaction.
2. **[P1] `/harden`**: Replace the mailto-only production lead path with an approved server-side delivery workflow, spam protection, validation, rate limiting, confirmation, and recipient testing.
3. **[P2] `/adapt`**: Increase mobile menu and sector-tab touch targets to 44px or larger.
4. **[P2] `/optimize`**: Decouple scroll-progress painting from React state and measure cold-cache staging LCP before launch.
5. **[P2] `/harden`**: Add and test a CSP on staging, then isolate background content while the modal navigation is open.
6. **[P3] `/colorize`**: Centralize PWA/theme metadata values with the brand-token source.
7. **[P3] `/optimize`**: Add BreadcrumbList schema and decide utility-page social-card/noindex policy.
8. **[P3] `/polish`**: Re-run the visual pass after the higher-priority accessibility and performance work is complete.

You can ask me to run these one at a time, all at once, or in any order you prefer. Re-run `/audit` after fixes to see the score improve.

## Remediation Follow-Up: 2026-08-10

The user requested a focused mobile, hero, off-canvas, and footer refinement after the initial audit. The following previously reported items were addressed and re-tested.

| Previous finding | Remediation | Evidence | Status |
|---|---|---|---|
| P1 auto-advancing hero lacked a pause control | Added an explicit pause/resume rotation control on the desktop sector explorer. Any direct tab selection pauses rotation. Mobile hides the explorer and disables auto-rotation so the hero remains intentionally focused. | `src/components/HomeHero.tsx`; responsive test checks `aria-pressed` and Resume state | Resolved |
| P2 mobile touch targets below 44px | Increased the mobile menu target to 44px, increased sector links in the off-canvas menu to 44px minimum, and removed the small hero tab rail from compact mobile hero layouts. | `src/app/globals.css`; responsive mobile target test | Resolved |
| P2 modal navigation did not isolate background content | Main content and footer receive `inert` while the menu is open and are restored after close. | `src/components/SiteHeader.tsx`; off-canvas regression test | Resolved |
| P2 mobile hero felt overloaded | Mobile hero now contains only the brand statement, image, and two direct actions. Sector discovery remains available in the sector hub and off-canvas navigation. | `src/components/HomeHero.tsx`, `src/app/globals.css`; 320px through 414px responsive checks | Resolved |
| P3 footer lacked a dominant brand row | Footer now begins with the official Mendozer dark-theme lockup at large full-row scale and keeps all operational links below it compact. | `src/components/SiteFooter.tsx`, `src/app/globals.css` | Resolved |

### Follow-Up Health Score

| Dimension | Score | Current key finding |
|---|---:|---|
| Accessibility | **4/4** | Automated WCAG AA checks pass; hero pause control, background inert behavior, focus restoration, and keyboard navigation are covered. |
| Performance | **3/4** | Cold first-image optimization and header scroll state remain the main measurable improvement areas. |
| Responsive Design | **4/4** | Mobile hero is intentionally reduced, controls meet the 44px target where applicable, and no overflow appears across tested widths. |
| Theming | **4/4** | Token-led runtime styling remains consistent. |
| Anti-Patterns | **4/4** | The editorial navigation, large identity row, real imagery, and restrained widgets remain intentional and distinct. |

**Follow-Up Total: 19/20, Excellent**

### Remaining prioritized findings

1. **[P1] `/harden`**: Replace the mailto-only production lead path with approved server-side delivery, validation, spam protection, rate limiting, recipient confirmation, and tracking.
2. **[P2] `/optimize`**: Decouple scroll-progress painting from React state and measure cold-cache staging LCP.
3. **[P2] `/harden`**: Design and test a CSP on staging.
4. **[P3] `/colorize`**: Centralize static PWA metadata values with token-source documentation.
5. **[P3] `/optimize`**: Add BreadcrumbList schema and decide utility-page social-card policy.
6. **[P3] `/polish`**: Perform a final visual pass after any future form/backend implementation.
