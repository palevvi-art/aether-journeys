import HeroSection from "@/components/HeroSection";
import FeaturedExperiences from "@/components/FeaturedExperiences";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import BudgetEstimator from "@/components/BudgetEstimator";
import Footer from "@/components/Footer";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedExperiences />
      <ItineraryTimeline />
      <BudgetEstimator />
      <Footer />
      <WhatsAppConcierge />
    </main>
  );
};

export default Index;
