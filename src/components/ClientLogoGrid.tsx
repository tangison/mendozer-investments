import Image from "next/image";
import { publicProofLogos, type ProofLogo } from "@/content/proof-logos";

type ClientLogoGridProps = {
  eyebrow: string;
  title: string;
  body: string;
  id?: string;
};

type LogoWithFile = ProofLogo & { file: string };

function LogoCell({ logo }: { logo: LogoWithFile }) {
  return (
    <li className={`logo-grid__cell ${logo.feature ? "logo-grid__cell--feature" : ""}`}>
      {logo.href ? (
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
      )}
    </li>
  );
}

/**
 * Static client grid: 2 columns mobile, 4 tablet, 6 desktop. Only organisations
 * with a verified official mark render here; per owner instruction (2026-10-01)
 * organisations without a cleared logo file are omitted, no text placeholders.
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
