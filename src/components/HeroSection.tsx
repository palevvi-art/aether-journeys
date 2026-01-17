import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroSolitude from "@/assets/hero-solitude.jpg";
import heroAdventure from "@/assets/hero-adventure.jpg";
import heroSpiritual from "@/assets/hero-spiritual.jpg";

type Vibe = "solitude" | "adventure" | "spiritual";

const vibeContent = {
  solitude: {
    image: heroSolitude,
    headline: "Find Your Stillness",
    subline: "Where silence speaks and time drifts away",
  },
  adventure: {
    image: heroAdventure,
    headline: "Chase the Horizon",
    subline: "Where every summit reveals a new beginning",
  },
  spiritual: {
    image: heroSpiritual,
    headline: "Awaken Within",
    subline: "Where ancient wisdom meets modern soul",
  },
};

const HeroSection = () => {
  const [activeVibe, setActiveVibe] = useState<Vibe>("solitude");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVibe}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={vibeContent[activeVibe].image}
            alt={activeVibe}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-8 left-8"
        >
          <span className="font-serif text-2xl font-medium tracking-wide text-foreground">
            Aether<span className="text-primary">.</span>
          </span>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute top-8 right-8 hidden md:flex items-center gap-8"
        >
          {["Destinations", "Experiences", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-label text-foreground/80 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="btn-outline-luxury py-2 px-4 text-xs">
            Contact
          </button>
        </motion.nav>

        {/* Main Content */}
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-label text-primary mb-6"
          >
            Choose Your Vibe
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${activeVibe}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="heading-display mb-6"
            >
              {vibeContent[activeVibe].headline}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subline-${activeVibe}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-body text-lg md:text-xl mb-12 text-foreground/70"
            >
              {vibeContent[activeVibe].subline}
            </motion.p>
          </AnimatePresence>

          {/* Vibe Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {(Object.keys(vibeContent) as Vibe[]).map((vibe) => (
              <button
                key={vibe}
                onClick={() => setActiveVibe(vibe)}
                className={`vibe-option ${activeVibe === vibe ? "active" : ""}`}
              >
                {vibe}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-label text-muted-foreground text-[10px]">
              Scroll to Explore
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
