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
  Dixon: {
    facebook: "https://www.facebook.com/DIXON.NAM/",
  },
};

const ALIASES: Record<string, string> = {
  Pjay: "PJay",
  Zella: "Zella Fullforce",
  "Full Force": "Zella Fullforce",
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
