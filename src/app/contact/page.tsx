import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mendozer Investments: +264 85 777 7077 or contact@mendozer.com. Windhoek satellite office at Office 2, Continental Building, Judge JP Karuaihe Street.",
  alternates: { canonical: "/contact" },
  openGraph: { images: [{ url: "/og/contact.png", width: 1200, height: 630, alt: "Contact Mendozer Investments" }] },
};

export default function ContactPage() {
  const { contact } = siteContent;
  const officeAddress = `${siteConfig.office.suite}, ${siteConfig.office.building}, ${siteConfig.office.street} (${siteConfig.office.streetFormerName}), ${siteConfig.office.locality}, ${siteConfig.office.country}`;

  return (
    <>
      <PageHero body={contact.body} breadcrumbLabel="Contact" eyebrow={contact.eyebrow} media={contact.media} title={contact.title} />
      <section className="section contact-section">
        <div className="site-container contact-section__grid">
          <div className="contact-section__details">
            <SectionHeading
              body="Call, email, or visit the Windhoek satellite office. Secure delivery is used when it is configured, with your email application available as a fallback."
              eyebrow="Get in touch"
              title="The direct route to Mendozer."
            />
            <Reveal delay={140}>
              <a className="contact-channel contact-channel--phone" href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            </Reveal>
            <Reveal delay={170}>
              <a className="contact-channel contact-channel--email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </Reveal>
            <Reveal delay={230}>
              <dl className="contact-legal">
                <div>
                  <dt>Windhoek office</dt>
                  <dd>
                    {siteConfig.office.suite}, {siteConfig.office.building}
                    <br />
                    {siteConfig.office.street} ({siteConfig.office.streetFormerName})
                    <br />
                    {siteConfig.office.locality}, {siteConfig.office.country}
                  </dd>
                </div>
                <div>
                  <dt>Postal</dt>
                  <dd>{siteConfig.postalBox}</dd>
                </div>
                <div><dt>Registration no.</dt><dd>{siteConfig.registration}</dd></div>
                <div><dt>VAT no.</dt><dd>{siteConfig.vat}</dd></div>
              </dl>
            </Reveal>
          </div>
          <Reveal delay={120} variant="right"><ContactForm /></Reveal>
        </div>
      </section>

      <section className="section section--surface contact-office-section">
        <div className="site-container">
          <SectionHeading
            body="The group now meets clients and partners in the capital from a satellite office at the Continental Building, on Judge JP Karuaihe Street, formerly Lüderitz Street. Active work continues on sites across the country."
            eyebrow="Find the office"
            title="The Windhoek satellite office."
          />
          <div className="contact-office__grid">
            <Reveal delay={120}>
              <div className="map-embed">
                <iframe
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={siteConfig.maps.embedSrc}
                  title={`Map showing ${siteConfig.name} at ${officeAddress}`}
                />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="contact-office__aside">
                <p className="eyebrow">Mendozer Investments</p>
                <h3>Office 2, Continental Building.</h3>
                <address>
                  Judge JP Karuaihe Street (formerly Lüderitz Street)
                  <br />
                  Windhoek, Namibia
                </address>
                <p>
                  <a className="text-link" href={siteConfig.maps.directionsUrl} rel="noreferrer" target="_blank">Get directions</a>
                </p>
                <p>
                  <a className="text-link" href={siteConfig.maps.listingUrl} rel="noreferrer" target="_blank">View the Google listing</a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
