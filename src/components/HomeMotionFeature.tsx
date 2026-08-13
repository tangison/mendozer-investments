import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { HeroMotion } from "@/components/HeroMotion";
import { Reveal } from "@/components/Reveal";
import { siteContent } from "@/content/site-content";

/**
 * Push-in section. Two columns below the hero; the right column replays the
 * same 63s loop at 60% width and lifts 20% of its own height into the hero,
 * so the two sections interlock instead of stacking.
 */
export function HomeMotionFeature() {
  const { motionFeature } = siteContent.home;
  const { motion } = siteContent.hero;

  return (
    <section className="motion-feature" id="group">
      <div className="site-container motion-feature__grid">
        <div className="motion-feature__copy">
          <Reveal>
            <p className="eyebrow">{motionFeature.eyebrow}</p>
            <h2>{motionFeature.title}</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="motion-feature__body">{motionFeature.body}</p>
            <p className="motion-feature__support">{motionFeature.support}</p>
          </Reveal>
          <Reveal delay={160}>
            <dl className="motion-feature__stats">
              {motionFeature.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={220}>
            <Link className="text-link" href={motionFeature.cta.href}>
              {motionFeature.cta.label} <ArrowIcon />
            </Link>
          </Reveal>
        </div>

        <div className="motion-feature__media">
          <HeroMotion
            className="hero-motion--framed"
            lazy
            mp4={motion.mp4}
            mp4720={motion.mp4720}
            poster={motion.poster}
            webm={motion.webm}
            webm720={motion.webm720}
          />
        </div>
      </div>
    </section>
  );
}
