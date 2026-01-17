import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80"
                    alt="Bali Rice Terraces"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-amber-500/80" />
            </div>

            {/* Content */}
            <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-label text-white/80 mb-4">Jelajahi Indonesia</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Ready to Explore Indonesia? Your Dream Adventure Starts Here!
                        </h2>
                        <p className="text-white/80 mb-8 max-w-md">
                            From the temples of Borobudur to the beaches of Bali, the dragons of Komodo to the reefs of Raja Ampat. Let Aether craft your perfect Indonesian journey.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:shadow-xl transition-shadow"
                        >
                            Plan Your Trip
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block"
            >
                <div className="absolute inset-0 bg-gradient-to-l from-amber-400/20 to-transparent" />
            </motion.div>
        </section>
    );
};

export default CTASection;
