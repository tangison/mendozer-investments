import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { proofDocuments } from "@/content/proof-documents";
import { siteConfig } from "@/brand/site-config";

const ProofCarousel = dynamic(
  () => import("@/components/ProofCarousel").then((module) => module.ProofCarousel),
);
const ClientLogoGrid = dynamic(
  () => import("@/components/ClientLogoGrid").then((module) => module.ClientLogoGrid),
);

export const metadata: Metadata = {
  title: "Proof of Work & Certifications",
  description:
    "Selected reference letters, completion certificates and awards from our clients: Roads Authority, NamPower, PowerCom, NamPost, regional councils, town councils and more.",
  alternates: { canonical: "/certifications" },
};

/** Factual ItemList of the on-file documents (client + document type only). */
function proofItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Proof of Work & Certifications",
    itemListElement: proofDocuments
      .filter((doc) => doc.showPublic)
      .map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: `${doc.type} from ${doc.client}`,
          about: doc.client,
          genre: doc.type,
          associatedMedia: {
            "@type": "MediaObject",
            contentUrl: `${siteConfig.url}${doc.pdfPath}`,
            encodingFormat: "application/pdf",
          },
        },
      })),
  };
}

export default function CertificationsPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(proofItemList()) }} type="application/ld+json" />

      <section className="section certifications-hero">
        <div className="site-container">
          <Reveal><p className="eyebrow">Proof of work</p></Reveal>
          <Reveal><h1>Proof of Work &amp; Certifications</h1></Reveal>
          <Reveal>
            <p className="certifications-hero__intro">
              Selected reference letters, completion certificates and awards from our clients.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="breadcrumbs-wrap">
        <div className="site-container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Proof of work" }]} /></div>
      </div>

      <section className="section section--surface proof-section">
        <div className="site-container">
          <Reveal>
            <ProofCarousel />
          </Reveal>
        </div>
      </section>

      <ClientLogoGrid
        body="Organisations we work with across government and industry, shown with their verified official marks."
        eyebrow="Clients"
        id="clients"
        title="Trusted by Government & Industry Across Namibia"
      />

      <section className="section certifications-links">
        <div className="site-container certifications-links__grid">
          <Reveal>
            <p className="eyebrow">Verify further</p>
            <h2>Public records and past work.</h2>
            <p>
              Registration, VAT and licensing details sit on the public records page. The work archive
              shows the sites behind these documents, and the About page carries the story of how the
              group runs each sector.
            </p>
            <p className="cta-panel__links">
              <Link className="text-link" href="/compliance">Public records <ArrowIcon /></Link>
              <Link className="text-link" href="/work">Past work <ArrowIcon /></Link>
              <Link className="text-link" href="/about">About the group <ArrowIcon /></Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Get in touch</p><h2>Tell us what you are building.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/contact">Brief the team <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
