"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface ProjectSlideshowProps {
  images: string[];
  alt: string;
}

export function ProjectSlideshow({ images, alt }: ProjectSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;
  const single = total <= 1;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Keyboard nav in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <>
      <div className="rounded-sm overflow-hidden border border-neutral-200 relative group">
        {/* Current image */}
        <Image
          src={images[index]}
          alt={`${alt} — ${index + 1} of ${total}`}
          width={1000}
          height={600}
          className="w-full h-auto cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Navigation arrows — visible on hover when multiple images */}
        {!single && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white"
              aria-label="Previous image"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.5 2.5L4 6l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white"
              aria-label="Next image"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.5 2.5L8 6l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {!single && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === index
                    ? "bg-neutral-800 scale-110"
                    : "bg-neutral-400/60 hover:bg-neutral-500"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter badge */}
        {!single && (
          <span className="absolute top-2.5 right-2.5 font-mono text-[10px] text-neutral-500 bg-white/85 backdrop-blur-sm border border-neutral-200 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {index + 1}/{total}
          </span>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${alt} — ${index + 1} of ${total}`}
                width={2000}
                height={1200}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm"
              />

              {/* Lightbox arrows */}
              {!single && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M7.5 2.5L4 6l3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M4.5 2.5L8 6l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Lightbox dots */}
              {!single && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i === index
                          ? "bg-white scale-110"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-mono transition-colors"
                aria-label="Close lightbox"
              >
                esc
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
