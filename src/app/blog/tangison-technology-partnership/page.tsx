import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/brand/site-config";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

const PARTNER_IMAGE = "/images/projects/technology/field-crew-01.webp";
const PARTNER_IMAGE_WIDTH = 762;
const PARTNER_IMAGE_HEIGHT = 1032;

export const metadata: Metadata = {
  title: "Tangison and Mendozer: the technology partnership",
  description:
    "Tangison is Mendozer Investments' technology partner on a two-year agreement that began in August 2026, covering the group's websites, publishing workflow and standing checks.",
  alternates: { canonical: "/blog/tangison-technology-partnership" },
  openGraph: {
    title: "Tangison and Mendozer: the technology partnership | Mendozer Investments",
    description:
      "Tangison is Mendozer Investments' technology partner on a two-year agreement that began in August 2026, covering the group's websites, publishing workflow and standing checks.",
    type: "article",
    url: "/blog/tangison-technology-partnership",
    images: [{ url: PARTNER_IMAGE, width: PARTNER_IMAGE_WIDTH, height: PARTNER_IMAGE_HEIGHT, alt: "Technology sector field work by the Mendozer group" }],
    publishedTime: "2026-11-21T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tangison and Mendozer: the technology partnership | Mendozer Investments",
    description: "Tangison is Mendozer Investments' technology partner on a two-year agreement that began in August 2026.",
    images: [PARTNER_IMAGE],
  },
};

export default function TangisonPartnershipPage() {
  const postUrl = `${siteConfig.url}/blog/tangison-technology-partnership`;
  const imageUrl = `${siteConfig.url}${PARTNER_IMAGE}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Tangison and Mendozer: the technology partnership",
    image: imageUrl,
    datePublished: "2026-11-21T00:00:00.000Z",
    dateModified: "2026-11-21T00:00:00.000Z",
    author: { "@type": "Organization", name: "Mendozer Investments", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Mendozer Investments",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description:
      "Tangison is Mendozer Investments' technology partner on a two-year agreement that began in August 2026, covering the group's websites, publishing workflow and standing checks.",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Group news / 21 November 2026</p>
            </Reveal>
            <Reveal>
              <h1>Tangison and Mendozer: the technology partnership</h1>
            </Reveal>
            <Reveal>
              <p className="blog-post__lede">
                Mendozer Investments and Tangison work together under a two-year technology partnership that began in August this year.
              </p>
            </Reveal>
            <Reveal>
              <div className="blog-post__meta">
                <span>21 November 2026</span>
                <span aria-hidden="true"> / </span>
                <span>Windhoek, Namibia</span>
              </div>
            </Reveal>
          </div>
        </header>
        <div className="breadcrumbs-wrap">
          <div className="site-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Tangison partnership" }]} />
          </div>
        </div>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <p>
                Tangison builds and runs the group&rsquo;s web presence: this site, <a href="https://spa.mendozer.com" rel="noopener noreferrer" target="_blank">spa.mendozer.com</a>,
                the Shu Splush page, and the campaign pages that go out with each launch. Visitors see the design; the partnership is what keeps it
                published, current and fast.
              </p>
              <p>
                The split of work stays clear. Mendozer runs the businesses and the client relationships, and it finances the group&rsquo;s
                concepts, from Corner Spa to Shu Splush. Tangison designs, builds and maintains the technology underneath: the pages themselves, the
                workflow behind them, and the checks that keep everything current and findable on search.
              </p>
            </Reveal>

            <Reveal>
              <figure className="blog-post__figure">
                <Image
                  alt="Technology sector field work by the Mendozer group"
                  height={PARTNER_IMAGE_HEIGHT}
                  sizes="(max-width: 760px) 100vw, 720px"
                  src={PARTNER_IMAGE}
                  width={PARTNER_IMAGE_WIDTH}
                />
              </figure>
            </Reveal>

            <h2>What the partnership has already shipped</h2>
            <Reveal>
              <p>
                The releases published on this site in the past few months all went through the partnership: the Corner Spa announcement and its booking
                pages, the move of this site fully onto mendozer.com, and the Shu Splush launch page with its printed QR codes. Each one is verified
                before it goes live: builds, responsive checks, accessibility and search metadata. What the public reads is what the group has
                approved.
              </p>
            </Reveal>

            <h2>What the group gets from it</h2>
            <Reveal>
              <p>
                A construction group that also runs consumer concepts needs its public record to be in one place and kept current. The partnership gives
                Mendozer a single accountable team for that. The group&rsquo;s pages share one design language, announcements and records are published
                from the same place, and the team is already on call when a new concept is ready to go public. The next launches will follow the same
                route: brief, build, verify, publish.
              </p>
            </Reveal>

            <Reveal>
              <div className="blog-post__actions">
                <Link className="button button--primary" href="/about">
                  <span>About the group</span>
                  <ArrowIcon />
                </Link>
                <Link className="button button--primary" href="/blog/corner-spa">
                  <span>Read the Corner Spa announcement</span>
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
