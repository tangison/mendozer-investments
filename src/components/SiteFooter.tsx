"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { getSector, sectors, siteContent, verifiedFacts } from "@/content/site-content";

type FooterKind = "home" | "sector" | "news" | "contact" | "brand" | "legal" | "group";

function kindFromPath(pathname: string): FooterKind {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/sectors/")) return "sector";
  if (pathname.startsWith("/blog")) return "news";
  if (pathname === "/contact") return "contact";
  if (pathname === "/brand") return "brand";
  if (pathname === "/privacy" || pathname === "/terms") return "legal";
  return "group";
}

export function SiteFooter() {
  const pathname = usePathname() || "/";
  const kind = kindFromPath(pathname);
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;
  const year = new Date().getFullYear();
  const sector = pathname.startsWith("/sectors/") ? getSector(pathname.split("/")[2] || "") : undefined;

  return (
    <footer className={`site-footer site-footer--${kind}`}>
      <div className="site-container site-footer__stage">
        <div className="site-footer__brand-col">
          <a className="site-footer__email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a className="site-footer__phone" href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          <p className="site-footer__office">
            {siteConfig.office.suite}, {siteConfig.office.building}, {siteConfig.office.street}, {siteConfig.office.locality}
          </p>
        </div>

        <div className="site-footer__menus">
          {kind === "home" ? (
            <>
              <FooterAccordion title="This weekend" defaultOpen>
                <Link href="/blog/otjiwarongo-sports-bonanza-2026">Sports Bonanza 2026</Link>
                <Link href="/community">Community</Link>
                <Link href="/contact">Send an enquiry</Link>
              </FooterAccordion>
              <FooterAccordion title="Directions">
                {sectors.map((item) => (
                  <Link href={`/sectors/${item.slug}`} key={item.slug}>{item.shortTitle}</Link>
                ))}
              </FooterAccordion>
              <FooterAccordion title="Group">
                <Link href="/about">About</Link>
                <Link href="/work">Work</Link>
                <Link href="/compliance">Public records</Link>
                <Link href="/contact">Contact</Link>
              </FooterAccordion>
            </>
          ) : null}

          {kind === "sector" ? (
            <>
              <FooterAccordion title={sector?.shortTitle ?? "This direction"} defaultOpen>
                <Link href="/contact">Enquire on this direction</Link>
                <Link href="/work">Work context</Link>
                <Link href="/sectors">All directions</Link>
              </FooterAccordion>
              <FooterAccordion title="Other directions">
                {sectors.filter((item) => item.slug !== sector?.slug).map((item) => (
                  <Link href={`/sectors/${item.slug}`} key={item.slug}>{item.shortTitle}</Link>
                ))}
              </FooterAccordion>
              <FooterAccordion title="Group">
                <Link href="/about">About</Link>
                <Link href="/compliance">Public records</Link>
                <Link href="/contact">Contact</Link>
              </FooterAccordion>
            </>
          ) : null}

          {kind === "news" ? (
            <>
              <FooterAccordion title="Event" defaultOpen>
                <Link href="/blog/otjiwarongo-sports-bonanza-2026">Sports Bonanza 2026</Link>
                <Link href="/blog">All news</Link>
                <Link href="/community">Community</Link>
              </FooterAccordion>
              <FooterAccordion title="Group">
                <Link href="/about">About</Link>
                <Link href="/sectors">Sectors</Link>
                <Link href="/contact">Contact</Link>
              </FooterAccordion>
            </>
          ) : null}

          {kind === "contact" ? (
            <>
              <FooterAccordion title="Direct" defaultOpen>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <Link href="/compliance">Public records</Link>
                <Link href="/privacy">Privacy</Link>
              </FooterAccordion>
              <FooterAccordion title="Directions">
                {sectors.map((item) => (
                  <Link href={`/sectors/${item.slug}`} key={item.slug}>{item.shortTitle}</Link>
                ))}
              </FooterAccordion>
            </>
          ) : null}

          {kind === "brand" ? (
            <>
              <FooterAccordion title="Marks" defaultOpen>
                <Link href="/brand">Brand identity</Link>
                <Link href="/contact">Request the kit</Link>
              </FooterAccordion>
              <FooterAccordion title="Group">
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </FooterAccordion>
            </>
          ) : null}

          {kind === "legal" ? (
            <>
              <FooterAccordion title="Legal" defaultOpen>
                <Link href="/privacy">Privacy notice</Link>
                <Link href="/terms">Website terms</Link>
                <a href={fuelLicence.sourceUrl} rel="noreferrer" target="_blank">Fuel licence W/188/2017</a>
              </FooterAccordion>
              <FooterAccordion title="Group">
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </FooterAccordion>
            </>
          ) : null}

          {kind === "group" ? (
            <>
              <FooterAccordion title="Group" defaultOpen>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/work">Work</Link>
                <Link href="/updates">Updates</Link>
                <Link href="/community">Community</Link>
                <Link href="/contact">Contact</Link>
              </FooterAccordion>
              <FooterAccordion title="Directions">
                {sectors.map((item) => (
                  <Link href={`/sectors/${item.slug}`} key={item.slug}>{item.shortTitle}</Link>
                ))}
              </FooterAccordion>
              <FooterAccordion title="Company">
                <span>Registration {siteContent.footer.registrationLabel}</span>
                <span>{siteContent.footer.vatLabel}</span>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </FooterAccordion>
            </>
          ) : null}
        </div>
      </div>

      <div className="site-footer__mark-band">
        <div className="site-container">
          <Link aria-label="Mendozer Investments home" className="site-footer__mark-band-link" href="/">
            <Image alt="Mendozer Investments" height={280} src={brandAssets.logoMonoWhite} unoptimized width={980} />
          </Link>
        </div>
      </div>

      <div className="site-footer__legal-row">
        <div className="site-container site-footer__legal-inner">
          <p>© {year} Mendozer Investments CC. All rights reserved.</p>
          <div className="site-footer__social">
            <a href={siteConfig.social.instagram} aria-label="Mendozer Investments on Instagram" rel="noreferrer" target="_blank">Instagram</a>
            <a href={siteConfig.social.facebook} aria-label="Mendozer Investments on Facebook" rel="noreferrer" target="_blank">Facebook</a>
            <a className="tangison-credit" href="https://studio.tangison.com" rel="noreferrer" target="_blank">Site by Tangison</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="site-footer__accordion" open={defaultOpen}>
      <summary>
        <span>{title}</span>
        <span aria-hidden="true" className="site-footer__accordion-marker" />
      </summary>
      <div className="site-footer__accordion-body">{children}</div>
    </details>
  );
}
