/**
 * MENDOZER CONTENT LAYER
 *
 * This is the only source of brand copy, IA labels, and asset-to-sector assignments.
 * Components consume these objects and remain reusable for future Tangison corporate builds.
 * All visual sector matches are client-supplied context photographs; captions are not used, alt text only.
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
  status: "real" | "generated";
  focus?: string;
};

export type GalleryItem = MediaAsset & { width: number; height: number };

export type ClientLogo = {
  name: string;
  src: string;
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

export type WorkContext = {
  sector: string;
  title: string;
  body: string;
  media: MediaAsset;
  href: string;
};

export type PublicUpdate = {
  eyebrow: string;
  title: string;
  body: string;
  sourceLabel?: string;
  sourceUrl?: string;
  media: MediaAsset;
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
    body: "Mendozer Investments CC is listed as a wholesale distributor under licence W/188/2017 in the Government Gazette.",
    sourceLabel: "Namibia Government Gazette No. 8655, 4 June 2025, Annexure 1",
    sourceUrl: "https://www.lac.org.na/laws/2025/8655.pdf",
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
  /** Longer, search-facing description used in metadata when present. */
  metaDescription?: string;
  glyph: GlyphName;
  hero: MediaAsset;
  gallery: MediaAsset[];
  services: Service[];
  crossover: string;
  verifiedFact?: VerifiedFact;
};

/** Partner and client marks shown in the Trusted by band, exactly as supplied by the group. */
export const clientLogos: ClientLogo[] = [
  { name: "Roads Authority", src: "/images/clients/roads-authority.webp" },
  { name: "NamPower", src: "/images/clients/nampower.webp" },
  { name: "NamPost", src: "/images/clients/nampost.webp" },
  { name: "MTC", src: "/images/clients/mtc.webp" },
  { name: "PowerCom", src: "/images/clients/powercom.webp" },
  { name: "Office of the Judiciary, Republic of Namibia", src: "/images/clients/office-of-the-judiciary.webp" },
  { name: "Omusati Regional Council", src: "/images/clients/omusati-regional-council.webp" },
  { name: "Kunene Regional Council", src: "/images/clients/kunene-regional-council.webp" },
  { name: "Tsandi Constituency Office", src: "/images/clients/tsandi-constituency.webp" },
  { name: "Bergrivier Municipality", src: "/images/clients/bergrivier-municipality.webp" },
  { name: "JMAN", src: "/images/clients/jman.webp" },
  { name: "Coat of Arms of the Republic of Namibia", src: "/images/clients/coat-of-arms-namibia.webp" },
];

/** Homepage image carousel, ordered as a working-day arc from crew to community. */
export const homeGallery: GalleryItem[] = [
  {
    src: "/images/team/crew-group-01.webp",
    alt: "Mendozer crew in blue helmets and branded high-visibility wear beside a site vehicle",
    status: "real",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/projects/construction/brickwork-03.webp",
    alt: "Bricklaying team building a wall on an active site",
    status: "real",
    width: 1280,
    height: 963,
  },
  {
    src: "/images/projects/technology/tower-detail-01.webp",
    alt: "Communications tower equipment against a clear sky",
    status: "real",
    width: 762,
    height: 1032,
  },
  {
    src: "/images/projects/logistics/truck-fleet-04.webp",
    alt: "Truck fleet lined up at a depot before dispatch",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/cooling/facility-visit-01.webp",
    alt: "Team walking through an operational facility",
    status: "real",
    width: 810,
    height: 1080,
  },
  {
    src: "/images/projects/energy/tank-works-01.webp",
    alt: "Work on tank and plant infrastructure at height",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/construction/site-works-wide-01.webp",
    alt: "Broad view across a building work site with structures under construction",
    status: "real",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/projects/community/missteen-2026-titleholders-01.webp",
    alt: "Miss Teen Namibia 2026 titleholders in front of a Mendozer-branded backdrop",
    status: "real",
    width: 1200,
    height: 1600,
  },
];

/** Previous-work masonry shown on the Work page, drawn from the supplied site archive. */
export const workMasonry: GalleryItem[] = [
  {
    src: "/images/projects/construction/site-works-wide-01.webp",
    alt: "Broad view across a building work site with structures under construction",
    status: "real",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/projects/technology/tower-mast-01.webp",
    alt: "Red and white communications mast above a prepared site",
    status: "real",
    width: 720,
    height: 1280,
  },
  {
    src: "/images/projects/construction/brickwork-03.webp",
    alt: "Bricklaying team building a wall on an active site",
    status: "real",
    width: 1280,
    height: 963,
  },
  {
    src: "/images/projects/logistics/truck-fleet-02.webp",
    alt: "Heavy trucks parked at a depot in a line",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/cooling/plant-pipes-01.webp",
    alt: "Piped plant infrastructure beside a facility building",
    status: "real",
    width: 810,
    height: 1080,
  },
  {
    src: "/images/projects/technology/cable-trench-01.webp",
    alt: "Cable and trenching work beside a service vehicle",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/energy/tank-works-01.webp",
    alt: "Work on tank and plant infrastructure at height",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/community/roadside-cleanup-01.webp",
    alt: "Crew clearing a roadside during community cleanup work",
    status: "real",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/projects/construction/building-context-01.webp",
    alt: "Building exterior beside a sandy work site",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/logistics/container-site-01.webp",
    alt: "Crew beside a red shipping container at a work site",
    status: "real",
    width: 810,
    height: 1080,
  },
  {
    src: "/images/projects/cooling/facility-visit-02.webp",
    alt: "Team walking between facility buildings",
    status: "real",
    width: 810,
    height: 1080,
  },
  {
    src: "/images/projects/technology/field-crew-01.webp",
    alt: "Field crew preparing equipment beside a vehicle",
    status: "real",
    width: 762,
    height: 1032,
  },
  {
    src: "/images/projects/construction/road-works-context-01.webp",
    alt: "Road worker patching a surface beside a trailer",
    status: "real",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/projects/energy/tank-facility-01.webp",
    alt: "Team walking across a tank storage facility",
    status: "real",
    width: 810,
    height: 1080,
  },
];

/** Community event archive used by the community page carousel. */
export const communityGallery: GalleryItem[] = [
  {
    src: "/images/projects/community/missteen-2026-titleholders-01.webp",
    alt: "Miss Teen Namibia 2026 titleholders in front of a Mendozer-branded backdrop",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/community/missteen-2026-titleholders-02.webp",
    alt: "Miss Teen Namibia 2026 titleholders with a guest at the event backdrop",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/community/missteen-2026-guests-01.webp",
    alt: "Guests in formal wear at a Mendozer-branded event backdrop",
    status: "real",
    width: 810,
    height: 1080,
  },
  {
    src: "/images/projects/community/missteen-2026-guests-02.webp",
    alt: "Guests posing together at a Mendozer-branded event backdrop",
    status: "real",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/projects/community/IMG-20260808-WA0077.webp",
    alt: "Attendees in front of a Mendozer-branded community event backdrop",
    status: "real",
    width: 1600,
    height: 1200,
  },
];

export const siteContent = {
  navigation: [
    { label: "About", href: "/about" },
    { label: "Profile", href: "/profile" },
    { label: "Services", href: "/services" },
    { label: "Sectors", href: "/sectors" },
    { label: "Work", href: "/work" },
    { label: "Updates", href: "/updates" },
    { label: "Public records", href: "/compliance" },
    { label: "Community", href: "/community" },
  ],
  hero: {
    eyebrow: "Mendozer Investments",
    title: "Building Value. Delivering Excellence.",
    subtext: "Construction, technology, cooling, logistics, energy and tourism: six sectors delivered by one team across Namibia since 2009.",
    primaryCta: { label: "Start your enquiry", href: "/contact" },
    secondaryCta: { label: "Explore the sectors", href: "/#sectors" },
    proofBadge: "Since 2009",
    followEyebrow: "The Mendozer group",
    followTitle: "One team from the first brief to the delivered work.",
    followBody: "Start with the sector closest to the job, and bring the wider team in when the brief crosses disciplines. One point of contact, one standard, and decisions made close to the work. That is what a group structure is for.",
    media: {
      src: "/images/projects/construction/road-works-2.webp",
      alt: "A site team beside active infrastructure work",
      status: "real",
      focus: "50% 55%",
    } satisfies MediaAsset,
  },
  sectorHub: {
    eyebrow: "Mendozer sectors",
    title: "Start with the right sector.",
    body: "Pick the sector closest to the job. If the scope crosses disciplines, one enquiry covers it.",
    hero: {
      src: "/images/projects/construction/road-works-2.webp",
      alt: "Site team beside active infrastructure work",
      status: "real",
      focus: "50% 55%",
    } satisfies MediaAsset,
  },
  work: {
    eyebrow: "Previous work",
    title: "Past work, shown straight.",
    body: "Images from the group archive: sites, field work and facilities. Project names appear only once a client approves publication.",
    hero: {
      src: "/images/projects/work/IMG-20260808-WA0034.webp",
      alt: "A broad view across a building work site",
      status: "real",
      focus: "50% 52%",
    } satisfies MediaAsset,
  },
  updates: {
    eyebrow: "Updates & public records",
    title: "What the group has been up to.",
    body: "Approved community moments and publicly verifiable records, in one place. Unapproved site imagery never becomes a project claim here.",
    hero: {
      src: "/images/projects/community/IMG-20260808-WA0077.webp",
      alt: "Attendees in front of a Mendozer-branded community event backdrop",
      status: "real",
      focus: "50% 38%",
    } satisfies MediaAsset,
  },
  compliance: {
    eyebrow: "Public records & licences",
    title: "The records behind the name.",
    body: "Registration, VAT and licensing details you can check yourself. Anything further is published only when it is approved.",
    hero: {
      src: "/images/projects/fuel-energy/plant-piping.webp",
      alt: "Piping and infrastructure at an operational plant",
      status: "real",
      focus: "54% 52%",
    } satisfies MediaAsset,
  },
  home: {
    introduction: {
      eyebrow: "The Mendozer group",
      title: "Six sectors. One standard.",
      body: "Construction, technology, cooling, logistics, energy, tourism. Pick the one closest to the job; the group handles the rest.",
      media: {
        src: "/images/projects/technology/tower-full-view.webp",
        alt: "A communications tower above a work site",
        status: "real",
        focus: "52% 42%",
      } satisfies MediaAsset,
    },
    sectorIntro: {
      eyebrow: "Our sectors",
      title: "Where do you start?",
      body: "Every sector route ends at the same team and the same standard.",
    },
    clients: {
      eyebrow: "Trusted by",
      title: "Working alongside Namibian institutions and partners.",
      body: "Councils, utilities and national institutions the group has worked with across Namibia.",
    },
    connective: {
      eyebrow: "A connected view",
      title: "One brief should not need three contractors.",
      body: "A single job can span a site, a system, a facility and a supply route. Start with the need; the right sector picks it up.",
    },
    gallery: {
      eyebrow: "On site",
      title: "The work, in frame.",
      body: "Recent site, field and facility photography from all six sectors, on rotation.",
    },
    faq: {
      eyebrow: "Starting point",
      title: "Before you send an enquiry.",
      body: "Short answers to the questions most enquiries start with.",
      items: [
        {
          question: "Which sector should I choose?",
          answer: "Pick the one closest to the job. If the work crosses disciplines, choose Group enquiry in the form and it reaches the whole team.",
        },
        {
          question: "What should I include in an enquiry?",
          answer: "A short description of the work, the sector it fits, any site or operating detail that helps, and who to reach.",
        },
        {
          question: "Can I contact the group directly?",
          answer: "Yes. Use the form or email info@mendozer.com directly.",
        },
        {
          question: "Where can I find published project detail?",
          answer: "Project detail is published only once a client approves it. The site never uses unverified claims as proof.",
        },
      ] satisfies FaqItem[],
    },
    community: {
      eyebrow: "In the community",
      title: "Where you will see us.",
      body: "Sponsorships and events currently approved for publication.",
      media: {
        src: "/images/projects/community/missteen-2026-titleholders-01.webp",
        alt: "Miss Teen Namibia 2026 titleholders in front of a Mendozer-branded backdrop",
        status: "real",
        focus: "50% 35%",
      } satisfies MediaAsset,
    },
  },
  about: {
    eyebrow: "About the group",
    title: "One group for work that crosses disciplines.",
    body: "Mendozer Investments builds and delivers across construction, technology, cooling, logistics, energy and tourism for partners, institutions and commercial enquiries.",
    hero: {
      src: "/images/projects/logistics/crew-roadside.webp",
      alt: "A work crew gathered beside a road",
      status: "real",
      focus: "50% 30%",
    } satisfies MediaAsset,
    commitments: [
      {
        number: "01",
        title: "Start in one place",
        body: "One enquiry covers every capability the job needs.",
      },
      {
        number: "02",
        title: "Choose the closest fit",
        body: "Begin where the work is. Other sectors join when the scope asks for it.",
      },
      {
        number: "03",
        title: "Built for Namibia",
        body: "Real crews on real Namibian sites since 2009; the archive on this site is the group's own.",
      },
    ],
    leadership: {
      eyebrow: "Leadership",
      title: "A clear line of accountability.",
      name: "Johannes Negumbo",
      role: "Managing Director",
      note: "Johannes Negumbo, Managing Director of Mendozer Investments CC, is the point of accountability for group enquiries.",
    },
    fuelLicence: verifiedFacts.wholesaleFuelLicence,
  },
  community: {
    eyebrow: "Community & sponsorship",
    title: "Sponsorship visible where people gather.",
    body: "Approved event photography showing Mendozer sponsorship at community occasions.",
    hero: {
      src: "/images/projects/community/missteen-2026-titleholders-02.webp",
      alt: "Miss Teen Namibia 2026 titleholders with a guest at the event backdrop",
      status: "real",
      focus: "50% 30%",
    } satisfies MediaAsset,
    initiatives: [
      {
        title: "Miss Teen Namibia 2026",
        body: "Event imagery records the sponsorship; publication approved by the client.",
        media: {
          src: "/images/projects/community/missteen-2026-titleholders-01.webp",
          alt: "Miss Teen Namibia 2026 titleholders in front of a Mendozer-branded backdrop",
          status: "real",
          focus: "50% 30%",
        } satisfies MediaAsset,
      },
      {
        title: "Otjiwarongo Sports Bonanza 2026",
        body: "Namaqua FC beat Ama Roots FC 2 to 1 in the final at Mokati Stadium to take the 2026 title, 21 to 23 August 2026. Full record on the news page.",
        href: "/blog/otjiwarongo-sports-bonanza-2026",
        media: {
          src: "/images/events/otjiwarongo-sports-bonanza-2026/osb-2026-conclusion-poster.webp",
          alt: "Otjiwarongo Sports Bonanza 2026 final result poster: Namaqua FC 2 to 1 Ama Roots FC",
          status: "real",
          focus: "50% 40%",
        } satisfies MediaAsset,
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start with the work in front of you.",
    body: "Tell us what needs doing, which sector fits best, and how to reach you. Prefer email? info@mendozer.com works just as well.",
    media: {
      src: "/images/projects/technology/IMG-20260808-WA0061.webp",
      alt: "A communications tower above a prepared site",
      status: "real",
      focus: "50% 53%",
    } satisfies MediaAsset,
    email: "info@mendozer.com",
  },
  footer: {
    statement: "Building Value. Delivering Excellence.",
    registrationLabel: "CC/2009/2399",
    vatLabel: "VAT 04948459-015",
  },
} as const;

export const sectors: Sector[] = [
  {
    slug: "construction",
    number: "01",
    navLabel: "Construction",
    title: "Construction & Infrastructure",
    shortTitle: "Construction",
    eyebrow: "Sector 01",
    description: "Civil and building work on open sites: access, structures, and the coordination of crews on the ground.",
    metaDescription:
      "Civil and building work on open sites: access, structures, and the coordination of crews on the ground, delivered by Mendozer Investments across Namibia.",
    glyph: "structure",
    hero: {
      src: "/images/projects/construction/IMG-20260808-WA0033.webp",
      alt: "A building under construction on an open site",
      status: "real",
      focus: "50% 55%",
    },
    gallery: [
      {
        src: "/images/projects/construction/brickwork-03.webp",
        alt: "Bricklaying team building a wall on an active site",
        status: "real",
      },
      {
        src: "/images/projects/construction/site-works-wide-01.webp",
        alt: "Broad view across a building work site with structures under construction",
        status: "real",
      },
      {
        src: "/images/projects/construction/road-works-1.webp",
        alt: "A crew beside roadside infrastructure work",
        status: "real",
        focus: "52% 50%",
      },
      {
        src: "/images/projects/construction/brickwork-05.webp",
        alt: "Timber and brickwork structure taking shape on site",
        status: "real",
      },
      {
        src: "/images/projects/construction/IMG-20260808-WA0035.webp",
        alt: "A broad view of a building work site",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Site preparation", description: "Access, ground conditions and services worked out before crews move in." },
      { title: "Built structures", description: "Structural and supporting work brought into one scope and built to the agreed spec." },
      { title: "Site coordination", description: "People, materials and workfronts kept moving in step." },
    ],
    crossover: "Construction often meets logistics, technology and energy on the same brief.",
  },
  {
    slug: "technology",
    number: "02",
    navLabel: "Technology",
    title: "Technology & Systems",
    shortTitle: "Technology",
    eyebrow: "Sector 02",
    description: "Field systems and telecom infrastructure, including tower installation and the equipment that keeps teams linked.",
    metaDescription:
      "Field systems and telecom infrastructure, including tower installation and the equipment that keeps teams linked, under the Mendozer technology direction.",
    glyph: "signal",
    hero: {
      src: "/images/projects/technology/IMG-20260808-WA0061.webp",
      alt: "A communications tower on a prepared site",
      status: "real",
      focus: "50% 55%",
    },
    gallery: [
      {
        src: "/images/projects/technology/IMG-20260808-WA0056.webp",
        alt: "Communications equipment mounted on a tower",
        status: "real",
        focus: "50% 45%",
      },
      {
        src: "/images/projects/technology/tower-mast-01.webp",
        alt: "Red and white communications mast above a prepared site",
        status: "real",
      },
      {
        src: "/images/projects/technology/tower-crew-01.webp",
        alt: "Technician working at a tower base behind a security fence",
        status: "real",
      },
      {
        src: "/images/projects/technology/cable-trench-01.webp",
        alt: "Cable and trenching work beside a service vehicle",
        status: "real",
      },
      {
        src: "/images/projects/technology/IMG-20260808-WA0060.webp",
        alt: "Structural base work at a communications installation",
        status: "real",
        focus: "50% 48%",
      },
    ],
    services: [
      { title: "Systems direction", description: "The operational need defined first; the system chosen to fit it." },
      { title: "Telecom infrastructure", description: "Towers, equipment and site work that keep teams connected." },
      { title: "Field coordination", description: "Installations planned around live operating environments." },
    ],
    crossover: "Technology must work with the physical infrastructure that carries it.",
  },
  {
    slug: "cooling",
    number: "03",
    navLabel: "Cooling",
    title: "Cooling & Cold Chain",
    shortTitle: "Cooling",
    eyebrow: "Sector 03",
    description: "Facility work around plant rooms, piping, and the controlled conditions that keep operations continuous.",
    metaDescription:
      "Facility work around plant rooms, piping, and the controlled conditions that keep operations continuous, from the Mendozer cooling and cold chain direction.",
    glyph: "cooling",
    hero: {
      src: "/images/projects/cooling/IMG-20260808-WA0047.webp",
      alt: "Industrial piping beside a facility building",
      status: "real",
      focus: "52% 54%",
    },
    gallery: [
      {
        src: "/images/projects/cooling/plant-pipes-01.webp",
        alt: "Piped plant infrastructure beside a facility building",
        status: "real",
      },
      {
        src: "/images/projects/cooling/facility-visit-01.webp",
        alt: "Team walking through an operational facility",
        status: "real",
      },
      {
        src: "/images/projects/cooling/IMG-20260808-WA0046.webp",
        alt: "A team walking beside industrial service equipment",
        status: "real",
        focus: "52% 52%",
      },
      {
        src: "/images/projects/cooling/facility-visit-03.webp",
        alt: "Crew walking between facility buildings on a clear day",
        status: "real",
      },
      {
        src: "/images/projects/cooling/IMG-20260808-WA0044.webp",
        alt: "A team walking through an operational facility area",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Cold-chain planning", description: "The route from controlled environment to delivery point, planned end to end." },
      { title: "Cooling facilities", description: "Plant rooms and pipework kept ready for continuous operation." },
      { title: "Operational coordination", description: "Facility work scheduled around production, never against it." },
    ],
    crossover: "Cold-chain continuity can involve cooling, logistics and site support.",
  },
  {
    slug: "logistics",
    number: "04",
    navLabel: "Logistics",
    title: "Logistics & Support Services",
    shortTitle: "Logistics",
    eyebrow: "Sector 04",
    description: "Moving people, materials, and support through active sites and changing work routes.",
    metaDescription:
      "Moving people, materials, and support through active sites and changing work routes, keeping Mendozer projects and crews supplied across Namibia.",
    glyph: "route",
    hero: {
      src: "/images/projects/logistics/founder-site-visit.webp",
      alt: "Vehicles and people gathered beside an unpaved work route",
      status: "real",
      focus: "50% 53%",
    },
    gallery: [
      {
        src: "/images/projects/logistics/truck-fleet-04.webp",
        alt: "Truck fleet lined up at a depot before dispatch",
        status: "real",
      },
      {
        src: "/images/projects/logistics/container-site-01.webp",
        alt: "Crew beside a red shipping container at a work site",
        status: "real",
      },
      {
        src: "/images/projects/logistics/IMG-20260808-WA0048.webp",
        alt: "People beside a container at a work site",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/logistics/truck-fleet-01.webp",
        alt: "Heavy truck front view at a depot yard",
        status: "real",
      },
      {
        src: "/images/projects/logistics/IMG-20260808-WA0043.webp",
        alt: "A group walking through a work environment",
        status: "real",
        focus: "55% 50%",
      },
    ],
    services: [
      { title: "Site logistics", description: "People and materials moved on schedule through the working day." },
      { title: "Crew and material support", description: "Sites kept supplied and ready for the next task." },
      { title: "Field coordination", description: "Practical detail kept in view across changing workfronts." },
    ],
    crossover: "Logistics is the connective tissue between sites, people and materials.",
  },
  {
    slug: "energy",
    number: "05",
    navLabel: "Energy",
    title: "Fuel & Energy Distribution",
    shortTitle: "Energy",
    eyebrow: "Sector 05",
    description: "Wholesale fuel distribution under licence W/188/2017, with supporting plant and infrastructure.",
    metaDescription:
      "Wholesale fuel distribution under licence W/188/2017, with supporting plant and infrastructure, delivered by the Mendozer fuel and energy direction.",
    glyph: "energy",
    hero: {
      src: "/images/projects/fuel-energy/plant-piping.webp",
      alt: "Piping and infrastructure at an operational plant",
      status: "real",
      focus: "54% 52%",
    },
    gallery: [
      {
        src: "/images/projects/energy/tank-facility-01.webp",
        alt: "Team walking across a tank storage facility",
        status: "real",
      },
      {
        src: "/images/projects/energy/tank-works-01.webp",
        alt: "Work on tank and plant infrastructure at height",
        status: "real",
      },
      {
        src: "/images/projects/energy/IMG-20260808-WA0045.webp",
        alt: "People walking beside industrial storage infrastructure",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/energy/tank-works-02.webp",
        alt: "Piping and fittings on a tank installation",
        status: "real",
      },
      {
        src: "/images/projects/energy/IMG-20260808-WA0052.webp",
        alt: "A close view of industrial structural hardware",
        status: "real",
        focus: "50% 52%",
      },
    ],
    services: [
      { title: "Wholesale distribution", description: "Wholesale fuel supply under licence W/188/2017." },
      { title: "Infrastructure context", description: "Plant and infrastructure work that keeps distribution running." },
      { title: "Operational alignment", description: "Logistics, construction and systems pulled in when energy work needs them." },
    ],
    verifiedFact: verifiedFacts.wholesaleFuelLicence,
    crossover: "Energy distribution depends on the infrastructure, logistics and systems around it.",
  },
  {
    slug: "tourism",
    number: "06",
    navLabel: "Tourism & Agriculture",
    title: "Tourism & Agriculture",
    shortTitle: "Tourism & Agriculture",
    eyebrow: "Sector 06",
    description: "Land, access and rural operations across the Namibian landscape.",
    metaDescription:
      "Land, access, and rural operating settings across the Namibian landscape, handled with the practical care Mendozer brings to every sector.",
    glyph: "landscape",
    hero: {
      src: "/images/projects/tourism/IMG-20260808-WA0055.webp",
      alt: "A view across a green Namibian landscape",
      status: "real",
      focus: "50% 50%",
    },
    gallery: [
      {
        src: "/images/projects/tourism/IMG-20260808-WA0066.webp",
        alt: "Outdoor work equipment beneath a tree",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/tourism/IMG-20260808-WA0067.webp",
        alt: "A broad dry landscape with mature trees",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Land and access context", description: "Land and access worked out before anything else." },
      { title: "Rural operating context", description: "Work planned for rural conditions, not just city sites." },
      { title: "Long-term planning", description: "Plans built to last in local conditions." },
    ],
    crossover: "Tourism and agriculture bring land, access and long-term operations into the wider group.",
  },
];

export const workContexts: WorkContext[] = [
  {
    sector: "Construction & Infrastructure",
    title: "Building work",
    body: "Building and site work from the group archive.",
    href: "/sectors/construction",
    media: {
      src: "/images/projects/work/IMG-20260808-WA0032.webp",
      alt: "A building under construction beside an open site",
      status: "real",
      focus: "50% 52%",
    },
  },
  {
    sector: "Technology & Systems",
    title: "Field systems work",
    body: "Tower and field installation work from the archive.",
    href: "/sectors/technology",
    media: {
      src: "/images/projects/work/IMG-20260808-WA0063.webp",
      alt: "A communications antenna structure against the sky",
      status: "real",
      focus: "50% 50%",
    },
  },
  {
    sector: "Logistics & Support Services",
    title: "Site support work",
    body: "Container and site support work from the archive.",
    href: "/sectors/logistics",
    media: {
      src: "/images/projects/work/IMG-20260808-WA0049.webp",
      alt: "A team beside a container at a work site",
      status: "real",
      focus: "50% 50%",
    },
  },
];

export const publicUpdates: PublicUpdate[] = [
  {
    eyebrow: "Public record",
    title: "Wholesale fuel distribution licence",
    body: "Mendozer Investments CC is listed as a wholesale distributor under licence W/188/2017 in the Government Gazette.",
    sourceLabel: "Namibia Government Gazette No. 8655, 4 June 2025, Annexure 1",
    sourceUrl: "https://www.lac.org.na/laws/2025/8655.pdf",
    media: {
      src: "/images/projects/fuel-energy/plant-piping.webp",
      alt: "Piping and infrastructure at an operational plant",
      status: "real",
      focus: "54% 52%",
    },
  },
  {
    eyebrow: "Community archive",
    title: "Miss Teen Namibia 2026",
    body: "Event imagery records the sponsorship; publication approved by the client.",
    media: {
      src: "/images/projects/community/missteen-2026-titleholders-02.webp",
      alt: "Miss Teen Namibia 2026 titleholders with a guest at the event backdrop",
      status: "real",
      focus: "50% 30%",
    },
  },
  {
    eyebrow: "Event record",
    title: "Otjiwarongo Sports Bonanza 2026",
    body: "A month on from tournament weekend: Namaqua FC defeated Ama Roots FC 2 to 1 in the final at Mokati Stadium, 21 to 23 August 2026, with a N$45,000 prize pool. Prize payments are proceeding through the published reconciliation process.",
    sourceLabel: "Read the event record",
    sourceUrl: "/blog/otjiwarongo-sports-bonanza-2026",
    media: {
      src: "/images/events/otjiwarongo-sports-bonanza-2026/osb-2026-conclusion-poster.webp",
      alt: "Otjiwarongo Sports Bonanza 2026 final result poster: Namaqua FC 2 to 1 Ama Roots FC",
      status: "real",
      focus: "50% 40%",
    },
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
          "When secure delivery is configured, the contact form validates the enquiry and sends it to info@mendozer.com through the approved server-side delivery provider. The form may also send a confirmation email to the address you provide.",
          "If secure delivery is unavailable, the website opens a prepared email in your own mail application, addressed to info@mendozer.com. Include only information that is relevant to the enquiry.",
        ],
      },
      {
        heading: "Technical delivery",
        paragraphs: [
          "The website is hosted through Vercel to deliver pages, images, and security protections. Standard technical request information may be processed by the hosting provider as needed to operate and secure the service.",
          "The site uses first-party Vercel Web Analytics to understand page views. It does not embed advertising pixels or social feeds.",
        ],
      },
      {
        heading: "Service providers and sub-processors",
        paragraphs: [
          "Website hosting and page delivery are provided by Vercel Inc., which processes technical request data on the group's behalf. The contact page embeds a Google Maps map so visitors can find the Windhoek office; Google may process technical data when that map loads.",
          "When direct enquiry delivery is configured, enquiry content is processed by the approved email delivery provider so the enquiry reaches info@mendozer.com. Enquiries are not stored in a public database on this website.",
        ],
      },
      {
        heading: "Questions about this notice",
        paragraphs: [
          "For a privacy-related website enquiry, use info@mendozer.com and state the nature of the request clearly.",
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
          "Content is provided to help visitors identify a relevant Mendozer sector and begin an enquiry. Service, project, and availability detail should be confirmed directly with the group.",
          "Mendozer may update website information as approved material becomes available.",
        ],
      },
      {
        heading: "Images and public records",
        paragraphs: [
          "Supplied project-context photography is presented without captions or named-project claims unless a specific project is approved for publication. Generated contextual imagery is labelled and is not presented as documentary project or event evidence.",
          "The website also links to a public Namibia Government Gazette record for wholesale fuel distribution licence W/188/2017. The linked record is cited as a source, not as a broader performance claim.",
        ],
      },
      {
        heading: "Using the site",
        paragraphs: [
          "Do not rely on website information as a substitute for a written agreement or direct confirmation from Mendozer Investments.",
          "For a group or sector enquiry, contact info@mendozer.com.",
        ],
      },
    ],
  },
} as const satisfies Record<string, LegalPage>;

export const routes = [
  "/",
  "/about",
  "/profile",
  "/sectors",
  ...sectors.map((sector) => `/sectors/${sector.slug}`),
  "/services",
  "/services/electric-fencing",
  "/services/walls-precast",
  "/services/gate-automation",
  "/services/general-construction",
  "/work",
  "/updates",
  "/compliance",
  "/community",
  "/contact",
  "/blog",
  "/blog/mendozer-windhoek-satellite-office",
  "/blog/namibia-heroes-day-2026",
  "/blog/otjiwarongo-sports-bonanza-2026",
  "/blog/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments",
  "/blog/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification",
  "/privacy",
  "/terms",
] as const;

export function getSector(slug: string): Sector | undefined {
  return sectors.find((sector) => sector.slug === slug);
}

