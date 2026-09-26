import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Second section. Copy only: the media card was removed by client decision
 * because it duplicated the hero footage directly beneath it.
 */
export function HeroFollowSection() {
  const { hero } = siteContent;

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
              "Start with the sector closest to the job, and bring the wider team in when the brief crosses disciplines. One point of contact, one standard, and decisions made close to the work."}
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
      </div>
    </section>
  );
}
