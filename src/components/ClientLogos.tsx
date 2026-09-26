import Image from "next/image";
import { clientLogos } from "@/content/site-content";

type ClientLogosProps = {
  eyebrow: string;
  title: string;
  body: string;
};

/**
 * Trusted-by band: one accessible marquee row of partner marks.
 * Marks with a verified organisation site link out in a new tab;
 * marks without a verifiable site render static rather than guessing a URL.
 */
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
              {logo.href ? (
                <a
                  aria-label={`${logo.name} website (opens in a new tab)`}
                  className="logo-marquee__link"
                  href={logo.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image alt={logo.name} height={64} sizes="160px" src={logo.src} width={160} />
                </a>
              ) : (
                <Image alt={logo.name} height={64} sizes="160px" src={logo.src} width={160} />
              )}
            </li>
          ))}
          {clientLogos.map((logo) => (
            <li aria-hidden="true" className="logo-marquee__item" key={`${logo.src}-dup`}>
              {logo.href ? (
                <a
                  className="logo-marquee__link"
                  href={logo.href}
                  tabIndex={-1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image alt="" height={64} sizes="160px" src={logo.src} width={160} />
                </a>
              ) : (
                <Image alt="" height={64} sizes="160px" src={logo.src} width={160} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
