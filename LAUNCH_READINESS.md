# Launch Readiness: Mendozer Investments

This register maps the implemented website against the practical items in an industry-standard corporate website checklist. It distinguishes what is complete, what is intentionally out of scope, and what requires client, legal, DNS, or service-provider authority.

## Ready in the repository

### Strategy, structure, and content

- Group objective, investor and partner audience, customer journey, page structure, and primary contact action are documented in `PRODUCT.md`, `BUILD_PLAN.md`, and `CONTENT_PLAN.md`.
- The approved public route set is complete: Home, About, a sector directory, six sector pages, Community, Contact, Privacy Notice, Website Terms, and a custom 404 page.
- FAQ-style enquiry guidance is available on the homepage through accessible native disclosure controls.
- No testimonials, case studies, client logos, metrics, staff biography, service price, certification, location, phone number, hours, or social account is fabricated.
- The public wholesale fuel distribution licence fact is cited accurately from the Namibia Government Gazette source.

### Design and user experience

- Official supplied Mendozer and Tangison identity assets are used unchanged.
- Locked Mendozer colour, type, spacing, radius, and motion tokens drive the interface.
- Floating navigation includes a two-line accessible menu control, active-route treatment, scroll progress, direct enquiry CTA, and a full group off-canvas directory.
- Homepage includes a data-driven sector slider with accessible tabs. The control is vertical on larger screens and touch-scrollable horizontally on small screens.
- Homepage includes an accessible FAQ accordion with enquiry guidance.
- Footer exposes group navigation, sector navigation, direct email, registration/VAT, privacy notice, website terms, the verified licence source, and the required Tangison Studio credit.
- Buttons are fully rounded controls. Cards retain restrained non-pill radii to preserve hierarchy.

### Accessibility, SEO, performance, and technical quality

- Semantic landmarks, one H1 per route, labelled form controls, descriptive links, alt text, visible focus states, keyboard menu access, a skip link, and reduced-motion behavior are implemented.
- Axe WCAG 2 A/AA checks pass for Home, About, Technology, Community, Contact, Privacy, and Terms.
- Responsive checks cover 320px, 375px, 390px, 414px, 768px, and desktop. The off-canvas navigation is specifically tested at 320px.
- Organization and FAQ JSON-LD are emitted from crawlable HTML using verified site details only.
- Unique metadata, canonical URLs, XML sitemap, robots rules, Open Graph metadata, and social images are present.
- Next.js image optimization, modern formats, local Poppins files, lazy loading for non-critical media, zero layout shift in the audited homepage, and Vercel CDN delivery are active.
- Security headers are configured through `vercel.json`: HSTS, content type protection, referrer policy, frame policy, and permissions policy.
- Dependency audit reports zero known production vulnerabilities.

## Intentionally out of scope

These items do not apply to the current approved static corporate build:

- E-commerce catalogue, stock, checkout, payment, delivery, refund, abandoned-cart, or product-schema functions.
- Booking engine, appointment availability, or payment confirmation flow.
- Customer accounts, authentication, database, uploads, CMS editing, or client portal.
- Third-party advertising pixels, social feeds, embedded maps, live chat, or heavy widgets.
- Testimonials, case studies, public client names, project metrics, or certificates that were not supplied for publication.

## Requires client or service-provider authority before launch on mendozer.com

| Area | Required action | Why it cannot be completed autonomously |
|---|---|---|
| Contact delivery | Approve a mail provider or form endpoint, configure server-side validation, spam protection, rate limiting, and recipient delivery testing | The current privacy-preserving mailto flow works without collecting data, but no approved mail-service credentials or sender domain are available. |
| Contact details | Confirm public telephone number, physical address, operating hours, service areas, and social profiles | None were supplied as verified publishable facts. |
| Legal review | Have Privacy Notice, Website Terms, licences, and any sector-specific disclaimer reviewed by the client or legal adviser | The pages accurately describe current technical behavior, but legal ownership and required wording belong to the client. |
| Analytics and consent | Approve analytics platform, consent policy, conversion events, and cookie posture | The current build intentionally contains no analytics or advertising tracker. |
| Search operations | Verify Google Search Console, submit sitemap, connect a Google Business Profile, and confirm local directory listings | These require ownership of the relevant external accounts and verified business address/contact details. |
| Email domain | Confirm SPF, DKIM, DMARC, mailbox ownership, and sender reputation for `contact@mendozer.com` | DNS and mailbox administration are external to this repository. |
| Backup and monitoring | Confirm owner, backup policy, error monitoring, uptime monitoring, rollback contact, and support responsibility | Vercel hosts the static build, but operational ownership and support terms are not provided. |
| Content authority | Confirm active sector list, sector-specific services, named projects, clients, real case studies, leadership profile, and published imagery rights | The website does not invent supporting proof. |
| Production domain | Explicitly authorize `mendozer.com` cutover only after the items above are approved | The active deployment guardrail permits `mendozer.tangison.com` only. |

## Current staging and ownership state

- Private source repository: `https://github.com/tangison/mendozer-investments`
- Working Vercel preview: `https://mendozer-tangison-preview.vercel.app`
- Authorised staging hostname: `https://mendozer.tangison.com`
- Production client hostname: `mendozer.com`, intentionally not connected
- Canonical URL is configurable through `NEXT_PUBLIC_SITE_URL`; changing it at launch does not require component-level edits.

## Pre-cutover gate

Before connecting `mendozer.com`, confirm:

1. Approved final sector/service copy and publishable proof.
2. Approved contact-delivery provider and successful recipient test.
3. Verified legal/contact/business details.
4. Client ownership of domain, hosting, code repository, design assets, and email administration.
5. Search Console, sitemap submission, analytics/consent decision, monitoring, backup, and support-owner decisions.
6. Final mobile, accessibility, SEO, performance, form, external-link, and browser checks against the live staging hostname.
7. Direct written authorization to add the production domain.
