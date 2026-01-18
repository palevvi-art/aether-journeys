import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Plane, User, ChevronDown } from "lucide-react";

const destinations = [
  "Bali, Indonesia",
  "Raja Ampat, Papua",
  "Mount Bromo, East Java",
  "Komodo Island, NTT",
  "Borobudur, Central Java",
  "Lake Toba, North Sumatra",
];

const HeroSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGetQuote = () => {
    const message = `Hi, I'm interested in a tour to ${selectedDestination}. Can you help me plan my trip?`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative bg-white min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 py-6"
      >
        <div className="container max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 h-10">
            <span className="text-xl md:text-2xl font-medium text-primary italic leading-none">
              Aether Tour and Travel
            </span>
          </a>

          {/* Centered Navigation Pill */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full px-2 py-2">
            <a href="#" className="px-5 py-2 text-sm font-medium text-foreground hover:bg-white rounded-full transition-colors">
              Home
            </a>
            <a href="#tours" className="px-5 py-2 text-sm font-medium text-foreground hover:bg-white rounded-full transition-colors">
              Tour
            </a>
            <a href="#about" className="px-5 py-2 text-sm font-medium text-foreground hover:bg-white rounded-full transition-colors">
              About Us
            </a>
            <a href="#contact" className="px-5 py-2 text-sm font-medium text-foreground hover:bg-white rounded-full transition-colors">
              Contact Us
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#tours"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
              title="View Tours"
            >
              <Plane className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
              title="Contact Us"
            >
              <User className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="container max-w-7xl mx-auto px-6 md:px-12 pb-8">
        {/* Top Row: Headline + Description */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          {/* Left - Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Next<br />
              <span className="text-primary">Adventure</span> Awaits
            </h1>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:max-w-xs md:pt-4"
          >
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Discover the beauty of Indonesia—from Bali's temples to Raja Ampat's reefs.
              Your trusted local tour partner since 2010.
            </p>
            <a href="#tours" className="btn-primary">
              Explore Tours
            </a>
          </motion.div>
        </div>

        {/* Main Image with Simplified Destination Picker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Main Destination Image */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=80"
              alt="Bali Rice Terraces Indonesia"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>

          {/* Simplified Destination Picker */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-xl px-4">
            <div className="bg-white rounded-full shadow-xl px-4 py-3 flex items-center gap-3">
              {/* Destination Dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-full transition-colors"
                >
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Choose Destination</p>
                    <p className="text-sm font-medium text-foreground truncate">{selectedDestination}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    {destinations.map((dest) => (
                      <button
                        key={dest}
                        onClick={() => {
                          setSelectedDestination(dest);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${selectedDestination === dest ? 'text-primary font-medium' : 'text-foreground'
                          }`}
                      >
                        <MapPin className="w-4 h-4" />
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Get Quote Button */}
              <button
                onClick={handleGetQuote}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors flex-shrink-0"
              >
                Get Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spacer for booking bar overlap */}
      <div className="h-16 md:h-20"></div>
    </section>
  );
};

export default HeroSection;
