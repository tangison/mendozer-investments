"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { proofDocuments, type ProofDocument } from "@/content/proof-documents";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "references", label: "References" },
  { id: "completion", label: "Completion & Acceptance" },
  { id: "awards", label: "Awards" },
  { id: "credentials", label: "Company credentials" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

/** Scroll-snap carousel of proof documents with an accessible page lightbox. */
export function ProofCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState<FilterId>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDoc, setActiveDoc] = useState<ProofDocument | null>(null);
  const [activePage, setActivePage] = useState(0);

  const documents = useMemo(
    () => proofDocuments.filter((doc) => doc.showPublic),
    [],
  );
  const filtered = useMemo(
    () => (filter === "all" ? documents : documents.filter((doc) => doc.category === filter)),
    [documents, filter],
  );

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slideWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const slide = track.querySelector("li");
    if (!slide) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const count = track.querySelectorAll("li").length;
    const clamped = Math.max(0, Math.min(index, count - 1));
    track.scrollTo({ left: clamped * slideWidth(), behavior: reduceMotion() ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const width = slideWidth();
        if (!width) return;
        const count = track.querySelectorAll("li").length;
        setActiveIndex(Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / width))));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [filter]);

  function changeFilter(next: FilterId) {
    setFilter(next);
    setActiveIndex(0);
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "auto" });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !activeDoc) return;
    if (!dialog.open) dialog.showModal();
    return () => dialog.close();
  }, [activeDoc]);

  function openDocument(doc: ProofDocument) {
    setActivePage(0);
    setActiveDoc(doc);
  }

  function closeLightbox() {
    dialogRef.current?.close();
    setActiveDoc(null);
  }

  function stepPage(delta: number) {
    if (!activeDoc) return;
    const max = activeDoc.pageCount - 1;
    setActivePage((current) => Math.max(0, Math.min(max, current + delta)));
  }

  function onTrackKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
  }

  const visibleCount = filtered.length;

  return (
    <div className="proof">
      {documents.length > 12 ? (
        <div aria-label="Filter documents" className="proof__filters" role="group">
          {FILTERS.map((item) => (
            <button
              aria-pressed={filter === item.id}
              className={`proof__filter ${filter === item.id ? "is-active" : ""}`}
              key={item.id}
              onClick={() => changeFilter(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      <div aria-roledescription="carousel" aria-label="Proof of Work & Certifications documents" className="proof__carousel">
        <ul className="proof__track" onKeyDown={onTrackKeyDown} ref={trackRef} tabIndex={0}>
          {filtered.map((doc, index) => {
            const dims = doc.pageDims[0] ?? { width: 1000, height: 1414 };
            return (
              <li
                aria-label={`Document ${index + 1} of ${visibleCount}`}
                aria-roledescription="slide"
                className="proof__slide"
                key={doc.slug}
                role="listitem"
              >
                <article className="proof-card">
                  <button
                    aria-label={`View ${doc.altText}`}
                    className="proof-card__thumb"
                    onClick={() => openDocument(doc)}
                    type="button"
                  >
                    <Image
                      alt={doc.altText}
                      height={dims.height}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 700px) 70vw, (max-width: 1080px) 36vw, 23vw"
                      src={doc.thumbPath}
                      width={dims.width}
                    />
                  </button>
                  <p className="proof-card__client">{doc.client}</p>
                  <p className="proof-card__type">{doc.type}</p>
                  <div className="proof-card__actions">
                    <button className="proof-card__view" onClick={() => openDocument(doc)} type="button">
                      View
                    </button>
                    <a className="proof-card__download" download={doc.pdfFilename} href={doc.pdfPath}>
                      Download PDF
                      <span className="proof-card__size">PDF, {doc.pdfSizeKB} KB</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="proof__controls">
          <button
            aria-label="Previous document"
            className="proof__button"
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            aria-label="Next document"
            className="proof__button"
            disabled={activeIndex >= visibleCount - 1}
            onClick={() => scrollToIndex(activeIndex + 1)}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
            </svg>
          </button>
          <p aria-live="polite" className="proof__count">
            {Math.min(activeIndex + 1, visibleCount)} / {visibleCount}
          </p>
        </div>
      </div>

      <dialog
        aria-label="Document viewer"
        className="proof__lightbox"
        onClick={(event) => {
          if (event.target === dialogRef.current) closeLightbox();
        }}
        onClose={() => setActiveDoc(null)}
        ref={dialogRef}
      >
        {activeDoc ? (
          <>
            <div className="proof-lightbox__bar">
              <p className="proof-lightbox__title">
                <strong>{activeDoc.client}</strong>
                <span>{activeDoc.type}</span>
              </p>
              <div className="proof-lightbox__actions">
                <a className="button button--light proof-lightbox__download" download={activeDoc.pdfFilename} href={activeDoc.pdfPath}>
                  Download PDF ({activeDoc.pdfSizeKB} KB)
                </a>
                <button aria-label="Close document viewer" className="proof-lightbox__close" onClick={closeLightbox} type="button">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="proof-lightbox__stage">
              {activeDoc.pageCount > 1 ? (
                <button
                  aria-label="Previous page"
                  className="proof-lightbox__nav"
                  disabled={activePage === 0}
                  onClick={() => stepPage(-1)}
                  type="button"
                >
                  <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </button>
              ) : null}
              <Image
                alt={`${activeDoc.altText}, page ${activePage + 1} of ${activeDoc.pageCount}`}
                height={activeDoc.pageDims[activePage]?.height ?? 1414}
                sizes="(max-width: 1080px) 94vw, 1040px"
                src={activeDoc.imagePaths[activePage]}
                width={activeDoc.pageDims[activePage]?.width ?? 1000}
              />
              {activeDoc.pageCount > 1 ? (
                <button
                  aria-label="Next page"
                  className="proof-lightbox__nav"
                  disabled={activePage === activeDoc.pageCount - 1}
                  onClick={() => stepPage(1)}
                  type="button"
                >
                  <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </button>
              ) : null}
            </div>
            {activeDoc.pageCount > 1 ? (
              <p className="proof-lightbox__pages">
                Page {activePage + 1} of {activeDoc.pageCount}
              </p>
            ) : null}
          </>
        ) : null}
      </dialog>
    </div>
  );
}
