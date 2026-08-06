"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ProjectData, PROJECTS } from "@/data/projects";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ExplorerStageProps {
  activeProject: ProjectData;
  isTransitioning?: boolean;
}

export default function ExplorerStage({ activeProject }: ExplorerStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate content morph when activeProject changes
  useIsomorphicLayoutEffect(() => {
    if (!stageRef.current || !imageRef.current || !contentRef.current) return;
    
    const ctx = gsap.context(() => {
      // Gentle fade/blur transition for the text block
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      );

      // Smooth scale and blur for the image to simulate a continuous space morph
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, filter: "brightness(0.5) blur(10px)" },
        { scale: 1, filter: "brightness(1) blur(0px)", duration: 1.2, ease: "power3.out" }
      );
    }, stageRef);

    return () => ctx.revert();
  }, [activeProject.id]);

  return (
    <div ref={stageRef} className="flex h-full w-full max-w-2xl flex-col justify-center gap-6">
      
      {/* 1. The Living Preview Window */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl group cursor-none">
        
        {/* Placeholder for future micro-animations (Step 4) */}
        <Image 
          ref={imageRef}
          src={activeProject.imageUrl}
          alt={activeProject.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          style={{ objectPosition: activeProject.objectPosition }}
        />
        
        {/* Inner subtle shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
      </div>

      {/* 2. The Content Block */}
      <div ref={contentRef} className="flex flex-col gap-6 pt-4">
        
        {/* Punchy Sentence */}
        <p className="text-xl md:text-2xl font-light tracking-wide text-white/90">
          {activeProject.sentence}
        </p>

        {/* Stats & Tags Row */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            {activeProject.proof}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            {activeProject.tags}
          </span>
        </div>

        {/* CTA & Progress Row */}
        <div className="flex items-center justify-between pt-2">
          
          <Link 
            href={activeProject.liveLink || "#"} 
            target="_blank"
            className="group flex items-center gap-3 w-fit"
          >
            <span className="text-sm font-medium uppercase tracking-widest text-white transition-colors group-hover:text-white/70">
              View Case Study
            </span>
            <ArrowRight size={14} className="text-white transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((p) => (
              <div 
                key={p.id}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  p.id === activeProject.id ? "w-6" : "w-1.5 bg-white/20"
                }`}
                style={
                  p.id === activeProject.id 
                    ? { backgroundColor: p.accentColor } 
                    : {}
                }
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
