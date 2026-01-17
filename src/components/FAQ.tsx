import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Send, MessageCircle, Phone } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What destinations in Indonesia do you offer tours to?",
        answer: "We offer tours across the Indonesian archipelago including Bali, Raja Ampat, Komodo Island, Mount Bromo, Yogyakarta, Lake Toba, Lombok, and many more. Our packages cover everything from cultural heritage sites to pristine diving spots and volcanic adventures.",
    },
    {
        question: "What is included in your tour packages?",
        answer: "Our packages typically include accommodation, transportation (domestic flights, private cars, boats), English-speaking local guides, entrance fees to attractions, selected meals, and 24/7 customer support. Specific inclusions vary by package - check each tour for details.",
    },
    {
        question: "Do you offer custom or private tours?",
        answer: "Yes! We specialize in creating personalized itineraries tailored to your interests, budget, and travel dates. Whether you want a romantic Bali retreat, a family adventure to Komodo, or a photography expedition across Java, we can customize everything for you.",
    },
    {
        question: "What is the best time to visit Indonesia?",
        answer: "Indonesia is a year-round destination. The dry season (April-October) is ideal for most areas. For Raja Ampat diving, October-April offers the best visibility. We can advise on the optimal timing based on your chosen destinations and activities.",
    },
    {
        question: "What is your cancellation policy?",
        answer: "Free cancellation is available up to 14 days before departure. Cancellations within 7-14 days receive 50% refund. For last-minute changes, we'll work with you to reschedule whenever possible. Travel insurance is recommended.",
    },
    {
        question: "Do you handle visa requirements?",
        answer: "We provide visa guidance for all our travelers. Many nationalities receive visa-free entry or visa-on-arrival for Indonesia. We'll advise you on requirements specific to your nationality and help with any documentation needed.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-20 bg-white" id="faq">
            <div className="container max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - FAQ */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-label text-primary mb-2">FAQ</p>
                        <h2 className="heading-section text-foreground mb-8">
                            Common Questions
                        </h2>

                        {/* Accordion */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="border border-border rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                                    >
                                        <span className="font-medium text-foreground pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="px-4 pb-4 text-sm text-muted-foreground">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Contact */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="bg-primary rounded-3xl p-8 text-primary-foreground h-full">
                            <h3 className="text-2xl font-bold mb-4">
                                Still Have Questions?
                            </h3>
                            <p className="opacity-80 mb-8">
                                Our travel experts are ready to help you plan your perfect Indonesian adventure. Reach out anytime!
                            </p>

                            {/* Contact Form */}
                            <form className="space-y-4 mb-8">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white focus:outline-none focus:border-white/40"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white focus:outline-none focus:border-white/40"
                                />
                                <textarea
                                    placeholder="Tell us about your dream Indonesia trip..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white resize-none focus:outline-none focus:border-white/40"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-white text-primary font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>

                            {/* Contact Options */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </a>
                                <a
                                    href="tel:+6281234567890"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
