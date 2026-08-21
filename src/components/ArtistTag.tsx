type ArtistSocial = {
  instagram?: string;
  facebook?: string;
  x?: string;
};

const VERIFIED: Record<string, ArtistSocial> = {
  "King Tee Dee": {
    instagram: "https://www.instagram.com/kingteedee/",
    facebook: "https://www.facebook.com/kingteedee/",
  },
  Kalux: {
    instagram: "https://www.instagram.com/kalux_the_superstar/",
  },
  "Zella Fullforce": {
    instagram: "https://www.instagram.com/zellafullforce/",
    facebook: "https://www.facebook.com/zellafullforce/",
  },
  Agogo: {
    facebook: "https://www.facebook.com/AgogoSkuzaNamibia/",
  },
  PJay: {
    instagram: "https://www.instagram.com/pjay__na/",
  },
  Jaliza: {
    instagram: "https://www.instagram.com/jalizajalilie/",
    facebook: "https://www.facebook.com/p/Jaliza-100063840305449/",
  },
  "Kallo On The Beat": {
    instagram: "https://www.instagram.com/kallo_onthebeat/",
    x: "https://x.com/iam_kallo",
  },
  Dixon: {
    facebook: "https://www.facebook.com/DIXON.NAM/",
  },
  Lettie: {
    facebook: "https://www.facebook.com/p/Lettie-Queen-of-MaGaisa-100063775110686/",
  },
};

const ALIASES: Record<string, string> = {
  "Oom Zolle": "Om Zolle",
  "King Tee Dee - Headline Performance": "King Tee Dee",
  "King Tee Dee – Headline Performance": "King Tee Dee",
  "PJay - Opening Act (3 Songs)": "PJay",
  "PJay – Opening Act (3 Songs)": "PJay",
  "Ravennelli - Opening Act (3 Songs)": "Ravennelli",
  "Ravennelli – Opening Act (3 Songs)": "Ravennelli",
};

export function resolveArtistName(label: string): string | null {
  if (VERIFIED[label] || ALIASES[label]) {
    return ALIASES[label] ?? label;
  }
  return null;
}

export function ArtistTag({ name, className = "" }: { name: string; className?: string }) {
  const canonical = ALIASES[name] ?? name;
  const social = VERIFIED[canonical];

  return (
    <span className={`osb-artist-tag ${className}`.trim()}>
      <span>{name}</span>
      {social ? (
        <span className="osb-artist-tag__links">
          {social.instagram ? (
            <a href={social.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
          ) : null}
          {social.facebook ? (
            <a href={social.facebook} rel="noreferrer" target="_blank">
              Facebook
            </a>
          ) : null}
          {social.x ? (
            <a href={social.x} rel="noreferrer" target="_blank">
              X
            </a>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
