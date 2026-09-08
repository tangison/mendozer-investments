import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getSpecialistService, specialistServices } from "@/content/site-services";

export const dynamicParams = false;

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return specialistServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getSpecialistService(slug);
  if (!service) return {};
  const pathname = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: pathname },
    openGraph: {
      title: `${service.title} | Mendozer Investments`,
      description: service.description,
      type: "website",
      url: pathname,
      images: [{ url: `/og/services-${service.slug}.png`, width: 1200, height: 630, alt: `${service.title} | Mendozer Investments` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Mendozer Investments`,
      description: service.description,
      images: [`/og/services-${service.slug}.png`],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getSpecialistService(slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
