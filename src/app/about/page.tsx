import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { siteContent } from "@/content/site-content";
import { teamGallery } from "@/content/site-services";

export const metadata: Metadata = {
  title: "About the Group",
  description: "Mendozer Investments CC: a Namibian group delivering construction, technology, cooling, logistics, energy and tourism since 2009.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630, alt: "About Mendozer Investments" }],
  },
};

export default function AboutPage() {
  const { about } = siteContent;
  return (
    <>
      <PageHero body={about.body} breadcrumbLabel="About" eyebrow={about.eyebrow} media={about.hero} title={about.title} />

      <section className="section section--surface">
        <div className="site-container about-intro">
          <SectionHeading
            body="Every sector is planned around the people, systems, sites and logistics that surround it."
            eyebrow="The Mendozer approach"
            title="One identity across every sector we work."
          />
          <Reveal>
            <p className="about-intro__accent">Mendozer Investments CC has operated in Namibia since 2009. The group is led by Managing Director Johannes Negumbo.</p>
          </Reveal>
        </div>
      </section>

      <section className="section commitments-section">
        <div className="site-container">
          <SectionHeading eyebrow="How the group works" title="How an enquiry runs." />
          <div className="commitments-grid">
            {about.commitments.map((commitment) => (
              <Reveal key={commitment.number}>
                <article className="commitment-card">
                  <h2>{commitment.title}</h2>
                  <p>{commitment.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section leadership-section">
        <div className="site-container leadership-section__grid">
          <div className="leadership-section__index" aria-hidden="true" />
          <div>
            <SectionHeading eyebrow={about.leadership.eyebrow} title={about.leadership.title} />
            <Reveal>
              <div className="leadership-card">
                <p className="eyebrow">Group leadership</p>
                <h2>{about.leadership.name}</h2>
                <p className="leadership-card__role">{about.leadership.role}</p>
                <p>{about.leadership.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface about-team-section">
        <div className="site-container">
          <SectionHeading
            body="Photographs of the crew in branded site wear, published with approval. Team photography stays group-level; no individual profiles."
            eyebrow="The crew"
            title="People on the ground."
          />
          <div className="svc-gallery svc-gallery--four">
            {teamGallery.map((image) => (
              <Reveal key={image.src}>
                <figure className="svc-photo">
                  <Image alt={image.alt} className="svc-photo__img" height={image.height} sizes="(max-width: 900px) 100vw, 24vw" src={image.src} width={image.width} />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark legal-section">
        <div className="site-container legal-section__grid">
          <div>
            <SectionHeading inverse eyebrow="Company details" title="Verified registration details." />
          </div>
          <Reveal>
            <div>
              <dl>
                <div><dt>Registration no.</dt><dd>{siteConfig.registration}</dd></div>
                <div><dt>VAT no.</dt><dd>{siteConfig.vat}</dd></div>
                <div><dt>Telephone</dt><dd><a href={siteConfig.phone.href}>{siteConfig.phone.display}</a></dd></div>
                <div><dt>Windhoek office</dt><dd>{siteConfig.office.suite}, {siteConfig.office.building}, {siteConfig.office.street}, {siteConfig.office.locality}</dd></div>
                <div><dt>Contact</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
              </dl>
              <div className="legal-section__licence">
                <p className="eyebrow eyebrow--light">{about.fuelLicence.eyebrow}</p>
                <p>{about.fuelLicence.body}</p>
                <a href={about.fuelLicence.sourceUrl} rel="noopener noreferrer" target="_blank">Source: {about.fuelLicence.sourceLabel}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Explore the group</p><h2>See the work through each sector.</h2>
            <p className="cta-panel__links">
              <Link className="text-link" href="/services">Specialist construction services <ArrowIcon /></Link>
              <Link className="text-link" href="/blog">News and event reports <ArrowIcon /></Link>
            </p>
          </Reveal>
          <Reveal><Link className="button button--primary" href="/sectors">Explore sectors <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
