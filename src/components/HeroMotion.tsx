"use client";

import { useEffect, useRef, useState } from "react";

type HeroMotionProps = {
  webm: string;
  mp4: string;
  webm720: string;
  mp4720: string;
  poster: string;
  className?: string;
  /** Hero copy is the page's focus; the push-in copy defers until scrolled near. */
  lazy?: boolean;
};

const MOBILE_QUERY = "(max-width: 48rem)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Background motion layer for the 63-second sector loop.
 *
 * Serves the 720p build to small screens and the 1080p build above that, holds
 * the poster until the first frame can actually paint, and never mounts sources
 * for viewers who ask for reduced motion. Playback is muted, inline and looped
 * with no exposed controls, so it reads as texture rather than media.
 */
export function HeroMotion({ webm, mp4, webm720, mp4720, poster, className = "", lazy = false }: HeroMotionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"mobile" | "desktop" | null>(null);
  const [allowMotion, setAllowMotion] = useState(false);
  const [isNear, setIsNear] = useState(!lazy);
  const [isPainted, setIsPainted] = useState(false);

  // Resolve viewport class and motion preference before committing to a source,
  // so a phone never downloads the 1080p build.
  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);

    const sync = () => {
      setVariant(mobile.matches ? "mobile" : "desktop");
      setAllowMotion(!reduced.matches);
    };

    sync();
    mobile.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      mobile.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  // Defer the push-in video until it is close to the viewport.
  useEffect(() => {
    if (!lazy || isNear) return;
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, isNear]);

  const shouldMount = allowMotion && variant !== null && isNear;

  // Autoplay can be refused (low power mode, background tab). Retry on the
  // events that signal the tab is interactive again rather than failing quiet.
  useEffect(() => {
    const video = videoRef.current;
    if (!shouldMount || !video) return;

    let cancelled = false;
    const attempt = () => {
      if (cancelled || video.paused === false) return;
      const played = video.play();
      if (played?.catch) played.catch(() => undefined);
    };

    attempt();
    const onVisible = () => { if (document.visibilityState === "visible") attempt(); };
    video.addEventListener("loadeddata", attempt);
    video.addEventListener("canplay", attempt);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", attempt);
      video.removeEventListener("canplay", attempt);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [shouldMount, variant]);

  // Pause fully offscreen so the loop costs nothing further down the page.
  useEffect(() => {
    const video = videoRef.current;
    if (!shouldMount || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const played = video.play();
            if (played?.catch) played.catch(() => undefined);
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldMount]);

  const sources = variant === "mobile"
    ? [{ src: webm720, type: "video/webm" }, { src: mp4720, type: "video/mp4" }]
    : [{ src: webm, type: "video/webm" }, { src: mp4, type: "video/mp4" }];

  return (
    <div aria-hidden="true" className={`hero-motion ${className}`} ref={wrapRef}>
      <div className="hero-motion__poster" style={{ backgroundImage: `url(${poster})` }} />
      {shouldMount ? (
        <video
          className={`hero-motion__video${isPainted ? " is-painted" : ""}`}
          disablePictureInPicture
          disableRemotePlayback
          key={variant}
          loop
          muted
          onPlaying={() => setIsPainted(true)}
          playsInline
          poster={poster}
          preload="metadata"
          ref={videoRef}
          tabIndex={-1}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : null}
      <div className="hero-motion__veil" />
    </div>
  );
}
