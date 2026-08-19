import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { legalPages } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Website terms for Mendozer Investments introductory group and sector information.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Website Terms | Mendozer Investments",
    description: "Website terms for Mendozer Investments introductory group and sector information.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return <LegalPageTemplate page={legalPages.terms} />;
}
