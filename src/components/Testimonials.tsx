import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    quote: string;
    background: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Travel Blogger, Australia",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        quote: "Aether made our Raja Ampat diving trip absolutely magical. The local guides knew the best spots not on any tourist map. Truly an unforgettable Indonesian adventure!",
        background: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=1200&q=80",
    },
    {
        id: 2,
        name: "James Chen",
        role: "Photographer, Singapore",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        quote: "The Mount Bromo sunrise tour exceeded all expectations. Aether's attention to detail and seamless transportation across Java made everything so easy. Highly recommended!",
        background: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "Adventure Traveler, Spain",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        quote: "From Komodo dragons to pristine beaches, Aether crafted the perfect Indonesia itinerary. Their team's local expertise and warm hospitality made us feel like family.",
        background: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
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
        <section ref={sectionRef} className="py-20 section-cream" id="testimonials">
            <div className="container max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-label text-primary mb-2">Testimonials</p>
                    <h2 className="heading-section text-foreground">
                        What Our Travelers Say
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative h-[300px] md:h-[400px]">
                                <img
                                    src={current.background}
                                    alt="Destination"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8 md:pr-12">
                                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                                <p className="text-lg text-foreground mb-8 leading-relaxed">
                                    "{current.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={current.avatar}
                                        alt={current.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            {current.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {current.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => navigate("prev")}
                            className="btn-arrow"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? "w-6 bg-primary"
                                            : "bg-muted-foreground/30"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("next")}
                            className="btn-arrow"
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
