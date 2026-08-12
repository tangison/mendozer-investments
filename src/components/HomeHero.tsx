import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

export function HomeHero() {
  const { hero } = siteContent;
  const poster = "/images/projects/construction/mendozer-home-hero.webp";

  return (
    <section className="home-hero">
      <div aria-hidden="true" className="home-hero__media">
        <Image alt="" className="home-hero__poster" fill priority sizes="100vw" src={poster} unoptimized />
        <video autoPlay className="home-hero__video" loop muted playsInline poster={poster} preload="metadata">
          <source src="/media/mendozer-hero-motion.webm" type="video/webm" />
          <source src="/media/mendozer-hero-motion.mp4" type="video/mp4" />
        </video>
      </div>
      <div aria-hidden="true" className="home-hero__veil" />
      <div aria-hidden="true" className="home-hero__signal" />

      <div className="site-container home-hero__inner">
        <div className="home-hero__copy">
          <h1>{hero.title}</h1>
          <div className="home-hero__actions">
            <Link className="button button--light" href={hero.primaryCta.href}>{hero.primaryCta.label} <ArrowIcon /></Link>
            <Link className="text-link text-link--light" href={hero.secondaryCta.href}>{hero.secondaryCta.label} <ArrowIcon /></Link>
          </div>
        </div>
        <p className="home-hero__caption">{hero.media.caption}</p>
      </div>
    </section>
  );
}
