"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/content/site-content";

type GalleryCarouselProps = {
  items: readonly GalleryItem[];
  label: string;
};

/** Scroll-snap image carousel. No external dependency; keyboard and reduced-motion aware. */
export function GalleryCarousel({ items, label }: GalleryCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slideWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const slide = track.querySelector("li");
    if (!slide) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      track.scrollTo({ left: clamped * slideWidth(), behavior: reduceMotion() ? "auto" : "smooth" });
    },
    [items.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const width = slideWidth();
        if (!width) return;
        setActiveIndex(Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / width))));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [items.length]);

  return (
    <div aria-label={label} aria-roledescription="carousel" className="carousel">
      <ul
        aria-label={label}
        className="carousel__track"
        ref={trackRef}
        tabIndex={0}
      >
        {items.map((item, index) => (
          <li
            aria-label={`Image ${index + 1} of ${items.length}`}
            aria-roledescription="slide"
            className="carousel__slide"
            key={item.src}
            role="listitem"
          >
            <div className="carousel__frame">
              <Image
                alt={item.alt}
                className="carousel__image"
                height={item.height}
                loading={index < 2 ? "eager" : "lazy"}
                priority={index === 0}
                sizes="(max-width: 700px) 78vw, 560px"
                src={item.src}
                width={item.width}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="carousel__controls">
        <button
          aria-label="Previous image"
          className="carousel__button"
          disabled={activeIndex === 0}
          onClick={() => scrollToIndex(activeIndex - 1)}
          type="button"
        >
          <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
          </svg>
        </button>
        <button
          aria-label="Next image"
          className="carousel__button"
          disabled={activeIndex === items.length - 1}
          onClick={() => scrollToIndex(activeIndex + 1)}
          type="button"
        >
          <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
          </svg>
        </button>
        <div aria-hidden="true" className="carousel__dots">
          {items.map((item, index) => (
            <span className={`carousel__dot ${index === activeIndex ? "is-active" : ""}`} key={item.src} />
          ))}
        </div>
        <p className="carousel__count">
          {activeIndex + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}
