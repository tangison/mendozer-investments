"use client";

import { useEffect } from "react";

/** Marks motion as enabled for tests and optional polish. Content stays visible without JS. */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        node.classList.add("is-revealed");
      });
    };

    revealAll();

    if (reduceMotion.matches) {
      return;
    }

    root.dataset.motion = "enabled";

    const onPreferenceChange = () => {
      if (reduceMotion.matches) {
        revealAll();
        root.removeAttribute("data-motion");
      }
    };
    reduceMotion.addEventListener("change", onPreferenceChange);

    return () => {
      reduceMotion.removeEventListener("change", onPreferenceChange);
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
