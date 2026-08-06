"use client";

import { forwardRef, useState, useEffect } from "react";

/**
 * Minimal navbar that fades in after the hero reveal.
 *
 * - "ZAYVON" wordmark on the left
 * - No navigation links in Phase 1 (added in Phase 2)
 * - Starts invisible with blur + upward offset, animated by master timeline
 */
const Navbar = forwardRef<HTMLElement>(function Navbar(_, ref) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4000);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-16 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/35 backdrop-blur-md border-b border-white/[0.08]" 
          : "bg-transparent border-b border-transparent"
      }`}
      style={{
        opacity: 0,
        transform: "translateY(-16px)",
        filter: "blur(6px)",
      }}
    >
      <span
        className="text-white"
        style={{
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "0.35em",
        }}
      >
        ZAYVON
      </span>
      
      <div className="hidden md:flex items-center gap-10">
        <a
          href="#services"
          className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          SERVICES
        </a>
        <a
          href="#how-we-work"
          className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          PROCESS
        </a>
        <a
          href="#contact"
          className="group flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          <span>CONTACT</span>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </nav>
  );
});

export default Navbar;
