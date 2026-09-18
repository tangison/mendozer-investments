import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  inverse?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, body, inverse = false, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align} ${inverse ? "section-heading--inverse" : ""}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal>
        <h2>{title}</h2>
      </Reveal>
      {body ? (
        <Reveal>
          <p className="section-heading__body">{body}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
