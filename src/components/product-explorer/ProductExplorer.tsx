"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PROJECTS } from "@/data/projects";
import ExplorerIndex from "./ExplorerIndex";
import ExplorerStage from "./ExplorerStage";
import ExplorerMobile from "./ExplorerMobile";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ProductExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // The effectively active project is hoverIndex if present, otherwise scrollIndex.
  const activeIndex = hoverIndex !== null ? hoverIndex : scrollIndex;

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    let ctx = gsap.matchMedia();

    ctx.add("(min-width: 1024px)", () => {
      // Pin the container for 600vh only on desktop
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%", // 6 additional viewport heights (since we have 7 items)
        pin: pinRef.current,
        scrub: true,
        onUpdate: (self) => {
          // Update the continuous progress bar
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress });
          }
          if (progressTextRef.current) {
            progressTextRef.current.innerText = `${Math.round(self.progress * 100)}%`;
          }

          // Map progress (0-1) to an index (0-6)
          const newIndex = Math.min(
            6,
            Math.max(0, Math.floor(self.progress * 7))
          );
          
          setScrollIndex((prev) => {
            if (prev !== newIndex) return newIndex;
            return prev;
          });
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only capture arrows if the user is currently looking at this section and on desktop
      if (!containerRef.current || window.innerWidth < 1024) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          handleNavigate(Math.min(6, activeIndex + 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          handleNavigate(Math.max(0, activeIndex - 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const handleNavigate = (index: number) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const st = ScrollTrigger.getAll().find(
      (t) => t.trigger === containerRef.current
    );
    if (st) {
      // Calculate the exact scroll position for this index
      const totalScroll = st.end - st.start;
      const targetScroll = st.start + (totalScroll / 7) * index + 10; // +10px safety to ensure we cross the threshold
      
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <>
      {/* Mobile Experience (Visible < 1024px) */}
      <ExplorerMobile projects={PROJECTS} />

      {/* Desktop Experience (Visible >= 1024px) */}
      <div ref={containerRef} className="relative w-full bg-[#030303] hidden lg:block">
        {/* The pinned 100vh viewport */}
        <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000"
               style={{
                 background: getAmbientGradient(activeIndex)
               }}
          />

          {/* Continuous Scroll Progress Bar for Visual Feedback */}
          <div className="absolute top-0 left-0 w-full z-50">
            <div className="w-full h-[2px] bg-white/5 relative">
              <div 
                ref={progressBarRef} 
                className="absolute inset-0 origin-left scale-x-0 transition-colors duration-1000" 
                style={{ backgroundColor: PROJECTS[activeIndex].accentColor }}
              />
            </div>
            {/* Text Readout */}
            <div className="absolute top-4 right-6 lg:right-12">
              <span ref={progressTextRef} className="font-mono text-[10px] text-white/40 tracking-widest">
                0%
              </span>
            </div>
          </div>

          {/* Split Layout */}
          <div className="absolute inset-0 z-10 flex flex-col lg:flex-row pt-32 lg:pt-0">
            
            {/* Left: Index */}
            <div className="w-full lg:w-[35%] h-full flex flex-col justify-center px-6 lg:px-20 z-20">
              
              {/* Anticipation Title */}
              <div 
                className="mb-12 text-white/40 transition-opacity duration-500"
                style={{ opacity: scrollIndex === 0 && hoverIndex === null ? 1 : 0.3 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] mb-1">ZAYVON Digital</p>
                <p className="text-sm tracking-wide">Selected work. One engineering philosophy.</p>
              </div>

              <ExplorerIndex 
                projects={PROJECTS}
                activeIndex={activeIndex}
                onHover={setHoverIndex}
                onClick={handleNavigate}
              />
            </div>

            {/* Right: Stage */}
            <div className="w-full lg:w-[65%] h-full flex items-center justify-center p-6 lg:p-12 z-10">
              <ExplorerStage 
                activeProject={PROJECTS[activeIndex]} 
                isTransitioning={false} 
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// Helper to determine the ambient background based on active project
function getAmbientGradient(index: number) {
  switch (index) {
    case 0: return "radial-gradient(circle at 75% 50%, rgba(14,165,233,0.08) 0%, rgba(3,3,3,1) 60%)"; // SkillForge Blue
    case 1: return "radial-gradient(circle at 75% 50%, rgba(249,115,22,0.06) 0%, rgba(3,3,3,1) 60%)"; // ScrapLink Orange
    case 2: return "radial-gradient(circle at 75% 50%, rgba(251,191,36,0.06) 0%, rgba(3,3,3,1) 60%)"; // Mallzo Gold
    case 3: return "radial-gradient(circle at 75% 50%, rgba(254,243,199,0.04) 0%, rgba(3,3,3,1) 60%)"; // Feather Ivory
    case 4: return "radial-gradient(circle at 75% 50%, rgba(168,85,247,0.08) 0%, rgba(3,3,3,1) 60%)"; // Portfolio Purple
    case 5: return "radial-gradient(circle at 75% 50%, rgba(16,185,129,0.06) 0%, rgba(3,3,3,1) 60%)"; // Urbaniq Green
    case 6: return "radial-gradient(circle at 75% 50%, rgba(220,38,38,0.08) 0%, rgba(3,3,3,1) 60%)"; // Safvan Red
    default: return "rgba(3,3,3,1)";
  }
}
