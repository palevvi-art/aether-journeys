import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import destSantorini from "@/assets/dest-santorini.jpg";
import destKyoto from "@/assets/dest-kyoto.jpg";
import destAlps from "@/assets/dest-alps.jpg";

const itinerary = [
  {
    day: 1,
    title: "Arrival & Awakening",
    time: "Morning",
    activity: "Private seaplane transfer to your overwater villa. Settle in with a champagne welcome and panoramic ocean views.",
    image: destSantorini,
    details: [
      "VIP airport meet & greet",
      "Scenic 45-minute seaplane journey",
      "Private villa orientation",
      "Sunset welcome dinner",
    ],
  },
  {
    day: 2,
    title: "Sacred Explorations",
    time: "Full Day",
    activity: "Dawn meditation at an ancient temple, followed by a curated cultural immersion with local artisans.",
    image: destKyoto,
    details: [
      "5:30 AM temple meditation",
      "Traditional breakfast ceremony",
      "Private craft workshop",
      "Evening garden stroll",
    ],
  },
  {
    day: 3,
    title: "Summit & Soul",
    time: "Full Day",
    activity: "Guided alpine expedition to breathtaking viewpoints, concluding with a private chef dinner at 3,000 meters.",
    image: destAlps,
    details: [
      "Helicopter transfer to base camp",
      "6-hour guided summit trek",
      "Gourmet mountain picnic",
      "Stargazing dinner experience",
    ],
  },
];

const ItineraryTimeline = () => {
  const [expandedDay, setExpandedDay] = useState<string | undefined>("day-1");

  return (
    <section className="relative py-32 bg-background" id="experiences">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-label text-primary mb-4">Sample Itinerary</p>
          <h2 className="heading-section mb-6">
            Your Journey, <span className="text-gradient">Day by Day</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Every moment is curated. Every experience, unforgettable.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

          <Accordion
            type="single"
            collapsible
            value={expandedDay}
            onValueChange={setExpandedDay}
            className="space-y-12"
          >
            {itinerary.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Day Marker */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1">
                  <motion.div
                    animate={{
                      scale: expandedDay === `day-${item.day}` ? 1.2 : 1,
                      backgroundColor: expandedDay === `day-${item.day}` 
                        ? "hsl(var(--primary))" 
                        : "hsl(var(--background))",
                    }}
                    className="w-4 h-4 rounded-full border-2 border-primary"
                  />
                </div>

                {/* Content Side */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <AccordionItem value={`day-${item.day}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline group py-0">
                      <div className={`text-left ${index % 2 === 0 ? "md:text-right" : "md:text-left"} w-full`}>
                        <span className="text-label text-primary text-[10px] block mb-2">
                          Day {item.day} · {item.time}
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl font-medium mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-md">
                          {item.activity}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-6">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`flex flex-col gap-4 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}
                        >
                          <motion.div
                            layoutId={`image-${item.day}`}
                            className="relative w-full md:w-80 aspect-video rounded-sm overflow-hidden card-glow"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                            {item.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-muted-foreground text-sm flex items-center gap-2"
                                style={{ flexDirection: index % 2 === 0 ? "row-reverse" : "row" }}
                              >
                                <span className="w-1 h-1 rounded-full bg-primary" />
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatePresence>
                    </AccordionContent>
                  </AccordionItem>
                </div>

                {/* Empty Side for Layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ItineraryTimeline;
