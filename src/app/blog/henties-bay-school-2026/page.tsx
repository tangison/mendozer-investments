import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/brand/site-config";

const SLUG = "/blog/henties-bay-school-2026";
const ASSET = "/images/projects/construction";
const OG_IMAGE = "/og/henties-bay-school.png";

export const metadata: Metadata = {
  title: "A new school takes shape in Henties Bay",
  description:
    "Mendozer Investments is on site on a new school build in Henties Bay. Classroom blocks are at roof stage while earthworks and siteworks continue around them.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "A new school takes shape in Henties Bay",
    description:
      "Mendozer Investments is on site on a new school build in Henties Bay. Classroom blocks are at roof stage while earthworks and siteworks continue around them.",
    type: "article",
    url: SLUG,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "New school classroom blocks under construction in Henties Bay" }],
    publishedTime: "2026-09-26T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A new school takes shape in Henties Bay",
    description: "Mendozer Investments is on site on a new school build in Henties Bay. Classroom blocks are at roof stage while earthworks continue.",
    images: [OG_IMAGE],
  },
};

const gallery = [
  { src: `${ASSET}/henties-bay-school-03.webp`, alt: "Classroom blocks with red-tiled roofs above the graded yard at the Henties Bay school site" },
  { src: `${ASSET}/henties-bay-school-01.webp`, alt: "Front-end loader shaping and levelling ground in front of new classroom blocks at the Henties Bay school site" },
  { src: `${ASSET}/henties-bay-school-07.webp`, alt: "Tipper truck delivering fill material at the Henties Bay school site" },
  { src: `${ASSET}/henties-bay-school-06.webp`, alt: "Wide view across the school site with earthworks in progress in Henties Bay" },
  { src: `${ASSET}/henties-bay-school-04.webp`, alt: "Classroom block with perimeter wall and graded access route at the Henties Bay school site" },
  { src: `${ASSET}/henties-bay-school-05.webp`, alt: "Perimeter walling and stockpiles beside a completed classroom block in Henties Bay" },
  { src: `${ASSET}/henties-bay-school-02.webp`, alt: "Red-tiled roofline and teal classroom walls of the new school blocks in Henties Bay" },
  { src: `${ASSET}/henties-bay-school-08.webp`, alt: "Site entrance route with graded sand ahead of the new school blocks in Henties Bay" },
];

export default function HentiesBaySchoolPage() {
  const postUrl = `${siteConfig.url}${SLUG}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "A new school takes shape in Henties Bay",
    image: `${siteConfig.url}${OG_IMAGE}`,
    datePublished: "2026-09-26T00:00:00.000Z",
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description:
      "Mendozer Investments is on site on a new school build in Henties Bay. Classroom blocks are at roof stage while earthworks and siteworks continue around them.",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Site update</p>
            </Reveal>
            <Reveal>
              <h1>A new school takes shape in Henties Bay.</h1>
            </Reveal>
            <Reveal>
              <p className="blog-post__lede">
                Mendozer Investments is on site on a new school build in Henties Bay. This update shares where the site stands today, and what the
                photographs in it show.
              </p>
            </Reveal>
            <Reveal>
              <div className="blog-post__meta">
                <span>26 September 2026</span>
                <span aria-hidden="true"> / </span>
                <span>Henties Bay, Erongo Region</span>
                <span aria-hidden="true"> / </span>
                <span>Construction &amp; Infrastructure</span>
                <span aria-hidden="true"> / </span>
                <span>Active site</span>
              </div>
            </Reveal>
          </div>
        </header>
        <div className="breadcrumbs-wrap">
          <div className="site-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Henties Bay school" }]} />
          </div>
        </div>

        <section className="blog-post__featured">
          <div className="site-container">
            <Reveal>
              <figure className="blog-post__figure">
                <Image
                  alt="New classroom blocks with red-tiled roofs at the Mendozer school site in Henties Bay"
                  className="blog-post__flyer"
                  height={1080}
                  priority
                  sizes="(max-width: 768px) 100vw, 640px"
                  src={`${ASSET}/henties-bay-school-02.webp`}
                  width={810}
                />
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>Where the site stands.</h2>
              <p>
                The classroom blocks are up and weather-tight: walls are built and painted, the red-tiled roof coverings are on, and window and door
                openings are glazed and hung. From the boundary, the buildings now read as a school rather than a construction site.
              </p>
              <p>
                The work in front of the crew today sits around the blocks rather than inside them. Bulk earthworks, grading and access shaping continue
                across the yard, tipper trucks move fill material on and off site, and a front-end loader is opening up the ground between the buildings
                and the perimeter wall.
              </p>
            </Reveal>

            <Reveal>
              <h2>What the photographs show.</h2>
              <p>
                These photographs were taken on site this month and published as received, without captions or staging. In order, they show: the classroom
                blocks from the graded yard, the loader shaping ground in front of them, tipper trucks bringing in fill, the access routes taking shape,
                perimeter walling, and wide views across the site.
              </p>
              <p>
                We publish site imagery the same way every time: what is visible is described, and what is not yet approved or not yet certain is left out.
                As the build advances, further updates will follow in this format.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section osb-gallery-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">On the ground</p>
              <h2>The site in pictures.</h2>
            </Reveal>
            <div className="osb-gallery">
              {gallery.map((photo) => (
                <figure className="osb-gallery__item" key={photo.src}>
                  <Image
                    alt={photo.alt}
                    height={1080}
                    loading="lazy"
                    sizes="(max-width: 700px) 100vw, 32vw"
                    src={photo.src}
                    width={810}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>Built for the coast.</h2>
              <p>
                Henties Bay sits on the Erongo coast, and coastal sites ask more of the ground than inland ones do: soft sands, wind over open yards, and
                moisture that finds every weakness in a detail. That is why the visible stage of this build is earthworks rather than ceremony. Getting the
                levels, accesses and ground right around the blocks is what protects the buildings behind it.
              </p>
              <p>
                The photographs show that logic in practice. Ground is being opened, shaped and firmed between the buildings before the yard is finished,
                so that the school hands over with site works that hold up, not siteworks that need redoing after the first winter.
              </p>
            </Reveal>

            <Reveal>
              <h2>One team on site.</h2>
              <p>
                The build is led by the group&apos;s Construction &amp; Infrastructure sector, under the same arrangement that runs every Mendozer site: one
                point of contact for the client, and decisions made close to the work. When a brief crosses disciplines, the wider group steps in behind the
                same enquiry rather than adding another contractor to the fence line.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <div className="blog-post__cta">
                <h2>Talk to the construction team.</h2>
                <p>
                  Planning a build on the coast or anywhere in Namibia? Speak to Mendozer Investments at {siteConfig.phone.display}, or send an enquiry and
                  the construction team will come back to you.
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
                <div className="blog-post__cta-links">
                  <Link className="button button--primary" href="/contact">
                    <span>Send an enquiry to the group</span>
                    <ArrowIcon />
                  </Link>
                  <Link className="text-link" href="/sectors/construction">
                    See the construction sector <ArrowIcon />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
