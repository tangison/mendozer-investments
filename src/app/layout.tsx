import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { BootScreen } from "@/components/BootScreen";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { UtilityWidgets } from "@/components/UtilityWidgets";

const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
  fallback: ["Avenir Next", "Century Gothic", "Arial"],
});

const redHatDisplay = localFont({
  src: "../fonts/red-hat-display.woff2",
  variable: "--font-red-hat-display",
  display: "swap",
  preload: true,
  fallback: ["Poppins", "Avenir Next", "Century Gothic", "Arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mendozer Investments | Built for Namibia",
    template: "%s | Mendozer Investments",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Mendozer Investments", "Namibia", "construction", "technology", "cooling", "logistics", "energy", "tourism"],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon.ico" },
      { url: "/assets/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Mendozer Investments",
    description: siteConfig.description,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendozer Investments",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.browserTheme.dark,
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL(brandAssets.logoLight, siteConfig.url).toString(),
    email: siteConfig.email,
    telephone: siteConfig.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: `Office 2, Continental Building, ${siteConfig.office.street}`,
      addressLocality: siteConfig.office.locality,
      addressCountry: "NA",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
    identifier: [
      { "@type": "PropertyValue", propertyID: "Registration number", value: siteConfig.registration },
      { "@type": "PropertyValue", propertyID: "VAT number", value: siteConfig.vat },
    ],
  };

  return (
    <html className={`${poppins.variable} ${redHatDisplay.variable}`} lang="en">
      <head>
        <link fetchPriority="high" href="/videos/hero/desert-loop-poster.jpg" rel="preload" as="image" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} type="application/ld+json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.motion="enabled";document.querySelectorAll("[data-reveal]").forEach(function(n){n.classList.add("is-revealed")});`,
          }}
        />
        <BootScreen />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <UtilityWidgets />
      </body>
    </html>
  );
}
