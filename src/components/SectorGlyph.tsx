import type { GlyphName } from "@/content/site-content";

/** A single angular line-icon family derived for the reusable sector template. */
export function SectorGlyph({ name }: { name: GlyphName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.65,
  };

  return (
    <svg aria-hidden="true" className="sector-glyph" viewBox="0 0 48 48">
      {name === "structure" && (
        <>
          <path {...common} d="M8 38h32M12 38V20l12-10 12 10v18M18 38V27h12v11M8 20h8M32 20h8" />
          <path {...common} d="m18 20 6-5 6 5" />
        </>
      )}
      {name === "signal" && (
        <>
          <path {...common} d="M24 38V24M17 38h14M20 24l4-14 4 14M16 16a11 11 0 0 0-3 8M32 16a11 11 0 0 1 3 8M12 12a17 17 0 0 0-5 12M36 12a17 17 0 0 1 5 12" />
          <circle cx="24" cy="24" fill="currentColor" r="1.7" />
        </>
      )}
      {name === "cooling" && (
        <>
          <path {...common} d="M24 8v32M10.1 16l27.8 16M10.1 32l27.8-16" />
          <path {...common} d="M24 24c-4.4-7-10.2-7.4-11.5-3.3-1.1 3.4 3 6.9 11.5 3.3ZM24 24c8.5 3.6 12.6.1 11.5-3.3C34.2 16.6 28.4 17 24 24ZM24 24c-4.2 7.2-1.3 12.6 2.4 11.8 3.1-.7 3.6-6  -2.4-11.8Z" />
        </>
      )}
      {name === "route" && (
        <>
          <path {...common} d="M10 12h11c5.5 0 5.5 9 11 9h6M10 36h9c5.5 0 5.5-9 11-9h8" />
          <path {...common} d="m14 8-4 4 4 4M36 17l4 4-4 4M14 32l-4 4 4 4" />
          <circle cx="25" cy="24" fill="currentColor" r="2" />
        </>
      )}
      {name === "energy" && (
        <>
          <path {...common} d="M27 6 12 27h11l-2 15 15-22H25l2-14Z" />
          <path {...common} d="M8 40h32" />
        </>
      )}
      {name === "landscape" && (
        <>
          <path {...common} d="M7 38 20 20l8 10 5-6 8 14H7ZM12 15h.01M34 12h.01" />
          <path {...common} d="M34 7v10M29 12h10" />
        </>
      )}
    </svg>
  );
}
