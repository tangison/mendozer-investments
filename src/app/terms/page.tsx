import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { legalPages } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Website terms for the Mendozer Investments site: how the introductory group and sector information may be used, and the limits that apply to that information.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Website Terms | Mendozer Investments",
    description: "Website terms for the Mendozer Investments site: how the introductory group and sector information may be used, and the limits that apply to that information.",
    url: "/terms",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments" }],
  },
};

export default function TermsPage() {
  return <LegalPageTemplate page={legalPages.terms} />;
}
