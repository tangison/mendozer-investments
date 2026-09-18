import Image from "next/image";
import { clientLogos } from "@/content/site-content";

type ClientLogosProps = {
  eyebrow: string;
  title: string;
  body: string;
};

/** Trusted-by band: one accessible marquee row of partner marks, free-floating. */
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
              <Image alt={logo.name} height={64} sizes="160px" src={logo.src} width={160} />
            </li>
          ))}
          {clientLogos.map((logo) => (
            <li aria-hidden="true" className="logo-marquee__item" key={`${logo.src}-dup`}>
              <Image alt="" height={64} sizes="160px" src={logo.src} width={160} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
