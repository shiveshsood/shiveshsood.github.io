"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

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
  if (locked) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className="cursor-pointer">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer">
          <VisuallyHidden.Root>
            <Dialog.Title>Enlarged view: {alt}</Dialog.Title>
          </VisuallyHidden.Root>
          {/* Close button — fixed to viewport top-right so it's always visible */}
          <Dialog.Close asChild>
            <button
              className="fixed top-5 right-5 text-white/70 hover:text-white transition-colors flex items-center gap-2 z-[10000]"
              aria-label="Close lightbox"
            >
              <span className="text-sm font-mono">esc</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <div className="relative max-w-[90vw] max-h-[85vh] cursor-pointer">
              <Image
                src={src}
                alt={alt}
                width={width * 2}
                height={height * 2}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-sm"
              />
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
