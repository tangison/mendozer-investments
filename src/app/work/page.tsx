import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent, workContexts, workMasonry } from "@/content/site-content";

const MasonryGallery = dynamic(
  () => import("@/components/MasonryGallery").then((module) => module.MasonryGallery),
);

export const metadata: Metadata = {
  title: "Past Work",
  description: "Past work from the Mendozer archive: sites, field work and facilities across Namibia, published only with approval.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Mendozer Investments past work" }],
  },
};

/** Project register transcribed from the two Mendozer company-profile PDFs (2012-2025). */
const workRegister: Array<{ project: string; client: string; period: string }> = [
  { project: "Plumbing repair and replacement, Tohama Government flats", client: "Khomas Regional (Ministry of Works)", period: "February 2012" },
  { project: "Block of 4 classrooms, Mayara Combined School", client: "Kavango Region (Ministry of Works)", period: "May 2012" },
  { project: "Plumbing repair and replacement, National Library, Windhoek", client: "Khomas Regional (Ministry of Works)", period: "June 2012" },
  { project: "Painting of classrooms, hall, administration block and interlocks, Windhoek", client: "Khomas Regional (Ministry of Works)", period: "November 2012" },
  { project: "Ablution block for clinics, Tsandi-Onamandongo village", client: "Omusati Region (Ministry of Works)", period: "January 2013" },
  { project: "Pump station and manholes uplift, Okahao Police Station", client: "Omusati Region (Ministry of Works)", period: "March 2013" },
  { project: "Water pump station construction, Ogongo", client: "Omusati Region", period: "September 2013" },
  { project: "Block of 4 classrooms, Eunda Combined School", client: "Omusati Region (Ministry of Works)", period: "November 2013" },
  { project: "NDF House renovation, Grootfontein", client: "Ministry of Defence", period: "June 2014" },
  { project: "Nampol House renovation, Swakopmund", client: "Ministry of Works", period: "October 2014" },
  { project: "Elephant-proof fence electrification, Etosha", client: "Ministry of Environment and Tourism", period: "November 2014" },
  { project: "Renovation of 8 houses and 2 flat blocks, Ariamsvlei, //Karas Region", client: "Ministry of Finance Customs", period: "November 2014" },
  { project: "Large ablution block, Ikava Combined School", client: "Zambezi Regional Council", period: "2015" },
  { project: "New boundary wall and upright security fencing, Erongo Regional Council", client: "Erongo Region", period: "2015" },
  { project: "Mowe Bay Police Station and storage facility fencing", client: "Kunene Region (Ministry of Safety and Security)", period: "2016" },
  { project: "Large administration block, Ompundja Circuit", client: "Oshana Regional Council", period: "2016" },
  { project: "Filling station construction, Kamanjab", client: "Total Namibia", period: "2016" },
  { project: "Major renovation, Okaukuejo Restaurant", client: "NWR", period: "2017" },
  { project: "House construction, Otjiwarongo", client: "Otjiwarongo Town Council", period: "2018" },
  { project: "Farm fence rehabilitation", client: "Rooi-Kopb no. 387 (Ministry of Land Reform)", period: "November 2018" },
  { project: "Major revamp, Waterburg swimming pool", client: "NWR", period: "March 2019" },
  { project: "Farm fence rehabilitation", client: "Neu-Samerau (Ministry of Land Reform)", period: "April 2019" },
  { project: "Farm fence construction", client: "Farm Neu Schawaben No. 148 (Ministry of Land Reform)", period: "July 2019" },
  { project: "Major revamp, music museum", client: "Museum of Namibia, Omuthiya", period: "August 2019" },
  { project: "Razor fence construction, Singalamwe staff houses", client: "Zambezi Region", period: "August 2019" },
  { project: "Government resettlement fencing construction and rehabilitation", client: "Kunene Region", period: "May 2020" },
  { project: "Road maintenance, Khorixas", client: "Khorixas Town Council", period: "March 2021" },
  { project: "Road maintenance, Tsandi", client: "Tsandi Village Council", period: "May 2021" },
  { project: "Bitumen road maintenance", client: "Aranos Town Council", period: "November 2021" },
  { project: "Bitumen road maintenance at extension 1 (Rukonga Vision School), Divundu", client: "Kavango East Region", period: "September 2022" },
  { project: "Sewer and water reticulation installation", client: "Leonardville Village Council", period: "March 2023" },
  { project: "Air conditioner supply and installation, Kunene Regional Council offices", client: "Kunene Regional Council", period: "October 2025" },
];

export default function WorkPage() {
  const { work } = siteContent;

  return (
    <>
      <PageHero body={work.body} breadcrumbLabel="Past Work" eyebrow={work.eyebrow} media={work.hero} title={work.title} />
      <section className="section work-contexts">
        <div className="site-container">
          <SectionHeading
            body="Real work from the group archive. Project names, clients, locations and scope detail appear only once approved for publication."
            eyebrow="Past work"
            title="The work speaks for itself."
          />
          <div className="work-contexts__grid">
            {workContexts.map((context) => (
              <Reveal key={context.title}>
                <article className="work-context-card">
                  <MediaFrame asset={context.media} className="media-frame--work-context media-frame--rounded" sizes="(max-width: 760px) 100vw, 33vw" />
                  <div>
                    <p className="eyebrow">{context.sector}</p>
                    <h2>{context.title}</h2>
                    <p>{context.body}</p>
                    <Link aria-label={`${context.linkLabel ?? "See this sector"}: ${context.title}`} className="text-link" href={context.href}>{context.linkLabel ?? "See this sector"} <ArrowIcon /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface work-masonry-section">
        <div className="site-container">
          <SectionHeading
            body="Past work from the archive across construction, technology, cooling, logistics, energy and community. Select any image to view it larger."
            eyebrow="Previous work"
            title="Recent work, in one view."
          />
          <Reveal>
            <MasonryGallery items={workMasonry} label="Previous work gallery" />
          </Reveal>
        </div>
      </section>
      <section className="section work-register-section">
        <div className="site-container">
          <SectionHeading
            body="The project register from the Mendozer company profile: public-sector and private work delivered across Namibia from 2012 to 2025, listed with the client and the delivery period. Contract values stay in the original documents."
            eyebrow="Project register"
            title="Delivered work, 2012 to 2025."
          />
          <Reveal>
            <div className="table-scroll" role="region" aria-label="Project register, scrolls horizontally" tabIndex={0}>
              <table className="work-register">
                <thead>
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Client</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  {workRegister.map((row) => (
                    <tr key={row.project}>
                      <td>{row.project}</td>
                      <td>{row.client}</td>
                      <td>{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="work-register__note">
              Transcribed from the Mendozer company profile. Client names and periods are reproduced as recorded there; obvious typographical errors are
              corrected.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Published carefully</p><h2>Bring the relevant work into one enquiry.</h2></Reveal>
          <Reveal><Link className="button button--primary" href="/contact">Prepare an enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
