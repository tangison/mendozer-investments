/* Hallmark pre-emit critique: P5 H5 E5 S5 R5 V4 */

import type { FaqItem } from "@/content/site-content";

type AccordionListProps = {
  items: readonly FaqItem[];
};

/** Native disclosure elements keep the FAQ keyboard-friendly without a client dependency. */
export function AccordionList({ items }: AccordionListProps) {
  return (
    <div className="accordion-list">
      {items.map((item, index) => (
        <details className="accordion-item" key={item.question}>
          <summary>
            <span className="accordion-item__number">0{index + 1}</span>
            <span>{item.question}</span>
            <span aria-hidden="true" className="accordion-item__icon" />
          </summary>
          <div className="accordion-item__content"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
