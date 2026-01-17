import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Guide {
    id: number;
    name: string;
    role: string;
    image: string;
    specialty: string;
}

const guides: Guide[] = [
    {
        id: 1,
        name: "Budi Santoso",
        role: "Senior Tour Director",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
        specialty: "Raja Ampat & Papua",
    },
    {
        id: 2,
        name: "Dewi Anggraeni",
        role: "Cultural Specialist",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        specialty: "Bali & Java Heritage",
    },
    {
        id: 3,
        name: "Raka Putra",
        role: "Adventure Guide",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        specialty: "Mount Bromo & Komodo",
    },
];

const Adventures = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-20 bg-white" id="team">
            <div className="container max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-label text-primary mb-2">Meet Our Guides</p>
                    <h2 className="heading-section text-foreground">
                        Expert Local Guides
                    </h2>
                </motion.div>

                {/* Guides Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {guides.map((guide, index) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group"
                        >
                            {/* Image */}
                            <div className="relative rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={guide.image}
                                    alt={guide.name}
                                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Hover Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="absolute bottom-4 left-4 right-4 py-3 rounded-full bg-white text-primary font-medium text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                                >
                                    View Profile
                                    <ArrowUpRight className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="font-semibold text-foreground text-lg mb-1">
                                    {guide.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {guide.role}
                                </p>
                                <span className="inline-block px-3 py-1 text-xs bg-secondary text-primary rounded-full">
                                    {guide.specialty}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Guide Offers Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="hidden md:flex md:col-span-3 justify-end -mt-32 mr-12"
                    >
                        <div className="w-24 h-24 rounded-full bg-accent text-accent-foreground flex flex-col items-center justify-center shadow-lg">
                            <span className="text-xs uppercase tracking-wide font-medium">Local</span>
                            <span className="text-xs uppercase tracking-wide font-bold">Experts</span>
                            <ArrowUpRight className="w-4 h-4 mt-1" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Adventures;
