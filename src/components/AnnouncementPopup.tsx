"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SEEN_KEY = "mendozer-shusplash-seen";
const OPEN_DELAY_MS = 1600;

/**
 * Site-wide launch popup for the Shu Splush campaign page.
 * Shows once per browser (localStorage flag), 1.6 s after load. Closes on
 * Escape, the close button, the backdrop, or "Maybe later"; the CTA click
 * also records the seen-flag so a completed visit is not repeated. Focus is
 * trapped inside the dialog while it is open and restored on close.
 */
export function AnnouncementPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const timer = window.setTimeout(() => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = restoreFocusRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const persistSeen = () => {
      try {
        window.localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Storage unavailable (private mode); the popup simply shows again.
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        persistSeen();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      // Focus may land outside the panel (e.g. after a click on inert text);
      // re-seat it at the panel edge instead of letting Tab escape.
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus();
    };
  }, [open]);

  const close = () => {
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage unavailable; ignore.
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="announce-popup" onClick={close}>
      <div
        aria-label="Shu Splush launch announcement"
        aria-modal="true"
        className="announce-popup__panel"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close announcement"
          className="announce-popup__close"
          onClick={close}
          ref={closeRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
        <Image
          alt="Time to save: wash 2 pairs for only N$50, Shu Splush launch poster"
          className="announce-popup__poster"
          height={1400}
          src="/images/blog/shu-splush-promo.webp"
          width={1054}
        />
        <div className="announce-popup__body">
          <h2 className="announce-popup__title">Shu Splush is open</h2>
          <p className="announce-popup__text">
            Sneaker cleaning at Dorado Valley Shopping Centre, close to Ara bar. Drop off your kicks, collect them fresh.
          </p>
          <div className="announce-popup__actions">
            <a className="button button--primary" href="/shu-splash" onClick={close}>
              <span>See Shu Splush</span>
            </a>
            <button className="announce-popup__later" onClick={close} type="button">
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
