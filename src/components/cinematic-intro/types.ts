/**
 * Configuration for a single text overlay in the cinematic sequence.
 * Progress values are normalized 0–1 relative to the master timeline.
 */
export interface TextOverlayConfig {
  /** Unique identifier for React keys and GSAP targeting */
  id: string;
  /** Lines of text to display (each string = one line) */
  lines: string[];
  /** Timeline progress when fade-in begins (0–1) */
  fadeInStart: number;
  /** Timeline progress when fade-in completes and hold begins (0–1) */
  fadeInEnd: number;
  /** Timeline progress when fade-out begins (0–1) */
  fadeOutStart: number;
  /** Timeline progress when fade-out completes (0–1) */
  fadeOutEnd: number;
  /** Optional vertical position override (default: center) */
  position?: "center" | "top";
  /** If true, the text fades in immediately on page load (not scroll-driven) */
  animateOnLoad?: boolean;
}
