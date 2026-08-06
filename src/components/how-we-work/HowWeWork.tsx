"use client";

import React, { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: "discover", title: "Discover", subtitle: "We listen before\nwe build." },
  { id: "design", title: "Design", subtitle: "Simple experiences.\nThoughtfully crafted." },
  { id: "build", title: "Build", subtitle: "Reliable engineering.\nBuilt to last." },
  { id: "launch", title: "Launch", subtitle: "Deploy. Measure.\nIterate." },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".anim-item",
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="how-we-work"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] flex flex-col items-center justify-center px-6 overflow-hidden py-20 lg:py-32"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* Top Group */}
        <div className="flex flex-col items-center">
          {/* Label */}
          <p className="anim-item font-mono text-[11px] uppercase tracking-[0.4em] text-white/[0.35] mb-12 md:mb-16">
            How We Work
          </p>

          {/* Headline */}
          <h2 className="anim-item text-[24px] md:text-[44px] lg:text-[48px] font-light tracking-tight text-white/90 leading-[1.2] max-w-[700px]">
            Every successful product starts
            <br className="hidden md:block" />
            with understanding your business.
          </h2>
        </div>

        {/* Dedicated Spacer to force vertical gap */}
        <div className="w-full h-[48px] md:h-[120px] lg:h-[160px] flex-shrink-0" />

        {/* The Journey */}
        <div className="anim-item w-full flex flex-col md:flex-row items-start justify-between relative gap-10 md:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              
              {/* Step */}
              <div className="relative flex flex-col items-center text-center w-full md:w-[220px]">
                {/* Word */}
                <span className="text-[20px] md:text-[32px] font-light text-white mb-4 md:mb-6">
                  {step.title}
                </span>

                {/* Subtitle */}
                <p className="text-[13px] md:text-[15px] font-light text-white/50 leading-[1.6] whitespace-pre-line">
                  {step.subtitle}
                </p>
              </div>

              {/* Arrow Connector (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex flex-1 items-center opacity-[0.15] px-4 mt-[22px]">
                  <div className="h-[1px] w-full bg-white" />
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white -ml-1 flex-shrink-0">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
