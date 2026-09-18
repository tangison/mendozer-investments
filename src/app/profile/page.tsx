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
    "The Mendozer Investments company profile: one Namibian group across construction, technology, cooling, logistics, energy and tourism since 2009, led by Managing Director Johannes Negumbo.",
  alternates: { canonical: "/profile" },
  openGraph: {
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
    body: "One direct route for enquiries that need more than one capability. Bring the full scope of the work into a single conversation with the group.",
  },
  {
    number: "02",
    title: "Choose the closest fit",
    body: "Begin with the sector that matches the immediate work, then widen the conversation where needed. Choose Group enquiry when the scope crosses disciplines.",
  },
  {
    number: "03",
    title: "Built for Namibia",
    body: "The group is introduced through local working context, not a generic imported template: real site context, verified records, and work delivered with care.",
  },
];

export default function ProfilePage() {
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;

  return (
    <>
      <PageHero
        body="Mendozer Investments CC has operated in Namibia since 2009, registered under CC/2009/2399. The group brings six working directions into one accountable line for partners, institutions and commercial enquiries."
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
            body="Construction, technology, cooling, logistics, energy and tourism are connected by one operational backbone. Start with the sector closest to the work in front of you, and bring the group in when the brief crosses disciplines. Every direction carries the same standard: real site context, verified records, and work delivered with care."
            eyebrow="01 · The group"
            title="One group for the work ahead."
          />
          <Reveal delay={150}>
            <dl className="profile-stats">
              <div><dt>Founded</dt><dd>2009</dd></div>
              <div><dt>Working directions</dt><dd>6</dd></div>
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
            <Reveal delay={150}>
              <div className="leadership-card">
                <p className="eyebrow">Group leadership</p>
                <h2>Johannes Negumbo</h2>
                <p className="leadership-card__role">Managing Director</p>
                <p>
                  Johannes Negumbo is the Managing Director of Mendozer Investments CC, the accountable line for group
                  enquiries across all six working directions. A broad group view means each sector can be understood in
                  relation to the people, systems, sites, and logistics around it.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100} variant="right">
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
            body="Six working directions, one accountable group. Start with the sector closest to the work."
            eyebrow="03 · Working directions"
            title="Six directions. One standard."
          />
          <div className="profile-directions">
            {directions.map((direction, index) => (
              <Reveal delay={index * 80} key={direction.number}>
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
            body="A broad group view means each sector can be understood in relation to the people, systems, sites, and logistics around it."
            eyebrow="04 · How the group works"
            title="A clear framework for a wider portfolio."
          />
          <div className="commitments-grid">
            {framework.map((item, index) => (
              <Reveal delay={index * 100} key={item.number}>
                <article className="commitment-card">
                  <span>{item.number}</span>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <div className="profile-enquiry">
              <p className="eyebrow">What to include in an enquiry</p>
              <ul>
                <li>A short description of the work or opportunity.</li>
                <li>The relevant sector, or Group enquiry if it crosses more than one.</li>
                <li>Any useful site or operating context.</li>
                <li>The best person to contact.</li>
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
              body="Mendozer publishes registration detail and public licensing records that can be verified. Additional compliance material is added only when it is approved for publication."
              eyebrow="05 · Verified records"
              inverse
              title="Verified details, stated plainly."
            />
            <Reveal delay={150}>
              <a className="button button--light profile-download" download href="/documents/mendozer-company-profile.pdf">
                <span>Download the company profile (PDF)</span><ArrowIcon />
              </a>
            </Reveal>
          </div>
          <Reveal delay={140}>
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
          <Reveal variant="left">
            <div className="community-report__index" aria-hidden="true">2026</div>
            <div>
              <p className="eyebrow">06 · Community & sponsorship</p>
              <h2>Sponsorship visible where people gather.</h2>
            </div>
          </Reveal>
          <Reveal delay={130} variant="right">
            <p>
              Mendozer presented the Otjiwarongo Sports Bonanza 2026 at Mokati Stadium, 21 to 23 August, where Namaqua FC
              beat Ama Roots FC 2 to 1 for the title and a N$45,000 prize pool across three codes. The group also recorded
              sponsorship visibility at Miss Teen Namibia 2026.
            </p>
            <Link className="text-link" href="/community">View community context <ArrowIcon /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Start a conversation</p><h2>Bring the right work into focus.</h2></Reveal>
          <Reveal delay={100}><Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
