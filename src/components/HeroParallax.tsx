"use client";

import { useEffect } from "react";

/**
 * DOM-free behaviour: drifts the hero media (`.home-hero__media`) down as the
 * visitor scrolls through the hero, so background and copy separate at
 * slightly different rates. Transform-only, rAF-throttled, skipped entirely
 * under prefers-reduced-motion. Mount once inside HomeHero.
 */
export function HeroParallax({ max = 90 }: { max?: number }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector<HTMLElement>(".home-hero");
    const media = document.querySelector<HTMLElement>(".home-hero__media");
    if (!hero || !media) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      media.style.transform = `translate3d(0, ${(progress * max).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return null;
}
