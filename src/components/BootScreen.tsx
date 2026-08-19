"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/brand/assets";

const BOOT_MS = 420;

export function BootScreen() {
  const pathname = usePathname();
  const firstPaint = useRef(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }

    let hideTimer = 0;
    const showTimer = window.setTimeout(() => {
      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), BOOT_MS);
    }, 0);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="boot-screen">
      <div className="boot-screen__mark">
        <Image alt="" height={88} src={brandAssets.icon} unoptimized width={88} />
      </div>
      <div className="boot-screen__track">
        <span className="boot-screen__fill" />
      </div>
    </div>
  );
}
