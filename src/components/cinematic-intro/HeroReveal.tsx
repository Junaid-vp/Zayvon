"use client";

import { forwardRef } from "react";

export interface HeroRevealHandle {
  container: HTMLDivElement | null;
}

/**
 * The "live website" hero that appears after the cinematic video ends.
 *
 * This creates the illusion that the camera zoomed into the laptop screen
 * and the user is now looking at the actual website. Elements:
 * - Large "ZAYVON" wordmark (ultralight, massive — 120–160px on desktop)
 * - Studio tagline
 * - Subtle scroll indicator
 *
 * All elements start invisible with blur — the master timeline animates
 * them in with generous breathing room between each reveal.
 */
const HeroReveal = forwardRef<HTMLDivElement>(function HeroReveal(_, ref) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
      style={{ opacity: 0 }}
    >
      {/* Headline — massive, ultralight, premium */}
      <h1
        data-hero="wordmark"
        className="text-white text-center"
        style={{
          opacity: 0,
          transform: "translateY(40px)",
          filter: "blur(12px)",
          fontSize: "clamp(2.25rem, 6vw, 7rem)",
          fontWeight: 200,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          maxWidth: "1400px",
        }}
      >
        Websites that speak<br />before you do.
      </h1>

      {/* Tagline — generous vertical spacing from headline */}
      <p
        data-hero="tagline"
        className="text-white/40 text-center"
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          filter: "blur(10px)",
          marginTop: "clamp(2rem, 4vw, 3rem)",
          fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)",
          fontWeight: 300,
          letterSpacing: "0.1em",
          maxWidth: "600px",
        }}
      >
        Uncompromising digital craft for brands that refuse to be ignored.
      </p>

      {/* Scroll indicator / CTA */}
      <div
        data-hero="cta"
        className="flex flex-col items-center gap-6"
        style={{
          opacity: 0,
          marginTop: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <span
          className="uppercase text-white/40 transition-colors hover:text-white cursor-pointer"
          style={{
            fontSize: "0.75rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
          }}
        >
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </div>
  );
});

export default HeroReveal;
