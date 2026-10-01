import logos from "./proof-logos.json";

export type ProofLogo = {
  name: string;
  file: string | null;
  sourceUrl: string | null;
  sourceType: "official-site" | "client-supplied" | "none";
  retrievedAt: string;
  quality: "high" | "low" | "not-found";
  href: string | null;
  showPublic: boolean;
  feature: boolean;
  width: number | null;
  height: number | null;
  note: string;
};

export const proofLogos = logos as readonly ProofLogo[];

/** Grid entries the public may see. */
export const publicProofLogos = proofLogos.filter((logo) => logo.showPublic);
