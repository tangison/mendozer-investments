import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/brand/site-config";

const SLUG = "/blog/namibia-heroes-day-2026";
const ASSET = "/images/blog/heroes-day-2026";
const OG_IMAGE = "/og/heroes-day.png";

export const metadata: Metadata = {
  title: "Heroes' Day 2026: Namibia remembers the struggle for independence",
  description:
    "Heroes' Day falls on 26 August each year in Namibia. It remembers the start of the struggle for independence at Omugulugwombashe in 1966, and honours those who served.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "Heroes' Day 2026: Namibia remembers the struggle for independence",
    description:
      "26 August is Namibia's Heroes' Day, the national holiday that marks the start of the armed struggle for independence in 1966. A day for the heroes and heroines of the motherland.",
    type: "article",
    url: SLUG,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Aerial view of the Heroes' Acre memorial near Windhoek" }],
    publishedTime: "2026-08-26T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heroes' Day 2026: Namibia remembers the struggle for independence",
    description: "26 August is Namibia's Heroes' Day. A day for the heroes and heroines of the motherland.",
    images: [OG_IMAGE],
  },
};

const gallery = [
  {
    src: `${ASSET}/heroes-acre-aerial.webp`,
    width: 1600,
    height: 1041,
    alt: "Aerial view of the Heroes' Acre memorial complex in the Auas mountains near Windhoek",
    caption: "Heroes' Acre, viewed from above",
  },
  {
    src: `${ASSET}/heroes-acre-view.webp`,
    width: 1600,
    height: 1066,
    alt: "Ground view of the Heroes' Acre memorial near Windhoek",
    caption: "The memorial complex outside Windhoek",
  },
  {
    src: `${ASSET}/independence-memorial-museum.webp`,
    width: 1600,
    height: 1195,
    alt: "The Independence Memorial Museum in Windhoek with the Christ Church behind it",
    caption: "The Independence Memorial Museum in Windhoek",
  },
] as const;

export default function HeroesDayPage() {
  const postUrl = `${siteConfig.url}${SLUG}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "A day for Namibia's heroes",
    image: `${siteConfig.url}${OG_IMAGE}`,
    datePublished: "2026-08-26T00:00:00.000Z",
    author: { "@type": "Organization", name: "Mendozer Investments", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Mendozer Investments",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description:
      "Heroes' Day falls on 26 August each year in Namibia. It remembers the start of the struggle for independence at Omugulugwombashe in 1966, and honours those who served.",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">26 August 2026</p>
            </Reveal>
            <Reveal delay={80}>
              <h1>A day for Namibia&apos;s heroes.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="blog-post__lede">
                Heroes&apos; Day is Namibia&apos;s national day of remembrance for the men and women who fought for independence. It falls on 26 August, the day the
                armed struggle began at Omugulugwombashe in 1966.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="blog-post__meta">
                <span>Heroes&apos; Day</span>
                <span aria-hidden="true"> / </span>
                <span>Public holiday</span>
                <span aria-hidden="true"> / </span>
                <span>Namibia</span>
              </div>
            </Reveal>
          </div>
        </header>
        <div className="breadcrumbs-wrap">
          <div className="site-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Heroes&apos; Day 2026" }]} />
          </div>
        </div>

        <section className="blog-post__featured">
          <div className="site-container">
            <Reveal variant="up">
              <figure className="heroes-banner-wrap">
                <Image
                  alt="Heroes' Day commemorative banner supplied by Mendozer Investments"
                  className="heroes-banner"
                  height={294}
                  priority
                  sizes="(max-width: 768px) 100vw, 840px"
                  src={`${ASSET}/heroes-day-banner-01.webp`}
                  width={588}
                />
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>Why 26 August.</h2>
              <p>
                Heroes&apos; Day is a national public holiday in Namibia, recognised by the United Nations as Namibia Day. It is kept every year on 26 August to
                mark the start of the Namibian War of Independence.
              </p>
              <p>
                On 26 August 1966, fighters of the People&apos;s Liberation Army of Namibia, the military wing of SWAPO, clashed with South African forces at
                Omugulugwombashe in the Omusati Region. That encounter is remembered as the first armed engagement of the struggle for independence.
              </p>
            </Reveal>

            <Reveal>
              <h2>A long road to independence.</h2>
              <p>
                The struggle lasted more than two decades. Namibia reached independence on 21 March 1990, and the country has kept 26 August every year since
                as a day to honour those who served and sacrificed.
              </p>
              <p>
                National commemorations move between different places, often in the north near the battle zones. Veterans of the liberation struggle are
                honoured publicly, and the day is a chance for Namibians to reflect on what independence has made possible.
              </p>
            </Reveal>

            <Reveal>
              <h2>Heroes&apos; Acre.</h2>
              <p>
                The Heroes&apos; Acre memorial stands in the Auas mountains outside Windhoek. It was opened on Heroes&apos; Day in 2002 to remember the soldiers and
                citizens who fell in the struggle.
              </p>
              <figure className="heroes-banner-wrap">
                <Image
                  alt="Heroes' Day commemorative banner supplied by Mendozer Investments"
                  className="heroes-banner"
                  height={294}
                  sizes="(max-width: 768px) 100vw, 840px"
                  src={`${ASSET}/heroes-day-banner-02.webp`}
                  width={588}
                />
              </figure>
              <p>
                The centrepiece is a 34-metre white obelisk, with an 8-metre bronze statue of the Unknown Soldier in front of it and the Eternal Flame
                nearby. The pedestal holds soil from mass graves at Cassinga, Ongulumbashe and Oshatotwa, and the terraces carry 174 graves, real and
                symbolic.
              </p>
            </Reveal>

            <Reveal>
              <h2>What the day asks of us.</h2>
              <p>
                Heroes&apos; Day is a call to remember the cost of the freedom Namibia enjoys, and to carry the work forward. That sense of unity and community
                is part of why Mendozer Investments supports public gatherings such as the Otjiwarongo Sports Bonanza, where sport, music and community come
                together.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section osb-gallery-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Places of remembrance</p>
              <h2>Heroes&apos; Acre and Windhoek.</h2>
            </Reveal>
            <div className="osb-gallery">
              {gallery.map((photo) => (
                <figure className="osb-gallery__item" key={photo.src}>
                  <Image alt={photo.alt} height={photo.height} sizes="(max-width: 700px) 100vw, 32vw" src={photo.src} width={photo.width} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <div className="blog-post__cta">
                <h2>Reflect, and remember.</h2>
                <p>
                  On Heroes&apos; Day, Mendozer Investments joins the nation in remembering the heroes and heroines of Namibia, and in committing to the work of
                  building the country they fought for.
                </p>
                <Link className="button button--primary" href="/community">
                  <span>See community context</span>
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <p className="heroes-credit">
                Image credits: Heroes&apos; Acre aerial by Olga Ernst and Hp.Baumeler, CC BY-SA 4.0; Heroes&apos; Acre view by Laika ac, CC BY-SA 2.0; Independence
                Memorial Museum by Zairon, CC BY-SA 4.0, all via Wikimedia Commons. Banners supplied by Mendozer Investments.
              </p>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
