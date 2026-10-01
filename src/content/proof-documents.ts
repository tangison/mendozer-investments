import documents from "./proof-documents.json";

export type ProofDocumentPage = { width: number; height: number };

export type ProofDocument = {
  id: string;
  slug: string;
  client: string;
  type: string;
  category: "references" | "completion" | "awards" | "credentials";
  pageCount: number;
  imagePaths: readonly string[];
  thumbPath: string;
  pageDims: readonly ProofDocumentPage[];
  pdfPath: string;
  pdfFilename: string;
  pdfSizeKB: number;
  altText: string;
  showPublic: boolean;
};

export const proofDocuments = documents as readonly ProofDocument[];
