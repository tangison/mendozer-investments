/**
 * MENDOZER SPECIALIST SERVICES CONTENT LAYER
 *
 * Added from the 2026-09-08 media package: real client-supplied photographs of
 * electric fencing, precast walling, gate automation and general construction
 * work, plus team imagery and a downloadable Bonanza PR report.
 *
 * Rules honoured from the package manifest:
 * - marketing-graphic assets never sit in real-work galleries (two are shown
 *   as clearly labelled promotional graphics on their service pages)
 * - the three team selfies are withheld until the people approve publication
 * - ad contact blocks are preserved exactly (images not cropped or altered)
 * - images are optimized for web; captions stay generic (no named projects)
 */

export type SpecialistServiceSlug =
  | "electric-fencing"
  | "walls-precast"
  | "gate-automation"
  | "general-construction";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  status: "real";
  focus?: string;
};

export type PromoGraphic = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  note: string;
};

export type ServiceScope = {
  title: string;
  description: string;
};

export type ServiceSection = {
  eyebrow: string;
  title: string;
  body: string;
  scope?: readonly ServiceScope[];
  gallery?: readonly GalleryImage[];
  detail?: readonly GalleryImage[];
  promo?: PromoGraphic;
};

export type SpecialistService = {
  slug: SpecialistServiceSlug;
  number: string;
  navLabel: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  hero: GalleryImage;
  sections: readonly ServiceSection[];
};

const ASSET = "/images/projects/services";

export const specialistServices: readonly SpecialistService[] = [
  {
    slug: "electric-fencing",
    number: "01",
    navLabel: "Electric Fencing",
    title: "Electric Fencing",
    shortTitle: "Electric fencing",
    eyebrow: "Specialist service 01",
    description:
      "Boundary security that works with the wall: brackets, insulators, energizer wiring, Nemtek hardware and careful installation. Real installed examples below.",
    hero: {
      src: `${ASSET}/electric-fencing/front-778.webp`,
      width: 1280,
      height: 960,
      alt: "Electric fencing installed on a precast boundary wall",
      caption: "Electric fencing on a precast boundary wall",
      status: "real",
      focus: "50% 55%",
    },
    sections: [
      {
        eyebrow: "What this service covers",
        title: "Walls made secure.",
        body: "Electric fencing is installed on top of or alongside precast and palisade walls, using proper brackets, insulators, energizer wiring and warning signage. Work is planned around the wall line and the entry points that need to stay practical.",
        scope: [
          { title: "Site survey", description: "Assess the boundary, the wall type and the access points before quoting." },
          { title: "Installation", description: "Brackets, insulators, conductors and corner posts fitted in straight, tensioned runs." },
          { title: "Hardware", description: "Nemtek and compatible energizer and bracket hardware installed and earthed correctly." },
          { title: "Access control", description: "Gates and access doors integrated so the security line is not broken by an opening." },
          { title: "Handover", description: "Testing, safety checks and a practical run-through of the system." },
        ],
      },
      {
        eyebrow: "Technical detail",
        title: "The hardware up close.",
        body: "Close views of the brackets, insulators and wiring that carry the fence line. These details matter: correct spacing and tension keep the circuit reliable and the installation safe.",
        detail: [
          {
            src: `${ASSET}/electric-fencing/nemtek-bracket-01.webp`,
            width: 960,
            height: 1280,
            alt: "Close view of a Nemtek bracket carrying electric fence wiring",
            caption: "Bracket and wiring detail",
            status: "real",
          },
          {
            src: `${ASSET}/electric-fencing/nemtek-bracket-02.webp`,
            width: 960,
            height: 1280,
            alt: "Close view of an insulator and electric fence wire",
            caption: "Insulator and wire detail",
            status: "real",
          },
        ],
      },
      {
        eyebrow: "Behind the scenes",
        title: "Installed the right way.",
        body: "A clean installation starts below ground. Conduit is laid where the wiring must cross a drive or a gate line, so the finished fence has no exposed cable runs and the circuit stays protected.",
        gallery: [
          {
            src: `${ASSET}/electric-fencing/conduit-trench.webp`,
            width: 960,
            height: 1280,
            alt: "Conduit trench prepared during an electric fence installation",
            caption: "Conduit trench prepared during installation",
            status: "real",
          },
        ],
      },
      {
        eyebrow: "Installed work",
        title: "On the boundary.",
        body: "Client-supplied photographs of completed fencing installations. Captions stay generic and do not name the sites.",
        gallery: [
          {
            src: `${ASSET}/electric-fencing/front-778.webp`,
            width: 1280,
            height: 960,
            alt: "Electric fencing on a precast boundary wall, wide view",
            caption: "Electric fencing on a precast boundary wall",
            status: "real",
          },
          {
            src: `${ASSET}/electric-fencing/front-778-alt.webp`,
            width: 1280,
            height: 960,
            alt: "Electric fencing on a precast boundary wall, alternate view",
            caption: "Same wall line from another angle",
            status: "real",
          },
          {
            src: `${ASSET}/electric-fencing/access-door.webp`,
            width: 960,
            height: 1280,
            alt: "Access door built into a fenced boundary wall",
            caption: "Access door within the wall",
            status: "real",
          },
          {
            src: `${ASSET}/electric-fencing/corner-post.webp`,
            width: 960,
            height: 1280,
            alt: "Corner post with electric fence brackets and wiring",
            caption: "Corner post detail",
            status: "real",
          },
          {
            src: `${ASSET}/electric-fencing/wire-line.webp`,
            width: 960,
            height: 1280,
            alt: "Long run of electric fence wire along a boundary wall",
            caption: "Wire run along the boundary",
            status: "real",
          },
        ],
      },
    ],
  },
  {
    slug: "walls-precast",
    number: "02",
    navLabel: "Walls & Precast",
    title: "Walls & Precast",
    shortTitle: "Walls and precast",
    eyebrow: "Specialist service 02",
    description:
      "Finished precast concrete boundary walls, built as solid panels and finished clean. Real installations shown in the gallery below.",
    hero: {
      src: `${ASSET}/walls-precast/boundary-01.webp`,
      width: 1280,
      height: 960,
      alt: "Finished precast concrete boundary wall",
      caption: "Finished precast boundary wall",
      status: "real",
      focus: "50% 55%",
    },
    sections: [
      {
        eyebrow: "What this service covers",
        title: "Boundaries that hold.",
        body: "Precast concrete walling is supplied and installed as a finished boundary: panels set on a proper foundation, aligned to the boundary line and finished to a clean face.",
        scope: [
          { title: "Panel supply", description: "Precast concrete panels manufactured or sourced to the wall design." },
          { title: "Foundation and erection", description: "Foundations, panel setting, alignment and capping." },
          { title: "Finishing", description: "Pointing, sealing and preparation for paint where required." },
          { title: "Integration", description: "Fencing, gate and access-door openings coordinated with the wall build." },
        ],
      },
      {
        eyebrow: "Installed work",
        title: "Finished wall lines.",
        body: "Client-supplied photographs of completed precast boundary walls. Captions stay generic and do not name the sites.",
        gallery: [
          {
            src: `${ASSET}/walls-precast/boundary-01.webp`,
            width: 1280,
            height: 960,
            alt: "Finished precast concrete boundary wall, first view",
            caption: "Finished precast boundary wall",
            status: "real",
          },
          {
            src: `${ASSET}/walls-precast/boundary-02.webp`,
            width: 1280,
            height: 960,
            alt: "Finished precast concrete boundary wall, second view",
            caption: "Finished precast boundary wall, second view",
            status: "real",
          },
        ],
      },
    ],
  },
  {
    slug: "gate-automation",
    number: "03",
    navLabel: "Gate Automation",
    title: "Gate Automation",
    shortTitle: "Gate automation",
    eyebrow: "Specialist service 03",
    description:
      "Sliding and swing gates with automated drives, fitted to real installations and wired for everyday use.",
    hero: {
      src: `${ASSET}/gate-automation/sliding-automated-yellow.webp`,
      width: 810,
      height: 1080,
      alt: "Automated sliding gate at an installed property",
      caption: "Automated sliding gate, installed example",
      status: "real",
      focus: "50% 40%",
    },
    sections: [
      {
        eyebrow: "What this service covers",
        title: "Open the gate, keep it secure.",
        body: "Sliding and swing gates are supplied, installed and automated so an entrance stays practical for vehicles and pedestrians without losing the security of the boundary.",
        scope: [
          { title: "Gate supply and install", description: "Sliding and swing gates sized and fitted to the opening." },
          { title: "Automation", description: "Gate motors installed, aligned and tested for smooth travel." },
          { title: "Access control", description: "Remotes, intercom and access control wired to the drive." },
          { title: "Service and backup", description: "Setup for battery backup and routine maintenance of the running gear." },
        ],
      },
      {
        eyebrow: "Promotional graphic",
        title: "Gate automation, in short.",
        body: "The supplied promotional graphic below is a designed advertisement, not a site photograph. It is shown here as the client provided it, with the full contact block intact.",
        promo: {
          src: "/images/marketing/ad-sliding-gate-systems.webp",
          width: 1600,
          height: 2134,
          alt: "Promotional graphic for Mendozer sliding gate systems with the Mendozer contact block",
          caption: "Promotional graphic supplied by Mendozer Investments",
          note: "Designed advertisement shown for reference. Contact details preserved as supplied.",
        },
      },
      {
        eyebrow: "Installed work",
        title: "A real installation.",
        body: "A client-supplied photograph of an installed automated sliding gate. Caption stays generic and does not name the site.",
        gallery: [
          {
            src: `${ASSET}/gate-automation/sliding-automated-yellow.webp`,
            width: 810,
            height: 1080,
            alt: "Automated sliding gate at an installed property",
            caption: "Automated sliding gate, installed example",
            status: "real",
          },
        ],
      },
    ],
  },
  {
    slug: "general-construction",
    number: "04",
    navLabel: "General Construction",
    title: "General Construction & Building",
    shortTitle: "General construction",
    eyebrow: "Specialist service 04",
    description:
      "General building and civil works: plumbing, downpipes, groundwork and build-in-progress jobs handled to a clean finish.",
    hero: {
      src: `${ASSET}/general-construction/downpipe-plumbing.webp`,
      width: 810,
      height: 1080,
      alt: "Downpipe and plumbing detail on a house exterior",
      caption: "Downpipe and plumbing work on a house exterior",
      status: "real",
      focus: "50% 40%",
    },
    sections: [
      {
        eyebrow: "What this service covers",
        title: "Building work, done properly.",
        body: "General construction covers the practical building jobs around a property or site: plumbing runs, downpipes and drainage, groundwork and smaller structural works completed to a professional standard.",
        scope: [
          { title: "Plumbing and downpipes", description: "Roof-water downpipes, external plumbing runs and drainage connections." },
          { title: "Groundwork", description: "Foundations, trenches, slab prep and site levelling." },
          { title: "General building", description: "Structural and finishing work coordinated with the project plan." },
          { title: "Renovation support", description: "Upgrades and repairs that keep a building functional." },
        ],
      },
      {
        eyebrow: "Promotional graphic",
        title: "Building your project.",
        body: "The supplied promotional graphic below is a designed advertisement, not a site photograph. It is shown as the client provided it, with the full contact block intact.",
        promo: {
          src: "/images/marketing/ad-building-your-project.webp",
          width: 1600,
          height: 1999,
          alt: "Promotional graphic for building your project with Mendozer, including the Mendozer contact block",
          caption: "Promotional graphic supplied by Mendozer Investments",
          note: "Designed advertisement shown for reference. Contact details preserved as supplied.",
        },
      },
      {
        eyebrow: "Installed work",
        title: "Detail on the ground.",
        body: "A client-supplied photograph of completed building detail. Caption stays generic and does not name the site.",
        gallery: [
          {
            src: `${ASSET}/general-construction/downpipe-plumbing.webp`,
            width: 810,
            height: 1080,
            alt: "Downpipe and plumbing detail on a house exterior",
            caption: "Downpipe and plumbing work on a house exterior",
            status: "real",
          },
        ],
      },
    ],
  },
] as const;

export function getSpecialistService(slug: string): SpecialistService | undefined {
  return specialistServices.find((service) => service.slug === slug);
}

/** Team imagery that is approved for public use (the three casual selfies are excluded). */
export const teamGallery: readonly GalleryImage[] = [
  {
    src: "/images/team/crew-branded.webp",
    width: 1023,
    height: 1537,
    alt: "Mendozer team in a branded group photograph",
    caption: "The Mendozer crew",
    status: "real",
  },
  {
    src: "/images/team/crew-vests-01.webp",
    width: 960,
    height: 1280,
    alt: "Mendozer crew members in branded high-visibility site wear",
    caption: "Crew in branded site wear, on site",
    status: "real",
  },
  {
    src: "/images/team/crew-vests-02.webp",
    width: 960,
    height: 1280,
    alt: "Mendozer crew members in branded high-visibility site wear, second view",
    caption: "Crew in branded site wear, on site",
    status: "real",
  },
  {
    src: "/images/team/crew-vests-03.webp",
    width: 960,
    height: 1280,
    alt: "Mendozer crew members in branded high-visibility site wear, third view",
    caption: "Crew in branded site wear, on site",
    status: "real",
  },
];

/** Otjiwarongo Sports Bonanza 2026 PR, marketing and media impact report (downloadable). */
export const bonanzaPressReport = {
  eyebrow: "Campaign report",
  title: "Otjiwarongo Sports Bonanza 2026 PR, marketing and media impact report",
  file: "/documents/otjiwarongo-sports-bonanza-2026-pr-media-impact-report.pdf",
  fileName: "otjiwarongo-sports-bonanza-2026-pr-media-impact-report.pdf",
  label: "Download the full report (PDF)",
  meta: "PDF, 1.1 MB, 17 pages",
  teaser:
    "The report records the PR, marketing, media, digital and stakeholder communication delivered for the Otjiwarongo Sports Bonanza 2026 at Mokati Stadium from 21 to 23 August 2026. It summarises the campaign's three phases, Build Awareness, Drive Participation and Amplify the Experience, and the media exposure achieved through Focus FM, Desert FM, NBC Kai//as FM, New Era and Sport Wrap, alongside the media releases and sponsorship correspondence that supported the event.",
} as const;

/** Real promotional graphic, matched to a page for the manifest cross-reference. */
export const marketingGraphicLedger = [
  { filename: "mendozer-ad-sliding-gate-systems.jpeg", served: "/images/marketing/ad-sliding-gate-systems.webp", page: "/services/gate-automation", status: "published as labelled promotional graphic" },
  { filename: "mendozer-ad-building-your-project.jpeg", served: "/images/marketing/ad-building-your-project.webp", page: "/services/general-construction", status: "published as labelled promotional graphic" },
  { filename: "mendozer-branding-hardhat-mockup.jpg", served: "/images/marketing/branding-hardhat-mockup.webp", page: "None", status: "stored, folder only, not published to any gallery" },
  { filename: "mendozer-banner-construction-in-progress.jpg", served: "/images/marketing/banner-construction-in-progress.webp", page: "None", status: "stored, folder only, not published to any gallery" },
] as const;
