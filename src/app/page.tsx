import CinematicIntro from "@/components/cinematic-intro/CinematicIntro";
import ProductExplorer from "@/components/product-explorer/ProductExplorer";
import HowWeWork from "@/components/how-we-work/HowWeWork";
import Philosophy from "@/components/philosophy/Philosophy";
import WhyZayvon from "@/components/why-zayvon/WhyZayvon";
import Services from "@/components/services/Services";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Phase 1 & 2: Loading + Hero */}
      <CinematicIntro />
      
      {/* Phase 3: ZAYVON Product Explorer */}
      <ProductExplorer />

      {/* Phase 5: How We Work */}
      <HowWeWork />

      {/* Phase 6: Philosophy */}
      <Philosophy />

      {/* Phase 7: Why Businesses Choose Zayvon */}
      <WhyZayvon />

      {/* Phase 8: What We Help You Build */}
      <Services />

      {/* Phase 9: Contact Experience (Final) */}
      <Contact />

      {/* Editorial Footer */}
      <Footer />
    </main>
  );
}
