"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type RevealVariant = "rise" | "fade" | "left" | "right" | "scale";

type RevealProps = Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
  children: ReactNode;
  /** Motion variant. Default "rise": a short translate up with the fade. */
  variant?: RevealVariant;
  /** Stagger delay in ms before the transition starts. */
  delay?: number;
  style?: CSSProperties;
};

/**
 * Shared IntersectionObserver: one instance drives every Reveal on the page.
 * Fires once per element, then lets go.
 */
let sharedObserver: IntersectionObserver | null = null;
function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
  }
  return sharedObserver;
}

/**
 * Scroll-life wrapper (owner-directed stance change, 2026-11-25; replaces the
 * former motion-cut stance). Reveals once on first intersection via the
 * `.is-in` class; CSS in globals.css carries the states, gated on the
 * `motion-ready` class set pre-paint in layout.tsx so no-JS visitors and
 * reduced-motion users always see full content.
 */
export function Reveal({ children, className = "", variant = "rise", delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    // Catch-up: anything fully inside the first frame reveals on mount, even
    // if it sits below the observer's lazy line (rootMargin shrink).
    const rect = el.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      el.classList.add("is-in");
      return;
    }
    getObserver()?.observe(el);
    return () => getObserver()?.unobserve(el);
  }, []);

  const mergedStyle: CSSProperties = delay
    ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties)
    : (style ?? {});

  return (
    <div className={className} data-reveal={variant} ref={ref} style={mergedStyle}>
      {children}
    </div>
  );
}
