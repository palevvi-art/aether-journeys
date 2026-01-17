import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search, Plane, User } from "lucide-react";

const HeroSection = () => {
  const [location] = useState("Bali, Indonesia");
  const [checkIn] = useState("22 January 2025");
  const [checkOut] = useState("30 January 2025");
  const [people] = useState("4 People, 1Child");

  return (
    <section className="relative bg-white min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 px-6 md:px-12 py-6"
      >
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-medium text-primary italic">
              Aether
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
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User className="w-4 h-4" />
            </button>
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light italic text-foreground leading-tight">
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
            <button className="btn-primary">
              Book Now
            </button>
          </motion.div>
        </div>

        {/* Main Image with Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Main Destination Image */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80"
              alt="Mountain Adventure"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>

          {/* Booking Bar - Overlapping bottom of image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-3xl px-4">
            <div className="bg-white rounded-full shadow-xl px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center gap-4">
              {/* Location */}
              <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-6">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{location}</p>
                </div>
              </div>

              {/* Check In */}
              <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-6">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Check In</p>
                  <p className="text-sm font-medium text-foreground">{checkIn}</p>
                </div>
              </div>

              {/* Check Out */}
              <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-6">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Check Out</p>
                  <p className="text-sm font-medium text-foreground">{checkOut}</p>
                </div>
              </div>

              {/* People */}
              <div className="flex items-center gap-3 flex-1">
                <Users className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">People</p>
                  <p className="text-sm font-medium text-foreground">{people}</p>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5" />
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
