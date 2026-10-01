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

/** Grid entries the public may see: owner-approved AND with a verified mark file.
 *  Per owner instruction (2026-10-01) organisations without a verified mark are
 *  omitted entirely - no styled-text placeholders. */
export const publicProofLogos = proofLogos.filter(
  (logo): logo is ProofLogo & { file: string } => logo.showPublic && logo.file !== null,
);
