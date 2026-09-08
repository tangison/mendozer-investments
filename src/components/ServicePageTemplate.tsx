import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/brand/site-config";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageSlider } from "@/components/ImageSlider";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { specialistServices, type GalleryImage, type SpecialistService } from "@/content/site-services";

type ServicePageTemplateProps = {
  service: SpecialistService;
};

function toSlides(images: readonly GalleryImage[]) {
  return images.map((image) => ({ src: image.src, width: image.width, height: image.height, alt: image.alt }));
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const index = specialistServices.findIndex((item) => item.slug === service.slug);
  const next = specialistServices[(index + 1) % specialistServices.length];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(`/services/${service.slug}`) },
    ],
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} type="application/ld+json" />
      <PageHero
        body={service.description}
        eyebrow={service.eyebrow}
        index={service.number}
        media={{
          src: service.hero.src,
          alt: service.hero.alt,
          caption: "",
          status: service.hero.status,
          focus: service.hero.focus,
        }}
        title={service.title}
      />

      <div className="breadcrumbs-wrap">
        <div className="site-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortTitle }]} />
        </div>
      </div>

      <section className="section section--surface">
        <div className="site-container service-intro">
          <div>
            <SectionHeading
              body="Real client-supplied photographs of this service are shown on this page. The images are unlabelled and the sites are not named."
              eyebrow="Service overview"
              title="What this specialist service involves."
            />
            <Reveal delay={120}>
              <p className="service-intro__lead">{service.description}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {service.sections.map((section, sectionIndex) => {
        const sliderId = `service-${service.slug}-${sectionIndex}`;
        const gallerySlides = section.gallery ? toSlides(section.gallery) : [];
        const detailSlides = section.detail ? toSlides(section.detail) : [];
        return (
          <section className={`section svc-section ${section.promo ? "svc-section--surface" : ""}`} key={section.title}>
            <div className="site-container">
              <SectionHeading body={section.body} eyebrow={section.eyebrow} title={section.title} />

              {section.scope && section.scope.length ? (
                <div className="service-list">
                  {section.scope.map((scopeItem, i) => (
                    <Reveal delay={i * 80} key={scopeItem.title}>
                      <article className="service-item">
                        <span className="service-item__number">0{i + 1}</span>
                        <div>
                          <h2>{scopeItem.title}</h2>
                          <p>{scopeItem.description}</p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : null}

              {section.promo ? (
                <div className="svc-promo">
                  <div className="svc-promo__art">
                    <Image
                      alt={section.promo.alt}
                      className="svc-promo__img"
                      height={section.promo.height}
                      sizes="(max-width: 900px) 100vw, 480px"
                      src={section.promo.src}
                      width={section.promo.width}
                    />
                  </div>
                  <div className="svc-promo__note">
                    <p className="eyebrow">Promotional graphic</p>
                    <p>{section.promo.note}</p>
                    <p className="svc-promo__contact">Phone and email details on the graphic are preserved exactly as supplied by Mendozer Investments.</p>
                  </div>
                </div>
              ) : null}

              {detailSlides.length ? (
                <div className="svc-slider-wrap">
                  <ImageSlider
                    aspect="4 / 3"
                    idPrefix={sliderId}
                    label={`${service.shortTitle}, ${section.title}`}
                    slides={detailSlides}
                  />
                </div>
              ) : null}

              {gallerySlides.length ? (
                <div className="svc-slider-wrap">
                  <ImageSlider
                    aspect="4 / 3"
                    idPrefix={`${sliderId}-gallery`}
                    label={`${service.shortTitle}, ${section.title}`}
                    slides={gallerySlides}
                  />
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      <section className="sector-crossover">
        <div className="site-container sector-crossover__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">Working across the group</p>
            <p className="sector-crossover__quote">
              Specialist construction services sit alongside the group&apos;s wider sectors, so security, walling and building work can be scoped with the
              rest of the project.
            </p>
          </Reveal>
          <div className="sector-crossover__links">
            <Link className="text-link text-link--light" href="/sectors">
              <span>See the six sectors</span>
              <ArrowIcon />
            </Link>
            <Link className="text-link text-link--light" href={`/services/${next.slug}`}>
              <span>Next service: {next.shortTitle}</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal>
            <p className="eyebrow">Start with a site visit</p>
            <h2>Bring the boundary or build into a conversation.</h2>
          </Reveal>
          <Reveal delay={110}>
            <Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
