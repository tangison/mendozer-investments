"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type SlideImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type ImageSliderProps = {
  slides: readonly SlideImage[];
  idPrefix: string;
  label: string;
  aspect?: string;
  className?: string;
};

/**
 * Sliding image carousel.
 * - Slides horizontally; autoplay pauses on hover/focus, off-screen, user
 *   interaction, or when the visitor prefers reduced motion.
 * - Buttons and dots are full keyboard-operable and labelled.
 * - Images carry descriptive alt text; no visible caption text is rendered,
 *   because caption copy is not confirmed content.
 */
export function ImageSlider({ slides, idPrefix, label, aspect = "4 / 3", className = "" }: ImageSliderProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setInteracted(true);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const step = useCallback(
    (dir: number) => {
      goTo(index + dir);
    },
    [goTo, index],
  );

  useEffect(() => {
    if (count <= 1 || interacted || hovered || focused || !inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [count, interacted, hovered, focused, inView]);

  if (count === 0) return null;
  const single = count === 1;

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className={`image-slider ${className}`.trim()}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={regionRef}
      role="region"
    >
      <div className="image-slider__viewport">
        <div className="image-slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide) => (
            <div className="image-slider__slide" key={`${idPrefix}-${slide.src}`}>
              <div className="image-slider__frame" style={{ aspectRatio: aspect }}>
                <Image
                  alt={slide.alt}
                  className="image-slider__image"
                  fill
                  sizes="(max-width: 760px) 100vw, 900px"
                  src={slide.src}
                />
              </div>
            </div>
          ))}
        </div>

        {single ? null : (
          <>
            <button
              aria-label={`${label}, previous image`}
              className="image-slider__btn image-slider__btn--prev"
              onClick={() => step(-1)}
              type="button"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              aria-label={`${label}, next image`}
              className="image-slider__btn image-slider__btn--next"
              onClick={() => step(1)}
              type="button"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}
      </div>

      <div className="image-slider__footer">
        {single ? null : (
          <>
            <span className="image-slider__count">
              {index + 1} / {count}
            </span>
            <div className="image-slider__dots">
              {slides.map((slide, dotIndex) => (
                <button
                  aria-current={dotIndex === index ? "true" : undefined}
                  aria-label={`${label}, go to image ${dotIndex + 1} of ${count}`}
                  className={`image-slider__dot${dotIndex === index ? " image-slider__dot--active" : ""}`}
                  key={`${idPrefix}-dot-${slide.src}`}
                  onClick={() => goTo(dotIndex)}
                  type="button"
                />
              ))}
            </div>
            <span aria-hidden="true" className="image-slider__spacer" />
          </>
        )}
      </div>
    </div>
  );
}
