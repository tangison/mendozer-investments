/* Hallmark pre-emit critique: P5 H5 E5 S5 R5 V5 */

import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent, verifiedFacts } from "@/content/site-content";

/** A compact, information-rich footer built around direct group access rather than a second sales page. */
export function SiteFooter() {
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__masthead">
          <div>
            <Image alt="Mendozer Investments" height={72} src={brandAssets.logoDark} unoptimized width={230} />
            <p>{siteContent.footer.statement}</p>
          </div>
          <a className="site-footer__enquiry" href={`mailto:${siteConfig.email}`}>
            <span>Group enquiries</span>
            <strong>{siteConfig.email}</strong>
          </a>
        </div>

        <div className="site-footer__grid">
          <nav aria-label="Footer navigation" className="site-footer__column">
            <p className="eyebrow">Group</p>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/community">Community</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <nav aria-label="Sector navigation" className="site-footer__column site-footer__column--sectors">
            <p className="eyebrow">Working directions</p>
            <div>
              {sectors.map((sector) => (
                <Link href={`/sectors/${sector.slug}`} key={sector.slug}>{sector.shortTitle}</Link>
              ))}
            </div>
          </nav>

          <div className="site-footer__column site-footer__column--details">
            <p className="eyebrow">Company details</p>
            <span>Registration {siteContent.footer.registrationLabel}</span>
            <span>{siteContent.footer.vatLabel}</span>
            <Link href="/privacy">Privacy notice</Link>
            <Link href="/terms">Website terms</Link>
            <a href={fuelLicence.sourceUrl} rel="noreferrer" target="_blank">
              Wholesale fuel licence W/188/2017
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Mendozer Investments.</p>
          <p>Multi-sector group, Namibia.</p>
          <a className="tangison-credit" href="https://studio.tangison.com" rel="noreferrer" target="_blank">
            <span>Made by</span>
            <Image alt="Tangison Studio" height={24} src={brandAssets.tangisonWhite} unoptimized width={96} />
          </a>
        </div>
      </div>
    </footer>
  );
}
