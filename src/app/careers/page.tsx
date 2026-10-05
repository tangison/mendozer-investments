import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { VacancyCountdown } from "@/components/careers/VacancyCountdown";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Current vacancy: Office Administrator, a 6-month fixed-term contract in Windhoek. Applications close 17 October 2026 at 17:00.",
  alternates: { canonical: "/careers" },
};

/**
 * Map embed: the owner-specified query "Continental Building, Judge JP Karuaihe
 * Street" renders a scattered area view with no building pin, so the embed pins
 * the exact verified building coordinates instead (OSM relation 10356998
 * "M+Z Building (Continental Building)", Fonnie Karuaihe Street; Fonnie Karuaihe
 * was Judge J.P. Karuaihe; cross-checked against Google's geocode of the
 * building's street frontage at 290 Independence Ave, same spot). The visible
 * address text keeps the owner's exact wording.
 */
const MAP_EMBED = "https://www.google.com/maps?q=-22.5631407,17.0844478&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Continental+Building+Judge+JP+Karuaihe+Street+Windhoek+Namibia";

/** schema.org JobPosting for the Office Administrator vacancy (no baseSalary: pay is market-related). */
function jobPosting() {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Office Administrator",
    description: [
      "Mendozer Investments is hiring an Office Administrator for a 6-month fixed-term contract in Windhoek.",
      "",
      "About the role: We are looking for an organised and dependable Office Administrator to support the Project Manager and keep our Windhoek office running smoothly. You will be the point of coordination between the office, the project team and our suppliers.",
      "",
      "Key responsibilities:",
      "- Day-to-day administrative support to the Project Manager, including diary, correspondence, meetings and minutes",
      "- Prepare, file and maintain project documents, records and registers",
      "- Follow up actions, deliveries and deadlines with site teams and suppliers",
      "- Capture project information such as orders, delivery notes, timesheets and site reports",
      "- Prepare quotations, purchase orders and supporting documents",
      "- Receive and direct calls, visitors, mail and couriers",
      "- Manage office supplies, stationery and the filing system",
      "- Other reasonable duties assigned by the Project Manager",
      "",
      "Qualifications to be met: Grade 12; certificate or diploma in office administration, business administration or a related field; eligible to work in Namibia.",
      "",
      "Experience and skills: at least 2 years' experience in an administrative or office support role; working knowledge of Microsoft Word, Excel and Outlook; good written and spoken English; accurate, organised and able to meet deadlines. Experience in a construction or project environment is an advantage.",
      "",
      "How to apply: Submit a hard copy of your CV, a short cover letter and copies of your ID and qualifications at Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek. Submissions are accepted until 17:00 on 17 October 2026. Applications are not accepted by email.",
    ].join("\n"),
    datePosted: "2026-10-05",
    validThrough: "2026-10-17T17:00:00+02:00",
    employmentType: "TEMPORARY",
    directApply: false,
    hiringOrganization: {
      "@type": "Organization",
      name: "Mendozer Investments CC",
      sameAs: "https://www.mendozer.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office 2, Continental Building, Judge JP Karuaihe Street",
        addressLocality: "Windhoek",
        addressCountry: "NA",
      },
    },
  };
}

const KEY_FACTS = [
  { term: "Company", detail: "Mendozer Investments CC" },
  { term: "Location", detail: "Windhoek, Namibia" },
  { term: "Contract", detail: "Fixed-term, 6 months" },
  { term: "Reports to", detail: "Project Manager" },
  { term: "Remuneration", detail: "Market-related, in line with industry standards" },
  { term: "Closing", detail: "17 October 2026, 17:00" },
] as const;

const RESPONSIBILITIES = [
  "Day-to-day administrative support to the Project Manager, including diary, correspondence, meetings and minutes",
  "Prepare, file and maintain project documents, records and registers",
  "Follow up actions, deliveries and deadlines with site teams and suppliers",
  "Capture project information such as orders, delivery notes, timesheets and site reports",
  "Prepare quotations, purchase orders and supporting documents",
  "Receive and direct calls, visitors, mail and couriers",
  "Manage office supplies, stationery and the filing system",
  "Other reasonable duties assigned by the Project Manager",
] as const;

const QUALIFICATIONS = [
  "Grade 12",
  "Certificate or diploma in office administration, business administration or a related field",
  "Eligible to work in Namibia",
] as const;

const EXPERIENCE = [
  "At least 2 years' experience in an administrative or office support role",
  "Working knowledge of Microsoft Word, Excel and Outlook",
  "Good written and spoken English",
  "Accurate, organised and able to meet deadlines",
] as const;

export default function CareersPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting()) }} type="application/ld+json" />

      <section className="section careers-hero">
        <div className="site-container">
          <Reveal><p className="eyebrow">Careers</p></Reveal>
          <Reveal><h1>Careers</h1></Reveal>
          <Reveal>
            <p className="careers-hero__intro">
              Current vacancy with Mendozer Investments CC in Windhoek.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="breadcrumbs-wrap">
        <div className="site-container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} /></div>
      </div>

      <section className="section section--surface careers-section">
        <div className="site-container">
          <Reveal>
            <article className="vacancy" data-vacancy="office-administrator">
              <div className="vacancy__head">
                <p className="vacancy__badge">URGENT VACANCY</p>
                <VacancyCountdown />
              </div>

              <div className="vacancy__top">
                <figure className="vacancy__flyer">
                  <Image
                    src="/images/careers/office-administrator-flyer.webp"
                    alt="Mendozer Investments urgent vacancy: Office Administrator. Applications close 17 October 2026."
                    width={1080}
                    height={1350}
                    sizes="(max-width: 720px) 92vw, 420px"
                    loading="lazy"
                  />
                </figure>

                <div className="vacancy__intro-block">
                  <h2 className="vacancy__title">Office Administrator</h2>
                  <p className="vacancy__intro">
                    Mendozer Investments is hiring an Office Administrator for a 6-month fixed-term
                    contract in Windhoek. Read the requirements below, then submit your application
                    before the countdown ends.
                  </p>

                  <dl className="vacancy-facts">
                    {KEY_FACTS.map((fact) => (
                      <div className="vacancy-facts__item" key={fact.term}>
                        <dt>{fact.term}</dt>
                        <dd>{fact.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="vacancy__body">
                <section className="vacancy__block">
                  <h3>About the role</h3>
                  <p>
                    We are looking for an organised and dependable Office Administrator to support the
                    Project Manager and keep our Windhoek office running smoothly. You will be the point
                    of coordination between the office, the project team and our suppliers.
                  </p>
                </section>

                <section className="vacancy__block">
                  <h3>Key responsibilities</h3>
                  <ul>
                    {RESPONSIBILITIES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="vacancy__block">
                  <h3>Qualifications to be met</h3>
                  <p>
                    Applicants must meet all of the minimum requirements below. Applications that do
                    not meet them will not be considered.
                  </p>
                  <ul>
                    {QUALIFICATIONS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="vacancy__block">
                  <h3>Experience and skills</h3>
                  <ul>
                    {EXPERIENCE.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="vacancy__block">
                  <h3>An advantage</h3>
                  <ul>
                    <li>Experience in a construction or project environment</li>
                  </ul>
                </section>

                <section className="vacancy__block">
                  <h3>How to apply</h3>
                  <p>
                    Submit a hard copy of your CV, a short cover letter and copies of your ID and
                    qualifications at:
                  </p>
                  <p className="vacancy__address">
                    Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek
                  </p>
                  <p>
                    Submissions are accepted until 17:00 on 17 October 2026. Applications are not
                    accepted by email.
                  </p>
                </section>

                <section className="vacancy__block">
                  <h3>Find us</h3>
                  <div className="vacancy__map">
                    <iframe
                      src={MAP_EMBED}
                      title="Map showing Office 2, Continental Building, Judge JP Karuaihe Street, Windhoek"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="cta-panel__links">
                    <Link className="text-link" href={MAP_LINK} rel="noopener noreferrer" target="_blank">
                      Open in Google Maps <ArrowIcon />
                    </Link>
                  </p>
                </section>

                <section className="vacancy__block">
                  <h3>Enquiries</h3>
                  <p>
                    Email enquiries only:{" "}
                    <a className="vacancy__mail" href="mailto:careers@mendozer.com">careers@mendozer.com</a>.
                    Please do not send CVs to this address.
                  </p>
                </section>

                <section className="vacancy__block vacancy__block--notes">
                  <h3>Notes</h3>
                  <p>
                    Only shortlisted candidates will be contacted. Mendozer Investments is an equal
                    opportunity employer. All applications are considered fairly and on merit, and
                    persons with disabilities are encouraged to apply. Your personal information is
                    used only for this recruitment process and handled confidentially. Mendozer
                    Investments does not charge a fee at any stage of recruitment.
                  </p>
                </section>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Get in touch</p><h2>Working with us.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/contact">Contact the team <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
