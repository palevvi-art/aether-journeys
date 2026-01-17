import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plane, Ship, Bus, Car, ArrowUpRight } from "lucide-react";

interface TransportOption {
    icon: React.ElementType;
    title: string;
    description: string;
}

const transportOptions: TransportOption[] = [
    {
        icon: Plane,
        title: "Domestic Flights",
        description: "Convenient flight bookings across Indonesia's 17,000+ islands. We handle inter-island connections seamlessly.",
    },
    {
        icon: Ship,
        title: "Boat & Ferry",
        description: "Island-hopping made easy with speedboats, traditional phinisi boats, and ferry transfers across the archipelago.",
    },
    {
        icon: Bus,
        title: "Tour Coaches",
        description: "Comfortable air-conditioned coaches for group tours across Java, Bali, and Sumatra.",
    },
    {
        icon: Car,
        title: "Private Vehicles",
        description: "Personal drivers and premium vehicles for flexible, private travel at your own pace.",
    },
];

const Transportation = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-20 section-cream" id="transport">
            <div className="container max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-label text-primary mb-4">Travel Services</p>
                        <h2 className="heading-section text-foreground mb-6">
                            Seamless Travel Across Indonesia
                        </h2>
                        <p className="text-body mb-8 max-w-md">
                            From flights to boats to private cars—we handle all your transportation
                            across the Indonesian archipelago so you can focus on the adventure.
                        </p>

                        {/* Transport Options */}
                        <div className="space-y-4">
                            {transportOptions.map((option, index) => (
                                <motion.div
                                    key={option.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="transport-icon flex-shrink-0">
                                        <option.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                            {option.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {option.description}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80"
                                alt="Traditional Boat Indonesia"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl"
                        >
                            <div className="text-center">
                                <p className="text-3xl font-bold">24/7</p>
                                <p className="text-sm opacity-80">Local Support</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Transportation;
