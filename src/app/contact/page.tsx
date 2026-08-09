import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { BrandArtwork } from "@/components/BrandArtwork";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mendozer Investments for a group or sector enquiry.",
  alternates: { canonical: "/contact" },
  openGraph: { images: [{ url: "/og/contact.png", width: 1200, height: 630, alt: "Contact Mendozer Investments" }] },
};

export default function ContactPage() {
  const { contact } = siteContent;
  return (
    <>
      <section className="contact-hero">
        {/* PLACEHOLDER: an abstract brand-gradient visual is used because no relevant contact-page photography exists. */}
        <BrandArtwork className="contact-hero__artwork" />
        <div className="site-container contact-hero__inner">
          <Reveal><p className="eyebrow eyebrow--light">{contact.eyebrow}</p></Reveal>
          <Reveal delay={90}><h1>{contact.title}</h1></Reveal>
          <Reveal delay={180}><p>{contact.body}</p></Reveal>
        </div>
      </section>
      <section className="section contact-section">
        <div className="site-container contact-section__grid">
          <div className="contact-section__details">
            <SectionHeading
              body="For a direct enquiry, email the group. The form creates a pre-addressed message without storing your information on this website."
              eyebrow="Get in touch"
              title="The direct route to Mendozer."
            />
            <Reveal delay={170}>
              <a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </Reveal>
            <Reveal delay={230}>
              <dl className="contact-legal">
                <div><dt>Registration no.</dt><dd>{siteConfig.registration}</dd></div>
                <div><dt>VAT no.</dt><dd>{siteConfig.vat}</dd></div>
              </dl>
            </Reveal>
          </div>
          <Reveal delay={120} variant="right"><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
