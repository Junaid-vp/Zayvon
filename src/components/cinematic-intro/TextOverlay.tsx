"use client";

import { forwardRef } from "react";

interface TextOverlayProps {
  lines: string[];
  position?: "center" | "top";
}

/**
 * A centered text overlay rendered on top of the video.
 *
 * - Starts invisible with blur + translateY for cinematic entrance.
 * - Parent drives all animation via the forwarded ref.
 * - Supports multi-line text (each string in `lines` is a separate <span>).
 * - Typography scales responsively via Tailwind.
 */
const TextOverlay = forwardRef<HTMLDivElement, TextOverlayProps>(
  function TextOverlay({ lines, position = "center" }, ref) {
    const isZayvon = lines[0] === "ZAYVON";

    return (
      <div
        ref={ref}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
        style={{
          opacity: 0,
          filter: "blur(12px)",
          transform: "translateY(24px)",
        }}
      >
        <p 
          className={`relative max-w-4xl text-center ${isZayvon ? "" : "text-2xl font-light leading-[1.4] tracking-[-0.01em] text-white/90 sm:text-3xl md:text-4xl lg:text-5xl"}`}
          style={{ 
            fontFamily: 'var(--font-quicksand)',
            top: lines[0] === "We build digital first impressions." ? "-36vh" : 
                 lines[0] === "People don't buy websites." ? "-36vh" : "0",
            textShadow: isZayvon ? "none" : "0px 4px 40px rgba(0,0,0,1), 0px 2px 10px rgba(0,0,0,0.6)"
          }}
        >
          {lines.map((line, i) => {
            let spanClass = "block intro-span ";
            if (isZayvon) {
              if (i === 0) {
                spanClass += "text-5xl sm:text-7xl md:text-[7.5rem] font-thin tracking-[0.25em] text-white mb-12";
              } else {
                spanClass += "text-lg sm:text-xl md:text-2xl font-light text-white/70 leading-relaxed tracking-normal";
              }
            }
            return (
              <span key={i} className={spanClass}>
                {line}
              </span>
            );
          })}
        </p>
      </div>
    );
  }
);

export default TextOverlay;
