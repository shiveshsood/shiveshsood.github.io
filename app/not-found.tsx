"use client";

import { Link } from "next-view-transitions";
import { useSyncExternalStore, useCallback, useRef } from "react";

const PATTERNS = ["/patterns/kullu-patti-1.png", "/patterns/kullu-patti-2.png"];

export default function NotFound() {
  const indexRef = useRef(0);
  const subscribe = useCallback((cb: () => void) => {
    function onPattiChange(e: Event) {
      const idx = (e as CustomEvent).detail?.index;
      if (typeof idx === "number") {
        indexRef.current = idx;
        cb();
      }
    }
    window.addEventListener("patti-change", onPattiChange);
    return () => window.removeEventListener("patti-change", onPattiChange);
  }, []);
  const patternIndex = useSyncExternalStore(subscribe, () => indexRef.current, () => 0);

  return (
    <div className="flex flex-col items-center text-center py-12 sm:py-20">
      {/* Kullu patti 404 — each digit masked with the textile pattern */}
      <div className="flex items-center gap-1 sm:gap-2 mb-8 select-none">
        {["4", "0", "4"].map((digit, i) => (
          <div
            key={i}
            className="font-serif font-bold text-[7rem] sm:text-[9rem] leading-[0.85] -tracking-[0.06em]"
            style={{
              backgroundImage: `url(${PATTERNS[patternIndex]})`,
              backgroundSize: "80px auto",
              backgroundRepeat: "repeat",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {digit}
          </div>
        ))}
      </div>

      {/* Message */}
      <p className="font-display text-lg sm:text-xl text-neutral-400 mb-10">
        that page doesn&apos;t exist, my friend.
      </p>

      {/* CTA link */}
      <Link
        href="/"
        className="font-display text-neutral-400 underline underline-offset-4 decoration-neutral-300 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
      >
        go back &rarr;
      </Link>
    </div>
  );
}
