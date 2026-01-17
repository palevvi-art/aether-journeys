import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

// Transform journey data for the experiences display
const experiences = (journeyData as Journey[]).map((journey) => ({
  id: journey.id,
  title: journey.title,
  location: journey.location,
  image: journey.hero_image,
  category: journey.mood,
  price: journey.price,
  description: journey.description,
}));

// Format price in IDR
const formatIDR = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace("IDR", "IDR ");
};

const moodLabelsID: Record<string, string> = {
  Solitude: "Ketenangan",
  Adventure: "Petualangan",
  Spiritual: "Spiritual",
};

// Animated section title
const AnimatedTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Experience Card Component
const ExperienceCard = ({
  experience,
  index,
  featured = false,
}: {
  experience: (typeof experiences)[0];
  index: number;
  featured?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${featured ? "col-span-2 row-span-2" : ""
        }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
        <motion.img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold text-primary bg-background/80 backdrop-blur-md border border-primary/30 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {moodLabelsID[experience.category] || experience.category}
          </motion.span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs text-foreground/70 uppercase tracking-wider font-medium">
              {experience.location}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            className={`font-serif font-bold leading-tight mb-3 drop-shadow-lg ${featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
              }`}
          >
            {experience.title}
          </motion.h3>

          {/* Price & CTA Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
            className="flex items-center justify-between"
          >
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Mulai dari
              </span>
              <span className="font-serif text-lg md:text-xl text-primary font-bold">
                {formatIDR(experience.price)}
              </span>
            </div>

            {/* Explore Button */}
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-primary-foreground bg-primary/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
            >
              Jelajahi
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedExperiences = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-background overflow-hidden"
      id="experiences"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <AnimatedTitle className="text-center mb-16 md:mb-20">
          <p className="text-label text-primary mb-4 text-xs md:text-sm tracking-[0.25em]">
            Pengalaman Ikonik
          </p>
          <h2 className="heading-section max-w-3xl mx-auto leading-tight">
            Perjalanan yang Dikurasi untuk{" "}
            <span className="text-gradient">Jiwa yang Mencari</span>
            {" "}Keindahan
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-6">
            Temukan destinasi eksklusif yang dirancang untuk memberikan pengalaman tak terlupakan
          </p>
        </AnimatedTitle>

        {/* Modern Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <button className="btn-outline-luxury group">
            Lihat Semua Destinasi
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
