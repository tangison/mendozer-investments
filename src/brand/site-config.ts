/** Centralized deployment configuration. Change the environment variable at cutover. */
export const siteConfig = {
  name: "Mendozer Investments",
  shortName: "Mendozer",
  description: "Multi-sector solutions, built for Namibia.",
  email: "contact@mendozer.com",
  stagingUrl: "https://mendozer.tangison.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mendozer.tangison.com",
  locale: "en_NA",
  registration: "CC/2009/2399",
  vat: "04948459-015",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
