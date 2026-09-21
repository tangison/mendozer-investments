import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { verifiedFacts } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "The Mendozer Investments company profile: one Namibian group across six sectors since 2009, led by Managing Director Johannes Negumbo.",
  alternates: { canonical: "/profile" },
  openGraph: {
    type: "website",
    url: "/profile",
    images: [{ url: "/og/about.png", width: 1200, height: 630, alt: "Mendozer Investments company profile" }],
  },
};

const directions = [
  {
    number: "01",
    title: "Construction & Infrastructure",
    body: "Civil and building work on open sites: access, structures, and the coordination of crews on the ground.",
    href: "/sectors/construction",
  },
  {
    number: "02",
    title: "Technology & Systems",
    body: "Field systems and telecom infrastructure, including tower installation and the equipment that keeps teams linked.",
    href: "/sectors/technology",
  },
  {
    number: "03",
    title: "Cooling & Cold Chain",
    body: "Facility work around plant rooms, piping, and the controlled conditions that keep operations continuous.",
    href: "/sectors/cooling",
  },
  {
    number: "04",
    title: "Logistics & Support Services",
    body: "Moving people, materials, and support through active sites and changing work routes.",
    href: "/sectors/logistics",
  },
  {
    number: "05",
    title: "Fuel & Energy Distribution",
    body: "Wholesale fuel distribution under licence W/188/2017, with supporting plant and infrastructure.",
    href: "/sectors/energy",
  },
  {
    number: "06",
    title: "Tourism & Agriculture",
    body: "Land, access, and rural operating settings across the Namibian landscape.",
    href: "/sectors/tourism",
  },
];

const framework = [
  {
    number: "01",
    title: "Start in one place",
    body: "One enquiry covers every capability the job needs, so the full scope lands with the people who can deliver it.",
  },
  {
    number: "02",
    title: "Choose the closest fit",
    body: "Begin where the work is. Choose Group enquiry when the scope crosses disciplines and other sectors join from there.",
  },
  {
    number: "03",
    title: "Built for Namibia",
    body: "Real crews on real Namibian sites since 2009; the archive on this site is the group's own.",
  },
];

export default function ProfilePage() {
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;

  return (
    <>
      <PageHero
        body="Mendozer Investments CC has operated in Namibia since 2009, registered under CC/2009/2399. Six sectors, one line of accountability: construction, technology, cooling, logistics, energy and tourism."
        breadcrumbLabel="Company Profile"
        eyebrow="Company profile"
        media={{
          src: "/images/projects/construction/site-works-wide-01.webp",
          alt: "Broad view across a Mendozer building work site",
          status: "real",
          focus: "50% 50%",
        }}
        title="Building Value. Delivering Excellence."
      />

      <section className="section section--surface">
        <div className="site-container about-intro">
          <SectionHeading
            body="Construction, technology, cooling, logistics, energy and tourism run on one operating backbone. Start with the sector closest to the job; the rest of the group joins when the brief crosses disciplines."
            eyebrow="01 · The group"
            title="One group for the work ahead."
          />
          <Reveal>
            <dl className="profile-stats">
              <div><dt>Founded</dt><dd>2009</dd></div>
              <div><dt>Sectors</dt><dd>6</dd></div>
              <div><dt>Registration</dt><dd>CC/2009/2399</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section leadership-section">
        <div className="site-container leadership-section__grid">
          <div className="leadership-section__index" aria-hidden="true" />
          <div>
            <SectionHeading eyebrow="02 · Leadership" title="A clear line of accountability." />
            <Reveal>
              <div className="leadership-card">
                <p className="eyebrow">Group leadership</p>
                <h2>Johannes Negumbo</h2>
                <p className="leadership-card__role">Managing Director</p>
                <p>
                  Johannes Negumbo, Managing Director of Mendozer Investments CC, is the point of accountability for group
                  enquiries across all six sectors. Every sector is planned around the people, systems, sites and logistics
                  that surround it.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <MediaFrame
              asset={{
                src: "/images/projects/logistics/crew-roadside.webp",
                alt: "Mendozer work crew gathered beside a road",
                status: "real",
                focus: "50% 30%",
              }}
              className="media-frame--tall media-frame--rounded"
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-container">
          <SectionHeading
            body="Six sectors, one group. Start with the one closest to the work."
            eyebrow="03 · Sectors"
            title="Six directions. One standard."
          />
          <div className="profile-directions">
            {directions.map((direction) => (
              <Reveal key={direction.number}>
                <Link className="profile-direction" href={direction.href}>
                  <span className="profile-direction__number">{direction.number}</span>
                  <span className="profile-direction__title">{direction.title}</span>
                  <span className="profile-direction__body">{direction.body}</span>
                  <span aria-hidden="true" className="profile-direction__arrow"><ArrowIcon /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionHeading
            body="Every sector is planned around the people, systems, sites and logistics that surround it."
            eyebrow="04 · How the group works"
            title="How the group works."
          />
          <div className="commitments-grid">
            {framework.map((item) => (
              <Reveal key={item.number}>
                <article className="commitment-card">
                  <span>{item.number}</span>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="profile-enquiry">
              <p className="eyebrow">What to include in an enquiry</p>
              <ul>
                <li>A short description of the work.</li>
                <li>The relevant sector, or Group enquiry if it crosses more than one.</li>
                <li>Any useful site or operating detail.</li>
                <li>Who to reach.</li>
              </ul>
              <Link className="text-link" href="/contact">Prepare a group enquiry <ArrowIcon /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="site-container legal-section__grid">
          <div>
            <SectionHeading
              body="Registration, VAT and licensing details you can check yourself. Anything further is published only when it is approved."
              eyebrow="05 · Verified records"
              inverse
              title="The records behind the name."
            />
            <Reveal>
              <a className="button button--light profile-download" download href="/documents/mendozer-company-profile.pdf">
                <span>Download the company profile (PDF)</span><ArrowIcon />
              </a>
            </Reveal>
          </div>
          <Reveal>
            <div>
              <dl>
                <div><dt>Registration no.</dt><dd>CC/2009/2399</dd></div>
                <div><dt>VAT no.</dt><dd>04948459-015</dd></div>
                <div><dt>Wholesale fuel licence</dt><dd>W/188/2017</dd></div>
                <div><dt>Public source</dt><dd>Namibia Government Gazette No. 8655, 4 June 2025, Annexure 1</dd></div>
                <div><dt>Email</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
                <div><dt>Telephone</dt><dd><a href={siteConfig.phone.href}>{siteConfig.phone.display}</a></dd></div>
                <div><dt>Windhoek office</dt><dd>{siteConfig.office.suite}, {siteConfig.office.building}, {siteConfig.office.street}, {siteConfig.office.locality}</dd></div>
                <div><dt>Postal</dt><dd>{siteConfig.postalBox}</dd></div>
              </dl>
              <div className="legal-section__licence">
                <p className="eyebrow eyebrow--light">{fuelLicence.eyebrow}</p>
                <p>{fuelLicence.body}</p>
                <a href={fuelLicence.sourceUrl} rel="noopener noreferrer" target="_blank">Source: {fuelLicence.sourceLabel}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-container community-report">
          <Reveal>
            <div className="community-report__index" aria-hidden="true">2026</div>
            <div>
              <p className="eyebrow">06 · Community & sponsorship</p>
              <h2>Sponsorship visible where people gather.</h2>
            </div>
          </Reveal>
          <Reveal>
            <p>
              Mendozer presented the Otjiwarongo Sports Bonanza 2026 at Mokati Stadium, 21 to 23 August, where Namaqua FC
              beat Ama Roots FC 2 to 1 for the title and a N$45,000 prize pool across three codes. The group also recorded
              sponsorship visibility at Miss Teen Namibia 2026.
            </p>
            <Link className="text-link" href="/community">See the community work <ArrowIcon /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Get in touch</p><h2>Tell us what you are building.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/contact">Start your enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
