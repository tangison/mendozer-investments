import type { FaqItem } from "@/content/site-content";

type AccordionListProps = {
  items: readonly FaqItem[];
};

export function AccordionList({ items }: AccordionListProps) {
  return (
    <div className="accordion-list">
      {items.map((item) => (
        <details className="accordion-item" key={item.question}>
          <summary>
            <span>{item.question}</span>
            <span aria-hidden="true" className="accordion-item__icon" />
          </summary>
          <div className="accordion-item__content"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
