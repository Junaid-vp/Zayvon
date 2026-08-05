"use client";

import { forwardRef } from "react";

/**
 * Minimal navbar that fades in after the hero reveal.
 *
 * - "ZAYVON" wordmark on the left
 * - No navigation links in Phase 1 (added in Phase 2)
 * - Starts invisible with blur + upward offset, animated by master timeline
 */
const Navbar = forwardRef<HTMLElement>(function Navbar(_, ref) {
  return (
    <nav
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10 transition-colors duration-500"
      style={{
        opacity: 0,
        transform: "translateY(-16px)",
        filter: "blur(6px)",
      }}
    >
      <span
        className="text-white"
        style={{
          fontSize: "0.85rem",
          fontWeight: 300,
          letterSpacing: "0.3em",
        }}
      >
        ZAYVON
      </span>
      
      <div className="hidden md:flex items-center gap-10">
        {["Work", "Process", "About", "Contact"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[0.75rem] font-light uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
});

export default Navbar;
