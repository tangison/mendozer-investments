"use client";

import { useEffect } from "react";

/** One restrained motion engine for viewport reveals; all durations/easing live in tokens.css. */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        node.classList.add("is-revealed");
      });
    };

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const viewportHeight = window.innerHeight;

    nodes.forEach((node) => {
      const top = node.getBoundingClientRect().top;
      if (top < viewportHeight * 0.92) node.classList.add("is-revealed");
    });

    root.dataset.motion = "enabled";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px 15% 0px", threshold: 0.01 },
    );

    nodes.forEach((node) => {
      if (!node.classList.contains("is-revealed")) observer.observe(node);
    });

    const onPreferenceChange = () => {
      if (reduceMotion.matches) {
        revealAll();
        root.removeAttribute("data-motion");
      }
    };
    reduceMotion.addEventListener("change", onPreferenceChange);

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", onPreferenceChange);
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
