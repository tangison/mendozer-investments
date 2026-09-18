import Image from "next/image";
import { clientLogos } from "@/content/site-content";

type ClientLogosProps = {
  eyebrow: string;
  title: string;
  body: string;
};

/** Trusted-by band: a single accessible marquee row of partner marks. */
export function ClientLogos({ eyebrow, title, body }: ClientLogosProps) {
  return (
    <section className="section section--surface clients-section">
      <div className="site-container">
        <div className="clients-section__heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="clients-section__body">{body}</p>
        </div>
      </div>
      <div className="logo-marquee" role="region" aria-label="Partner and client organisations">
        <ul className="logo-marquee__track">
          {clientLogos.map((logo) => (
            <li className="logo-marquee__item" key={logo.src}>
              <span className="logo-marquee__chip">
                <Image alt={logo.name} height={64} sizes="160px" src={logo.src} width={160} />
              </span>
              <span className="sr-only">{logo.name}</span>
            </li>
          ))}
          {clientLogos.map((logo) => (
            <li aria-hidden="true" className="logo-marquee__item" key={`${logo.src}-dup`}>
              <span className="logo-marquee__chip">
                <Image alt="" height={64} sizes="160px" src={logo.src} width={160} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
