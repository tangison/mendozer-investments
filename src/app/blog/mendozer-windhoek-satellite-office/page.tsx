import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/brand/site-config";

const SLUG = "/blog/mendozer-windhoek-satellite-office";
const ASSET = "/images/projects/construction";
const OG_IMAGE = "/og/windhoek-office.png";

export const metadata: Metadata = {
  title: "Mendozer Investments opens a Windhoek satellite office at the Continental Building",
  description:
    "Mendozer Investments has opened a satellite office at Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek. New main number +264 85 777 7077.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "Mendozer Investments opens a Windhoek satellite office",
    description:
      "Office 2, Continental Building, Judge JP Karuaihe Street (formerly Lüderitz Street), Windhoek. Main business number: +264 85 777 7077.",
    type: "article",
    url: SLUG,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mendozer Investments Windhoek satellite office announcement" }],
    publishedTime: "2026-09-03T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendozer Investments opens a Windhoek satellite office",
    description: "Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek. Main business number: +264 85 777 7077.",
    images: [OG_IMAGE],
  },
};

const fullOfficeAddress = `${siteConfig.office.suite}, ${siteConfig.office.building}, ${siteConfig.office.street} (${siteConfig.office.streetFormerName}), ${siteConfig.office.locality}, ${siteConfig.office.country}`;

export default function WindhoekSatelliteOfficePage() {
  const postUrl = `${siteConfig.url}${SLUG}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Mendozer Investments opens a Windhoek satellite office at the Continental Building",
    image: `${siteConfig.url}${OG_IMAGE}`,
    datePublished: "2026-09-03T00:00:00.000Z",
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description:
      "Mendozer Investments has opened a satellite office at Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek. New main number +264 85 777 7077.",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">News / 3 September 2026</p>
            </Reveal>
            <Reveal delay={80}>
              <h1>A Windhoek satellite office at the Continental Building.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="blog-post__lede">
                Mendozer Investments now meets clients and partners in the capital from Office 2, Continental Building on Judge JP Karuaihe Street. The main
                business number has changed to +264 85 777 7077.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="blog-post__meta">
                <span>Windhoek, Namibia</span>
                <span aria-hidden="true"> / </span>
                <span>Group news</span>
                <span aria-hidden="true"> / </span>
                <span>Office 2, Continental Building</span>
              </div>
            </Reveal>
          </div>
        </header>
        <div className="breadcrumbs-wrap">
          <div className="site-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Windhoek satellite office" }]} />
          </div>
        </div>

        <section className="blog-post__featured">
          <div className="site-container">
            <Reveal variant="up">
              <figure className="blog-post__figure">
                <Image
                  alt="Mendozer Investments construction work in progress on a site in Namibia"
                  className="blog-post__flyer"
                  height={1080}
                  priority
                  sizes="(max-width: 768px) 100vw, 640px"
                  src={`${ASSET}/road-works-2.jpg`}
                  width={810}
                />
                <figcaption>Work on the ground continues across the country from the new Windhoek base.</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>In the capital.</h2>
              <p>
                Mendozer Investments has opened a satellite office in Windhoek at Office 2, Continental Building. The office sits on Judge JP Karuaihe
                Street, the street formerly known as L&uuml;deritz Street, in the central business district.
              </p>
              <p>
                The capital base gives clients, partners and suppliers a direct place to meet the group, and gives Mendozer a central point close to the
                institutions and businesses it works with, while active work continues on sites across the country.
              </p>
            </Reveal>

            <Reveal>
              <h2>Office details</h2>
              <dl className="blog-post__details">
                <div>
                  <dt>Office</dt>
                  <dd>Office 2, Continental Building</dd>
                </div>
                <div>
                  <dt>Street</dt>
                  <dd>Judge JP Karuaihe Street (formerly L&uuml;deritz Street)</dd>
                </div>
                <div>
                  <dt>City</dt>
                  <dd>Windhoek, Namibia</dd>
                </div>
                <div>
                  <dt>Postal</dt>
                  <dd>{siteConfig.postalBox}</dd>
                </div>
                <div>
                  <dt>Telephone</dt>
                  <dd>
                    <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <h2>On the map.</h2>
              <p>
                Mendozer Investments is listed on Google Maps in Windhoek. Use the map below to find the office, or open directions in your own map app.
              </p>
              <div className="blog-map">
                <div className="map-embed">
                  <iframe
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={siteConfig.maps.embedSrc}
                    title={`Map showing Mendozer Investments at ${fullOfficeAddress}`}
                  />
                </div>
              </div>
              <p>
                <a className="text-link" href={siteConfig.maps.directionsUrl} rel="noreferrer" target="_blank">Get directions to the office</a>
              </p>
              <p>
                <a className="text-link" href={siteConfig.maps.listingUrl} rel="noreferrer" target="_blank">Open the Google listing</a>
              </p>
            </Reveal>

            <Reveal>
              <h2>New main business number.</h2>
              <p>
                The main business number has changed to <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>. Use it for all general and new
                business enquiries. Email remains {siteConfig.email}.
              </p>
              <p>
                The Windhoek satellite office is one part of a wider footprint. Mendozer Investments works across Namibia, with active projects and teams on
                sites through the country, supported by the group&apos;s construction, technology, cooling, logistics, energy and tourism directions.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <div className="blog-post__cta">
                <h2>Call the group.</h2>
                <p>
                  Speak to Mendozer Investments at {siteConfig.phone.display}, or send an enquiry and the right sector team will come back to you.
                </p>
                <div className="blog-post__contacts">
                  <div className="osb-contact-card">
                    <span>Telephone</span>
                    <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
                  </div>
                  <div className="osb-contact-card">
                    <span>Email</span>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </div>
                </div>
                <Link className="button button--primary" href="/contact">
                  <span>Send an enquiry to the group</span>
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
