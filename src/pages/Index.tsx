import HeroSection from "@/components/HeroSection";
import FeaturedExperiences from "@/components/FeaturedExperiences";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import BudgetEstimator from "@/components/BudgetEstimator";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedExperiences />
      <ItineraryTimeline />
      <BudgetEstimator />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;
