import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ArtistTag } from "@/components/ArtistTag";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/brand/site-config";

const ASSET = "/images/events/otjiwarongo-sports-bonanza-2026";
const PRIZE_POSTER = `${ASSET}/osb-2026-poster-prizes.webp`;

export const metadata: Metadata = {
  title: "Otjiwarongo Sports Bonanza 2026 | Mokati Stadium",
  description: "Soccer, netball and volleyball at Mokati Stadium, Otjiwarongo, 21 to 23 August 2026. Friday and Sunday free. Saturday music show N$30 with King Tee Dee.",
  alternates: { canonical: "/blog/otjiwarongo-sports-bonanza-2026" },
  openGraph: {
    title: "Otjiwarongo Sports Bonanza 2026 | Mendozer Investments",
    description: "21-23 August 2026 at Mokati Stadium. Soccer, netball, volleyball. N$45,000 prize pool. King Tee Dee live Saturday. One tournament, countless memories.",
    type: "article",
    url: "/blog/otjiwarongo-sports-bonanza-2026",
    images: [{ url: PRIZE_POSTER, width: 1130, height: 1600, alt: "Otjiwarongo Sports Bonanza 2026 prize flyer with soccer, netball and volleyball totals" }],
    publishedTime: "2026-08-15T00:00:00.000Z",
    modifiedTime: "2026-08-21T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otjiwarongo Sports Bonanza 2026 | Mendozer Investments",
    description: "21-23 August 2026 at Mokati Stadium. N$45,000 prize pool. King Tee Dee live Saturday.",
    images: [PRIZE_POSTER],
  },
};

const artistPosters = [
  { src: `${ASSET}/osb-2026-poster-king-tee-dee.webp`, name: "King Tee Dee", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-stakes-boy.webp`, name: "Stakes Boy", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-dixon.webp`, name: "Dixon", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-jaliza.webp`, name: "Jaliza", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-kalux.webp`, name: "Kalux", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-agogo.webp`, name: "Agogo", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-oom-zolle.webp`, name: "Om Zolle", width: 1600, height: 1593 },
  { src: `${ASSET}/osb-2026-poster-pjay.webp`, name: "PJay", width: 1024, height: 1019 },
  { src: `${ASSET}/osb-2026-poster-ravdaz.webp`, name: "Ravdaz", width: 1028, height: 1024 },
  { src: `${ASSET}/osb-2026-poster-kallo-on-the-beat.webp`, name: "Kallo On The Beat", width: 1024, height: 1024 },
] as const;

const portraits = [
  { src: `${ASSET}/osb-2026-portrait-king-tee-dee.webp`, name: "King Tee Dee", width: 800, height: 1200 },
  { src: `${ASSET}/osb-2026-portrait-stakes-boy.webp`, name: "Stakes Boy", width: 864, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-dixon.webp`, name: "Dixon", width: 1080, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-jaliza.webp`, name: "Jaliza", width: 720, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-kalux.webp`, name: "Kalux", width: 864, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-agogo.webp`, name: "Agogo", width: 864, height: 1080 },
  { src: `${ASSET}/osb-2026-portrait-oom-zolle.webp`, name: "Om Zolle", width: 715, height: 1073 },
  { src: `${ASSET}/osb-2026-portrait-guest.webp`, name: "Event portrait", width: 810, height: 1080 },
] as const;

const kit = [
  { src: `${ASSET}/osb-2026-kit-safety-vest.webp`, caption: "Mendozer safety vest", width: 1081, height: 992 },
  { src: `${ASSET}/osb-2026-kit-tshirt-front.webp`, caption: "Mendozer shirt, front", width: 1081, height: 992 },
  { src: `${ASSET}/osb-2026-kit-tshirt-back.webp`, caption: "Mendozer shirt, back", width: 532, height: 717 },
] as const;

const timeline = [
  { time: "18:00-19:00", act: "DJs / Music", duration: "60 min", artist: null as string | null },
  { time: "19:00-19:10", act: "PJay - Opening Act (3 Songs)", duration: "10 min", artist: "PJay" },
  { time: "19:10-19:20", act: "Ravennelli - Opening Act (3 Songs)", duration: "10 min", artist: "Ravennelli" },
  { time: "19:20-19:50", act: "Om Zolle", duration: "30 min", artist: "Om Zolle" },
  { time: "19:50-20:03", act: "Musical Break", duration: "13 min", artist: null },
  { time: "20:03-20:41", act: "Lettie", duration: "38 min", artist: "Lettie" },
  { time: "20:41-21:19", act: "OC Bulan", duration: "38 min", artist: "OC Bulan" },
  { time: "21:19-21:57", act: "Dixon", duration: "38 min", artist: "Dixon" },
  { time: "21:57-22:10", act: "Musical Break", duration: "13 min", artist: null },
  { time: "22:10-22:48", act: "Agogo", duration: "38 min", artist: "Agogo" },
  { time: "22:48-23:26", act: "Zella Fullforce", duration: "38 min", artist: "Zella Fullforce" },
  { time: "23:26-00:04", act: "Jaliza", duration: "38 min", artist: "Jaliza" },
  { time: "00:04-00:42", act: "Stakes Boy", duration: "38 min", artist: "Stakes Boy" },
  { time: "00:42-01:20", act: "Kalux", duration: "38 min", artist: "Kalux" },
  { time: "01:20-02:00", act: "King Tee Dee - Headline Performance", duration: "40 min", artist: "King Tee Dee" },
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

function ActCell({ act, artist }: { act: string; artist: string | null }) {
  if (!artist) return <span>{act}</span>;
  return <ArtistTag name={act} />;
}

export default function OtjiwarongoSportsBonanzaPage() {
  const postUrl = `${siteConfig.url}/blog/otjiwarongo-sports-bonanza-2026`;
  const imageUrl = `${siteConfig.url}${PRIZE_POSTER}`;

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Otjiwarongo Sports Bonanza 2026",
    description: "Mendozer Investments presents the Otjiwarongo Sports Bonanza, three days of soccer, netball, and volleyball at Mokati Stadium with a N$45,000 prize pool and live music by King Tee Dee.",
    startDate: "2026-08-21T08:00:00+02:00",
    endDate: "2026-08-23",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
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
    performer: {
      "@type": "MusicGroup",
      name: "King Tee Dee",
      sameAs: ["https://www.instagram.com/kingteedee/", "https://www.facebook.com/kingteedee/"],
    },
    image: imageUrl,
    offers: [
      { "@type": "Offer", name: "Friday entry", price: "0", priceCurrency: "NAD", availability: "https://schema.org/InStock", validFrom: "2026-08-21" },
      { "@type": "Offer", name: "Saturday music show entry", price: "30", priceCurrency: "NAD", availability: "https://schema.org/InStock", validFrom: "2026-08-22" },
      { "@type": "Offer", name: "Sunday entry", price: "0", priceCurrency: "NAD", availability: "https://schema.org/InStock", validFrom: "2026-08-23" },
    ],
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Otjiwarongo Sports Bonanza 2026: One tournament, countless memories",
    image: imageUrl,
    datePublished: "2026-08-15T00:00:00.000Z",
    dateModified: "2026-08-21T12:00:00.000Z",
    author: { "@type": "Organization", name: "Mendozer Investments", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Mendozer Investments",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    description: "Mendozer Investments presents Otjiwarongo Sports Bonanza at Mokati Stadium, 21-23 August 2026. Soccer, netball, volleyball, and a Saturday music show headlined by King Tee Dee.",
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
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Mendozer Investments presents</p>
            </Reveal>
            <Reveal delay={80}>
              <h1>Otjiwarongo Sports Bonanza 2026.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="blog-post__lede">
                Soccer, netball and volleyball at Mokati Stadium, plus a Saturday music show. Friday and Sunday are free. Saturday is N$30. One tournament, countless memories.
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
                  alt="Event poster: soccer, netball and volleyball with King Tee Dee, N$45,000 prize pool"
                  className="blog-post__flyer"
                  height={1600}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  src={PRIZE_POSTER}
                  width={1130}
                />
                <figcaption>Friday and Sunday free. Saturday music show N$30. Headlined by <ArtistTag name="King Tee Dee" />.</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>Come through. Bring the family.</h2>
              <p>
                Mendozer Investments presents the Otjiwarongo Sports Bonanza at Mokati Stadium from Friday 21 August to Sunday 23 August 2026. Three sports run across the weekend. N$45,000 is on the table. Friday and Sunday cost nothing at the gate. Saturday is N$30 for the music show.
              </p>
              <p>
                Gates open at 08:00 on Friday 21 August 2026. Honourable John //Khamuseb, Governor of the Otjozondjupa Region, opens the tournament at 09:00.
              </p>
            </Reveal>

            <Reveal>
              <h2>Event details</h2>
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
                  <dt>Gates</dt>
                  <dd>08:00, Friday 21 August 2026</dd>
                </div>
                <div>
                  <dt>Official opening</dt>
                  <dd>09:00, Honourable John //Khamuseb, Governor of the Otjozondjupa Region</dd>
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
              <h2>Opening programme</h2>
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
              <h2>Soccer schedule</h2>
              <p>Twelve games across Friday and Saturday. Netball and volleyball share the weekend on the same ground. Times below are the day-one and day-two soccer slots.</p>
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
              <h3>Friday 21 August</h3>
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
              <h3>Saturday 22 August</h3>
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
              <h2>Saturday music show</h2>
              <p>
                Saturday night is the paid music show. Entry is N$30. <ArtistTag name="King Tee Dee" /> headlines from 01:20 to 02:00 with a 40-minute close. Musical breaks are printed on the timeline so the programme can keep moving without a separate changeover block.
              </p>
              <figure className="osb-inline-poster">
                <Image
                  alt="Saturday music show artist performance timeline headlined by King Tee Dee"
                  height={1568}
                  sizes="(max-width: 700px) 100vw, 420px"
                  src={`${ASSET}/osb-2026-poster-artist-timeline.webp`}
                  width={1003}
                />
                <figcaption>Printed Saturday performance timeline.</figcaption>
              </figure>
              <figure className="osb-inline-poster">
                <Image
                  alt="Full lineup poster with King Tee Dee and supporting local acts"
                  height={1593}
                  sizes="(max-width: 700px) 100vw, 420px"
                  src={`${ASSET}/osb-2026-poster-king-tee-dee-lineup.webp`}
                  width={1600}
                />
                <figcaption>Printed full lineup poster.</figcaption>
              </figure>
              <table className="blog-post__prizes osb-timeline">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Act</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {timeline.map((row) => (
                    <tr key={row.time + row.act}>
                      <td>{row.time}</td>
                      <td>
                        <ActCell act={row.act} artist={row.artist} />
                      </td>
                      <td>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                Printed artist posters also name <ArtistTag name="Ravdaz" /> and <ArtistTag name="Kallo On The Beat" />. Those two names are not on the timed sheet.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section osb-artists-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Artist posters</p>
              <h2>The printed lineup.</h2>
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
              <p className="eyebrow">Portraits</p>
              <h2>Faces from the supplied set.</h2>
            </Reveal>
            <div className="osb-portraits">
              {portraits.map((portrait) => (
                <figure className="osb-portraits__item" key={portrait.src}>
                  <Image alt={portrait.name === "Event portrait" ? "Unlabelled event portrait supplied with the Bonanza pack" : `${portrait.name} portrait`} height={portrait.height} sizes="(max-width: 700px) 50vw, 20vw" src={portrait.src} width={portrait.width} />
                  <figcaption>{portrait.name === "Event portrait" ? portrait.name : <ArtistTag name={portrait.name} />}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section osb-kit-section">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Weekend kit</p>
              <h2>Vest and shirt marks.</h2>
              <p>Supplied kit visuals for the Bonanza. This is not a shop listing and no price is published here.</p>
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
              <div className="blog-post__cta">
                <h2>Register your team or get more info</h2>
                <p>Call the sport contact that matches your side. Soccer, volleyball, and netball each have a named pair.</p>
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
