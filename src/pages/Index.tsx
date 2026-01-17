import HeroSection from "@/components/HeroSection";
import TourPackages from "@/components/TourPackages";
import Transportation from "@/components/Transportation";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Adventures from "@/components/Adventures";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TourPackages />
      <Transportation />
      <Testimonials />
      <FAQ />
      <Adventures />
      <CTASection />
      <Footer />
      <WhatsAppConcierge />
    </main>
  );
};

export default Index;
