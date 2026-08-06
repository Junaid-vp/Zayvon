"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import ScrollVideo, { type ScrollVideoHandle } from "./ScrollVideo";
import TextOverlay from "./TextOverlay";
import HeroReveal from "./HeroReveal";
import Navbar from "./Navbar";
import type { TextOverlayConfig } from "./types";

/* ─── Premium easing ────────────────────────────────────────────────── */

/**
 * Custom cubic-bezier curves that feel physically believable.
 * These replace all generic power2/power3 easings with curves
 * tuned for cinematic motion — slow starts, gentle landings.
 */
const EASE_REVEAL = "cubic-bezier(0.16, 1, 0.3, 1)"; // expoOut feel — quick decel
const EASE_DISMISS = "cubic-bezier(0.55, 0, 1, 0.45)"; // gentle accel into fade
const EASE_HERO = "cubic-bezier(0.08, 0.82, 0.17, 1)"; // ultra-smooth reveal
const EASE_SUBTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // barely perceptible

/* ─── Text overlay sequence ─────────────────────────────────────────── */

/**
 * Timing is stretched compared to v1.
 * Each text gets more hold time so the viewer can absorb the message.
 * Gaps between texts create breathing room — luxury never rushes.
 */
const TEXT_OVERLAYS: TextOverlayConfig[] = [
  {
    id: "text-intro",
    lines: ["ZAYVON", "Crafted for attention. Built for trust."],
    fadeInStart: 0,
    fadeInEnd: 0,
    fadeOutStart: 0.01,
    fadeOutEnd: 0.03,
    animateOnLoad: true,
  },
  {
    id: "text-1",
    lines: ["Most websites are forgotten."],
    fadeInStart: 0.04,
    fadeInEnd: 0.08,
    fadeOutStart: 0.13,
    fadeOutEnd: 0.16,
  },
  {
    id: "text-2",
    lines: ["This won't be."],
    fadeInStart: 0.18,
    fadeInEnd: 0.22,
    fadeOutStart: 0.27,
    fadeOutEnd: 0.30,
  },
  {
    id: "text-3",
    lines: ["People don't buy websites.", "They buy trust."],
    fadeInStart: 0.32,
    fadeInEnd: 0.36,
    fadeOutStart: 0.42,
    fadeOutEnd: 0.46,
  },
  {
    id: "text-4",
    lines: ["We build digital first impressions."],
    fadeInStart: 0.48,
    fadeInEnd: 0.52,
    fadeOutStart: 0.62,
    fadeOutEnd: 0.66,
    position: "top",
  },
];

/* ─── Timeline position constants ──────────────────────────────────── */

/** Video occupies 0% → 64% of the scroll distance */
const VIDEO_END = 0.64;

/** Dramatic pause — black screen breathes: 64% → 70% */
const PAUSE_END = 0.70;

/** Camera push + zoom into laptop screen: 70% → 76% */
const ZOOM_START = 0.70;
const ZOOM_END = 0.76;

/** Hero elements reveal with generous stagger: 74% → 90% */
const HERO_CONTAINER_START = 0.74;
const HERO_CONTAINER_END = 0.78;

const HERO_WORDMARK_START = 0.76;
const HERO_WORDMARK_END = 0.82;

const HERO_TAGLINE_START = 0.82;
const HERO_TAGLINE_END = 0.87;

const HERO_CTA_START = 0.87;
const HERO_CTA_END = 0.91;

/** Navbar — fades in alongside the main Hero wordmark: 76% → 82% */
const NAVBAR_START = 0.76;
const NAVBAR_END = 0.82;

/** Hold so user absorbs the full site: 95% → 100% → pin releases */

/* ─── Scroll distance (pixels) ─────────────────────────────────────── */

const SCROLL_DISTANCE = 6000;

/* ─── Ambient atmosphere timing ────────────────────────────────────── */

const ATMOSPHERE_FADE_IN_END = 0.02;
const ATMOSPHERE_FADE_OUT_START = 0.06;

/* ─── Screen glow on text-4 (emotional peak) ───────────────────────── */

const GLOW_START = 0.47;
const GLOW_PEAK = 0.53;
const GLOW_END = 0.67;

/* ─── Component ────────────────────────────────────────────────────── */

export default function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoLayerRef = useRef<ScrollVideoHandle>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const videoHandle = videoLayerRef.current;
    const video = videoHandle?.video;
    const poster = videoHandle?.poster;
    const videoContainer = videoHandle?.container;
    const glow = videoHandle?.glow;
    const atmosphere = videoHandle?.atmosphere;
    const hero = heroRef.current;
    const navbar = navbarRef.current;

    if (
      !section ||
      !video ||
      !poster ||
      !videoContainer ||
      !glow ||
      !atmosphere ||
      !hero ||
      !navbar
    )
      return;

    /* ── Wait for video metadata so video.duration is available ────── */
    const init = () => {
      // iOS Safari hack: trigger play() to unlock video decoding, then immediately pause()
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => video.pause()).catch(() => {});
      } else {
        video.pause();
      }

      const ctx = gsap.context(() => {
        /* ── Master timeline ────────────────────────────────────────── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: `+=${SCROLL_DISTANCE}`,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
              // Video occupies 0 → VIDEO_END of the scroll progress
              const videoProgress = gsap.utils.clamp(
                0,
                1,
                self.progress / VIDEO_END
              );
              const targetTime = videoProgress * video.duration;
              video.currentTime = targetTime;

              // Debug: log every ~5% progress change
              if (Math.round(self.progress * 20) !== Math.round((self.progress - 0.001) * 20)) {
                console.log(
                  `[ZAYVON] progress: ${(self.progress * 100).toFixed(1)}%`,
                  `| videoProgress: ${(videoProgress * 100).toFixed(1)}%`,
                  `| currentTime: ${targetTime.toFixed(3)}`,
                  `| duration: ${video.duration.toFixed(3)}`
                );
              }
            },
          },
        });

        /* ── Poster fade-out ────────────────────────────────────────── *
         * Uses a gentle ease instead of linear — the poster should
         * dissolve rather than switch off.                             */
        tl.to(
          poster,
          {
            opacity: 0,
            duration: 0.04,
            ease: EASE_SUBTLE,
          },
          0
        );

        /* ── Ambient atmosphere breathing ───────────────────────────── *
         * Fix 1: A barely-perceptible radial glow that makes the
         * initial poster feel alive. Fades in before scroll begins,
         * fades out as the video takes over.                           */
        tl.to(
          atmosphere,
          {
            opacity: 1,
            duration: ATMOSPHERE_FADE_IN_END,
            ease: EASE_SUBTLE,
          },
          0
        );
        tl.to(
          atmosphere,
          {
            opacity: 0,
            duration: 0.04,
            ease: EASE_SUBTLE,
          },
          ATMOSPHERE_FADE_OUT_START
        );

        /* ── Text overlays ──────────────────────────────────────────── *
         * Fix 2: Each text now animates opacity + blur + translateY.
         * The blur creates a "materializing" effect — text forms from
         * the atmosphere rather than appearing as an overlay.
         * Fix 7: Premium cubic easing replaces power2.
         * Fix 8: Longer durations give each message time to land.      */
        TEXT_OVERLAYS.forEach((config, i) => {
          const el = textRefs.current[i];
          if (!el) return;

          const fadeInDuration = config.fadeInEnd - config.fadeInStart;
          const fadeOutDuration = config.fadeOutEnd - config.fadeOutStart;

          // Materialize: blur(12px) → blur(0), y(24) → y(0), opacity 0 → 1
          if (config.animateOnLoad) {
            // Make wrapper visible instantly so we can animate children individually
            gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
            
            const spans = el.querySelectorAll(".intro-span");
            if (spans.length > 0) {
              // Initial state for spans
              gsap.set(spans, { opacity: 0, filter: "blur(10px)", y: 10 });
              
              // ZAYVON fades in first
              gsap.to(spans[0], {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 2.0,
                ease: "power3.out",
                delay: 0.2
              });
              
              // Subtext fades in 300ms later
              if (spans[1]) {
                gsap.to(spans[1], {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 2.0,
                  ease: "power3.out",
                  delay: 0.5
                });
              }
            }
          } else {
            // Animate IN driven by scroll
            tl.to(
              el,
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: fadeInDuration,
                ease: EASE_REVEAL,
              },
              config.fadeInStart
            );
          }

          // Dissolve: blur back, slight upward drift, fade
          tl.to(
            el,
            {
              opacity: 0,
              y: -16,
              filter: "blur(8px)",
              duration: fadeOutDuration,
              ease: EASE_DISMISS,
            },
            config.fadeOutStart
          );
        });

        /* ── Screen glow on text-4 (emotional peak) ─────────────────── *
         * Fix 6: A subtle 5% increase in screen glow when
         * "We build digital first impressions." appears.
         * Should feel emotional, not obvious.                           */
        tl.to(
          glow,
          {
            opacity: 1,
            duration: GLOW_PEAK - GLOW_START,
            ease: EASE_SUBTLE,
          },
          GLOW_START
        );
        tl.to(
          glow,
          {
            opacity: 0,
            duration: GLOW_END - GLOW_PEAK,
            ease: EASE_DISMISS,
          },
          GLOW_PEAK
        );

        /* ── Camera push + zoom into laptop screen ──────────────────── *
         * Fix 3: After the video ends and the pause completes, the
         * video container scales up subtly — simulating a camera push
         * into the laptop display. The scale makes the screen edges
         * disappear beyond the viewport, creating the illusion that
         * the user is "entering" the laptop. Simultaneously the video
         * layer fades to black so the hero content can emerge.          */
        tl.to(
          videoContainer,
          {
            scale: 1.15,
            duration: ZOOM_END - ZOOM_START,
            ease: EASE_HERO,
          },
          ZOOM_START
        );
        tl.to(
          videoContainer,
          {
            opacity: 0,
            duration: (ZOOM_END - ZOOM_START) * 0.8,
            ease: EASE_DISMISS,
          },
          ZOOM_START + (ZOOM_END - ZOOM_START) * 0.3
        );

        /* ── Hero reveal ────────────────────────────────────────────── *
         * Fix 4: Generous breathing room between each element.
         * Fix 5: Typography is now 120–160px on desktop (set in component).
         * Fix 7: Premium EASE_HERO for every element.
         * Fix 9: All linear easings eliminated.
         * The hero fades in on pure black after the video container
         * has scaled away — creating the "entered the laptop" effect.   */

        // Hero container opacity
        tl.to(
          hero,
          {
            opacity: 1,
            duration: HERO_CONTAINER_END - HERO_CONTAINER_START,
            ease: EASE_SUBTLE,
          },
          HERO_CONTAINER_START
        );

        // Wordmark — with blur reveal
        const wordmark = hero.querySelector<HTMLElement>(
          '[data-hero="wordmark"]'
        );
        if (wordmark) {
          tl.to(
            wordmark,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: HERO_WORDMARK_END - HERO_WORDMARK_START,
              ease: EASE_HERO,
            },
            HERO_WORDMARK_START
          );
        }

        // Tagline — delayed, with its own blur reveal
        const tagline = hero.querySelector<HTMLElement>(
          '[data-hero="tagline"]'
        );
        if (tagline) {
          tl.to(
            tagline,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: HERO_TAGLINE_END - HERO_TAGLINE_START,
              ease: EASE_HERO,
            },
            HERO_TAGLINE_START
          );
        }

        // CTA / scroll indicator — last hero element
        const cta = hero.querySelector<HTMLElement>('[data-hero="cta"]');
        if (cta) {
          tl.to(
            cta,
            {
              opacity: 1,
              duration: HERO_CTA_END - HERO_CTA_START,
              ease: EASE_SUBTLE,
            },
            HERO_CTA_START
          );
        }

        /* ── Navbar ─────────────────────────────────────────────────── *
         * Slides in from top with blur defogging — the final element
         * to appear, completing the "you're inside the website" illusion. */
        tl.to(
          navbar,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: NAVBAR_END - NAVBAR_START,
            ease: EASE_HERO,
          },
          NAVBAR_START
        );

      }, section);

      // Force GSAP to recalculate all trigger positions now that this pin-spacer exists
      // This is crucial because this initialization happens asynchronously (after video loads),
      // meaning subsequent components (like ProductExplorer) might have already calculated
      // their start positions incorrectly.
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 150);

      return ctx;
    };

    /* ── Kick off once video metadata is loaded ─────────────────────── */
    let ctx: ReturnType<typeof gsap.context> | undefined;

    if (video.readyState >= 1) {
      // metadata already loaded
      ctx = init();
    } else {
      const onLoaded = () => {
        ctx = init();
      };
      video.addEventListener("loadedmetadata", onLoaded, { once: true });

      return () => {
        video.removeEventListener("loadedmetadata", onLoaded);
        ctx?.revert();
      };
    }

    /* ── Cleanup ────────────────────────────────────────────────────── */
    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100lvh] w-full overflow-hidden bg-black"
    >
      {/* Video + Poster + Atmosphere + Glow */}
      <ScrollVideo ref={videoLayerRef} />

      {/* Text Overlays */}
      {TEXT_OVERLAYS.map((config, i) => (
        <TextOverlay
          key={config.id}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          lines={config.lines}
          position={config.position}
        />
      ))}

      {/* Hero Reveal (post-video) */}
      <HeroReveal ref={heroRef} />

      {/* Navbar (last to appear) */}
      <Navbar ref={navbarRef} />
    </section>
  );
}
