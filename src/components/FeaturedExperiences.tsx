import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import destSantorini from "@/assets/dest-santorini.jpg";
import destKyoto from "@/assets/dest-kyoto.jpg";
import destAlps from "@/assets/dest-alps.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import destSafari from "@/assets/dest-safari.jpg";
import destNorway from "@/assets/dest-norway.jpg";

const experiences = [
  {
    id: 1,
    title: "Sunset Caldera Cruise",
    location: "Santorini, Greece",
    image: destSantorini,
    category: "Solitude",
  },
  {
    id: 2,
    title: "Zen Temple Retreat",
    location: "Kyoto, Japan",
    image: destKyoto,
    category: "Spiritual",
  },
  {
    id: 3,
    title: "Summit Expedition",
    location: "Swiss Alps",
    image: destAlps,
    category: "Adventure",
  },
  {
    id: 4,
    title: "Desert Mystique",
    location: "Marrakech, Morocco",
    image: destMorocco,
    category: "Spiritual",
  },
  {
    id: 5,
    title: "Big Five Safari",
    location: "Serengeti, Tanzania",
    image: destSafari,
    category: "Adventure",
  },
  {
    id: 6,
    title: "Northern Lights Quest",
    location: "Lofoten, Norway",
    image: destNorway,
    category: "Solitude",
  },
];

const FeaturedExperiences = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section Header */}
        <div className="absolute top-16 left-0 right-0 z-10 px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-label text-primary mb-4">Featured Experiences</p>
            <h2 className="heading-section max-w-2xl">
              Curated Journeys for the <span className="text-gradient">Discerning</span> Traveler
            </h2>
          </motion.div>
        </div>

        {/* Horizontal Scroll Content */}
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 flex gap-8 pl-8 md:pl-16 pt-20"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex-shrink-0 w-[320px] md:w-[400px]"
            >
              <div className="card-glow overflow-hidden aspect-[3/4]">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-label text-primary text-[10px] mb-2 block">
                    {exp.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {exp.location}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="btn-luxury transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Progress */}
        <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16">
          <div className="flex items-center gap-4">
            <span className="text-label text-muted-foreground text-[10px]">Scroll</span>
            <div className="flex-1 h-px bg-muted">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-primary origin-left"
              />
            </div>
            <span className="text-label text-muted-foreground text-[10px]">
              {experiences.length} Experiences
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
