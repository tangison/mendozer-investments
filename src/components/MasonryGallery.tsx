"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { imageDimensions } from "@/content/image-dimensions";

type MasonryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type MasonryGalleryProps = {
  items: readonly MasonryImage[];
  label: string;
};

/** Dimensions resolve from the generated manifest when an item does not carry them. */
function dimsFor(item: MasonryImage) {
  const known = imageDimensions[item.src];
  return {
    width: item.width ?? known?.width ?? 1200,
    height: item.height ?? known?.height ?? 900,
  };
}

/** CSS-columns masonry with a native dialog lightbox. Alt text only, no captions. */
export function MasonryGallery({ items, label }: MasonryGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<MasonryImage | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !active) return;
    if (!dialog.open) dialog.showModal();
    const onBackdrop = () => {
      if (!dialog.returnValue) dialog.close();
    };
    dialog.addEventListener("click", onBackdrop);
    return () => dialog.removeEventListener("click", onBackdrop);
  }, [active]);

  function close() {
    dialogRef.current?.close();
    setActive(null);
  }

  return (
    <div aria-label={label} className="masonry" role="region">
      <ul className="masonry__grid">
        {items.map((item) => (
          <li className="masonry__item" key={item.src}>
            <button
              aria-label={`View image: ${item.alt}`}
              className="masonry__trigger"
              onClick={() => setActive(item)}
              type="button"
            >
              <Image
                alt={item.alt}
                className="masonry__image"
                height={dimsFor(item).height}
                loading="lazy"
                sizes="(max-width: 700px) 92vw, (max-width: 1080px) 46vw, 30vw"
                src={item.src}
                width={dimsFor(item).width}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        aria-label="Image viewer"
        className="masonry__lightbox"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        onClose={() => setActive(null)}
        ref={dialogRef}
      >
        {active ? (
          <>
            <button aria-label="Close image viewer" className="masonry__close" onClick={close} type="button">
              <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
              </svg>
            </button>
            <Image
              alt={active.alt}
              height={dimsFor(active).height}
              sizes="(max-width: 1080px) 94vw, 1040px"
              src={active.src}
              width={dimsFor(active).width}
            />
            <p className="sr-only">{active.alt}</p>
          </>
        ) : null}
      </dialog>
    </div>
  );
}
