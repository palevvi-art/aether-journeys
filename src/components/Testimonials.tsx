import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sophia Harper",
        role: "Traveler & Writer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        quote: "Ethan, Lina & Oliver were amazing tour guides! Their knowledge of the local culture and ability to tell stories made our trip unforgettable.",
        rating: 5.0,
    },
    {
        id: 2,
        name: "James Chen",
        role: "Photographer, Singapore",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        quote: "The Mount Bromo sunrise tour exceeded all expectations. Aether's attention to detail and seamless transportation across Java made everything so easy.",
        rating: 4.9,
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "Adventure Traveler, Spain",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        quote: "From Komodo dragons to pristine beaches, Aether crafted the perfect Indonesia itinerary. Their team's local expertise made us feel like family.",
        rating: 5.0,
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const current = testimonials[currentIndex];

    const navigate = (direction: "prev" | "next") => {
        setCurrentIndex((prev) => {
            if (direction === "prev") {
                return prev === 0 ? testimonials.length - 1 : prev - 1;
            }
            return prev === testimonials.length - 1 ? 0 : prev + 1;
        });
    };

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden rounded-3xl mx-4 md:mx-8 my-8" id="testimonials">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
                    alt="Mountain landscape"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-slate-900/60" />
            </div>

            <div className="container max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm uppercase tracking-widest text-white/60 mb-3">Testimonials</p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Your Next<br />
                        <span className="text-white/90">Adventure Awaits</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Real experiences from our travelers. See how they enjoyed a trip specially designed to provide the best experience.
                    </p>
                </motion.div>

                {/* Testimonial Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8"
                        >
                            {/* Header with avatar and rating */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={current.avatar}
                                        alt={current.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-white">
                                            {current.name}
                                        </h4>
                                        <p className="text-sm text-white/60">
                                            {current.role}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-white text-sm font-medium">/ {current.rating.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="relative">
                                <span className="text-4xl font-serif text-amber-400 leading-none">"</span>
                                <p className="text-white/90 text-lg leading-relaxed mt-2">
                                    {current.quote}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => navigate("prev")}
                            className="w-12 h-12 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => navigate("next")}
                            className="w-12 h-12 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
