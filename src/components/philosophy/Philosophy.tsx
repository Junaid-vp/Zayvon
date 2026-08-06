"use client";

import React, { useRef, useEffect, useState } from "react";

const PRINCIPLES = [
  { id: "01", title: "Business first", text: "Every feature should support a business goal." },
  { id: "02", title: "Simplicity wins", text: "Clear products outperform complicated ones." },
  { id: "03", title: "Built to grow", text: "Your product should grow with your business." },
  { id: "04", title: "Measure. Learn. Improve.", text: "Launch is the beginning—not the finish." },
];

export default function Philosophy() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="philosophy"
      className="relative w-full min-h-screen bg-[#030303] overflow-hidden"
      aria-label="Our Philosophy"
    >
      <div 
        className="w-full h-full mx-auto flex flex-col relative"
        style={{ 
          maxWidth: '1440px',
          paddingInline: 'clamp(20px, 6vw, 120px)'
        }}
      >
        
        {/* Desktop Header Block (Hidden on mobile) */}
        <div className="hidden lg:block absolute top-0 left-0 w-full pt-32" style={{ paddingInline: 'clamp(20px, 6vw, 120px)' }}>
          <div 
            className="flex flex-col transition-all duration-[500ms] ease-out"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <div className="h-[1px] w-full bg-white/[0.12] mb-8" />
            <div className="flex flex-row justify-between items-end px-12 gap-0">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/[0.35]">
                Philosophy
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/[0.35]">
                How we think.
              </p>
            </div>
            <div className="h-[1px] w-full bg-white/[0.12] mt-8" />
          </div>
        </div>

        {/* Two Column Layout - Perfectly Centered on Desktop */}
        <div className="flex-1 w-full lg:min-h-screen flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between pt-6 lg:pt-40 pb-4 lg:pb-8">
          
          {/* Mobile Header Block (Hidden on desktop) */}
          <div 
            className="w-full flex flex-col lg:hidden transition-all duration-[500ms] ease-out mb-8"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <div className="h-[1px] w-full bg-white/[0.12] mb-5" />
            <div className="flex flex-row justify-between items-end px-1 gap-0">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/[0.35]">
                Philosophy
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/[0.35]">
                How we think.
              </p>
            </div>
            <div className="h-[1px] w-full bg-white/[0.12] mt-5" />
          </div>

          {/* LEFT (42%) */}
          <div 
            className="w-full lg:w-[42%] flex flex-col justify-center transition-all duration-[500ms] ease-out mb-12 lg:mb-0"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '30ms' }}
          >
            <h3 className="text-[26px] md:text-[34px] font-light tracking-tight text-[rgba(255,255,255,0.92)] leading-[1.2] mb-6 md:mb-10 max-w-[400px]">
              We build digital products{" "}
              <br className="hidden md:block" />
              that help businesses grow—{" "}
              <br className="hidden md:block" />
              not just look better.
            </h3>
            <p className="text-[16px] md:text-[16px] font-light text-[rgba(255,255,255,0.68)] leading-[1.75] md:leading-[1.8] max-w-[420px]">
              Our approach is rooted in deeply understanding the business mechanics before writing a single line of code. We believe software is an investment, not an expense.
            </p>
          </div>

          {/* RIGHT (Pushed to right edge) */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center gap-10 lg:gap-[56px] lg:ml-auto lg:items-end mt-8 lg:mt-0">
            <div className="w-full max-w-[420px] flex flex-col gap-10 lg:gap-[56px]">
              {PRINCIPLES.map((principle, idx) => (
                <div 
                  key={principle.id}
                  className="group flex flex-col items-start cursor-default transition-all duration-[500ms] ease-out"
                  style={{ 
                    opacity: isVisible ? 1 : 0, 
                    transitionDelay: `${(idx + 2) * 30}ms`
                  }}
                >
                  <span className="font-mono text-[11px] md:text-[11px] text-white/[0.25] tracking-[0.4em] mb-3 md:mb-4">
                    {principle.id}
                  </span>
                  
                  <div className="relative flex flex-col">
                    <h4 className="text-[22px] md:text-[32px] font-light text-[rgba(255,255,255,0.92)] group-hover:text-white transition-colors duration-500 leading-[1.2] mb-2 md:mb-3">
                      {principle.title}
                    </h4>
                    <p className="text-[16px] md:text-[18px] font-light text-[rgba(255,255,255,0.68)] group-hover:text-[rgba(255,255,255,0.75)] transition-colors duration-500 leading-[1.7] md:leading-[1.8] w-full">
                      {principle.text}
                    </p>
                    {/* Tiny underline */}
                    <span className="absolute -bottom-5 md:-bottom-6 left-0 h-[2px] w-0 bg-[rgba(255,255,255,0.8)] group-hover:w-8 transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Bottom spacer for breathing room on mobile */}
        <div className="lg:hidden h-12" />

      </div>
    </section>
  );
}