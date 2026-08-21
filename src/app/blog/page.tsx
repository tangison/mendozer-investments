import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News",
  description: "Published Mendozer Investments news and event briefs, starting with the Otjiwarongo Sports Bonanza 2026.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="page-hero page-hero--text-only">
        <div className="site-container page-hero__copy">
          <Reveal><p className="eyebrow eyebrow--light">News</p></Reveal>
          <Reveal delay={80}><h1>What Mendozer is putting in public.</h1></Reveal>
          <Reveal delay={150}>
            <p>Event briefs and published notes only. This index lists the material currently approved for the site.</p>
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
          <Reveal>
            <article className="blog-index__card">
              <Link className="blog-index__media" href="/blog/otjiwarongo-sports-bonanza-2026">
                <Image
                  alt="Otjiwarongo Sports Bonanza 2026 official flyer"
                  height={1600}
                  sizes="(max-width: 760px) 100vw, 280px"
                  src="/images/events/otjiwarongo-sports-bonanza-2026/osb-2026-poster-prizes.webp"
                  width={1130}
                />
              </Link>
              <div className="blog-index__body">
                <p className="eyebrow">21 to 23 August 2026</p>
                <h2>Otjiwarongo Sports Bonanza 2026</h2>
                <p>Mendozer Investments presents three days of soccer, netball, and volleyball at Mokati Stadium, with a N$45,000 prize pool and a Saturday music show.</p>
                <Link className="text-link" href="/blog/otjiwarongo-sports-bonanza-2026">
                  Read the event brief <ArrowIcon />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
