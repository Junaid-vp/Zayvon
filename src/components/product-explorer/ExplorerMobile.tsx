"use client";

import React from "react";
import Image from "next/image";
import { ProjectData } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ExplorerMobileProps {
  projects: ProjectData[];
}

export default function ExplorerMobile({ projects }: ExplorerMobileProps) {
  return (
    <div className="w-full py-16 flex flex-col gap-6 lg:hidden bg-[#030303]">
      
      {/* Mobile Header */}
      <div className="px-6 text-white/40">
        <p className="font-mono text-xs uppercase tracking-[0.2em] mb-1">ZAYVON Digital</p>
        <p className="text-xs tracking-wide">Selected work. One engineering philosophy.</p>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-12 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex-shrink-0 w-[80vw] max-w-[400px] snap-center flex flex-col gap-4"
          >
            {/* Card Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl">
              <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 400px"
                className="object-cover opacity-90"
                style={{ objectPosition: project.objectPosition }}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none" />
              
              {/* Overlay Tags */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {project.proof}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col gap-1 px-1">
              <h3 className="text-xl font-light tracking-tight text-white">{project.title}</h3>
              <p className="text-xs font-light text-white/60 mb-2">{project.sentence}</p>
              
              <Link 
                href={project.liveLink || "#"}
                className="group flex items-center gap-3 w-fit mt-2"
              >
                <span className="text-xs font-medium uppercase tracking-widest text-white transition-colors group-hover:text-white/70">
                  View Case Study
                </span>
                <ArrowRight size={14} className="text-white transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
