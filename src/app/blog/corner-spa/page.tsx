import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/brand/site-config";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

const HERO_IMAGE = "/images/corner-spa/hero-wide.webp";

export const metadata: Metadata = {
  title: "Corner Spa is now online",
  description:
    "Corner Spa, a concept by Mendozer Investments and the first project of Oryx Institute, is now online. Massage, hot stone, nails and waxing in Windhoek.",
  alternates: { canonical: "/blog/corner-spa" },
  openGraph: {
    title: "Corner Spa is now online | Mendozer Investments",
    description:
      "Corner Spa, a concept by Mendozer Investments and the first project of Oryx Institute, is now online. Massage, hot stone, nails and waxing in Windhoek.",
    type: "article",
    url: "/blog/corner-spa",
    images: [{ url: HERO_IMAGE, width: 1510, height: 1041, alt: "Smooth wet stones and soft light at Corner Spa" }],
    publishedTime: "2026-11-05T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corner Spa is now online | Mendozer Investments",
    description:
      "Corner Spa, a concept by Mendozer Investments and the first project of Oryx Institute, is now online.",
    images: [HERO_IMAGE],
  },
};

export default function CornerSpaPage() {
  const postUrl = `${siteConfig.url}/blog/corner-spa`;
  const imageUrl = `${siteConfig.url}${HERO_IMAGE}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Corner Spa is now online",
    image: imageUrl,
    datePublished: "2026-11-05T00:00:00.000Z",
    dateModified: "2026-11-05T00:00:00.000Z",
    author: { "@type": "Organization", name: "Mendozer Investments", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Mendozer Investments",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description:
      "Corner Spa, a concept by Mendozer Investments and the first project of Oryx Institute, is now online. Massage, hot stone, nails and waxing in Windhoek.",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Announcement / 5 November 2026</p>
            </Reveal>
            <Reveal>
              <h1>Corner Spa is now online</h1>
            </Reveal>
            <Reveal>
              <p className="blog-post__lede">
                Corner Spa, a concept by Mendozer Investments and the first project of Oryx Institute, is now online.
              </p>
            </Reveal>
            <Reveal>
              <div className="blog-post__meta">
                <span>5 November 2026</span>
                <span aria-hidden="true"> / </span>
                <span>Windhoek, Namibia</span>
              </div>
            </Reveal>
          </div>
        </header>
        <div className="breadcrumbs-wrap">
          <div className="site-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Corner Spa" }]} />
          </div>
        </div>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <p>
                Corner Spa is a calm place in Windhoek for massage, hot stone treatments, nails and waxing. It is a concept by Mendozer Investments and the
                first project of Oryx Institute.
              </p>
              <p>Mendozer Investments is the financing partner. Oryx Institute leads operations.</p>
              <p>
                The Corner Spa website has the full treatment list, prices and a booking form that opens WhatsApp with your treatment already filled in. You can
                also book on{" "}
                <a aria-label="Book Corner Spa on WhatsApp" href="https://wa.me/264816234788" rel="noopener noreferrer" target="_blank">
                  +264 81 623 4788
                </a>
                .
              </p>
            </Reveal>

            <Reveal>
              <figure className="blog-post__figure">
                <Image
                  alt="Smooth wet stones and soft light at Corner Spa"
                  height={1041}
                  sizes="(max-width: 760px) 100vw, 720px"
                  src={HERO_IMAGE}
                  width={1510}
                />
              </figure>
            </Reveal>

            <Reveal>
              <div className="blog-post__actions">
                <a className="button button--primary" href="https://spa.mendozer.com" rel="noopener noreferrer" target="_blank">
                  <span>Visit Corner Spa</span>
                  <ArrowIcon />
                </a>
                <a className="button button--primary" href="https://oryxinstitute.org" rel="noopener noreferrer" target="_blank">
                  <span>About Oryx Institute</span>
                  <ArrowIcon />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
