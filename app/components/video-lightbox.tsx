"use client";

import { useId, useRef, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface VideoLightboxProps {
  src: string;
  alt: string;
  playbackRate?: number;
  className?: string;
}

function setRate(el: HTMLVideoElement | null, rate: number) {
  if (el) el.playbackRate = rate;
}

export function VideoLightbox({
  src,
  alt,
  playbackRate = 1,
  className = "",
}: VideoLightboxProps) {
  const id = useId();
  const inlineRef = useCallback(
    (el: HTMLVideoElement | null) => setRate(el, playbackRate),
    [playbackRate],
  );
  const lightboxRef = useRef<HTMLVideoElement>(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className="cursor-pointer w-full">
          <video
            ref={inlineRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className={className}
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content
          id={id}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            setRate(lightboxRef.current, playbackRate);
          }}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Video: {alt}</Dialog.Title>
          </VisuallyHidden.Root>
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
              <video
                ref={lightboxRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-sm"
              />
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
