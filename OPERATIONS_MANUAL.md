# Operations Manual: Mendozer Investments Website

## Current platform

- Framework: Next.js 16 static and SSG output
- Package manager: npm
- Hosting: Vercel
- Source repository: private GitHub repository `tangison/mendozer-investments`
- Working hostname: `mendozer.tangison.com`
- Preview hostname: `mendozer-tangison-preview.vercel.app`
- Production client hostname: `mendozer.com`, intentionally disconnected

## Routine content update process

1. Update approved Mendozer copy only in `src/content/site-content.ts`.
2. Update the corresponding route metadata if the page purpose or primary search intent changes.
3. Add real images first. If a specific photo is unavailable, follow the locked image-generation policy in `BUILD_PLAN.md` and log every generated master in `ASSET_MANIFEST.md`.
4. Update `CONTENT_PLAN.md` when the factual status of copy, people, services, proof, or imagery changes.
5. Run the verification commands below before committing.
6. Commit, push to `main`, wait for the Vercel deployment, then verify both preview and staging URLs.

## Required local verification

```bash
npm ci
npm run typecheck
npm run lint
npm run test:content
npm run build
npm run test:a11y
npm run test:responsive
npm audit --omit=dev
```

The responsive suite covers the public route set, 320px through desktop viewport behavior, hero tabs, FAQ disclosures, and off-canvas navigation. The accessibility suite runs Axe checks plus keyboard skip-link coverage.

## Environment variables

| Variable | Purpose | Safe value now |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph base URL | `https://mendozer.tangison.com` |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Optional approved JSON form-delivery endpoint | Unset by default. The site currently uses a mailto workflow. |

Never place SMTP credentials, API keys, Vercel tokens, GitHub tokens, or other secrets in `NEXT_PUBLIC_*` variables or committed files.

## Contact workflow

The current contact form validates client-side fields and prepares an email to `contact@mendozer.com` in the visitor’s own email application. It is intentionally privacy-preserving and does not store form data in the site.

Before a production-domain launch, obtain an approved contact-delivery provider with server-side validation, rate limiting, spam protection, sender authentication, recipient confirmation, error handling, and lead-storage/privacy decisions. Update the Privacy Notice and Terms after that workflow is approved.

## Image and vector rules

- Use the exact supplied Mendozer logos without redrawing or image-model regeneration.
- Keep source identity assets under `/assets` and byte-identical served copies under `/public/assets`.
- Keep real source photography in `/reference/photography`.
- Keep browser-served, selected images under `/public/images/projects`.
- Use documented generated masters under `/public/images/generated` only when no relevant supplied image exists for a placement.
- Keep SVG icon/divider/motif source assets under `/assets/vectors` with byte-identical public copies under `/public/assets/vectors`.

## Deployment and rollback

1. Vercel deploys `main` through the linked GitHub repository.
2. Verify the Vercel deployment reaches `READY`.
3. Check homepage, sector hub, one individual sector, Community, Contact, Privacy, Terms, sitemap, and robots on the deployment URL.
4. Verify TLS and response headers on `mendozer.tangison.com`.
5. If a release is faulty, revert the Git commit, push the revert to `main`, and verify the next Vercel deployment.

## Maintenance schedule

| Cadence | Actions |
|---|---|
| Monthly | Review broken links, staging uptime, Vercel deployment history, form workflow, dependency advisories, and contact delivery. |
| Quarterly | Run the full QA suite, Lighthouse, accessibility audit, visual review, image optimization review, and Search Console review once access exists. |
| On content update | Confirm permissions for project imagery and client references; update asset/content logs; re-run full build and responsive checks. |
| Before production-domain cutover | Complete every client-authority item in `LAUNCH_READINESS.md`, obtain direct written authority, and test all live operational flows. |

## Ownership and access record

Ownership of the domain, Vercel workspace, GitHub repository, design assets, email administration, analytics, Search Console, backups, and maintenance support must be confirmed with the client/Tangison project owner. Store access details in an approved password manager, not in the repository.
