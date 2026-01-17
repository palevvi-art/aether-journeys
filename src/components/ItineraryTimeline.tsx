import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

const ItineraryTimeline = () => {
  const [selectedJourney, setSelectedJourney] = useState<number>(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const currentJourney = journeys[selectedJourney];

  const handleDayClick = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <section className="relative py-32 bg-background" id="jadwal">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-label text-primary mb-4">Jadwal Perjalanan</p>
          <h2 className="heading-section mb-6">
            Setiap Momen <span className="text-gradient">Dikurasi dengan Sempurna</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Nikmati perjalanan yang dirancang khusus untuk menciptakan kenangan tak terlupakan.
          </p>
        </motion.div>

        {/* Journey Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-16"
        >
          {journeys.map((journey, index) => (
            <button
              key={journey.id}
              onClick={() => {
                setSelectedJourney(index);
                setExpandedDay(null);
              }}
              className={`px-6 py-3 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 rounded-sm border ${selectedJourney === index
                  ? "border-primary text-primary bg-primary/10"
                  : "border-muted-foreground/20 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
            >
              {journey.location}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <LayoutGroup>
          <div className="relative pl-12 md:pl-16">
            {/* Gold Vertical Line */}
            <div className="timeline-gold-line" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentJourney.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {currentJourney.itinerary.map((item, index) => {
                  const isExpanded = expandedDay === item.day;

                  return (
                    <motion.div
                      key={`${currentJourney.id}-day-${item.day}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        className={`timeline-dot ${isExpanded ? "active" : ""}`}
                        animate={{
                          scale: isExpanded ? 1.3 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />

                      {/* Day Card */}
                      <motion.div
                        layout
                        onClick={() => handleDayClick(item.day)}
                        className={`relative p-6 rounded-sm cursor-pointer transition-all duration-300 ${isExpanded
                            ? "bg-card border border-primary/30"
                            : "bg-card/50 border border-transparent hover:border-muted-foreground/20"
                          }`}
                        style={{
                          boxShadow: isExpanded
                            ? "0 10px 40px hsl(0 0% 0% / 0.4), 0 0 30px hsl(43 66% 52% / 0.1)"
                            : "none",
                        }}
                      >
                        {/* Day Header */}
                        <motion.div layout="position" className="flex items-start justify-between">
                          <div>
                            <span className="text-label text-primary text-[10px] block mb-2">
                              Hari {item.day}
                            </span>
                            <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground">
                              {item.activity}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-primary"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </motion.div>
                        </motion.div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6 space-y-4">
                                {/* Activity Image */}
                                <motion.div
                                  layoutId={`image-${currentJourney.id}-${item.day}`}
                                  className="relative w-full aspect-video rounded-sm overflow-hidden"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.activity}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="text-muted-foreground text-sm leading-relaxed"
                                >
                                  {item.description}
                                </motion.p>

                                {/* Details */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                  className="flex flex-wrap gap-3 pt-2"
                                >
                                  {[
                                    "Termasuk Transportasi",
                                    "Guide Profesional",
                                    "Makan Siang",
                                  ].map((detail, i) => (
                                    <span
                                      key={i}
                                      className="text-[10px] uppercase tracking-widest text-primary/80 border border-primary/30 px-3 py-1.5 rounded-sm"
                                    >
                                      {detail}
                                    </span>
                                  ))}
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default ItineraryTimeline;
