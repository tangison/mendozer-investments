import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/brand/assets";
import { siteContent } from "@/content/site-content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner site-container">
        <Link aria-label="Mendozer Investments home" className="site-header__brand" href="/">
          <Image
            alt="Mendozer Investments"
            height={56}
            priority
            src={brandAssets.logoLight}
            unoptimized
            width={178}
          />
        </Link>
        <nav aria-label="Primary navigation" className="site-header__desktop-nav">
          {siteContent.navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <Link className="button button--small site-header__contact" href="/contact">
          Contact
        </Link>
        <details className="site-header__menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation" className="site-header__mobile-nav">
            <Link href="/">Home</Link>
            {siteContent.navigation.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
            <Link className="button button--small" href="/contact">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
