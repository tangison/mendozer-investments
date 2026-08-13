import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { HeroMotion } from "@/components/HeroMotion";
import { siteContent } from "@/content/site-content";

export function HomeHero() {
  const { hero } = siteContent;
  const { motion } = hero;

  return (
    <section className="home-hero">
      <HeroMotion
        mp4={motion.mp4}
        mp4720={motion.mp4720}
        poster={motion.poster}
        webm={motion.webm}
        webm720={motion.webm720}
      />

      <div className="site-container home-hero__inner">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="home-hero__subtext">{hero.subtext}</p>
          <div className="home-hero__actions">
            <Link className="button button--light" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <ArrowIcon />
            </Link>
            <Link className="text-link text-link--light" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label} <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="home-hero__meta">
          <a className="home-hero__scroll" href="#group">
            <span>Scroll</span>
            <ArrowIcon direction="down" />
          </a>
        </div>
      </div>
    </section>
  );
}
