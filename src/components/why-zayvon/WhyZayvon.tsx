"use client";

import React, { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    id: "01",
    title: "Business First",
    text: "Every decision starts with your business goals—not with technology.",
  },
  {
    id: "02",
    title: "Clear Communication",
    text: "No technical jargon. We explain everything in plain language.",
  },
  {
    id: "03",
    title: "Built for Growth",
    text: "Your product should support where your business is going, not just where it is today.",
  },
  {
    id: "04",
    title: "Long-Term Partnership",
    text: "Launching is only the beginning. We stay involved as your business evolves.",
  },
];

export default function WhyZayvon() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

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
      { threshold: 0.2 }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-zayvon"
      className="relative w-full min-h-screen bg-[#030303] flex flex-col justify-center overflow-hidden py-24 lg:py-32"
      aria-label="Why Businesses Choose Zayvon"
    >
      <div 
        className="w-full h-full mx-auto flex flex-col lg:flex-row items-center justify-between"
        style={{ 
          maxWidth: '1440px',
          paddingInline: 'clamp(24px, 6vw, 120px)'
        }}
      >
        
        {/* Left Column (48%) - The Trust List */}
        <div className="w-full lg:w-[48%] flex flex-col border-b border-white/10 order-2 lg:order-1 mt-20 lg:mt-0">
          {REASONS.map((reason, idx) => (
            <div
              key={reason.id}
              className="group flex flex-col border-t border-white/10 transition-colors duration-500 hover:bg-white/[0.02] -mx-6 px-6 md:-mx-8 md:px-8 cursor-default"
              style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 700ms cubic-bezier(0.25,1,0.5,1) ${100 + idx * 100}ms, background-color 500ms`,
                paddingTop: '20px',
                paddingBottom: '20px'
              }}
            >
              
              {/* Row Header: Number, Title, Arrow */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-6 lg:gap-8">
                  <span className="font-mono text-[11px] text-white/30 transition-colors duration-500 group-hover:text-white/60">
                    {reason.id}
                  </span>
                  <div className="relative">
                    <h3 className="text-[20px] md:text-[22px] font-light text-[rgba(255,255,255,0.8)] transition-colors duration-500 group-hover:text-white">
                      {reason.title}
                    </h3>
                    {/* Subtle growing underline */}
                    <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-white/40 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                  </div>
                </div>

                {/* Arrow aligned far right */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/20 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:translate-x-[6px] group-hover:text-white hidden md:block"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Description */}
              <div className="pl-[42px] lg:pl-[50px]">
                <p className="text-[14px] md:text-[15px] font-light text-white/50 leading-[1.7] transition-colors duration-500 group-hover:text-[rgba(255,255,255,0.75)] max-w-[240px]">
                  {reason.text}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column (48%) - Headline */}
        <div 
          className="w-full lg:w-[48%] flex flex-col justify-center order-1 lg:order-2 transition-all duration-[700ms] ease-out lg:pl-12 xl:pl-16"
          style={{ 
            opacity: isVisible ? 1 : 0, 
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/[0.35] mb-8 lg:mb-12">
            Why Businesses Choose Zayvon
          </p>
          <h2 className="text-[26px] md:text-[36px] lg:text-[40px] font-light tracking-tight text-[rgba(255,255,255,0.92)] leading-[1.25] max-w-[480px]">
            We don&apos;t just build software.
            <br className="hidden lg:block" />
            We help businesses solve problems and grow.
          </h2>
        </div>

      </div>
    </section>
  );
}
