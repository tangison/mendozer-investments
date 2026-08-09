import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import type { MediaAsset } from "@/content/site-content";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  media: MediaAsset;
  index?: string;
};

export function PageHero({ eyebrow, title, body, media, index }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <MediaFrame asset={media} caption={false} priority sizes="100vw" />
      </div>
      <div className="page-hero__overlay" />
      <div className="page-hero__grid site-container">
        <div className="page-hero__copy">
          <Reveal>
            <p className="eyebrow eyebrow--light">{eyebrow}</p>
          </Reveal>
          <Reveal delay={90}>
            <h1>{title}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p>{body}</p>
          </Reveal>
        </div>
        {index ? <span aria-hidden="true" className="page-hero__index">{index}</span> : null}
      </div>
      <p className="page-hero__caption">{media.caption}</p>
    </section>
  );
}
