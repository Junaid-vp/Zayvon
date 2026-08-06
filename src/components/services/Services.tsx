"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Business Websites",
    desc: "Websites that build trust and generate customers."
  },
  {
    num: "02",
    title: "Custom Web Applications",
    desc: "Internal tools and software tailored to your workflow."
  },
  {
    num: "03",
    title: "Mobile Applications",
    desc: "Apps designed for real users with speed and simplicity."
  },
  {
    num: "04",
    title: "AI Automation",
    desc: "Reduce repetitive work and improve experiences using AI."
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-anim",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative w-full min-h-screen bg-black flex items-center py-12 lg:py-0">
      <div 
        className="w-full mx-auto"
        style={{ 
          maxWidth: '1440px',
          paddingInline: 'clamp(20px, 6vw, 96px)'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
          
          {/* Left Column (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center lg:pl-8 xl:pl-12">
            <div className="services-anim mb-8 lg:mb-16">
              <h3 className="text-[10px] lg:text-[11px] font-semibold text-white/50 tracking-[0.35em] uppercase mb-3 md:mb-6">
                What We Help You Build
              </h3>
              <h2 className="text-[24px] md:text-[40px] lg:text-[clamp(36px,3.5vw,48px)] font-light text-white tracking-tight mb-4 md:mb-7 leading-[1.15] md:leading-[1.25]">
                Products built <br className="hidden lg:block" />
                around your <br className="hidden lg:block" />
                business.
              </h2>
              <div className="text-[14px] md:text-[18px] text-white/60 font-light leading-[1.5] md:leading-relaxed max-w-[420px]">
                <p>Whether you&apos;re launching something new or replacing outdated software, we build products designed around your goals—not around technology.</p>
              </div>
            </div>
          </div>

          {/* Right Column (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <div className="w-full border-t border-white/10 services-anim">
              {SERVICES.map((service, index) => (
                <div 
                  key={service.num} 
                  className="services-anim group relative flex flex-col md:flex-row md:items-start border-b border-white/10 hover:border-white/30 transition-colors duration-500 cursor-pointer"
                  style={{ 
                    paddingTop: index === 0 ? '16px' : '14px', 
                    paddingBottom: index === SERVICES.length - 1 ? '16px' : '14px' 
                  }}
                >
                  {/* Number */}
                  <div className="mb-2 md:mb-0 md:w-[15%]" style={{ marginTop: '2px' }}>
                    <span className="text-[12px] md:text-[14px] font-mono tracking-wider text-white opacity-40">
                      {service.num}
                    </span>
                  </div>
                  
                  {/* Title & Desc */}
                  <div className="md:w-[75%] pr-4 md:pr-8">
                    <h4 className="text-[17px] md:text-[24px] font-medium transition-colors duration-500 text-white opacity-50 group-hover:opacity-100" style={{ marginBottom: '2px' }}>
                      {service.title}
                    </h4>
                    <p className="text-[13px] md:text-[16px] font-light text-white opacity-70" style={{ lineHeight: '1.4' }}>
                      {service.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex md:w-[10%] justify-end md:pr-6" style={{ marginTop: '2px' }}>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      className="transition-all duration-500 group-hover:translate-x-[6px] text-white opacity-30 group-hover:opacity-100"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            
            {/* More capabilities */}
            <div className="services-anim flex justify-start" style={{ marginTop: '16px' }}>
              <a href="#contact" className="text-[12px] md:text-[13px] text-white/50 font-light tracking-wide cursor-pointer hover:text-white transition-colors">
                Need something different? Let&apos;s talk.
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}