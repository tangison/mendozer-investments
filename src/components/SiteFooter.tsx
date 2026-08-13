import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent, verifiedFacts } from "@/content/site-content";

export function SiteFooter() {
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__brand-row">
          <Image alt="Mendozer Investments" height={313} src={brandAssets.logoDark} style={{ height: "auto" }} unoptimized width={800} />
        </div>

        <div className="site-footer__masthead">
          <p>{siteContent.footer.statement}</p>
          <a className="site-footer__enquiry" href={`mailto:${siteConfig.email}`}>
            <span>Group enquiries</span>
            <strong>{siteConfig.email}</strong>
          </a>
        </div>

        <div className="site-footer__grid">
          <nav aria-label="Footer navigation" className="site-footer__column">
            <p className="eyebrow eyebrow--light">Group</p>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/sectors">Sectors</Link>
            <Link href="/work">Work context</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/compliance">Public records</Link>
            <Link href="/community">Community</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <nav aria-label="Sector navigation" className="site-footer__column site-footer__column--sectors">
            <p className="eyebrow eyebrow--light">Working directions</p>
            <div>
              {sectors.map((sector) => <Link href={`/sectors/${sector.slug}`} key={sector.slug}>{sector.shortTitle}</Link>)}
            </div>
          </nav>

          <div className="site-footer__column site-footer__column--details">
            <p className="eyebrow eyebrow--light">Company details</p>
            <span>Registration {siteContent.footer.registrationLabel}</span>
            <span>{siteContent.footer.vatLabel}</span>
            <a href={fuelLicence.sourceUrl} rel="noreferrer" target="_blank">Wholesale fuel licence W/188/2017</a>
            <Link href="/privacy">Privacy notice</Link>
            <Link href="/terms">Website terms</Link>
            <div className="site-footer__social">
              <a href={siteConfig.social.instagram} aria-label="Mendozer Investments on Instagram" rel="noreferrer" target="_blank">Instagram</a>
              <a href={siteConfig.social.facebook} aria-label="Mendozer Investments on Facebook" rel="noreferrer" target="_blank">Facebook</a>
            </div>
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
