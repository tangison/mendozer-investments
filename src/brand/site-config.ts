/** Centralized deployment configuration. Change the environment variable at cutover. */
export const siteConfig = {
  name: "Mendozer Investments",
  shortName: "Mendozer",
  description: "Mendozer Investments is a multi-sector Namibian group spanning construction, technology, cooling, logistics, energy and tourism, built for local delivery.",
  email: "contact@mendozer.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mendozer.tangison.com",
  locale: "en_NA",
  registration: "CC/2009/2399",
  vat: "04948459-015",
  phone: {
    display: "+264 85 777 7077",
    nationalDisplay: "085 777 7077",
    href: "tel:+264857777077",
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
