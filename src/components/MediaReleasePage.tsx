import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

export type MediaReleasePoster = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

type MediaReleasePageProps = {
  eyebrow: string;
  headline: string;
  standfirst: string;
  releaseLabel: string;
  dateLabel: string;
  contactNote: string;
  body: ReactNode;
  pdfHref: string;
  pdfLabel: string;
  pdfNote: string;
  poster?: MediaReleasePoster;
  backHref: string;
  backLabel: string;
};

export function MediaReleasePage({
  eyebrow,
  headline,
  standfirst,
  releaseLabel,
  dateLabel,
  contactNote,
  body,
  pdfHref,
  pdfLabel,
  pdfNote,
  poster,
  backHref,
  backLabel,
}: MediaReleasePageProps) {
  return (
    <article className="blog-post media-release">
      <header className="blog-post__header">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1>{headline}</h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="blog-post__lede">{standfirst}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="blog-post__meta">
              <span>{releaseLabel}</span>
              <span aria-hidden="true"> / </span>
              <span>{dateLabel}</span>
            </div>
          </Reveal>
        </div>
      </header>
      <div className="breadcrumbs-wrap">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "News", href: "/blog" },
              { label: "Sports Bonanza 2026", href: "/blog/otjiwarongo-sports-bonanza-2026" },
            ]}
          />
        </div>
      </div>

      {poster ? (
        <section className="blog-post__featured">
          <div className="site-container">
            <Reveal variant="up">
              <figure className="blog-post__figure">
                <Image
                  alt={poster.alt}
                  className="blog-post__flyer"
                  height={poster.height}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  src={poster.src}
                  width={poster.width}
                />
                {poster.caption ? <figcaption>{poster.caption}</figcaption> : null}
              </figure>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="section blog-post__body">
        <div className="site-container blog-post__body-inner">
          {body}

          <Reveal>
            <div className="media-release__download">
              <h2>Download the release</h2>
              <p>{pdfNote}</p>
              <a aria-label={`Download ${pdfLabel} (PDF)`} className="button button--primary" download href={pdfHref}>
                <span>Download PDF</span>
                <ArrowIcon />
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="media-release__contact">
              <h2>Media contact</h2>
              <p>{contactNote}</p>
              <ul className="media-release__contact-list">
                <li>
                  <span>Organisation</span>
                  <strong>Mendozer Investments CC</strong>
                </li>
                <li>
                  <span>Contact</span>
                  <strong>Managing Director</strong>
                </li>
                <li>
                  <span>Telephone</span>
                  <a href="tel:+264817777077">+264 81 777 7077</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href="mailto:jneg.neg@gmail.com">jneg.neg@gmail.com</a>
                </li>
                <li>
                  <span>Address</span>
                  <strong>P.O. Box 22205, Windhoek, Namibia</strong>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <p className="media-release__back">
              <Link className="text-link" href={backHref}>
                {backLabel} <ArrowIcon />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
