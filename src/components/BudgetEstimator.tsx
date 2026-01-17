import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import journeyData from "../../data.json";

// Define the type for our journey data
interface JourneyItinerary {
  day: number;
  activity: string;
  description: string;
  image: string;
}

interface Journey {
  id: number;
  title: string;
  location: string;
  price: number;
  mood: string;
  hero_image: string;
  description: string;
  itinerary: JourneyItinerary[];
}

const journeys = journeyData as Journey[];

// Format price in IDR
const formatIDR = (price: number) => {
  return `IDR ${new Intl.NumberFormat("id-ID").format(price)}`;
};

// Short format for slider labels
const formatShortIDR = (price: number) => {
  const millions = price / 1000000;
  return `${millions}jt`;
};

const moodLabelsID: Record<string, string> = {
  Solitude: "Ketenangan",
  Adventure: "Petualangan",
};

const BudgetEstimator = () => {
  const [budget, setBudget] = useState([50000000]); // 50 million default

  const categorizedJourneys = useMemo(() => {
    return journeys.map((journey) => {
      const isWithinBudget = journey.price <= budget[0];
      // Best choice: within budget and at least 10% under the slider value
      const isBestChoice = journey.price <= budget[0] * 0.9 && journey.price >= budget[0] * 0.5;
      return {
        ...journey,
        isBestChoice,
        isWithinBudget,
      };
    }).sort((a, b) => {
      if (a.isBestChoice && !b.isBestChoice) return -1;
      if (!a.isBestChoice && b.isBestChoice) return 1;
      if (a.isWithinBudget && !b.isWithinBudget) return -1;
      if (!a.isWithinBudget && b.isWithinBudget) return 1;
      return a.price - b.price;
    });
  }, [budget]);

  return (
    <section className="py-32 bg-card" id="destinations">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-label text-primary mb-4">Estimasi Anggaran</p>
          <h2 className="heading-section mb-6">
            Temukan Perjalanan <span className="text-gradient">Ideal</span> Anda
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Sesuaikan anggaran Anda dan temukan destinasi yang sempurna untuk pengalaman luar biasa.
          </p>
        </motion.div>

        {/* Budget Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-label text-muted-foreground text-[10px]">Anggaran Anda</span>
            <motion.span
              key={budget[0]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-4xl text-primary"
            >
              {formatIDR(budget[0])}
            </motion.span>
          </div>

          {/* Glassmorphism Slider */}
          <div className="slider-glassmorphism p-1 rounded-full">
            <Slider
              value={budget}
              onValueChange={setBudget}
              min={10000000}
              max={100000000}
              step={5000000}
              className="py-2"
            />
          </div>

          <div className="flex justify-between text-muted-foreground text-xs mt-4">
            <span>{formatShortIDR(10000000)}</span>
            <span>{formatShortIDR(50000000)}</span>
            <span>{formatShortIDR(100000000)}</span>
          </div>
        </motion.div>

        {/* Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {categorizedJourneys.map((journey, index) => (
              <motion.div
                key={journey.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: journey.isWithinBudget ? 1 : 0.3,
                  scale: journey.isWithinBudget ? 1 : 0.95,
                  filter: journey.isWithinBudget ? "none" : "grayscale(100%)",
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`card-glow group overflow-hidden ${journey.isBestChoice ? "ring-1 ring-primary" : ""
                  }`}>
                  {/* Best Choice Badge */}
                  <AnimatePresence>
                    {journey.isBestChoice && journey.isWithinBudget && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-sm text-[10px] uppercase tracking-widest font-medium badge-pulse"
                      >
                        <Sparkles className="w-3 h-3" />
                        Pilihan Terbaik
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={journey.hero_image}
                      alt={journey.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Mood Tag */}
                    <span className="text-[10px] uppercase tracking-widest text-primary/80 border border-primary/30 px-2 py-1 rounded-sm mb-3 inline-block">
                      {moodLabelsID[journey.mood] || journey.mood}
                    </span>

                    <h3 className="font-serif text-2xl font-medium mb-2">
                      {journey.title}
                    </h3>

                    <p className="text-muted-foreground text-sm flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {journey.location}
                    </p>

                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {journey.description}
                    </p>

                    <div className="flex items-end justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                          Mulai dari
                        </span>
                        <span className="font-serif text-2xl text-foreground">
                          {formatIDR(journey.price)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-outline-luxury py-2 px-6 text-[10px]"
                      >
                        Lihat Detail
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        <AnimatePresence>
          {categorizedJourneys.every((j) => !j.isWithinBudget) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                Tidak ada perjalanan yang tersedia dalam anggaran ini. Silakan tingkatkan anggaran Anda.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BudgetEstimator;
