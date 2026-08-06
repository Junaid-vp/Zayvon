import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative w-full h-screen bg-black flex flex-col items-center justify-center px-8 overflow-hidden">
      
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,255,255,0.015) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 404 number — massive, barely visible */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontSize: "clamp(160px, 25vw, 320px)",
          fontWeight: 200,
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <h1
          className="text-white/90 font-light"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          This page doesn&apos;t exist.
        </h1>

        <p
          className="text-white/40 font-light max-w-[360px]"
          style={{ fontSize: 16, lineHeight: 1.6 }}
        >
          The page you&apos;re looking for may have been moved or no longer exists.
        </p>

        <Link
          href="/"
          className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors mt-4"
          style={{ fontSize: 16 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back to ZAYVON</span>
        </Link>
      </div>
    </main>
  );
}
