"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { brandAssets } from "@/brand/assets";

const MIN_MS = 700;
const MAX_MS = 2200;

export function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    let done = false;

    const tick = () => {
      setProgress((current) => {
        if (current >= 92) return current;
        return Math.min(92, current + (current < 40 ? 4 : 1.6));
      });
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    const finish = () => {
      if (done) return;
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => {
          done = true;
          setVisible(false);
        }, 180);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const failSafe = window.setTimeout(finish, MAX_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(failSafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="boot-screen">
      <div className="boot-screen__mark">
        <Image alt="" height={88} src={brandAssets.icon} unoptimized width={88} />
      </div>
      <div className="boot-screen__track">
        <span className="boot-screen__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
