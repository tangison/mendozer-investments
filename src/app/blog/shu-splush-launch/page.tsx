import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/brand/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

const FLYER_IMAGE = "/images/blog/shu-splush-promo.webp";
const FLYER_WIDTH = 1054;
const FLYER_HEIGHT = 1400;

export const metadata: Metadata = {
  title: "Shu Splush opens at Dorado Valley Shopping Centre",
  description:
    "Shu Splush, a sneaker-cleaning counter by Mendozer Investments, is open at Dorado Valley Shopping Centre. 1 pair N$30, 2 pairs N$50, Black Friday N$25 and N$40.",
  alternates: { canonical: "/blog/shu-splush-launch" },
  openGraph: {
    title: "Shu Splush opens at Dorado Valley Shopping Centre | Mendozer Investments",
    description:
      "Shu Splush, a sneaker-cleaning counter by Mendozer Investments, is open at Dorado Valley Shopping Centre. 1 pair N$30, 2 pairs N$50, Black Friday N$25 and N$40.",
    type: "article",
    url: "/blog/shu-splush-launch",
    images: [{ url: FLYER_IMAGE, width: FLYER_WIDTH, height: FLYER_HEIGHT, alt: "Time to save: wash 2 pairs only N$50, Shu Splush flyer" }],
    publishedTime: "2026-11-21T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shu Splush opens at Dorado Valley Shopping Centre | Mendozer Investments",
    description:
      "Shu Splush, a sneaker-cleaning counter by Mendozer Investments, is open at Dorado Valley Shopping Centre. 1 pair N$30, 2 pairs N$50.",
    images: [FLYER_IMAGE],
  },
};

export default function ShuSplushLaunchPage() {
  const postUrl = `${siteConfig.url}/blog/shu-splush-launch`;
  const imageUrl = `${siteConfig.url}${FLYER_IMAGE}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Shu Splush opens at Dorado Valley Shopping Centre",
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
      "Shu Splush, a sneaker-cleaning counter by Mendozer Investments, is open at Dorado Valley Shopping Centre. 1 pair N$30, 2 pairs N$50, Black Friday N$25 and N$40.",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Announcement / 21 November 2026</p>
            </Reveal>
            <Reveal>
              <h1>Shu Splush opens at Dorado Valley Shopping Centre</h1>
            </Reveal>
            <Reveal>
              <p className="blog-post__lede">
                Mendozer Investments has opened Shu Splush, a sneaker-cleaning counter at Dorado Valley Shopping Centre in Windhoek.
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
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Shu Splush launch" }]} />
          </div>
        </div>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <p>
                Shu Splush cleans sneakers. You drop off a dirty pair at the counter in Dorado Valley Shopping Centre, close to Ara bar, and collect them
                fresh. Every wash includes all treatments, so there are no add-on charges to work out at the till.
              </p>
              <p>
                The prices stay simple: 1 pair N$30, or 2 pairs for N$50. For Black Friday the special drops to 1 pair N$25 and 2 pairs N$40, and the
                flyers carry the same numbers. Call or WhatsApp <a href="tel:+264816187210">081 618 7210</a> when you are nearby, or message{" "}
                <a aria-label="Message Shu Splush on WhatsApp" href="https://wa.me/264816187210" rel="noopener noreferrer" target="_blank">
                  +264 81 618 7210 on WhatsApp
                </a>
                .
              </p>
            </Reveal>

            <Reveal>
              <figure className="blog-post__figure">
                <Image
                  alt="Time to save: wash 2 pairs only N$50, Shu Splush flyer"
                  height={FLYER_HEIGHT}
                  sizes="(max-width: 760px) 100vw, 720px"
                  src={FLYER_IMAGE}
                  width={FLYER_WIDTH}
                />
              </figure>
            </Reveal>

            <h2>The Shu Splush page</h2>
            <Reveal>
              <p>
                Everything about the service sits on one page: <Link href="/shu-splash">mendozer.com/shu-splash</Link>. It carries the price menu, the
                Black Friday special, the poster gallery, a Google Maps button for the shopping centre, and a QR code that opens the page on a phone. The
                printed flyers and the bag use the same branding, so what you see in hand matches what you see online.
              </p>
            </Reveal>

            <h2>Another concept by Mendozer</h2>
            <Reveal>
              <p>
                Shu Splush runs under the Mendozer Investments banner, the same way Corner Spa does. Corner Spa, the first project of Oryx Institute, is
                already online at <a href="https://spa.mendozer.com" rel="noopener noreferrer" target="_blank">spa.mendozer.com</a>; read the{" "}
                <Link href="/blog/corner-spa">Corner Spa announcement</Link> for how that concept works. The group builds the brand, the flyers and the web
                presence; the counter at Dorado Valley does the cleaning.
              </p>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
