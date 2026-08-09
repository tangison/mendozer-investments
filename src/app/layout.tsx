import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import { siteConfig } from "@/brand/site-config";
import { MotionController } from "@/components/MotionController";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mendozer Investments | Multi-Sector Solutions, Built for Namibia",
    template: "%s | Mendozer Investments",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Mendozer Investments", "Namibia", "construction", "technology", "logistics", "energy"],
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
    url: "/",
    siteName: siteConfig.name,
    title: "Mendozer Investments",
    description: siteConfig.description,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendozer Investments",
    description: siteConfig.description,
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1E3D",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionController />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
