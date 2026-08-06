"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ScrollVideoHandle {
  video: HTMLVideoElement | null;
  poster: HTMLDivElement | null;
  container: HTMLDivElement | null;
  glow: HTMLDivElement | null;
  atmosphere: HTMLDivElement | null;
}

/**
 * Fullscreen video layer with poster overlay.
 *
 * - The <video> sits behind the poster, preloaded and muted for instant decode.
 * - The poster <div> uses a background-image and sits on top at opacity 1.
 * - An ambient atmosphere layer adds subtle life before scrolling begins.
 * - A screen glow layer provides emotional emphasis during key moments.
 * - Parent (CinematicIntro) controls all layers via refs — this component
 *   has zero animation logic, keeping concerns cleanly separated.
 */
const ScrollVideo = forwardRef<ScrollVideoHandle>(function ScrollVideo(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get video() {
      return videoRef.current;
    },
    get poster() {
      return posterRef.current;
    },
    get container() {
      return containerRef.current;
    },
    get glow() {
      return glowRef.current;
    },
    get atmosphere() {
      return atmosphereRef.current;
    },
  }));

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Video — behind poster, covers viewport */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/Zayvon.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
      />

      {/* Poster — on top, faded out by GSAP when scroll begins */}
      <div
        ref={posterRef}
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero-poster.png)" }}
        aria-hidden="true"
      />

      {/* Ambient atmosphere — extremely subtle breathing radial glow.
          Creates the feeling of "life" before the user scrolls. */}
      <div
        ref={atmosphereRef}
        className="pointer-events-none absolute inset-0 z-[11]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          opacity: 0,
        }}
        aria-hidden="true"
      />

      {/* Screen glow — intensifies subtly during the emotional peak text.
          A soft warm radial that makes the screen feel alive. */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-[12]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,220,255,0.06) 0%, transparent 70%)",
          opacity: 0,
        }}
        aria-hidden="true"
      />

      {/* Watermark Hider — obscures the Veo watermark in the bottom right */}
      <div 
        className="pointer-events-none absolute bottom-[-5px] right-[-5px] z-[13] w-40 h-24"
        style={{
          background: "radial-gradient(ellipse at 100% 100%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)"
        }}
        aria-hidden="true"
      />

      {/* Mobile Floor Smoother — Fades the hard horizontal floor edge into black on tall screens */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[13] h-[25vh]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)"
        }}
        aria-hidden="true"
      />
    </div>
  );
});

export default ScrollVideo;
