/**
 * Resolve the canonical site URL.
 * 1. NEXT_PUBLIC_SITE_URL (explicit owner override) wins.
 * 2. On Vercel production builds the VERCEL_PROJECT_PRODUCTION_URL system
 *    variable carries the real production domain (e.g. mendozer.com), so
 *    sitemap URLs, canonicals and og:url never fall back to the preview host.
 * 3. Otherwise (local dev, Tangison preview builds) keep the preview host.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://mendozer.tangison.com";
}

/** Centralized deployment configuration. Change the environment variable at cutover. */
export const siteConfig = {
  name: "Mendozer Investments",
  shortName: "Mendozer",
  description: "Mendozer Investments runs six Namibian sectors under one team: construction, technology, cooling, logistics, energy and tourism. On site since 2009.",
  email: "info@mendozer.com",
  url: resolveSiteUrl(),
  locale: "en_NA",
  registration: "CC/2009/2399",
  vat: "04948459-015",
  phone: {
    display: "+264 85 777 7077",
    nationalDisplay: "085 777 7077",
    href: "tel:+264857777077",
    /** WhatsApp click-to-chat. wa.me requires the international format without a plus sign. */
    whatsapp: "https://wa.me/264857777077",
    whatsappDisplay: "085 777 7077",
  },
  postalBox: "P.O. Box 22205, Windhoek, Namibia",
  office: {
    label: "Windhoek satellite office",
    suite: "Office 2",
    building: "Continental Building",
    street: "Judge JP Karuaihe Street",
    streetFormerName: "formerly Lüderitz Street",
    locality: "Windhoek",
    country: "Namibia",
  },
  maps: {
    embedSrc:
      "https://maps.google.com/maps?q=Mendozer%20Investments%2C%20Judge%20JP%20Karuaihe%20Street%2C%20Windhoek%2C%20Namibia&t=m&z=16&output=embed",
    listingUrl: "https://www.google.com/maps/place/Mendozer+Investments",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Mendozer+Investments%2C+Judge+JP+Karuaihe+Street%2C+Windhoek%2C+Namibia",
  },
  browserTheme: {
    background: "#FFFFFF",
    dark: "#0B1E3D",
  },
  social: {
    instagram: "https://www.instagram.com/mendozer_investments",
    facebook: "https://www.facebook.com/61593183452392",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
