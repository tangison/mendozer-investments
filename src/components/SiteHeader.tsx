"use client";

/* Hallmark pre-emit critique: P5 H5 E5 S5 R5 V5 */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent } from "@/content/site-content";

const primaryLinks = [
  { label: "Home", href: "/" },
  ...siteContent.navigation,
  { label: "Contact", href: "/contact" },
] as const;

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/#sectors") return pathname.startsWith("/sectors");
  return pathname === href;
}

/**
 * Floating group navigation with a Collins-inspired sparse chrome rhythm.
 * The composition is original to Mendozer: it preserves the supplied identity,
 * adds an accessible two-line menu control, and opens a full group directory.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateNavigationState = () => {
      const currentScroll = window.scrollY;
      const scrollableDistance = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setIsScrolled(currentScroll > 20);
      setScrollProgress(Math.min(currentScroll / scrollableDistance, 1));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__shell site-container">
          <div className="site-header__bar">
            <Link aria-label="Mendozer Investments home" className="site-header__brand" href="/">
              <Image alt="Mendozer Investments" height={56} priority src={brandAssets.logoLight} unoptimized width={178} />
            </Link>

            <nav aria-label="Primary navigation" className="site-header__desktop-nav">
              {siteContent.navigation.map((item) => (
                <Link className={isLinkActive(pathname, item.href) ? "is-active" : ""} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="site-header__actions">
              <Link className="button button--small site-header__contact" href="/contact">
                Start an enquiry
              </Link>
              <button
                aria-controls="group-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                className="site-header__menu-toggle"
                onClick={() => setIsOpen((open) => !open)}
                ref={toggleRef}
                type="button"
              >
                <span aria-hidden="true" className={`menu-icon ${isOpen ? "menu-icon--close" : ""}`} />
              </button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="site-header__progress"
          style={{ "--scroll-progress": scrollProgress } as CSSProperties}
        />
      </header>

      <div aria-hidden={!isOpen} className={`site-menu ${isOpen ? "site-menu--open" : ""}`} id="group-menu">
        <div aria-label="Mendozer group navigation" aria-modal="true" className="site-menu__panel" ref={menuRef} role="dialog">
          <div className="site-menu__top site-container">
            <Image alt="Mendozer Investments" height={56} src={brandAssets.logoDark} unoptimized width={178} />
            <button aria-label="Close navigation" className="site-menu__close" onClick={closeMenu} ref={closeRef} type="button">
              <span aria-hidden="true" className="menu-icon menu-icon--close" />
            </button>
          </div>

          <div className="site-menu__body site-container">
            <div className="site-menu__primary">
              <p className="eyebrow eyebrow--light">Navigate the group</p>
              <nav aria-label="Group pages" className="site-menu__links">
                {primaryLinks.map((item, index) => (
                  <Link href={item.href} key={item.href} onClick={closeMenu} style={{ "--menu-link-index": index } as CSSProperties}>
                    <span>{item.label}</span>
                    <span aria-hidden="true">0{index + 1}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="site-menu__sectors">
              <p className="eyebrow eyebrow--light">Six working directions</p>
              <div>
                {sectors.map((sector) => (
                  <Link href={`/sectors/${sector.slug}`} key={sector.slug} onClick={closeMenu}>
                    <span>{sector.number}</span>
                    <span>{sector.shortTitle}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="site-menu__bottom site-container">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span>{siteConfig.registration}</span>
            <span>{siteConfig.vat}</span>
          </div>
        </div>
      </div>
    </>
  );
}
