import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { specialistServices } from "@/content/site-services";

const HERO = {
  src: "/images/projects/services/electric-fencing/front-778.webp",
  alt: "Electric fencing installed on a precast boundary wall",
  caption: "",
  status: "real" as const,
  focus: "50% 55%",
};

export const metadata: Metadata = {
  title: "Construction Services",
  description:
    "Mendozer Investments specialist construction services: electric fencing, walls and precast, gate automation, and general construction and building across Namibia.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Construction Services | Mendozer Investments",
    description: "Electric fencing, walls and precast, gate automation, and general construction and building.",
    type: "website",
    url: "/services",
    images: [{ url: "/og/services.png", width: 1200, height: 630, alt: "Mendozer Investments construction services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Services | Mendozer Investments",
    description: "Electric fencing, walls and precast, gate automation, and general construction and building.",
    images: ["/og/services.png"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        body="Specialist security and building services delivered by the Mendozer group: electric fencing, precast walling, gate automation and general construction, shown through real installed work."
        breadcrumbLabel="Services"
        eyebrow="Mendozer services"
        media={HERO}
        title="Built to secure and to last."
      />
      <section className="section services-hub">
        <div className="site-container">
          <SectionHeading
            body="Each service page uses client-supplied photographs of real installations. Captions stay generic and no installation is presented as a named project."
            eyebrow="Four specialist services"
            title="Choose the work closest to the brief."
          />
          <div className="services-hub__grid">
            {specialistServices.map((service, index) => (
              <Reveal delay={index * 90} key={service.slug}>
                <Link className="service-card" href={`/services/${service.slug}`}>
                  <div className="service-card__media">
                    <Image
                      alt={service.hero.alt}
                      height={service.hero.height}
                      sizes="(max-width: 900px) 100vw, 46vw"
                      src={service.hero.src}
                      width={service.hero.width}
                    />
                  </div>
                  <div className="service-card__body">
                    <p className="eyebrow">{service.eyebrow}</p>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <span className="text-link">View the service <ArrowIcon /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-container services-note">
          <SectionHeading
            body="These specialist services work alongside the group sectors. A boundary or building brief can be scoped together with the wider project."
            eyebrow="Part of the wider group"
            title="One group, several ways to build."
          />
          <Reveal delay={120}>
            <Link className="text-link" href="/sectors"><span>Explore the six sectors</span><ArrowIcon /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Ready to scope a job</p><h2>Start with a site visit and a clear quote.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
