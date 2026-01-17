import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface TourPackage {
    id: number;
    title: string;
    location: string;
    image: string;
    rating: number;
    price: number;
    hasVideo: boolean;
}

const tourPackages: TourPackage[] = [
    {
        id: 1,
        title: "Jaya Wijaya Mountain",
        location: "Papua, Indonesia",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
        rating: 5.0,
        price: 45000000,
        hasVideo: true,
    },
    {
        id: 2,
        title: "Raja Ampat Paradise",
        location: "West Papua, Indonesia",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=600&q=80",
        rating: 4.9,
        price: 35000000,
        hasVideo: false,
    },
    {
        id: 3,
        title: "Mount Bromo Sunrise",
        location: "East Java, Indonesia",
        image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80",
        rating: 4.8,
        price: 15000000,
        hasVideo: true,
    },
    {
        id: 4,
        title: "Komodo Island Adventure",
        location: "East Nusa Tenggara",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
        rating: 4.9,
        price: 28000000,
        hasVideo: false,
    },
    {
        id: 5,
        title: "Bali Cultural Journey",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
        rating: 4.7,
        price: 18000000,
        hasVideo: true,
    },
];

const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const TourCard = ({ tour, index }: { tour: TourPackage; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="tour-card group"
        >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Play Button */}
                {tour.hasVideo && (
                    <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                        <Play className="w-4 h-4 text-primary fill-current" />
                    </button>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-xs font-medium">{tour.rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {tour.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{tour.location}</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                        {formatIDR(tour.price)}
                    </span>
                    <button className="text-xs font-medium text-primary hover:underline">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const TourPackages = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section ref={sectionRef} className="py-20 bg-white" id="tours">
            <div className="container max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-label text-primary mb-2">Tour Packages</p>
                        <h2 className="heading-section text-foreground">
                            Explore Our Exclusive<br />
                            <span className="text-primary">Tour Packages</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-md"
                    >
                        <p className="text-body">
                            Find your perfect getaway with our curated tour packages. Adventure, relaxation or
                            culture—it's all here for you.
                        </p>
                    </motion.div>
                </div>

                {/* Tour Cards Scroll */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 btn-arrow hidden md:flex"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 btn-arrow hidden md:flex"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Cards Container */}
                    <div
                        ref={scrollRef}
                        className="horizontal-scroll -mx-6 px-6 md:mx-0 md:px-0"
                    >
                        {tourPackages.map((tour, index) => (
                            <TourCard key={tour.id} tour={tour} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourPackages;
