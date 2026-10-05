"use client";

import { useEffect, useState } from "react";

/**
 * Fixed deadline: 17 October 2026, 17:00 Namibia time (CAT, UTC+02:00, no DST).
 * The timestamp carries its own offset so every visitor counts down to the
 * same instant regardless of their device time zone.
 */
const CLOSING_AT = new Date("2026-10-17T17:00:00+02:00").getTime();

type Remaining = { days: string; hours: string; minutes: string; seconds: string };

function computeRemaining(): Remaining | null {
  const diff = CLOSING_AT - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

const UNITS = [
  { key: "days", name: "Days" },
  { key: "hours", name: "Hours" },
  { key: "minutes", name: "Minutes" },
  { key: "seconds", name: "Seconds" },
] as const;

export function VacancyCountdown() {
  // Server render and the first client render agree on placeholder tiles.
  // The first real value is scheduled one animation frame after mount, which
  // keeps hydration stable and avoids synchronous setState inside the effect.
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tick = () => {
      setMounted(true);
      setRemaining(computeRemaining());
    };
    const frame = requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  if (mounted && remaining === null) {
    return (
      <div className="vacancy-countdown vacancy-countdown--closed">
        <p className="vacancy-closed">Applications are now closed</p>
      </div>
    );
  }

  return (
    <div className="vacancy-countdown" role="timer">
      <p className="vacancy-countdown__label">Applications close in</p>
      <div className="vacancy-countdown__grid">
        {UNITS.map((unit) => (
          <div className="vacancy-countdown__unit" key={unit.key}>
            <span className="vacancy-countdown__value">{remaining ? remaining[unit.key] : "00"}</span>
            <span className="vacancy-countdown__name">{unit.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
