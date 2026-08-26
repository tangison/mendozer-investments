import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ArtistTag } from "@/components/ArtistTag";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/brand/site-config";

const ASSET = "/images/events/otjiwarongo-sports-bonanza-2026";
const CONCLUSION_POSTER = `${ASSET}/osb-2026-conclusion-poster.webp`;
const OG_IMAGE = "/og/bonanza-conclusion.png";

export const metadata: Metadata = {
  title: "Namaqua FC win the Otjiwarongo Sports Bonanza 2026",
  description:
    "Namaqua FC defeated Ama Roots FC 2 to 1 in the final at Mokati Stadium to win the Otjiwarongo Sports Bonanza 2026, held 21 to 23 August 2026.",
  alternates: { canonical: "/blog/otjiwarongo-sports-bonanza-2026" },
  openGraph: {
    title: "Namaqua FC win the Otjiwarongo Sports Bonanza 2026 | Mendozer Investments",
    description:
      "Final score: Namaqua FC 2 to 1 Ama Roots FC at Mokati Stadium, 21 to 23 August 2026. Sport, music, unity, community.",
    type: "article",
    url: "/blog/otjiwarongo-sports-bonanza-2026",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Namaqua FC win the Otjiwarongo Sports Bonanza 2026" }],
    publishedTime: "2026-08-15T00:00:00.000Z",
    modifiedTime: "2026-08-26T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Namaqua FC win the Otjiwarongo Sports Bonanza 2026 | Mendozer Investments",
    description: "Final score: Namaqua FC 2 to 1 Ama Roots FC at Mokati Stadium, 21 to 23 August 2026.",
    images: [OG_IMAGE],
  },
};

const lineup = ["King Tee Dee", "Kalux", "Pjay", "Agogo", "Skuza", "Zella", "Full Force", "Tate Buti", "Dixon"] as const;

const artistPosters = [
  { src: `${ASSET}/osb-2026-poster-king-tee-dee.webp`, name: "King Tee Dee", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-kalux.webp`, name: "Kalux", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-pjay.webp`, name: "Pjay", width: 1024, height: 1019 },
  { src: `${ASSET}/osb-2026-poster-agogo.webp`, name: "Agogo", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-dixon.webp`, name: "Dixon", width: 1600, height: 1593 },
] as const;

const portraits = [
  { src: `${ASSET}/osb-2026-portrait-pjay.webp`, name: "Pjay", width: 720, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-dixon.webp`, name: "Dixon", width: 1080, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-agogo.webp`, name: "Agogo", width: 864, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-kalux.webp`, name: "Kalux", width: 864, height: 1080 },
] as const;

const gallery = [
  { src: `${ASSET}/gallery/osb-2026-gallery-01.webp`, width: 1280, height: 960 },
  { src: `${ASSET}/gallery/osb-2026-gallery-02.webp`, width: 1280, height: 960 },
  { src: `${ASSET}/gallery/osb-2026-gallery-03.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-04.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-05.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-06.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-07.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-08.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-09.webp`, width: 1280, height: 960 },
  { src: `${ASSET}/gallery/osb-2026-gallery-10.webp`, width: 960, height: 1280 },
  { src: `${ASSET}/gallery/osb-2026-gallery-11.webp`, width: 960, height: 1280 },
] as const;

const kit = [
  { src: `${ASSET}/osb-2026-kit-safety-vest.webp`, caption: "Mendozer safety vest", width: 1081, height: 992 },
  { src: `${ASSET}/osb-2026-kit-tshirt-front.webp`, caption: "Mendozer shirt, front", width: 1081, height: 992 },
  { src: `${ASSET}/osb-2026-kit-tshirt-back.webp`, caption: "Mendozer shirt, back", width: 532, height: 717 },
] as const;

const fridayGames = [
  { no: 1, time: "14h00-15h20", a: "Otjiwarongo Hospital FC", b: "Miyello FC" },
  { no: 2, time: "15h35-16h55", a: "Cheetah B FC", b: "Mendozer FC" },
  { no: 3, time: "17h10-18h30", a: "Namaqua FC", b: "Kalkfeld FC" },
  { no: 4, time: "18h45-20h05", a: "Rocking United FC", b: "Algeria FC" },
  { no: 5, time: "20h20-21h40", a: "Edna FC", b: "Kom Kyk FC" },
  { no: 6, time: "21h55-23h15", a: "Titanic FC", b: "Fio Stars FC" },
] as const;

const saturdayGames = [
  { no: 7, time: "08h00-09h20", a: "Rooibult FC", b: "Ott Legends FC" },
  { no: 8, time: "09h35-10h55", a: "TF Manfumhe FC", b: "Paradise FC" },
  { no: 9, time: "11h10-12h30", a: "King Taxidermy FC", b: "Silvercoin A FA" },
  { no: 10, time: "12h45-14h05", a: "Ott Masters FC", b: "Silvercoin B FA" },
  { no: 11, time: "14h20-15h40", a: "Amaroots FC", b: "Elite FC" },
  { no: 12, time: "15h55-17h15", a: "Ott Taxi FC", b: "London FC" },
] as const;

const opening = [
  "Processional and assembly: arrival of the public, participating teams, guests and VIPs",
  "Invocation / prayer: Pastor Ivan",
  "Welcome address: Ms Rejoice Sabatha, General Coordinator of the Region, NFA",
  "Welcoming soccer fanatic: Deputy Mayor Sebedeus Guiteb",
  "Inspirational message: Otjozondjupa Regional Governor, Honourable John //Khamuseb",
  "Vote of thanks: Mr Evans Masoreka",
] as const;

const mediaReleases = [
  {
    title: "Reconciliation and prize payment requirements",
    href: "/blog/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments",
    pdf: "/documents/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments.pdf",
    date: "24 August 2026",
    summary:
      "The documentation required for the reconciliation of outstanding balances and for prize monies to be paid directly into team bank accounts.",
  },
  {
    title: "Clarification on King Tee Dee's involvement",
    href: "/blog/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification",
    pdf: "/documents/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification.pdf",
    date: "25 August 2026",
    summary:
      "King Tee Dee performed as the headline act for the music show and had no role in the financial administration of the event.",
  },
] as const;

export default function OtjiwarongoSportsBonanzaPage() {
  const postUrl = `${siteConfig.url}/blog/otjiwarongo-sports-bonanza-2026`;
  const imageUrl = `${siteConfig.url}${OG_IMAGE}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Namaqua FC win the Otjiwarongo Sports Bonanza 2026",
    image: imageUrl,
    datePublished: "2026-08-15T00:00:00.000Z",
    dateModified: "2026-08-26T00:00:00.000Z",
    author: { "@type": "Organization", name: "Mendozer Investments", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Mendozer Investments",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description:
      "Namaqua FC defeated Ama Roots FC 2 to 1 in the final at Mokati Stadium to win the Otjiwarongo Sports Bonanza 2026, held 21 to 23 August 2026.",
  };

  const sportsEventSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Otjiwarongo Sports Bonanza 2026",
    description: "Namaqua FC defeated Ama Roots FC 2 to 1 in the final at Mokati Stadium, 21 to 23 August 2026.",
    startDate: "2026-08-21",
    endDate: "2026-08-23",
    location: {
      "@type": "Place",
      name: "Mokati Stadium",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Otjiwarongo",
        addressCountry: "NA",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Mendozer Investments",
      url: siteConfig.url,
      email: siteConfig.email,
    },
    competitor: [{ "@type": "SportsTeam", name: "Namaqua FC" }, { "@type": "SportsTeam", name: "Ama Roots FC" }],
    image: imageUrl,
  };

  const sports = [
    {
      name: "Soccer",
      total: "N$30,000",
      registration: "N$500",
      prizes: [
        { place: "Winner", amount: "N$15,000" },
        { place: "Runner-up", amount: "N$10,000" },
        { place: "Semi-finalists (each)", amount: "N$2,500" },
      ],
    },
    {
      name: "Netball",
      total: "N$10,000",
      registration: "N$300",
      prizes: [
        { place: "Winner", amount: "N$5,000" },
        { place: "Runner-up", amount: "N$3,000" },
        { place: "Semi-finalists (each)", amount: "N$1,000" },
      ],
    },
    {
      name: "Volleyball",
      total: "N$5,000",
      registration: "N$100",
      prizes: [
        { place: "Winner", amount: "N$2,500" },
        { place: "Runner-up", amount: "N$1,000" },
        { place: "Semi-finalists (each)", amount: "N$750" },
      ],
    },
  ];

  const contactGroups = [
    { role: "Soccer", names: "Richard / Jeremia", phones: ["081 277 8696", "081 471 5216"] },
    { role: "Volleyball and netball", names: "Regina / Erna", phones: ["081 680 5242", "081 226 4992"] },
  ];

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Mendozer Investments presents</p>
            </Reveal>
            <Reveal delay={80}>
              <h1>Namaqua FC win the Otjiwarongo Sports Bonanza.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="blog-post__lede">
                Namaqua FC defeated Ama Roots FC 2 to 1 in the final at Mokati Stadium to close the 21 to 23 August 2026 tournament as champions. One
                tournament, countless memories.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="blog-post__meta">
                <span>21 to 23 August 2026</span>
                <span aria-hidden="true"> / </span>
                <span>Mokati Stadium, Otjiwarongo</span>
                <span aria-hidden="true"> / </span>
                <span>Sport | Music | Unity | Community</span>
              </div>
            </Reveal>
          </div>
        </header>
        <div className="breadcrumbs-wrap">
          <div className="site-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/blog" }, { label: "Sports Bonanza 2026" }]} />
          </div>
        </div>

        <section className="blog-post__featured">
          <div className="site-container">
            <Reveal variant="up">
              <figure className="blog-post__figure">
                <Image
                  alt="Otjiwarongo Sports Bonanza 2026 final result poster: Namaqua FC 2 to 1 Ama Roots FC"
                  className="blog-post__flyer"
                  height={1402}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  src={CONCLUSION_POSTER}
                  width={1122}
                />
                <figcaption>Final result poster. Namaqua FC 2 to 1 Ama Roots FC.</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>The final.</h2>
              <p>
                Namaqua FC are the champions of the Otjiwarongo Sports Bonanza 2026. The final ended 2 to 1 against Ama Roots FC at Mokati Stadium, closing
                three days of soccer, netball and volleyball held from Friday 21 August to Sunday 23 August 2026.
              </p>
              <p>
                Mendozer Investments presented the tournament. The result carried on the tournament poster is the recorded final score, and no other match
                results are published here.
              </p>
            </Reveal>

            <Reveal>
              <h2>Event at a glance</h2>
              <dl className="blog-post__details">
                <div>
                  <dt>Dates</dt>
                  <dd>Friday 21 August to Sunday 23 August 2026</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>Mokati Stadium, Otjiwarongo, Namibia</dd>
                </div>
                <div>
                  <dt>Champion</dt>
                  <dd>Namaqua FC</dd>
                </div>
                <div>
                  <dt>Final score</dt>
                  <dd>Namaqua FC 2 to 1 Ama Roots FC</dd>
                </div>
                <div>
                  <dt>Presented by</dt>
                  <dd>Mendozer Investments</dd>
                </div>
                <div>
                  <dt>Prize pool</dt>
                  <dd>N$45,000 across soccer, netball, and volleyball</dd>
                </div>
                <div>
                  <dt>Entry</dt>
                  <dd>
                    <span>Friday: Free</span>
                    <span>Saturday: N$30 (music show)</span>
                    <span>Sunday: Free</span>
                  </dd>
                </div>
                <div>
                  <dt>Theme</dt>
                  <dd>Sport | Music | Unity | Community. Fair play. Team spirit. Unity and respect.</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <h2>The tournament.</h2>
              <p>
                Mendozer Investments presented the Otjiwarongo Sports Bonanza at Mokati Stadium from Friday 21 August to Sunday 23 August 2026. Soccer,
                netball and volleyball ran across the weekend with a N$45,000 prize pool. Friday and Sunday were free at the gate; Saturday carried a N$30
                music show.
              </p>
              <p>
                The official opening was led at 09:00 on the opening morning by Honourable John //Khamuseb, Governor of the Otjozondjupa Region.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section osb-gallery-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">On the ground</p>
              <h2>The event in pictures.</h2>
            </Reveal>
            <div className="osb-gallery">
              {gallery.map((photo) => (
                <figure className="osb-gallery__item" key={photo.src}>
                  <Image
                    alt="Event photograph from the Otjiwarongo Sports Bonanza 2026 at Mokati Stadium, Otjiwarongo"
                    height={photo.height}
                    sizes="(max-width: 700px) 100vw, 32vw"
                    src={photo.src}
                    width={photo.width}
                  />
                  <figcaption>Otjiwarongo Sports Bonanza 2026</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>Saturday music show.</h2>
              <p>
                Saturday night was the paid music show at N$30, headlined by King Tee Dee as stated in the original event communication. The published music
                show bill:
              </p>
              <ul className="osb-lineup">
                {lineup.map((name) => (
                  <li key={name}>
                    <ArtistTag name={name} />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2>Prize breakdown by sport</h2>
              <p>Three sports, each with its own registration fee and prize structure. Every sport pays out to the winner, runner-up, and both semi-finalists.</p>
            </Reveal>

            {sports.map((sport) => (
              <Reveal key={sport.name}>
                <div className="blog-post__sport">
                  <div className="blog-post__sport-header">
                    <h3>{sport.name}</h3>
                    <div className="blog-post__sport-totals">
                      <span className="blog-post__sport-total">Total: {sport.total}</span>
                      <span className="blog-post__sport-reg">Registration: {sport.registration}</span>
                    </div>
                  </div>
                  <table className="blog-post__prizes">
                    <thead>
                      <tr>
                        <th>Placement</th>
                        <th>Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sport.prizes.map((prize) => (
                        <tr key={prize.place}>
                          <td>{prize.place}</td>
                          <td>{prize.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <h2>Tournament record</h2>
              <p>The programme below is the record as printed for the weekend.</p>
            </Reveal>

            <Reveal>
              <h3>Opening ceremony programme</h3>
              <figure className="osb-inline-poster">
                <Image
                  alt="Today announcement poster: gates open 08:00 Friday 21 August 2026 at Mokati Stadium"
                  height={1593}
                  sizes="(max-width: 700px) 100vw, 420px"
                  src={`${ASSET}/osb-2026-poster-today-gates.webp`}
                  width={1600}
                />
                <figcaption>Gates-open poster for Friday 21 August.</figcaption>
              </figure>
              <figure className="osb-inline-poster">
                <Image
                  alt="Opening programme poster for Otjiwarongo Sports Bonanza at Mokati Stadium"
                  height={1600}
                  sizes="(max-width: 700px) 100vw, 420px"
                  src={`${ASSET}/osb-2026-poster-opening-programme.webp`}
                  width={1131}
                />
                <figcaption>Printed opening programme.</figcaption>
              </figure>
              <ol className="osb-opening">
                {opening.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h3>Soccer fixtures, as printed</h3>
              <p>Twelve games across Friday and Saturday. Netball and volleyball shared the weekend on the same ground.</p>
              <figure className="osb-inline-poster">
                <Image
                  alt="Day 1 and Day 2 soccer match schedule poster"
                  height={1402}
                  sizes="(max-width: 700px) 100vw, 420px"
                  src={`${ASSET}/osb-2026-poster-soccer-fixtures.webp`}
                  width={1122}
                />
                <figcaption>Printed soccer fixtures.</figcaption>
              </figure>
              <h4>Friday 21 August</h4>
              <table className="blog-post__prizes osb-fixtures">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th>Time</th>
                    <th>Team A</th>
                    <th>Team B</th>
                  </tr>
                </thead>
                <tbody>
                  {fridayGames.map((game) => (
                    <tr key={game.no}>
                      <td>{game.no}</td>
                      <td>{game.time}</td>
                      <td>{game.a}</td>
                      <td>{game.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>Saturday 22 August</h4>
              <table className="blog-post__prizes osb-fixtures">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th>Time</th>
                    <th>Team A</th>
                    <th>Team B</th>
                  </tr>
                </thead>
                <tbody>
                  {saturdayGames.map((game) => (
                    <tr key={game.no}>
                      <td>{game.no}</td>
                      <td>{game.time}</td>
                      <td>{game.a}</td>
                      <td>{game.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        <section className="section osb-artists-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Artist posters</p>
              <h2>On the posters.</h2>
            </Reveal>
            <div className="osb-artists">
              {artistPosters.map((poster) => (
                <figure className="osb-artists__item" key={poster.src}>
                  <Image alt={`${poster.name} poster for Otjiwarongo Sports Bonanza 2026`} height={poster.height} sizes="(max-width: 700px) 100vw, 32vw" src={poster.src} width={poster.width} />
                  <figcaption>
                    <ArtistTag name={poster.name} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section osb-portraits-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Artists</p>
              <h2>Who is on the bill.</h2>
            </Reveal>
            <div className="osb-portraits">
              {portraits.map((portrait) => (
                <figure className="osb-portraits__item" key={portrait.src}>
                  <Image alt={`${portrait.name} portrait`} height={portrait.height} sizes="(max-width: 700px) 50vw, 20vw" src={portrait.src} width={portrait.width} />
                  <figcaption>
                    <ArtistTag name={portrait.name} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section osb-kit-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Weekend kit</p>
              <h2>Marshal vest and event shirt.</h2>
              <p>Kit for the weekend on the ground. Nothing here is for sale.</p>
            </Reveal>
            <div className="osb-kit">
              {kit.map((item) => (
                <figure className="osb-kit__item" key={item.src}>
                  <Image alt={item.caption} height={item.height} sizes="(max-width: 700px) 100vw, 30vw" src={item.src} width={item.width} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>Media releases</h2>
              <p>Two official notices accompany this conclusion, each published with the original PDF attached.</p>
            </Reveal>

            {mediaReleases.map((release) => (
              <Reveal key={release.href}>
                <div className="media-release-card">
                  <p className="media-release-card__date">{release.date}</p>
                  <h3>{release.title}</h3>
                  <p>{release.summary}</p>
                  <p className="media-release-card__actions">
                    <Link className="text-link" href={release.href}>
                      Read the release <ArrowIcon />
                    </Link>
                    <a className="text-link" download href={release.pdf}>
                      Download PDF <ArrowIcon />
                    </a>
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="blog-post__cta">
                <h2>Result and payment queries</h2>
                <p>
                  Prize monies are paid directly into the respective teams&apos; bank accounts. Teams and creditors should follow the reconciliation and prize
                  payment requirements in the notice of 24 August 2026. Soccer, volleyball and netball each have a named contact pair.
                </p>
                <div className="blog-post__contacts">
                  {contactGroups.map((group) => (
                    <div className="osb-contact-card" key={group.role}>
                      <span>{group.role}</span>
                      <strong>{group.names}</strong>
                      {group.phones.map((phone) => (
                        <a href={`tel:+264${phone.replace(/\s/g, "").replace(/^0/, "")}`} key={phone}>
                          {phone}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
                <Link className="button button--primary" href="/contact">
                  <span>Send an enquiry to the group</span>
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
