import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorGlyph } from "@/components/SectorGlyph";
import { sectors, siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Explore Mendozer Investments working directions across construction, technology, cooling, logistics, energy, tourism, and agriculture in Namibia.",
  alternates: { canonical: "/sectors" },
  openGraph: { images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments sectors" }] },
};

export default function SectorsPage() {
  const { sectorHub } = siteContent;

  return (
    <>
      <PageHero body={sectorHub.body} eyebrow={sectorHub.eyebrow} media={sectorHub.hero} title={sectorHub.title} />
      <section className="section sector-hub">
        <div className="site-container">
          <SectionHeading
            body="Each route provides a focused starting point, then returns you to a single Mendozer contact path."
            eyebrow="Six working directions"
            title="Start with the closest fit."
          />
          <div className="sector-card-grid sector-hub__grid">
            {sectors.map((sector, index) => (
              <Reveal delay={(index % 3) * 90} key={sector.slug} variant="up">
                <Link aria-label={`Explore ${sector.title}`} className="sector-card" href={`/sectors/${sector.slug}`}>
                  <span className="sector-card__media"><Image alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" src={sector.hero.src} /></span>
                  <span className="sector-card__shade" />
                  <span className="sector-card__top"><span>{sector.number}</span><SectorGlyph name={sector.glyph} /></span>
                  <span className="sector-card__bottom"><span>{sector.title}</span><ArrowIcon /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Cross-sector enquiry</p><h2>Bring the full scope into one conversation.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/contact">Prepare an enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
