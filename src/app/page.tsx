import CinematicIntro from "@/components/cinematic-intro/CinematicIntro";

export default function Home() {
  return (
    <main>
      <CinematicIntro />

      {/* Phase 3: Featured Work placeholder */}
      <section className="flex h-screen items-center justify-center bg-[#050505]">
        <p className="text-sm font-light tracking-widest text-white/20">
          Phase 3 (Featured Work) begins here
        </p>
      </section>
    </main>
  );
}
