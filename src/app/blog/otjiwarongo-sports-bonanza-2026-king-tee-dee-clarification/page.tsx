import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { MediaReleasePage } from "@/components/MediaReleasePage";

const SLUG = "/blog/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification";
const PDF = "/documents/otjiwarongo-sports-bonanza-2026-king-tee-dee-clarification.pdf";
const OG_IMAGE = "/og/bonanza-king-tee-dee.png";

export const metadata: Metadata = {
  title: "Clarification on King Tee Dee's involvement in the Otjiwarongo Sports Bonanza",
  description:
    "Mendozer Investments CC confirms that King Tee Dee performed at the Otjiwarongo Sports Bonanza 2026 as the headline act, with no role in its finances.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "Clarification on King Tee Dee's involvement in the Otjiwarongo Sports Bonanza | Mendozer Investments",
    description:
      "Mendozer Investments CC confirms that King Tee Dee performed at the Otjiwarongo Sports Bonanza 2026 as the headline act, with no role in its finances.",
    type: "article",
    url: SLUG,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Otjiwarongo Sports Bonanza 2026 clarification notice on King Tee Dee" }],
    publishedTime: "2026-08-25T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarification on King Tee Dee's involvement in the Otjiwarongo Sports Bonanza | Mendozer Investments",
    description:
      "Mendozer Investments CC confirms that King Tee Dee performed at the Otjiwarongo Sports Bonanza 2026 as the headline act, with no role in its finances.",
    images: [OG_IMAGE],
  },
};

export default function KingTeeDeeClarificationPage() {
  return (
    <MediaReleasePage
      backHref="/blog/otjiwarongo-sports-bonanza-2026"
      backLabel="Back to the Bonanza conclusion"
      contactNote="For any queries relating to the financial affairs or administration of the Otjiwarongo Sports Bonanza, contact Mendozer Investments CC directly."
      dateLabel="25 August 2026"
      eyebrow="For immediate release"
      headline="Clarification on King Tee Dee's involvement in the Otjiwarongo Sports Bonanza."
      pdfHref={PDF}
      pdfLabel="Clarification on King Tee Dee's involvement"
      pdfNote="The original release is available as a PDF download. PDF, 624 KB."
      releaseLabel="Otjiwarongo, Namibia"
      standfirst="Mendozer Investments CC confirms that Namibian artist King Tee Dee performed at the Otjiwarongo Sports Bonanza 2026 as the headline act for the music show, and had no involvement in the event's financial administration."
      body={
        <>
          <Reveal>
            <p>
              Mendozer Investments CC wishes to clarify the role and involvement of Namibian artist King Tee Dee in the Otjiwarongo Sports Bonanza 2026,
              following concerns or enquiries regarding the event&apos;s financial affairs.
            </p>
            <p>
              King Tee Dee was engaged solely in his capacity as a performing artist for the entertainment programme of the Otjiwarongo Sports Bonanza. He was
              the headline performer for the music show, alongside other artists, as stated in the original event communication.
            </p>
          </Reveal>

          <Reveal>
            <h2>No role in financial administration</h2>
            <p>
              King Tee Dee has no involvement whatsoever in the financial administration, collection, management or disbursement of funds relating to the
              Otjiwarongo Sports Bonanza. He was not responsible for payments to suppliers, creditors, service providers, sporting teams, prize money or any
              other financial obligations associated with the event.
            </p>
            <p>
              All financial matters relating to the Sports Bonanza are the responsibility of Mendozer Investments CC and the authorised organisers of the event.
              Any enquiries concerning outstanding payments, creditor balances, banking details, sponsorship funds, prize money or other financial matters should
              therefore be directed to Mendozer Investments and not to King Tee Dee.
            </p>
          </Reveal>

          <Reveal>
            <h2>Performance role only</h2>
            <p>
              The release emphasises that the artist&apos;s involvement was strictly limited to his contractual performance and entertainment responsibilities.
              His participation should not be interpreted as an indication that he was a partner, organiser, financial administrator, sponsor, fund manager or
              beneficiary of the event.
            </p>
            <p>
              Mendozer Investments CC appreciates King Tee Dee&apos;s contribution to the entertainment programme and his participation in an event that was
              designed to bring together sport, music, unity and community. The original event programme identified him specifically as the headline performer
              for the music show.
            </p>
          </Reveal>

          <Reveal>
            <h2>Directing enquiries to the right place</h2>
            <p>
              Mendozer Investments CC respectfully requests that members of the public, stakeholders, creditors, service providers and the media refrain from
              directing financial enquiries or allegations concerning the Sports Bonanza to King Tee Dee.
            </p>
            <p>
              For any queries relating to the financial affairs or administration of the Otjiwarongo Sports Bonanza, contact Mendozer Investments CC directly.
            </p>
          </Reveal>
        </>
      }
    />
  );
}
