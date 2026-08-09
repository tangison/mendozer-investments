/**
 * MENDOZER CONTENT LAYER
 *
 * This is the only source of brand copy, IA labels, and asset-to-sector assignments.
 * Components consume these objects and remain reusable for future Tangison corporate builds.
 * All visual sector matches are unconfirmed client-supplied context photographs; captions stay generic.
 */

export type SectorSlug =
  | "construction"
  | "technology"
  | "cooling"
  | "logistics"
  | "energy"
  | "tourism";

export type GlyphName =
  | "structure"
  | "signal"
  | "cooling"
  | "route"
  | "energy"
  | "landscape";

export type MediaAsset = {
  src: string;
  alt: string;
  caption: string;
  status: "real" | "generated";
  focus?: string;
};

export type Service = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LegalPage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
};

export type VerifiedFact = {
  eyebrow: string;
  title: string;
  body: string;
  sourceLabel: string;
  sourceUrl: string;
};

/** Independently verifiable public record, safe to state without a client-verification marker. */
export const verifiedFacts = {
  wholesaleFuelLicence: {
    eyebrow: "Verified public record",
    title: "Wholesale fuel distribution licence",
    body: "Mendozer Investments CC holds wholesale fuel distribution licence W/188/2017.",
    sourceLabel: "Namibia Government Gazette No. 8287, 3 January 2024, p. 6",
    sourceUrl: "https://www.lac.org.na/laws/2024/8287.pdf",
  },
} as const satisfies Record<string, VerifiedFact>;

export type Sector = {
  slug: SectorSlug;
  number: string;
  navLabel: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  glyph: GlyphName;
  hero: MediaAsset;
  gallery: [MediaAsset, MediaAsset];
  services: Service[];
  crossover: string;
  verifiedFact?: VerifiedFact;
};

export const siteContent = {
  navigation: [
    { label: "About", href: "/about" },
    { label: "Sectors", href: "/#sectors" },
    { label: "Community", href: "/community" },
  ],
  hero: {
    eyebrow: "Mendozer Investments",
    titleLineOne: "One group.",
    titleLineTwo: "Six directions.",
    supporting: "Multi-sector solutions, built for Namibia.",
    primaryCta: { label: "Explore our sectors", href: "/#sectors" },
    secondaryCta: { label: "Talk to the group", href: "/contact" },
    // Real client-supplied photography; sector tag remains unconfirmed.
    media: {
      src: "/images/projects/construction/road-works-2.jpg",
      alt: "A site team beside active infrastructure work",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "50% 55%",
    } satisfies MediaAsset,
  },
  home: {
    introduction: {
      eyebrow: "The Mendozer group",
      title: "Built to move between the work that matters.",
      body: "A single group designed to hold multiple operational directions with a clear route to contact.",
      media: {
        src: "/images/projects/technology/tower-full-view.jpg",
        alt: "A communications tower above a work site",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "52% 42%",
      } satisfies MediaAsset,
    },
    sectorIntro: {
      eyebrow: "Our sectors",
      title: "Six capabilities. One accountable group.",
      body: "Explore the working areas that shape the Mendozer portfolio.",
    },
    connective: {
      eyebrow: "A connected view",
      title: "Different disciplines. A shared standard of accountability.",
      body: "From physical works to essential systems, each direction remains connected to the wider group.",
    },
    faq: {
      eyebrow: "Starting point",
      title: "Start with the work in front of you.",
      body: "A few practical answers before you prepare a group or sector enquiry.",
      items: [
        {
          question: "Which sector should I choose?",
          answer: "Choose the working direction closest to the enquiry. If the work crosses more than one area, select Group enquiry in the contact form.",
        },
        {
          question: "What should I include in an enquiry?",
          answer: "Include a short description of the work or opportunity, the relevant sector, any useful site or operating context, and the best person to contact.",
        },
        {
          question: "Can I contact the group directly?",
          answer: "Yes. The contact route lets you prepare a message to contact@mendozer.com without storing the enquiry on this website.",
        },
        {
          question: "Where can I find published project detail?",
          answer: "Project and service detail is added only when it has been approved for publication. The site does not use unverified project claims as proof.",
        },
      ] satisfies FaqItem[],
    },
    community: {
      eyebrow: "In the community",
      title: "Present where people come together.",
      body: "See the sponsorship moments currently documented in the Mendozer visual archive.",
      media: {
        src: "/images/projects/community/IMG-20260808-WA0076.jpg",
        alt: "Guests at a Mendozer-branded community event backdrop",
        caption: "Community sponsorship event",
        status: "real",
        focus: "50% 42%",
      } satisfies MediaAsset,
    },
  },
  about: {
    eyebrow: "About the group",
    title: "A group built for the whole picture.",
    body: "Mendozer Investments brings multiple operating directions together under one group identity.",
    hero: {
      src: "/images/projects/logistics/crew-roadside.jpg",
      alt: "A work crew gathered beside a road",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "50% 30%",
    } satisfies MediaAsset,
    commitments: [
      {
        number: "01",
        title: "One route in",
        body: "A clear first point of contact across the group.",
      },
      {
        number: "02",
        title: "Multi-sector perspective",
        body: "Six working directions presented within a single group view.",
      },
      {
        number: "03",
        title: "Built for Namibia",
        body: "A local context stays central to how the group is introduced.",
      },
    ],
    leadership: {
      eyebrow: "Leadership",
      title: "Accountability starts with a clear line of leadership.",
      name: "Johannes Negumbo",
      role: "Managing Director",
      note: "A formal leadership profile will be added once approved by the client.",
    },
    fuelLicence: verifiedFacts.wholesaleFuelLicence,
  },
  community: {
    eyebrow: "Community & sponsorship",
    title: "Supporting public moments with a visible local presence.",
    body: "Mendozer’s supplied event archive records sponsorship visibility at community-facing occasions.",
    hero: {
      src: "/images/projects/community/IMG-20260808-WA0077.jpg",
      alt: "Attendees in front of a Mendozer-branded event backdrop",
      caption: "Community sponsorship event",
      status: "real",
      focus: "50% 38%",
    } satisfies MediaAsset,
    initiatives: [
      {
        title: "Miss Teen Namibia 2026",
        body: "Client-supplied event imagery records Mendozer sponsorship visibility at the event.",
        media: {
          src: "/images/projects/community/IMG-20260808-WA0078.jpg",
          alt: "Guests at a Mendozer-branded event backdrop",
          caption: "Community sponsorship event",
          status: "real",
          focus: "50% 35%",
        } satisfies MediaAsset,
      },
      {
        title: "Otjiwarongo Sports Bonanza",
        body: "Listed in the client-supplied sponsorship record as a Mendozer sponsor acknowledgement, not an organiser credit. The visual is generated local-sport context, not event documentation.",
        media: {
          src: "/images/generated/community-otjiwarongo-sport-context.png",
          alt: "An empty local sport ground with a weathered football goal and low pavilion",
          caption: "Generated local-sport context, not event documentation",
          status: "generated",
          focus: "50% 54%",
        } satisfies MediaAsset,
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start with the right conversation.",
    body: "Tell us what you are considering and the relevant Mendozer sector. Your email app will open with the enquiry prepared for the group.",
    // Reused real group-context photography. No abstract placeholder is required for this placement.
    media: {
      src: "/images/projects/technology/IMG-20260808-WA0061.jpg",
      alt: "A communications tower above a prepared site",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "50% 53%",
    } satisfies MediaAsset,
    email: "contact@mendozer.com",
  },
  footer: {
    statement: "Multi-sector solutions, built for Namibia.",
    registrationLabel: "CC/2009/2399",
    vatLabel: "VAT 04948459-015",
  },
} as const;

// PLACEHOLDER: replace with client-confirmed sector wording and individual service detail.
// Generic descriptions are intentionally non-claiming while the client confirms the active sector list.
export const sectors: Sector[] = [
  {
    slug: "construction",
    number: "01",
    navLabel: "Construction",
    title: "Construction & Infrastructure",
    shortTitle: "Construction",
    eyebrow: "Sector 01",
    description: "Built environments and the groundwork around them.",
    glyph: "structure",
    hero: {
      src: "/images/projects/construction/IMG-20260808-WA0033.jpg",
      alt: "A building under construction on an open site",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "50% 55%",
    },
    gallery: [
      {
        src: "/images/projects/construction/road-works-1.jpg",
        alt: "A crew beside roadside infrastructure work",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "52% 50%",
      },
      {
        src: "/images/projects/construction/IMG-20260808-WA0035.jpg",
        alt: "A broad view of a building work site",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Site preparation", description: "Planning the groundwork before visible works begin." },
      { title: "Built works", description: "Structures and supporting infrastructure shaped around the brief." },
      { title: "Site coordination", description: "Keeping the people, materials, and workfront aligned." },
    ],
    crossover: "Construction connects naturally with logistics, systems, and energy-ready infrastructure.",
  },
  {
    slug: "technology",
    number: "02",
    navLabel: "Technology",
    title: "Technology & Systems",
    shortTitle: "Technology",
    eyebrow: "Sector 02",
    description: "Practical systems that keep operations connected.",
    glyph: "signal",
    hero: {
      src: "/images/projects/technology/IMG-20260808-WA0061.jpg",
      alt: "A communications tower on a prepared site",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "50% 55%",
    },
    gallery: [
      {
        src: "/images/projects/technology/IMG-20260808-WA0056.jpg",
        alt: "Communications equipment mounted on a tower",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 45%",
      },
      {
        src: "/images/projects/technology/IMG-20260808-WA0060.jpg",
        alt: "Structural base work at a communications installation",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 48%",
      },
    ],
    services: [
      { title: "Systems planning", description: "Defining the operational context before implementation." },
      { title: "Connectivity infrastructure", description: "Supporting the equipment and sites that keep teams linked." },
      { title: "Field coordination", description: "Managing the practical work around live operating environments." },
    ],
    crossover: "Technology is considered alongside the physical infrastructure that supports it.",
  },
  {
    slug: "cooling",
    number: "03",
    navLabel: "Cooling",
    title: "Cooling & Cold Chain",
    shortTitle: "Cooling",
    eyebrow: "Sector 03",
    description: "Temperature-sensitive operations with a focus on continuity.",
    glyph: "cooling",
    hero: {
      src: "/images/projects/cooling/IMG-20260808-WA0047.jpg",
      alt: "Industrial piping beside a facility building",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "52% 54%",
    },
    gallery: [
      {
        src: "/images/projects/cooling/IMG-20260808-WA0046.jpg",
        alt: "A team walking beside industrial service equipment",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "52% 52%",
      },
      {
        src: "/images/projects/cooling/IMG-20260808-WA0044.jpg",
        alt: "A team walking through an operational facility area",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Cold-chain planning", description: "Considering the route from controlled environment to delivery point." },
      { title: "Facility support", description: "Working around the practical systems that protect continuity." },
      { title: "Operational coordination", description: "Aligning site work with the requirements of active facilities." },
    ],
    crossover: "Cooling and cold-chain work is viewed in relation to logistics and essential site services.",
  },
  {
    slug: "logistics",
    number: "04",
    navLabel: "Logistics",
    title: "Logistics & Support Services",
    shortTitle: "Logistics",
    eyebrow: "Sector 04",
    description: "Practical support that helps work keep moving.",
    glyph: "route",
    hero: {
      src: "/images/projects/logistics/founder-site-visit.jpg",
      alt: "Vehicles and people gathered beside an unpaved work route",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "50% 53%",
    },
    gallery: [
      {
        src: "/images/projects/logistics/IMG-20260808-WA0048.jpg",
        alt: "People beside a container at a work site",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/logistics/IMG-20260808-WA0043.jpg",
        alt: "A group walking through a work environment",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "55% 50%",
      },
    ],
    services: [
      { title: "Route support", description: "Supporting the movement of people and materials through the workday." },
      { title: "Site readiness", description: "Helping operational sites stay prepared for the next task." },
      { title: "Working coordination", description: "Keeping the practical details in view across a changing workfront." },
    ],
    crossover: "Logistics provides a working link across construction, energy, cooling, and field systems.",
  },
  {
    slug: "energy",
    number: "05",
    navLabel: "Energy",
    title: "Fuel & Energy Distribution",
    shortTitle: "Energy",
    eyebrow: "Sector 05",
    description: "Essential energy infrastructure approached with operational care.",
    glyph: "energy",
    hero: {
      src: "/images/projects/fuel-energy/plant-piping.jpg",
      alt: "Piping and infrastructure at an operational plant",
      caption: "Infrastructure work in progress",
      status: "real",
      focus: "54% 52%",
    },
    gallery: [
      {
        src: "/images/projects/energy/IMG-20260808-WA0045.jpg",
        alt: "People walking beside industrial storage infrastructure",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/energy/IMG-20260808-WA0052.jpg",
        alt: "A close view of industrial structural hardware",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 52%",
      },
    ],
    services: [
      { title: "Distribution context", description: "Understanding the practical environments that support energy movement." },
      { title: "Site support", description: "Working with the visible infrastructure behind essential services." },
      { title: "Operational alignment", description: "Considering continuity across related group capabilities." },
    ],
    verifiedFact: verifiedFacts.wholesaleFuelLicence,
    crossover: "Energy work is introduced alongside the infrastructure, logistics, and systems around it.",
  },
  {
    slug: "tourism",
    number: "06",
    navLabel: "Tourism & Agriculture",
    title: "Tourism & Agriculture",
    shortTitle: "Tourism & Agriculture",
    eyebrow: "Sector 06",
    description: "Land, place, and operational possibility in one wider view.",
    glyph: "landscape",
    hero: {
      src: "/images/projects/tourism/IMG-20260808-WA0055.jpg",
      alt: "A view across a green Namibian landscape",
      caption: "Landscape in view",
      status: "real",
      focus: "50% 50%",
    },
    gallery: [
      {
        src: "/images/projects/tourism/IMG-20260808-WA0066.jpg",
        alt: "Outdoor work equipment beneath a tree",
        caption: "Infrastructure work in progress",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/tourism/IMG-20260808-WA0067.jpg",
        alt: "A broad dry landscape with mature trees",
        caption: "Landscape in view",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Place-led planning", description: "Starting with the land, access, and operational setting." },
      { title: "Rural operations", description: "Considering practical needs beyond urban work environments." },
      { title: "Long-view investment", description: "Keeping durability and local context in the conversation." },
    ],
    crossover: "Tourism and agriculture add a land-led perspective to the wider Mendozer group.",
  },
];

export const legalPages = {
  privacy: {
    eyebrow: "Privacy notice",
    title: "A clear note on website enquiries.",
    intro: "This site is designed to present Mendozer Investments and give visitors a direct contact route. It does not operate an account area, client portal, payment flow, or on-site lead database.",
    sections: [
      {
        heading: "When you prepare an enquiry",
        paragraphs: [
          "The contact form prepares an email in your own mail application, addressed to contact@mendozer.com. The website does not receive, store, or forward that message itself.",
          "Your email provider and Mendozer’s inbox handle the message after you choose to send it. Include only information that is relevant to the enquiry.",
        ],
      },
      {
        heading: "Technical delivery",
        paragraphs: [
          "The website is hosted through Vercel to deliver pages, images, and security protections. Standard technical request information may be processed by the hosting provider as needed to operate and secure the service.",
          "This build does not embed advertising pixels, social feeds, or a third-party analytics script.",
        ],
      },
      {
        heading: "Questions about this notice",
        paragraphs: [
          "For a privacy-related website enquiry, use contact@mendozer.com and state the nature of the request clearly.",
          "This notice should be reviewed when the contact workflow, analytics, or any client-facing service changes.",
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Website terms",
    title: "Information for a clear first conversation.",
    intro: "The Mendozer Investments website provides introductory group and sector information. It is not a quote, service agreement, or confirmation of project availability.",
    sections: [
      {
        heading: "Information on this website",
        paragraphs: [
          "Content is provided to help visitors identify a relevant Mendozer working direction and begin an enquiry. Service, project, and availability detail should be confirmed directly with the group.",
          "Mendozer may update website information as approved material becomes available.",
        ],
      },
      {
        heading: "Images and public records",
        paragraphs: [
          "Supplied project-context photography is captioned generically unless a specific project is approved for publication. Generated contextual imagery is labelled and is not presented as documentary project or event evidence.",
          "The website also links to a public Namibia Government Gazette record for wholesale fuel distribution licence W/188/2017. The linked record is cited as a source, not as a broader performance claim.",
        ],
      },
      {
        heading: "Using the site",
        paragraphs: [
          "Do not rely on website information as a substitute for a written agreement or direct confirmation from Mendozer Investments.",
          "For a group or sector enquiry, contact contact@mendozer.com.",
        ],
      },
    ],
  },
} as const satisfies Record<string, LegalPage>;

export const routes = [
  "/",
  "/about",
  ...sectors.map((sector) => `/sectors/${sector.slug}`),
  "/community",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export function getSector(slug: string): Sector | undefined {
  return sectors.find((sector) => sector.slug === slug);
}
