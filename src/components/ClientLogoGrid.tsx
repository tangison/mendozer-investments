import Image from "next/image";
import { publicProofLogos, type ProofLogo } from "@/content/proof-logos";

type ClientLogoGridProps = {
  eyebrow: string;
  title: string;
  body: string;
  id?: string;
};

function LogoCell({ logo }: { logo: ProofLogo }) {
  return (
    <li className={`logo-grid__cell ${logo.feature ? "logo-grid__cell--feature" : ""}`}>
      {logo.file ? (
        logo.href ? (
          <a className="logo-grid__link" href={logo.href} rel="noopener noreferrer" target="_blank">
            <Image
              alt={`${logo.name} logo`}
              className="logo-grid__image"
              height={logo.height ?? 240}
              loading="lazy"
              sizes="(max-width: 700px) 46vw, (max-width: 1080px) 23vw, 15vw"
              src={logo.file}
              unoptimized={logo.file.endsWith(".svg")}
              width={logo.width ?? 320}
            />
          </a>
        ) : (
          <div className="logo-grid__static">
            <Image
              alt={`${logo.name} logo`}
              className="logo-grid__image"
              height={logo.height ?? 240}
              loading="lazy"
              sizes="(max-width: 700px) 46vw, (max-width: 1080px) 23vw, 15vw"
              src={logo.file}
              unoptimized={logo.file.endsWith(".svg")}
              width={logo.width ?? 320}
            />
          </div>
        )
      ) : (
        <div className="logo-grid__static">
          <span className="logo-grid__fallback">{logo.name}</span>
        </div>
      )}
    </li>
  );
}

/**
 * Static client grid: 2 columns mobile, 4 tablet, 6 desktop. Marks render in
 * the client-supplied order; organisations without a verified mark show their
 * name as styled text in the same cell rather than guessing a logo.
 */
export function ClientLogoGrid({ eyebrow, title, body, id }: ClientLogoGridProps) {
  return (
    <section className="section section--surface logo-grid-section" id={id}>
      <div className="site-container">
        <div className="clients-section__heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="clients-section__body">{body}</p>
        </div>
        <ul className="logo-grid" role="list">
          {publicProofLogos.map((logo) => (
            <LogoCell key={logo.name} logo={logo} />
          ))}
        </ul>
      </div>
    </section>
  );
}
