import { motion } from "framer-motion";
import { Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Destinations", href: "#" },
    { label: "Tour Packages", href: "#tours" },
    { label: "Travel Blog", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Photo Gallery", href: "#" },
  ],
  about: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Careers", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms and Conditions", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <div className="container max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm opacity-80 mb-6 max-w-sm">
              Sign up to get exclusive offers, travel tips, and destination inspiration straight to your inbox!
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 placeholder:text-white/50 text-white text-sm focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-white text-primary font-medium flex items-center gap-2 hover:bg-white/90 transition-colors"
              >
                Submit
              </button>
            </form>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-xl font-medium italic">
              Aether Tour and Travel
            </span>
          </div>

          <p className="text-sm opacity-70">
            © 2026 Aether Tour and Travel. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
