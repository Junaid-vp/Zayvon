"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 96%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ paddingTop: 60, paddingBottom: 24 }}>
      <div className="mx-auto" style={{ maxWidth: 1440, paddingInline: "clamp(20px, 6vw, 120px)" }}>

        {/* Divider 1 */}
        <div className="w-full h-px" style={{ background: "rgba(255,255,255,.08)" }} />

        {/* Single row */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ paddingTop: 28, paddingBottom: 0 }}
        >
          {/* Email */}
          <a
            href="mailto:hello@zayvon.tech"
            className="hover:text-white transition-colors duration-250 w-fit"
            style={{ fontSize: 15, fontWeight: 300, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.92)" }}
          >
            hello@zayvon.tech
          </a>

          {/* Center group - Desktop only */}
          <div className="hidden sm:flex items-center gap-6" style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>
            <span>© 2026 ZAYVON</span>
            <span>Built in Kerala, India.</span>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917736355958?text=Hi%20ZAYVON!%20I%20visited%20your%20website%20and%20I'd%20like%20to%20discuss%20my%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 hover:text-white transition-colors duration-250 w-fit"
            style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.55)" }}
          >
            <span>WhatsApp</span>
            <svg
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="transition-transform duration-250 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Mobile-only bottom info with divider */}
          <div className="flex flex-col sm:hidden items-start gap-3" style={{ paddingTop: 4 }}>
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,.06)" }} />
            <div className="flex flex-col gap-1.5" style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
              <span>© 2026 ZAYVON</span>
              <span>Built in Kerala, India.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}