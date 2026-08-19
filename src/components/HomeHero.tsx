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
  const poster = "/videos/hero/desert-loop-poster.jpg";

  return (
    <section aria-labelledby="hero-title" className="hero home-hero">
      <div aria-hidden="true" className="hero__media home-hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="hero__poster home-hero__poster"
          decoding="async"
          fetchPriority="high"
          height={540}
          src={poster}
          width={960}
        />
        <video
          className="hero__video home-hero__video"
          loop
          muted
          playsInline
          poster={poster}
          preload="none"
        >
          <source src={desktopSrc} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="hero__veil home-hero__veil" />
      </div>

      <div className="hero__inner home-hero__inner">
        <div className="hero__copy home-hero__copy">
          <h1 className="hero__title" id="hero-title">
            {hero.title}
          </h1>
          <p className="hero__subtext">{hero.subtext}</p>
          <div className="hero__actions home-hero__actions">
            <Link className="hero__cta" href={hero.primaryCta.href}>
              <span>{hero.primaryCta.label}</span>
              <ArrowIcon />
            </Link>
            <Link className="hero__cta hero__cta--ghost" href={hero.secondaryCta.href}>
              <span>Explore directions</span>
              <ArrowIcon />
            </Link>
          </div>
          {hero.proofBadge ? <p className="hero__proof">{hero.proofBadge}</p> : null}
        </div>
        <div aria-hidden="true" className="hero__meta">
          <span>One group</span>
          <span className="hero__meta-dot" />
          <span>Six directions</span>
          <span className="hero__meta-dot" />
          <span>Namibia</span>
        </div>
      </div>

      <div aria-hidden="true" className="hero__scroll">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var v=document.querySelector(".home-hero video");if(!v||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var start=function(){v.play().then(function(){v.classList.add("is-playing")}).catch(function(){});window.removeEventListener("pointerdown",start);window.removeEventListener("scroll",start);window.removeEventListener("keydown",start)};window.addEventListener("pointerdown",start,{passive:true});window.addEventListener("scroll",start,{passive:true});window.addEventListener("keydown",start)})();`,
        }}
      />
    </section>
  );
}
