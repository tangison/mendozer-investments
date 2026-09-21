import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent, workContexts, workMasonry } from "@/content/site-content";

const MasonryGallery = dynamic(
  () => import("@/components/MasonryGallery").then((module) => module.MasonryGallery),
);

export const metadata: Metadata = {
  title: "Past Work",
  description: "Past work from the Mendozer archive: sites, field work and facilities across Namibia, published only with approval.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments past work" }],
  },
};

export default function WorkPage() {
  const { work } = siteContent;

  return (
    <>
      <PageHero body={work.body} breadcrumbLabel="Past Work" eyebrow={work.eyebrow} media={work.hero} title={work.title} />
      <section className="section work-contexts">
        <div className="site-container">
          <SectionHeading
            body="Real work from the group archive. Project names, clients, locations and scope detail appear only once approved for publication."
            eyebrow="Past work"
            title="The work speaks for itself."
          />
          <div className="work-contexts__grid">
            {workContexts.map((context) => (
              <Reveal key={context.title}>
                <article className="work-context-card">
                  <MediaFrame asset={context.media} className="media-frame--work-context media-frame--rounded" sizes="(max-width: 760px) 100vw, 33vw" />
                  <div>
                    <p className="eyebrow">{context.sector}</p>
                    <h2>{context.title}</h2>
                    <p>{context.body}</p>
                    <Link aria-label={`See this sector: ${context.title}`} className="text-link" href={context.href}>See this sector <ArrowIcon /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface work-masonry-section">
        <div className="site-container">
          <SectionHeading
            body="Past work from the archive across construction, technology, cooling, logistics, energy and community. Select any image to view it larger."
            eyebrow="Previous work"
            title="Recent work, in one view."
          />
          <Reveal>
            <MasonryGallery items={workMasonry} label="Previous work gallery" />
          </Reveal>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Published carefully</p><h2>Bring the relevant work into one enquiry.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/contact">Prepare an enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
