import { useState } from "react";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
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

type MoodType = "Solitude" | "Adventure";

// Map mood to vibe content
const vibeContent: Record<MoodType, {
  image: string;
  headline: string[];
  subline: string;
  location: string;
}> = {
  Solitude: {
    image: (journeyData as Journey[]).find(j => j.mood === "Solitude")?.hero_image || "",
    headline: ["Temukan", "Kedamaian"],
    subline: "Di mana kesunyian berbicara dan waktu mengalir tanpa batas",
    location: (journeyData as Journey[]).find(j => j.mood === "Solitude")?.location || "",
  },
  Adventure: {
    image: (journeyData as Journey[]).find(j => j.mood === "Adventure")?.hero_image || "",
    headline: ["Kejar", "Cakrawala"],
    subline: "Di mana setiap puncak mengungkap awal yang baru",
    location: (journeyData as Journey[]).find(j => j.mood === "Adventure")?.location || "",
  },
};

const moodLabels: Record<MoodType, string> = {
  Solitude: "Ketenangan",
  Adventure: "Petualangan",
};

const easeOut: Easing = [0.16, 1, 0.3, 1];
const easeIn: Easing = [0.7, 0, 0.84, 0];

const HeroSection = () => {
  const [activeVibe, setActiveVibe] = useState<MoodType>("Solitude");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVibeChange = (vibe: MoodType) => {
    if (vibe !== activeVibe && !isAnimating) {
      setIsAnimating(true);
      setActiveVibe(vibe);
      setTimeout(() => setIsAnimating(false), 1200);
    }
  };

  // Split headline animation variants
  const splitTopVariants: Variants = {
    enter: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3, ease: easeOut }
    },
    exit: {
      y: -80,
      opacity: 0,
      transition: { duration: 0.4, ease: easeIn }
    },
  };

  const splitBottomVariants: Variants = {
    enter: { y: -60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.4, ease: easeOut }
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.4, ease: easeIn }
    },
  };

  // Ken Burns background animation
  const kenBurnsVariants: Variants = {
    initial: { scale: 1.15, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: { duration: 12, ease: "linear" as Easing },
        opacity: { duration: 1.2, ease: easeOut }
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: easeIn }
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVibe}
          variants={kenBurnsVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <motion.img
            src={vibeContent[activeVibe].image}
            alt={activeVibe}
            className="h-full w-full object-cover"
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
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
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
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
          {[
            { label: "Destinasi", href: "#destinations" },
            { label: "Pengalaman", href: "#experiences" },
            { label: "Tentang Kami", href: "#about" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-label text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button className="btn-outline-luxury py-2 px-4 text-xs">
            Hubungi Kami
          </button>
        </motion.nav>

        {/* Main Content */}
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-label text-primary mb-8"
          >
            Pilih Suasana Anda
          </motion.p>

          {/* Split Headline Animation */}
          <div className="overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`top-${activeVibe}`}
                variants={splitTopVariants}
                initial="enter"
                animate="animate"
                exit="exit"
                className="hero-headline"
              >
                {vibeContent[activeVibe].headline[0]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`bottom-${activeVibe}`}
                variants={splitBottomVariants}
                initial="enter"
                animate="animate"
                exit="exit"
                className="hero-headline text-gradient"
              >
                {vibeContent[activeVibe].headline[1]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subline-${activeVibe}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg md:text-xl mb-6 text-foreground/60 font-light tracking-wide"
            >
              {vibeContent[activeVibe].subline}
            </motion.p>
          </AnimatePresence>

          {/* Location Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`location-${activeVibe}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-primary/30 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {vibeContent[activeVibe].location}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Vibe Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {(Object.keys(vibeContent) as MoodType[]).map((vibe) => (
              <button
                key={vibe}
                onClick={() => handleVibeChange(vibe)}
                disabled={isAnimating}
                className={`vibe-option ${activeVibe === vibe ? "active" : ""} ${isAnimating ? "pointer-events-none" : ""}`}
              >
                {moodLabels[vibe]}
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
            className="flex flex-col items-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
