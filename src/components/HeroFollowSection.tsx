"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Second section. The 21 MB motion file must not download until the card is on screen.
 */
export function HeroFollowSection() {
  const frameRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const updateMotion = () => setReduceMotion(mqMotion.matches);
    const updateMobile = () => setIsMobile(mqMobile.matches);
    updateMotion();
    updateMobile();
    mqMotion.addEventListener("change", updateMotion);
    mqMobile.addEventListener("change", updateMobile);
    return () => {
      mqMotion.removeEventListener("change", updateMotion);
      mqMobile.removeEventListener("change", updateMobile);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || shouldLoadVideo) return;
    const node = frameRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setShouldLoadVideo(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo || reduceMotion) return;
    videoRef.current?.play().catch(() => undefined);
  }, [shouldLoadVideo, reduceMotion]);

  const { hero } = siteContent;
  const poster = "/images/projects/construction/mendozer-home-hero.webp";
  const videoSrc = isMobile ? "/media/mendozer-hero-motion-mobile.mp4" : "/media/mendozer-hero-motion.mp4";

  return (
    <section className="hero-follow" aria-labelledby="hero-follow-title">
      <div className="site-container hero-follow__grid">
        <div className="hero-follow__copy">
          <p className="eyebrow">{hero.followEyebrow ?? "The Mendozer group"}</p>
          <h2 id="hero-follow-title" className="hero-follow__title">
            {hero.followTitle ?? "One accountable group across six working directions."}
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
              <span>See the six directions</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="hero-follow__media">
          <figure className="hero-follow__figure" ref={frameRef}>
            {reduceMotion || !shouldLoadVideo ? (
              <Image alt="Mendozer Investments site context" className="hero-follow__poster" fill sizes="(max-width: 900px) 100vw, 40vw" src={poster} unoptimized />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                className="hero-follow__video"
                loop
                muted
                playsInline
                poster={poster}
                preload="none"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
            <figcaption>{hero.media.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
