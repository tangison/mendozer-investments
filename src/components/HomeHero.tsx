"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site-content";

/**
 * Approved home hero: one sentence, supplied-photo motion, poster fallback.
 * Uses real Mendozer site footage, not a stock desert loop.
 */
export function HomeHero() {
  const { hero } = siteContent;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const poster = "/images/projects/construction/mendozer-home-hero.webp";

  return (
    <section aria-labelledby="hero-title" className="home-hero">
      <div aria-hidden="true" className="home-hero__media">
        {reduceMotion ? (
          <Image
            alt="Construction work on an open Mendozer site"
            className="home-hero__poster"
            fill
            priority
            sizes="100vw"
            src={poster}
            unoptimized
          />
        ) : (
          <video
            autoPlay
            className="home-hero__video"
            loop
            muted
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src="/media/mendozer-hero-motion.webm" type="video/webm" />
            <source src="/media/mendozer-hero-motion.mp4" type="video/mp4" />
          </video>
        )}
        <div className="home-hero__veil" />
      </div>
      <div aria-hidden="true" className="home-hero__signal" />
      <div className="site-container home-hero__inner">
        <div className="home-hero__copy">
          <h1 id="hero-title">{hero.title}</h1>
          <div className="home-hero__actions">
            <Link className="button button--light" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Link>
            <Link className="text-link text-link--light" href={hero.secondaryCta.href}>
              Explore directions
            </Link>
          </div>
        </div>
        <p className="home-hero__caption">{hero.media.caption}</p>
      </div>
    </section>
  );
}
