import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { MediaReleasePage } from "@/components/MediaReleasePage";

const SLUG = "/blog/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments";
const PDF = "/documents/otjiwarongo-sports-bonanza-2026-reconciliation-and-prize-payments.pdf";
const OG_IMAGE = "/og/bonanza-reconciliation.png";

export const metadata: Metadata = {
  title: "Reconciliation and prize payment requirements for the Otjiwarongo Sports Bonanza",
  description:
    "Mendozer Investments CC sets out the reconciliation requirements teams must meet before prize monies are paid directly into team bank accounts.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "Reconciliation and prize payment requirements for the Otjiwarongo Sports Bonanza | Mendozer Investments",
    description:
      "Mendozer Investments CC sets out the reconciliation requirements teams must meet before prize monies are paid directly into team bank accounts.",
    type: "article",
    url: SLUG,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Otjiwarongo Sports Bonanza 2026 reconciliation and prize payment notice" }],
    publishedTime: "2026-08-24T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reconciliation and prize payment requirements for the Otjiwarongo Sports Bonanza | Mendozer Investments",
    description:
      "Mendozer Investments CC sets out the reconciliation requirements teams must meet before prize monies are paid directly into team bank accounts.",
    images: [OG_IMAGE],
  },
};

export default function ReconciliationAndPrizePaymentsPage() {
  return (
    <MediaReleasePage
      backHref="/blog/otjiwarongo-sports-bonanza-2026"
      backLabel="Back to the Bonanza conclusion"
      contactNote="For any queries relating to the financial affairs or administration of the Otjiwarongo Sports Bonanza, contact Mendozer Investments CC directly."
      dateLabel="24 August 2026"
      eyebrow="Media release"
      headline="Reconciliation and prize payment requirements for the Otjiwarongo Sports Bonanza."
      pdfHref={PDF}
      pdfLabel="Reconciliation and prize payment requirements"
      pdfNote="The original release is available as a PDF download. PDF, 648 KB."
      releaseLabel="Mendozer Investments CC"
      standfirst="Mendozer Investments CC has written to the Otjiwarongo Sports Bonanza event organisers to confirm the reconciliation requirements for outstanding balances and the documentation each team must submit before prize monies are paid directly into its bank account."
      body={
        <>
          <Reveal>
            <h2>Reconciliation of outstanding balances</h2>
            <p>
              On behalf of Mendozer Investments CC, the notice thanks the event organisers for their support, cooperation and assistance in making the event a
              success, and appreciates the commitment and effort that went into the planning and execution of the event.
            </p>
            <p>
              As the financial reconciliation and settlement of outstanding obligations proceeds, the event organisers are asked to provide a full reconciliation
              of all outstanding balances, including the correct amounts due to creditors and any other parties to whom payment remains outstanding.
            </p>
            <p>For all outstanding creditor payments, the following documentation must accompany the reconciliation:</p>
            <ol>
              <li>The correct and verified outstanding balance due to each creditor.</li>
              <li>The banking details of the creditor.</li>
              <li>
                A valid banking confirmation letter from the relevant financial institution confirming the account details.
              </li>
              <li>
                Where payment is to be made through an electronic wallet, a letter from the relevant cellphone service provider confirming ownership of the
                cellphone number registered for the wallet.
              </li>
            </ol>
          </Reveal>

          <Reveal>
            <h2>Prize payments to teams</h2>
            <p>
              All prize monies will be paid directly into the respective teams&apos; bank accounts by Mendozer Investments CC. Each team must therefore submit its
              official banking details together with a valid banking confirmation letter confirming the account details.
            </p>
            <p>
              In instances where a team does not have a dedicated team bank account, the team leader may submit personal banking details, provided that these are
              accompanied by a valid banking confirmation letter from the relevant bank, and a cellphone number ownership confirmation letter from the relevant
              cellphone service provider where an electronic wallet is being used.
            </p>
          </Reveal>

          <Reveal>
            <h2>Prescribed payment process</h2>
            <p>
              The notice is explicit about the payment route: &quot;For the avoidance of doubt, Mendozer Investments CC will not, under any circumstances, make
              payments through any method other than the payment process prescribed above.&quot; The requirement is intended to ensure proper financial controls,
              accountability, verification and an accurate audit trail for all payments relating to the event.
            </p>
            <p>
              All outstanding reconciliations and supporting documentation should be submitted as soon as possible to facilitate the timely processing of
              payments.
            </p>
          </Reveal>

          <Reveal>
            <p>
              The notice is addressed to the Sports Bonanza Event Organisers, Aniger Investments CC, P.O. Box 602, Otjiwarongo, and is signed by the Managing
              Director of Mendozer Investments CC.
            </p>
          </Reveal>
        </>
      }
    />
  );
}
