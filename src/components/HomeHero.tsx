import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Full-bleed Namib landscape hero.
 * A raw img is the LCP node so first paint does not wait on Next/Image hydration.
 * The desert loop starts after the first scroll or pointer, not during first load.
 */
export function HomeHero() {
  const { hero } = siteContent;
  const desktopSrc = "/videos/hero/desert-loop.mp4";
  const poster = "/videos/hero/desert-loop-poster.webp";

  return (
    <section aria-labelledby="hero-title" className="home-hero">
      <div aria-hidden="true" className="home-hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="home-hero__poster"
          decoding="async"
          fetchPriority="high"
          height={540}
          src={poster}
          width={960}
        />
        <video
          className="home-hero__video"
          loop
          muted
          playsInline
          poster={poster}
          preload="none"
        >
          <source src={desktopSrc} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="home-hero__veil" />
      </div>

      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <h1 id="hero-title">
            {hero.title}
          </h1>
          <p className="home-hero__subtext">{hero.subtext}</p>
          <div className="home-hero__actions">
            <Link className="home-hero__cta" href={hero.primaryCta.href}>
              <span>{hero.primaryCta.label}</span>
              <ArrowIcon />
            </Link>
            <Link className="home-hero__cta home-hero__cta--ghost" href={hero.secondaryCta.href}>
              <span>{hero.secondaryCta.label}</span>
              <ArrowIcon />
            </Link>
          </div>
          {hero.proofBadge ? <p className="home-hero__proof">{hero.proofBadge}</p> : null}
        </div>
        <div aria-hidden="true" className="home-hero__meta">
          <span>One team</span>
          <span className="home-hero__meta-dot" />
          <span>Every sector</span>
          <span className="home-hero__meta-dot" />
          <span>Namibia</span>
        </div>
      </div>

      <div aria-hidden="true" className="home-hero__scroll">
        <span>Scroll</span>
        <span className="home-hero__scroll-line" />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var v=document.querySelector(".home-hero video");if(!v||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var start=function(){v.play().then(function(){v.classList.add("is-playing")}).catch(function(){});window.removeEventListener("pointerdown",start);window.removeEventListener("scroll",start);window.removeEventListener("keydown",start)};window.addEventListener("pointerdown",start,{passive:true});window.addEventListener("scroll",start,{passive:true});window.addEventListener("keydown",start)})();`,
        }}
      />
    </section>
  );
}
