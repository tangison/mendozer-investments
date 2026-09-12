import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { legalPages } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "The privacy notice explains what the Mendozer Investments website collects, how contact enquiries are handled, and the choices available to website visitors.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Notice | Mendozer Investments",
    description: "The privacy notice explains what the Mendozer Investments website collects, how contact enquiries are handled, and the choices available to website visitors.",
    url: "/privacy",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments" }],
  },
};

export default function PrivacyPage() {
  return <LegalPageTemplate page={legalPages.privacy} />;
}
