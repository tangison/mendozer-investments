import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AccordionList } from "@/components/AccordionList";
import { ArrowIcon } from "@/components/ArrowIcon";
import { HomeHero } from "@/components/HomeHero";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorGlyph } from "@/components/SectorGlyph";
import { sectors, siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments" }] },
};

export default function HomePage() {
  const { home } = siteContent;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: home.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} type="application/ld+json" />
      <HomeHero />

      <section className="section introduction-section">
        <div className="site-container introduction-section__grid">
          <div className="introduction-section__copy">
            <SectionHeading
              body={home.introduction.body}
              eyebrow={home.introduction.eyebrow}
              title={home.introduction.title}
            />
            <Reveal delay={230}>
              <Link className="text-link" href="/about">About Mendozer <ArrowIcon /></Link>
            </Reveal>
          </div>
          <Reveal delay={120} variant="right">
            <MediaFrame asset={home.introduction.media} className="media-frame--tall" sizes="(max-width: 900px) 100vw, 40vw" />
          </Reveal>
        </div>
      </section>

      <section className="section section--sector-overview" id="sectors">
        <div className="site-container">
          <SectionHeading
            body={home.sectorIntro.body}
            eyebrow={home.sectorIntro.eyebrow}
            title={home.sectorIntro.title}
          />
          <div className="sector-card-grid">
            {sectors.map((sector, index) => (
              <Reveal delay={(index % 3) * 90} key={sector.slug} variant="up">
                <Link aria-label={`Explore ${sector.title}`} className="sector-card" href={`/sectors/${sector.slug}`}>
                  <MediaFrame asset={sector.hero} caption={false} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  <span className="sector-card__shade" />
                  <span className="sector-card__top"><span>{sector.number}</span><SectorGlyph name={sector.glyph} /></span>
                  <span className="sector-card__bottom"><span>{sector.title}</span><ArrowIcon /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="connected-section">
        <div className="site-container connected-section__grid">
          <div className="connected-section__copy">
            <SectionHeading
              body={home.connective.body}
              eyebrow={home.connective.eyebrow}
              inverse
              title={home.connective.title}
            />
          </div>
          <Reveal delay={140} variant="right">
            <div className="connected-map" aria-label="Six connected Mendozer working areas" role="img">
              <Image
                alt=""
                aria-hidden="true"
                className="connected-map__network"
                fill
                sizes="(max-width: 760px) 100vw, 40vw"
                src="/assets/vectors/connected-network.svg"
                unoptimized
              />
              {sectors.map((sector, index) => (
                <div className={`connected-map__node connected-map__node--${index + 1}`} key={sector.slug}>
                  <SectorGlyph name={sector.glyph} />
                  <span>{sector.shortTitle}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section community-feature">
        <div className="site-container community-feature__grid">
          <Reveal variant="left"><MediaFrame asset={home.community.media} className="media-frame--feature" sizes="(max-width: 900px) 100vw, 55vw" /></Reveal>
          <div className="community-feature__copy">
            <SectionHeading
              body={home.community.body}
              eyebrow={home.community.eyebrow}
              title={home.community.title}
            />
            <Reveal delay={230}><Link className="text-link" href="/community">View community & sponsorship <ArrowIcon /></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="section home-faq">
        <div className="site-container home-faq__grid">
          <SectionHeading
            body={home.faq.body}
            eyebrow={home.faq.eyebrow}
            title={home.faq.title}
          />
          <Reveal delay={110} variant="right"><AccordionList items={home.faq.items} /></Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Start a conversation</p><h2>Bring the right work into focus.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
