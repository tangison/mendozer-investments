import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { publicUpdates, siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Updates & Public Records",
  description: "Approved Mendozer Investments activity and publicly verifiable records: event outcomes, media releases and links to official sources.",
  alternates: { canonical: "/updates" },
  openGraph: {
    type: "website",
    url: "/updates",
    images: [{ url: "/og/community.jpg", width: 1200, height: 630, alt: "Mendozer Investments updates and public records" }],
  },
};

export default function UpdatesPage() {
  const { updates } = siteContent;

  return (
    <>
      <PageHero body={updates.body} breadcrumbLabel="Updates & Public Records" eyebrow={updates.eyebrow} media={updates.hero} title={updates.title} />
      <section className="section updates-page">
        <div className="site-container">
          <SectionHeading
            body="Approved activity and publicly verifiable information only. Unconfirmed site images never become news or project proof here."
            eyebrow="Published with care"
            title="Activity that can be checked."
          />
          <div className="updates-page__grid">
            {publicUpdates.map((update) => (
              <Reveal key={update.title}>
                <article className="update-card">
                  <MediaFrame asset={update.media} className="media-frame--update" sizes="(max-width: 760px) 100vw, 33vw" />
                  <div>
                    <p className="eyebrow">{update.eyebrow}</p>
                    <h2>{update.title}</h2>
                    <p>{update.body}</p>
                    {update.sourceUrl && update.sourceLabel ? (
                      update.sourceUrl.startsWith("http") ? (
                        <a className="text-link" href={update.sourceUrl} rel="noopener noreferrer" target="_blank">{update.sourceLabel} <ArrowIcon /></a>
                      ) : (
                        <Link className="text-link" href={update.sourceUrl}>{update.sourceLabel} <ArrowIcon /></Link>
                      )
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">The group</p><h2>The sectors behind the work.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/sectors">See the sectors <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
