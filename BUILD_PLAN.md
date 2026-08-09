# BUILD_PLAN.md — Mendozer Investments

## Scope change (this revision)

Original plan assumed a lean, rush-timeline brochure site. Scope is now upgraded: this is a **large, high-production corporate website**, not a shallow brochure. It remains static, with no CMS, database, or authentication, but each approved route carries the visual and editorial depth appropriate to a multi-sector group.

## What "big" means here, concretely

- Each of the 6 sector pages gets full section depth: hero, services breakdown, visual context, cross-sector connection, and CTA. No route is a single-scroll stub.
- Homepage carries multiple image-led sections, not only a hero and grid.
- Community/Sponsorship gets a supplied-event gallery and separate sponsorship context.
- Social sharing is a first-class deliverable: Open Graph image per major page, not only a favicon.
- All supplied photography is assessed before any generated asset is commissioned.
- Where a specific image placement has no relevant supplied photography, use a **tangison-imagegen real-photography-style master asset**, not a brand-gradient placeholder.
- Icons, dividers, and decorative motifs are delivered as actual SVG vector assets through the `tangison-vectorgraphics` route, not approximated with Tailwind shapes, CSS beams, or raster substitutes.

## Architecture (unchanged, confirmed)

- Static site, Next.js + Tailwind + Vercel
- No auth, no payments, no database
- Staging domain: `mendozer.tangison.com`; `mendozer.com` remains disconnected until separately authorised
- Model: Branded House, one site, dedicated sector pages (see `site-architecture.md`)

## Rejected alternatives

- Subdomains per sector: rejected, adds build and maintenance cost without benefit for a static site.
- Separate domains per sector: rejected, undermines one accountable group positioning.
- CMS-backed dynamic site: rejected for now, content update frequency does not justify it; revisit if Mendozer needs self-service editing later.
- Brand-gradient placeholder photography: rejected by the active asset policy. Abstract branded geometry is allowed only as a documented vector decoration, never as a substitute for a missing photograph.

## Active asset generation policy — locked amendment

### Photo selection order

1. Use a relevant, supplied Mendozer-context photograph when it exists for the **specific placement**.
2. Reuse an existing approved generated master asset when it fits the placement.
3. Only if neither exists, commission a new real-photography-style master through `tangison-imagegen`.

### Generated photography standard

Every tangison-imagegen output must:

- Read as real, restrained Mendozer-context photography, not stock imagery or an invented project record.
- Use **one, two, or three deliberate elements maximum** in the frame, with generous negative space.
- Avoid busy compositions, staged corporate teams, generic African-continent visual tropes, fake text, fake logos, or false project documentation.
- Ground its subject in the supplied Mendozer reference archive: telecom tower rigging, road construction, steel structural work, plant piping, crew/site visits, Namibian desert tonal conditions, and relevant Windhoek or coastal built context.
- Use real industry equipment appropriate to the sector, not generic “innovation” imagery.
- Never recreate or alter the supplied Mendozer logo. Generated images must not contain generated Mendozer branding or fabricated text.
- Be labelled as an **AI-generated contextual visual, not documentary project photography** wherever a visitor could otherwise confuse it for a confirmed project/event record.

### Generated-asset ledger and reuse

For every generated master asset, `ASSET_MANIFEST.md` must record:

- Asset ID and exact file path
- Full prompt used
- Generation purpose and relevant visual grounding
- Every page and placement where it appears
- Alt text and visible caption/status

A generated master is reused across compatible placements instead of generating near-duplicates. Asset prompts are revised only when a new subject, framing, or confirmed context is genuinely required.

### Vectorgraphics route

- Sector icons, dividers, arrows, connection maps, and non-photographic decorative motifs must be real SVG assets produced through the `tangison-vectorgraphics` route.
- Vector assets draw only on locked Mendozer geometry and tokens. They do not redraw the official logo.
- CSS remains responsible for layout, states, and motion, not for imitating iconography or decorative artwork.

## Milestones

1. Content return from Johannes (onboarding form): still a client-content dependency, with gaps clearly marked.
2. `tangison-web-content` + `tangison-copywriting-master` pass: maintain `CONTENT_PLAN.md` and content status.
3. Asset audit: use supplied photography, then create only any uncovered specific-placement masters under the active policy.
4. `tangison-vectorgraphics` pass: package vector icon/divider/motif system as reusable SVG assets.
5. `tangison-web-build` implementation: complete all routes and reusable template behavior.
6. `tangison-web-audit` full pass: accessibility, performance, SEO, responsive, content accuracy, Hallmark, and Impeccable review.
7. Social asset generation: Open Graph images and sharing metadata.
8. `tangison-web-deploy`: custom Vercel preview and authorised staging hostname only. `mendozer.com` requires separate explicit authorisation.

## Acceptance criteria

- All 6 sector pages are full routes with depth, not stub cards.
- No placeholder copy is presented as final factual copy.
- No brand-gradient or generic graphic substitutes for missing photography.
- Every tangison-imagegen asset has a complete ledger record in `ASSET_MANIFEST.md`, including prompt, path, pages, caption status, and reuse.
- All icon, divider, and decorative motif assets are reusable SVG vector files, not CSS/Tailwind approximations or raster stand-ins.
- No generated visual is presented as a real named project, staff portrait, credential, or event photograph.
- Passes `tangison-web-audit` before deployment approval or final release reporting.
