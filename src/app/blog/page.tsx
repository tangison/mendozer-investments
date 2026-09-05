import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News",
  description: "Published Mendozer Investments news and event reports, including the Otjiwarongo Sports Bonanza 2026 conclusion and official releases.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    href: "/blog/mendozer-windhoek-satellite-office",
    image: "/images/projects/construction/road-works-2.jpg",
    imageAlt: "Mendozer Investments construction work in progress on a site in Namibia",
    imageWidth: 810,
    imageHeight: 1080,
    eyebrow: "Group news / 3 September 2026",
    title: "A Windhoek satellite office at the Continental Building",
    summary: "Mendozer Investments now meets clients and partners in the capital from Office 2, Continental Building on Judge JP Karuaihe Street. The main number is +264 85 777 7077.",
    cta: "Read the office announcement",
  },
  {
    href: "/blog/namibia-heroes-day-2026",
    image: "/images/blog/heroes-day-2026/heroes-day-banner-01.webp",
    imageAlt: "Heroes' Day commemorative banner supplied by Mendozer Investments",
    imageWidth: 588,
    imageHeight: 294,
    eyebrow: "Public holiday / 26 August 2026",
    title: "Heroes' Day 2026",
    summary: "A day for Namibia's heroes. Heroes' Day remembers the start of the struggle for independence at Omugulugwombashe in 1966, and honours those who served.",
    cta: "Read the Heroes' Day note",
  },
  {
    href: "/blog/otjiwarongo-sports-bonanza-2026",
    image: "/images/events/otjiwarongo-sports-bonanza-2026/osb-2026-conclusion-poster.webp",
    imageAlt: "Otjiwarongo Sports Bonanza 2026 final result poster: Namaqua FC 2 to 1 Ama Roots FC",
    imageWidth: 1122,
    imageHeight: 1402,
    eyebrow: "21 to 23 August 2026",
    title: "Otjiwarongo Sports Bonanza 2026",
    summary: "Namaqua FC defeated Ama Roots FC 2 to 1 in the final at Mokati Stadium to win the tournament. Read the conclusion and the official releases.",
    cta: "Read the event conclusion",
  },
  {
    href: "/blog/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments",
    image: "/images/events/otjiwarongo-sports-bonanza-2026/gallery/osb-2026-gallery-09.webp",
    imageAlt: "Event photograph from the Otjiwarongo Sports Bonanza 2026 at Mokati Stadium, Otjiwarongo",
    imageWidth: 1280,
    imageHeight: 960,
    eyebrow: "Media release / 24 August 2026",
    title: "Reconciliation and prize payment requirements",
    summary: "The documentation required for the reconciliation of outstanding balances and for prize monies to be paid directly into team bank accounts.",
    cta: "Read the release",
  },
  {
    href: "/blog/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification",
    image: "/images/events/otjiwarongo-sports-bonanza-2026/gallery/osb-2026-gallery-11.webp",
    imageAlt: "Event photograph from the Otjiwarongo Sports Bonanza 2026 at Mokati Stadium, Otjiwarongo",
    imageWidth: 960,
    imageHeight: 1280,
    eyebrow: "Media release / 25 August 2026",
    title: "Clarification on King Tee Dee's involvement",
    summary: "King Tee Dee performed as the headline act for the music show and had no role in the financial administration of the event.",
    cta: "Read the release",
  },
] as const;

export default function BlogIndexPage() {
  return (
    <>
      <section className="page-hero page-hero--text-only">
        <div className="site-container page-hero__copy">
          <Reveal><p className="eyebrow eyebrow--light">News</p></Reveal>
          <Reveal delay={80}><h1>What Mendozer is putting in public.</h1></Reveal>
          <Reveal delay={150}>
            <p>Event reports and published notes only. This index lists the material currently approved for the site.</p>
          </Reveal>
        </div>
      </section>
      <div className="breadcrumbs-wrap">
        <div className="site-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
        </div>
      </div>
      <section className="section">
        <div className="site-container blog-index">
          {posts.map((post) => (
            <Reveal key={post.href}>
              <article className="blog-index__card">
                <Link className="blog-index__media" href={post.href}>
                  <Image
                    alt={post.imageAlt}
                    height={post.imageHeight}
                    sizes="(max-width: 760px) 100vw, 280px"
                    src={post.image}
                    width={post.imageWidth}
                  />
                </Link>
                <div className="blog-index__body">
                  <p className="eyebrow">{post.eyebrow}</p>
                  <h2>{post.title}</h2>
                  <p>{post.summary}</p>
                  <Link className="text-link" href={post.href}>
                    {post.cta} <ArrowIcon />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
