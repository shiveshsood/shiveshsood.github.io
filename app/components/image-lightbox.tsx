"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  locked?: boolean;
  priority?: boolean;
}

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  className = "",
  locked = false,
  priority = false,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${locked ? "" : "cursor-pointer"}`}
        priority={priority}
        onClick={() => !locked && setOpen(true)}
      />
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={close}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <Image
                src={src}
                alt={alt}
                width={width * 2}
                height={height * 2}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
