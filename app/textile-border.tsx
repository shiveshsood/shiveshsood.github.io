"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const PATTERNS = ["/patterns/kullu-patti-1.png", "/patterns/kullu-patti-2.png"];
const TOOLTIP_ID = "textile-border-tooltip";

export function TextileBorder() {
  const [mouseY, setMouseY] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all pattern images so switching is instant + broadcast initial pattern
  useEffect(() => {
    for (const src of PATTERNS) {
      const img = new Image();
      img.src = src;
    }
    // Defer so we don't update sibling component state during the same render cycle
    const t = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("patti-change", { detail: { index: 0 } }));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 120);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouseY(e.clientY + window.scrollY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
    setMouseY(null);
  }, []);

  const handleClick = useCallback(() => {
    setPatternIndex((i) => {
      const next = (i + 1) % PATTERNS.length;
      window.dispatchEvent(new CustomEvent("patti-change", { detail: { index: next } }));
      return next;
    });
  }, []);

  // Keyboard support — mirror hover behavior on focus
  const handleFocus = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 120);
  }, []);

  const handleBlur = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPatternIndex((i) => (i + 1) % PATTERNS.length);
    }
  }, []);

  return (
    <div
      className="hidden sm:block absolute top-0 bottom-0 right-0 w-[80px] md:w-[96px] z-50 cursor-pointer"
      style={{
        backgroundImage: `url(${PATTERNS[patternIndex]})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Decorative textile border inspired by Kullu patti. Press Enter to change pattern."
      aria-describedby={visible ? TOOLTIP_ID : undefined}
    >
      <div className="relative h-full">
        {mouseY !== null && (
          <div
            id={TOOLTIP_ID}
            role="tooltip"
            className="absolute right-full pointer-events-none select-none"
            style={{
              top: mouseY,
              transform: `translateY(-50%) translateX(${visible ? "0px" : "6px"}) scale(${visible ? 1 : 0.97})`,
              opacity: visible ? 1 : 0,
              transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Arrow nub pointing right */}
            <div
              className="absolute -right-[5px] w-[10px] h-[10px] rotate-45 rounded-[1px]"
              style={{ top: "calc(50% - 5px)", backgroundColor: "var(--color-neutral-800)" }}
            />

            {/* Card */}
            <div className="relative mr-1.5 w-[264px] bg-neutral-800 text-neutral-200 rounded-lg px-4 py-3.5 shadow-xl ring-1 ring-neutral-700/50">
              {/* Decorative top stripe echoing the textile colors */}
              <div className="absolute top-0 left-3 right-3 h-[2px] rounded-full overflow-hidden flex gap-[1px]">
                <div className="flex-1 bg-[#C62828] rounded-full" />
                <div className="flex-1 bg-[#DAA520] rounded-full" />
                <div className="flex-1 bg-[#1a6bb5] rounded-full" />
                <div className="flex-1 bg-[#DAA520] rounded-full" />
                <div className="flex-1 bg-[#C62828] rounded-full" />
              </div>

              <p className="text-[13px] leading-[1.6] font-serif">
                These borders are inspired by the{" "}
                <em className="font-display" style={{ fontStyle: "italic" }}>
                  Kullu patti
                </em>
                , a centuries-old design tradition from my ancestral hometown in
                the middle Himalayas.
              </p>
              <p className="text-[13px] leading-[1.6] font-serif mt-1.5">
                Click to explore.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
