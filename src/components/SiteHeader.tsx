"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent } from "@/content/site-content";

/** Desktop primary nav: two quiet dropdown groups plus direct links. */
const groupLinks = [
  { label: "About", href: "/about" },
  { label: "Company profile", href: "/profile" },
  { label: "Services", href: "/services" },
  { label: "Public records", href: "/compliance" },
  { label: "Updates", href: "/updates" },
] as const;

const directLinks = [
  { label: "Work", href: "/work" },
  { label: "Community", href: "/community" },
  { label: "News", href: "/blog" },
] as const;

/** Off-canvas menu: one compact list, one contact strip. */
const menuLinks = [
  { label: "Home", href: "/" },
  ...siteContent.navigation,
  { label: "News", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

function usesDarkHero(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/services") ||
    pathname === "/sectors" ||
    pathname.startsWith("/sectors/") ||
    pathname === "/work" ||
    pathname === "/profile" ||
    pathname === "/updates" ||
    pathname === "/compliance" ||
    pathname === "/community" ||
    pathname === "/contact" ||
    pathname.startsWith("/blog")
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"group" | "sectors" | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeDropdownTimeout = useRef<number | null>(null);

  const isOverDarkHero = usesDarkHero(pathname);
  const logoSrc = isOverDarkHero && !isScrolled ? brandAssets.logoDark : brandAssets.logoLight;

  /** Close transient navigation states when the route changes (render-time reset). */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setIsOpen(false);
  }

  useEffect(() => {
    const updateScrollState = () => setIsScrolled((current) => {
      const next = window.scrollY > 20;
      return current === next ? current : next;
    });

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  /** Non-modal dropdowns: Escape closes, pointer leaves close after a short grace period. */
  useEffect(() => {
    if (!openDropdown) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openDropdown]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundRegions = [
      headerRef.current,
      document.getElementById("main-content"),
      document.querySelector("footer"),
      document.querySelector(".utility-widgets"),
    ].filter(Boolean) as HTMLElement[];

    document.body.style.overflow = "hidden";
    backgroundRegions.forEach((region) => region.setAttribute("inert", ""));
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

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
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      backgroundRegions.forEach((region) => region.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => () => {
    if (closeDropdownTimeout.current) window.clearTimeout(closeDropdownTimeout.current);
  }, []);

  function openMenu() {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function scheduleDropdownClose() {
    if (closeDropdownTimeout.current) window.clearTimeout(closeDropdownTimeout.current);
    closeDropdownTimeout.current = window.setTimeout(() => setOpenDropdown(null), 140);
  }

  function cancelDropdownClose() {
    if (closeDropdownTimeout.current) window.clearTimeout(closeDropdownTimeout.current);
  }

  function handleDropdownKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") setOpenDropdown(null);
  }

  return (
    <>
      <header className={`site-header ${isOverDarkHero ? "site-header--over-dark" : ""} ${isScrolled ? "site-header--scrolled" : ""}`} ref={headerRef}>
        <div className="site-container site-header__inner">
          <Link aria-label="Mendozer Investments home" className="site-header__brand" href="/">
            <Image alt="Mendozer Investments" height={56} priority src={logoSrc} unoptimized width={178} />
          </Link>
          <div className="site-header__tools">
            <nav aria-label="Primary" className="site-header__nav">
              <div
                className={`site-header__nav-item ${openDropdown === "group" ? "is-open" : ""}`}
                onPointerEnter={() => { cancelDropdownClose(); setOpenDropdown("group"); }}
                onPointerLeave={scheduleDropdownClose}
              >
                <button
                  aria-expanded={openDropdown === "group"}
                  aria-haspopup="true"
                  onClick={() => setOpenDropdown((current) => (current === "group" ? null : "group"))}
                  onKeyDown={handleDropdownKeys}
                  type="button"
                >
                  The group
                  <span aria-hidden="true" className="site-header__caret" />
                </button>
                <div className="site-header__dropdown" onPointerEnter={cancelDropdownClose} onPointerLeave={scheduleDropdownClose}>
                  <ul>
                    {groupLinks.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={() => setOpenDropdown(null)} tabIndex={openDropdown === "group" ? 0 : -1}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`site-header__nav-item ${openDropdown === "sectors" ? "is-open" : ""}`}
                onPointerEnter={() => { cancelDropdownClose(); setOpenDropdown("sectors"); }}
                onPointerLeave={scheduleDropdownClose}
              >
                <button
                  aria-expanded={openDropdown === "sectors"}
                  aria-haspopup="true"
                  onClick={() => setOpenDropdown((current) => (current === "sectors" ? null : "sectors"))}
                  onKeyDown={handleDropdownKeys}
                  type="button"
                >
                  Sectors
                  <span aria-hidden="true" className="site-header__caret" />
                </button>
                <div className="site-header__dropdown site-header__dropdown--wide" onPointerEnter={cancelDropdownClose} onPointerLeave={scheduleDropdownClose}>
                  <ul className="site-header__dropdown-grid">
                    {sectors.map((sector) => (
                      <li key={sector.slug}>
                        <Link href={`/sectors/${sector.slug}`} onClick={() => setOpenDropdown(null)} tabIndex={openDropdown === "sectors" ? 0 : -1}>
                          {sector.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="site-header__dropdown-cta" href="/sectors" onClick={() => setOpenDropdown(null)} tabIndex={openDropdown === "sectors" ? 0 : -1}>
                    All six sectors
                  </Link>
                </div>
              </div>

              {directLinks.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link className="site-header__nav-cta" href="/contact">
                Contact
              </Link>
            </nav>
            <button
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-label="Open navigation"
              className="site-header__menu-toggle"
              onClick={openMenu}
              type="button"
            >
              <span aria-hidden="true" className="site-header__menu-label">Menu</span>
              <span aria-hidden="true" className="menu-icon" />
            </button>
          </div>
        </div>
      </header>

      {isOpen ? (
        <div className="site-menu">
          <div aria-label="Mendozer group navigation" aria-modal="true" className="site-menu__dialog" id="mendozer-navigation" ref={menuRef} role="dialog">
            <div className="site-container site-menu__top">
              <Image alt="Mendozer Investments" height={56} priority src={brandAssets.logoDark} unoptimized width={178} />
              <button aria-label="Close navigation" className="site-menu__close" onClick={closeMenu} ref={closeRef} type="button">
                <span aria-hidden="true" className="menu-icon menu-icon--close" />
              </button>
            </div>

            <div className="site-container site-menu__main">
              <nav aria-label="Group pages" className="site-menu__links">
                {menuLinks.map((item) => (
                  <Link href={item.href} key={item.href} onClick={closeMenu}>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="site-menu__strip">
                <div className="site-menu__strip-actions">
                  <Link className="button button--light" href="/contact" onClick={closeMenu}>Start an enquiry</Link>
                </div>
                <dl className="site-menu__contact-details">
                  <div><dt>Email</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
                  <div><dt>Telephone</dt><dd><a href={siteConfig.phone.href}>{siteConfig.phone.display}</a></dd></div>
                  <div><dt>Public record</dt><dd><Link href="/compliance" onClick={closeMenu}>Registration, VAT and licences</Link></dd></div>
                </dl>
              </div>
            </div>

            <div className="site-container site-menu__footer">
              <span>Building Value. Delivering Excellence.</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
