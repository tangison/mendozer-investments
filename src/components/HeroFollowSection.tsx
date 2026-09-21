import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Second section. Photography only: the AI-generated motion loop was retired
 * by client decision, so this card serves the still site-context image alone.
 */
export function HeroFollowSection() {
  const { hero } = siteContent;
  const poster = "/images/projects/construction/mendozer-home-hero.webp";

  return (
    <section className="hero-follow" aria-labelledby="hero-follow-title">
      <div className="site-container hero-follow__grid">
        <div className="hero-follow__copy">
          <p className="eyebrow">{hero.followEyebrow ?? "The Mendozer group"}</p>
          <h2 id="hero-follow-title" className="hero-follow__title">
            {hero.followTitle ?? "One team from the first brief to the delivered work."}
          </h2>
          <p className="hero-follow__body">
            {hero.followBody ??
              "Construction, technology, cooling, logistics, energy and tourism are connected by one operational backbone. Start with the sector closest to the work in front of you, and bring the group in when the brief crosses disciplines."}
          </p>
          <div className="hero-follow__actions">
            <Link className="text-link" href="/about">
              <span>Read the group context</span>
              <ArrowIcon />
            </Link>
            <Link className="text-link" href="/sectors">
              <span>See the sectors</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="hero-follow__media">
          <figure className="hero-follow__figure">
            <Image alt="Mendozer Investments site context" className="hero-follow__poster" fill sizes="(max-width: 900px) 100vw, 40vw" src={poster} />
          </figure>
        </div>
      </div>
    </section>
  );
}
