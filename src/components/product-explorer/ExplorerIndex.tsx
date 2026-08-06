import React from "react";
import { ProjectData } from "@/data/projects";

interface ExplorerIndexProps {
  projects: ProjectData[];
  activeIndex: number;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
}

export default function ExplorerIndex({ projects, activeIndex, onHover, onClick }: ExplorerIndexProps) {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      {projects.map((project, index) => {
        const isActive = index === activeIndex;
        
        return (
          <button
            key={project.id}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(index)}
            className="group flex flex-col items-start text-left focus:outline-none"
          >
            {/* Category label (AI, Retail, etc) */}
            <span 
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all duration-500 mb-1 sm:mb-2
                ${isActive ? "text-white/60 translate-x-2" : "text-white/20 group-hover:text-white/40 group-hover:translate-x-1"}
              `}
            >
              {project.category}
            </span>
            
            {/* Project Title & Percentage */}
            <div className="flex items-baseline gap-4">
              <h2 
                className={`font-light tracking-tight transition-all duration-500 leading-none
                  ${isActive 
                    ? "text-white text-3xl sm:text-4xl md:text-5xl lg:text-[4vw]" 
                    : "text-white/20 text-2xl sm:text-3xl md:text-4xl lg:text-[3vw] group-hover:text-white/50"
                  }
                `}
              >
                {project.title}
              </h2>
              
              <span 
                className={`font-mono text-[10px] tracking-widest transition-all duration-500
                  ${isActive ? "text-white/40 translate-x-1" : "text-white/10 group-hover:text-white/30"}
                `}
              >
                {Math.round((index / (projects.length - 1)) * 100)}%
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
