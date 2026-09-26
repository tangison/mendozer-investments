import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { communityGallery, siteContent } from "@/content/site-content";
import { bonanzaPressReport } from "@/content/site-services";

const GalleryCarousel = dynamic(
  () => import("@/components/GalleryCarousel").then((module) => module.GalleryCarousel),
);

export const metadata: Metadata = {
  title: "Community & Sponsorship",
  description: "Mendozer Investments community sponsorship presence: local events, sports, and initiatives supported across Namibia, including the Otjiwarongo Sports Bonanza.",
  alternates: { canonical: "/community" },
  openGraph: {
    type: "website",
    url: "/community",
    images: [{ url: "/og/community.jpg", width: 1200, height: 630, alt: "Mendozer Investments community sponsorship" }],
  },
};

export default function CommunityPage() {
  const { community } = siteContent;
  return (
    <>
      <PageHero body={community.body} breadcrumbLabel="Community & Sponsorship" eyebrow={community.eyebrow} media={community.hero} title={community.title} />
      <section className="section section--surface">
        <div className="site-container community-intro">
          <SectionHeading
            body="The archive records Mendozer presence at public events. Miss Teen Namibia 2026 is shown as sponsorship. The Otjiwarongo Sports Bonanza is a Mendozer-presented event with its own brief."
            eyebrow="Sponsorship presence"
            title="A visible role in moments that matter locally."
          />
        </div>
      </section>
      <section className="section initiatives-section">
        <div className="site-container initiatives-grid">
          {community.initiatives.map((initiative) => (
            <Reveal key={initiative.title}>
              <article className="initiative-card">
                <MediaFrame asset={initiative.media} className="media-frame--initiative media-frame--rounded" sizes="(max-width: 900px) 100vw, 50vw" />
                <div className="initiative-card__body">
                  <p className="eyebrow">Sponsorship</p>
                  <h2>{initiative.title}</h2>
                  <p>{initiative.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section community-gallery-section">
        <div className="site-container">
          <SectionHeading
            body="Client-supplied event photography from the Miss Teen Namibia 2026 sponsorship backdrop is retained here as supplied."
            eyebrow="Event archive"
            inverse
            title="Community moments, documented."
          />
          <GalleryCarousel items={communityGallery} label="Community event photography" />
          <Reveal>
            <p className="community-gallery__related">
              Related reading: <Link className="text-link" href="/blog/namibia-heroes-day-2026">Heroes&apos; Day 2026: Namibia remembers</Link>
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section community-report-section">
        <div className="site-container community-report">
          <Reveal>
            <div className="community-report__index" aria-hidden="true">Report</div>
            <div>
              <p className="eyebrow">{bonanzaPressReport.eyebrow}</p>
              <h2>{bonanzaPressReport.title}</h2>
            </div>
          </Reveal>
          <Reveal>
            <p>{bonanzaPressReport.teaser}</p>
            <p className="community-report__meta">{bonanzaPressReport.meta}</p>
            <a className="button button--primary" download href={bonanzaPressReport.file}>
              <span>{bonanzaPressReport.label}</span>
              <ArrowIcon />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Connect with the group</p><h2>Start the conversation with Mendozer.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
