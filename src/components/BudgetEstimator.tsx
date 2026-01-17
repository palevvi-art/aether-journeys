import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import destinations from "@/data/destinations.json";
import destSantorini from "@/assets/dest-santorini.jpg";
import destKyoto from "@/assets/dest-kyoto.jpg";
import destAlps from "@/assets/dest-alps.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import destSafari from "@/assets/dest-safari.jpg";
import destNorway from "@/assets/dest-norway.jpg";

const imageMap: Record<string, string> = {
  "santorini": destSantorini,
  "kyoto": destKyoto,
  "swiss-alps": destAlps,
  "morocco": destMorocco,
  "serengeti": destSafari,
  "norway": destNorway,
};

const BudgetEstimator = () => {
  const [budget, setBudget] = useState([5000]);

  const categorizedDestinations = useMemo(() => {
    return destinations.map((dest) => {
      const isPerfectMatch = dest.price_start <= budget[0] && dest.price_start >= budget[0] * 0.7;
      const isWithinBudget = dest.price_start <= budget[0];
      return {
        ...dest,
        isPerfectMatch,
        isWithinBudget,
        image: imageMap[dest.id],
      };
    }).sort((a, b) => {
      if (a.isPerfectMatch && !b.isPerfectMatch) return -1;
      if (!a.isPerfectMatch && b.isPerfectMatch) return 1;
      if (a.isWithinBudget && !b.isWithinBudget) return -1;
      if (!a.isWithinBudget && b.isWithinBudget) return 1;
      return a.price_start - b.price_start;
    });
  }, [budget]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

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
          <p className="text-label text-primary mb-4">Budget Explorer</p>
          <h2 className="heading-section mb-6">
            Find Your <span className="text-gradient">Perfect</span> Escape
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Adjust your budget and discover destinations tailored to your investment in extraordinary experiences.
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
          <div className="flex justify-between items-center mb-4">
            <span className="text-label text-muted-foreground text-[10px]">Your Budget</span>
            <span className="font-serif text-3xl text-primary">
              {formatPrice(budget[0])}
            </span>
          </div>
          <Slider
            value={budget}
            onValueChange={setBudget}
            min={2000}
            max={10000}
            step={100}
            className="py-4"
          />
          <div className="flex justify-between text-muted-foreground text-xs mt-2">
            <span>{formatPrice(2000)}</span>
            <span>{formatPrice(10000)}</span>
          </div>
        </motion.div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorizedDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`budget-card relative ${
                !dest.isWithinBudget ? "out-of-budget" : ""
              } ${dest.isPerfectMatch ? "perfect-match" : ""}`}
            >
              <div className="card-glow group overflow-hidden">
                {/* Perfect Match Badge */}
                {dest.isPerfectMatch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-sm text-[10px] uppercase tracking-widest font-medium"
                  >
                    <Sparkles className="w-3 h-3" />
                    Perfect Match
                  </motion.div>
                )}

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Mood Tags */}
                  <div className="flex gap-2 mb-3">
                    {dest.mood_tag.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase tracking-widest text-primary/80 border border-primary/30 px-2 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-xl font-medium mb-2">
                    {dest.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                        Starting from
                      </span>
                      <span className="font-serif text-xl text-foreground">
                        {formatPrice(dest.price_start)}
                      </span>
                    </div>
                    <button className="btn-outline-luxury py-2 px-4 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetEstimator;
