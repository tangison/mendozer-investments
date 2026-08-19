import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/brand/assets";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Brand identity",
  description: "Mendozer Investments brand identity: production logos, colour system, typography, and usage rules.",
  alternates: { canonical: "/brand" },
  openGraph: { images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments brand" }] },
  robots: { index: false, follow: true },
};

const productionLogos = [
  {
    file: brandAssets.logoLight,
    name: "Primary lockup",
    description: "Full colour wordmark and icon. Default for light surfaces, letterhead, and the scrolled header.",
    usage: "Light backgrounds, print, business cards",
    background: "light" as const,
  },
  {
    file: brandAssets.logoDark,
    name: "Light-on-dark lockup",
    description: "The same lockup reversed for dark photography and the site header over a dark hero.",
    usage: "Dark heroes, navy fields, video overlays",
    background: "dark" as const,
  },
  {
    file: brandAssets.logoMonoNavy,
    name: "Mono navy",
    description: "Single-colour navy lockup for restrained digital placements.",
    usage: "Secondary web placements, partner lists",
    background: "light" as const,
  },
  {
    file: brandAssets.logoMonoWhite,
    name: "Mono white",
    description: "Single-colour white lockup for the site footer and dark print.",
    usage: "Footer, dark print, embroidery on dark cloth",
    background: "dark" as const,
  },
  {
    file: brandAssets.icon,
    name: "Icon mark",
    description: "Standalone icon for favicons, app icons, and small watermarks.",
    usage: "Favicons, social avatars, small stamps",
    background: "light" as const,
  },
];

const productionColours = [
  { name: "Brand navy", hex: "#1C4E89", usage: "Primary text, buttons, identity" },
  { name: "Signal blue", hex: "#2FA1DB", usage: "Rules, accents, interactive cues" },
  { name: "Night navy", hex: "#0B1E3D", usage: "Heroes, footer, dark panels" },
  { name: "Ink", hex: "#2B2F36", usage: "Body copy on light surfaces" },
  { name: "Paper", hex: "#FFFFFF", usage: "Page ground and light lockups" },
];

const alternateVariants = [
  {
    file: "/assets/logos/brand-set/logo-02.svg",
    name: "Alternate horizontal",
    description: "Gradient lockup supplied as an alternate set. Not the production header mark.",
    usage: "Future refresh work, not live chrome",
    background: "light" as const,
  },
  {
    file: "/assets/logos/brand-set/logo-03.svg",
    name: "Alternate stacked",
    description: "Icon above wordmark for narrow or centred compositions.",
    usage: "Splash screens, centred cards",
    background: "light" as const,
  },
  {
    file: "/assets/logos/brand-set/logo-04.svg",
    name: "Alternate icon",
    description: "Gradient icon without wordmark.",
    usage: "Small marks on light surfaces",
    background: "light" as const,
  },
  {
    file: "/assets/logos/brand-set/logo-08.svg",
    name: "Alternate mono dark",
    description: "Charcoal single-ink lockup from the alternate set.",
    usage: "Single-colour print on light stock",
    background: "light" as const,
  },
  {
    file: "/assets/logos/brand-set/logo-01.svg",
    name: "Alternate mono gray",
    description: "Gray lockup for understated partner placements.",
    usage: "Grayscale print, co-brand lists",
    background: "light" as const,
  },
];

export default function BrandPage() {
  return (
    <>
      <section className="page-hero page-hero--text-only">
        <div className="site-container page-hero__copy">
          <Reveal><p className="eyebrow">Brand identity</p></Reveal>
          <Reveal delay={80}><h1>The marks the site actually uses.</h1></Reveal>
          <Reveal delay={150}>
            <p>Production lockups, colour tokens, and type first. The 2026 alternate set sits below as a held option, not as live chrome.</p>
          </Reveal>
        </div>
      </section>
      <div className="breadcrumbs-wrap">
        <div className="site-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Brand" }]} />
        </div>
      </div>

      <section className="section">
        <div className="site-container">
          <SectionHeading
            body="These are the files the public site loads in the header, footer, and favicon. Use them before any alternate lockup."
            eyebrow="Production set"
            title="Five live lockups."
          />
          <div className="brand-grid">
            {productionLogos.map((variant) => (
              <figure className={`brand-card brand-card--${variant.background}`} key={variant.file}>
                <div className="brand-card__media">
                  <Image alt={`${variant.name} logo variant`} fill sizes="(max-width: 900px) 100vw, 50vw" src={variant.file} unoptimized />
                </div>
                <figcaption className="brand-card__body">
                  <p className="brand-card__name">{variant.name}</p>
                  <p className="brand-card__description">{variant.description}</p>
                  <p className="brand-card__usage">
                    <span className="brand-card__label">Use on</span>
                    <span>{variant.usage}</span>
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-container">
          <SectionHeading
            body="Locked production tokens. These are the values in the live stylesheet, not sampled from the alternate SVGs."
            eyebrow="Colour system"
            title="Five production colours."
          />
          <div className="brand-colours">
            {productionColours.map((colour) => (
              <div className="brand-colour" key={colour.hex}>
                <div className="brand-colour__swatch" style={{ background: colour.hex }} />
                <div className="brand-colour__body">
                  <p className="brand-colour__name">{colour.name}</p>
                  <p className="brand-colour__hex">{colour.hex}</p>
                  <p className="brand-colour__usage">{colour.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionHeading
            body="Poppins carries interface and body. Red Hat Display carries headlines. Weights stay at 400, 500, and 600."
            eyebrow="Typography"
            title="Two families. Three weights."
          />
          <div className="brand-type">
            <div className="brand-type__card">
              <p className="brand-type__label">Display</p>
              <p className="brand-type__specimen brand-type__specimen--display">One group for the work ahead.</p>
              <p className="brand-type__meta">Red Hat Display · 400 / 500</p>
            </div>
            <div className="brand-type__card">
              <p className="brand-type__label">Sans</p>
              <p className="brand-type__specimen brand-type__specimen--sans">Construction, technology, cooling, logistics, energy, tourism.</p>
              <p className="brand-type__meta">Poppins · 400 / 500 / 600</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-container">
          <SectionHeading
            body="Held for a future refresh. Do not replace the production header or footer with these files unless a brand change is approved."
            eyebrow="Alternate set"
            title="Five unused lockups."
          />
          <div className="brand-grid">
            {alternateVariants.map((variant) => (
              <figure className={`brand-card brand-card--${variant.background}`} key={variant.file}>
                <div className="brand-card__media">
                  <Image alt={`${variant.name} logo variant`} fill sizes="(max-width: 900px) 100vw, 50vw" src={variant.file} unoptimized />
                </div>
                <figcaption className="brand-card__body">
                  <p className="brand-card__name">{variant.name}</p>
                  <p className="brand-card__description">{variant.description}</p>
                  <p className="brand-card__usage">
                    <span className="brand-card__label">Use on</span>
                    <span>{variant.usage}</span>
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="site-container">
          <SectionHeading
            body="These rules apply to every public use of the Mendozer mark."
            eyebrow="Usage rules"
            inverse
            title="Keep the mark intact."
          />
          <div className="brand-rules">
            <div className="brand-rule">
              <p className="brand-rule__number">01</p>
              <p className="brand-rule__text">Use the light-on-dark lockup on dark surfaces. Do not place the light-background lockup on a navy field.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">02</p>
              <p className="brand-rule__text">Do not stretch, skew, or recolour the icon mark. Keep the official SVG geometry.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">03</p>
              <p className="brand-rule__text">Minimum full-lockup width is 120px. Minimum icon-mark height is 24px.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">04</p>
              <p className="brand-rule__text">Keep the full-colour lockup off busy photography. Give it a quiet field.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">05</p>
              <p className="brand-rule__text">Mono variants are for single-ink print and quiet placements. They do not replace the colour lockup on screen.</p>
            </div>
          </div>
          <div className="brand-cta">
            <Link className="text-link text-link--light" href="/contact">
              <span>Request the full brand kit</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
