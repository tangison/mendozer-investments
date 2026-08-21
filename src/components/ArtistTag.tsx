type ArtistSocial = {
  instagram?: string;
  facebook?: string;
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
  if (VERIFIED[label] || ["Stakes Boy", "PJay", "Ravennelli", "Om Zolle", "Lettie", "OC Bulan", "Dixon", "Jaliza", "Ravdaz", "Kallo On The Beat"].includes(label)) {
    return label;
  }
  return ALIASES[label] ?? null;
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
          ) : (
            <span className="osb-verify">[VERIFY HANDLE]</span>
          )}
          {social.facebook ? (
            <a href={social.facebook} rel="noreferrer" target="_blank">
              Facebook
            </a>
          ) : null}
        </span>
      ) : (
        <span className="osb-verify">[VERIFY HANDLE]</span>
      )}
    </span>
  );
}
