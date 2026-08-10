"use client";

/* Hallmark pre-emit critique: P5 H5 E5 S5 R5 V5 */

import { type KeyboardEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { sectors, siteContent } from "@/content/site-content";

/**
 * A six-direction hero navigator. On wide screens it works as a vertical
 * selector; on small screens the hero intentionally stays focused and the
 * separate sector directory becomes the discovery surface.
 */
export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const activeSector = sectors[activeIndex];
  const { hero } = siteContent;

  const selectedLabel = useMemo(() => `${activeSector.number} / 06`, [activeSector.number]);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 46rem)");
    const updateCompactState = () => setIsCompactViewport(compactQuery.matches);
    updateCompactState();
    compactQuery.addEventListener("change", updateCompactState);
    return () => compactQuery.removeEventListener("change", updateCompactState);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || isCompactViewport || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % sectors.length);
    }, 7200);
    return () => window.clearInterval(timer);
  }, [activeIndex, isCompactViewport, isPaused]);

  function selectDirection(index: number) {
    setIsPaused(true);
    setActiveIndex(index);
  }

  function handleTabKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = activeIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (activeIndex + 1) % sectors.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + sectors.length) % sectors.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = sectors.length - 1;
    selectDirection(nextIndex);
    document.getElementById(`hero-direction-${nextIndex}`)?.focus();
  }

  return (
    <section className="home-hero">
      <div aria-hidden="true" className="home-hero__media home-hero__media--slider">
        <Image
          alt=""
          className="home-hero__slide-image"
          fill
          key={activeSector.slug}
          priority
          sizes="100vw"
          src={activeSector.hero.src}
          style={{ objectPosition: activeSector.hero.focus }}
        />
      </div>
      <div className="home-hero__overlay" />
      <div aria-hidden="true" className="home-hero__rule" />
      <div className="home-hero__inner site-container">
        <div className="home-hero__copy">
          <p className="eyebrow eyebrow--light hero-reveal hero-reveal--one">{hero.eyebrow}</p>
          <h1 aria-label={`${hero.titleLineOne} ${hero.titleLineTwo}`}>
            <span className="hero-word hero-reveal hero-reveal--two">{hero.titleLineOne}</span>
            <span className="hero-word hero-reveal hero-reveal--three">{hero.titleLineTwo}</span>
          </h1>
          <p className="home-hero__supporting hero-reveal hero-reveal--four">{hero.supporting}</p>
          <div className="home-hero__actions hero-reveal hero-reveal--five">
            <Link className="button button--primary" href={hero.primaryCta.href}>{hero.primaryCta.label} <ArrowIcon /></Link>
            <Link className="text-link text-link--light" href={hero.secondaryCta.href}>{hero.secondaryCta.label} <ArrowIcon /></Link>
          </div>
        </div>

        <aside aria-label="Explore Mendozer sectors" className="home-hero__navigator hero-reveal hero-reveal--five">
          <div aria-label="Choose a working direction" className="home-hero__tabs" onKeyDown={handleTabKeys} role="tablist">
            {sectors.map((sector, index) => (
              <button
                aria-controls="hero-direction-panel"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "is-active" : ""}
                id={`hero-direction-${index}`}
                key={sector.slug}
                onClick={() => selectDirection(index)}
                role="tab"
                tabIndex={index === activeIndex ? 0 : -1}
                type="button"
              >
                <span>{sector.number}</span>
                <span>{sector.shortTitle}</span>
              </button>
            ))}
          </div>
          <div className="home-hero__direction" id="hero-direction-panel" role="tabpanel">
            <p><span>{selectedLabel}</span> Working direction</p>
            <strong>{activeSector.title}</strong>
            <Link href={`/sectors/${activeSector.slug}`}>Explore this sector <ArrowIcon /></Link>
          </div>
          <button
            aria-pressed={isPaused}
            className="home-hero__rotation-control"
            onClick={() => setIsPaused((paused) => !paused)}
            type="button"
          >
            {isPaused ? "Resume sector rotation" : "Pause sector rotation"}
          </button>
        </aside>
      </div>
      <p className="home-hero__caption">{activeSector.hero.caption}</p>
    </section>
  );
}
