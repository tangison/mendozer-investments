import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Image alt="Mendozer Investments" height={72} src={brandAssets.logoDark} unoptimized width={230} />
            <p>{siteContent.footer.statement}</p>
          </div>
          <div className="site-footer__links">
            <div>
              <p className="eyebrow">Explore</p>
              <Link href="/about">About</Link>
              <Link href="/community">Community</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <p className="eyebrow">Sectors</p>
              {sectors.map((sector) => (
                <Link href={`/sectors/${sector.slug}`} key={sector.slug}>{sector.shortTitle}</Link>
              ))}
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <span>{siteContent.footer.registrationLabel}</span>
              <span>{siteContent.footer.vatLabel}</span>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Mendozer Investments. All rights reserved.</p>
          <a className="tangison-credit" href="https://studio.tangison.com" rel="noreferrer" target="_blank">
            <span>Made by</span>
            <Image alt="Tangison Studio" height={24} src={brandAssets.tangisonWhite} unoptimized width={96} />
          </a>
        </div>
      </div>
    </footer>
  );
}
