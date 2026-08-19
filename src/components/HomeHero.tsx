"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Full-bleed Namib landscape hero.
 * Desert loop is the background. Reduced-motion users get the still poster.
 */
export function HomeHero() {
  const { hero } = siteContent;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const desktopSrc = "/videos/hero/desert-loop.mp4";
  const poster = "/videos/hero/desert-loop-poster.jpg";

  return (
    <section aria-labelledby="hero-title" className="hero home-hero">
      <div aria-hidden="true" className="hero__media home-hero__media">
        {reduceMotion ? (
          <Image
            alt="Namibian desert landscape, dunes and open sky"
            className="hero__poster home-hero__poster"
            fill
            priority
            sizes="100vw"
            src={poster}
            unoptimized
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            className="hero__video home-hero__video"
            loop
            muted
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={desktopSrc} type="video/mp4" />
          </video>
        )}
        <div aria-hidden="true" className="hero__veil home-hero__veil" />
        <div aria-hidden="true" className="hero__grain" />
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
    </section>
  );
}
