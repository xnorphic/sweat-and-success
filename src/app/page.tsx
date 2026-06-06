import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GapSection from "@/components/GapSection";
import FourPillars from "@/components/FourPillars";
import WhatsInside from "@/components/WhatsInside";
import NoSupplements from "@/components/NoSupplements";
import ScienceStrip from "@/components/ScienceStrip";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <Hero />
      <GapSection />
      <FourPillars />
      <WhatsInside />
      <NoSupplements />
      <ScienceStrip />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
