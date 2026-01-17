import { motion } from "framer-motion";

const footerLinks = {
  destinasi: [
    { label: "Bali", href: "#" },
    { label: "Raja Ampat", href: "#" },
    { label: "Lombok", href: "#" },
    { label: "Komodo", href: "#" },
  ],
  layanan: [
    { label: "Perjalanan Privat", href: "#" },
    { label: "Paket Honeymoon", href: "#" },
    { label: "Retreat Korporat", href: "#" },
    { label: "Petualangan Keluarga", href: "#" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#about" },
    { label: "Karir", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border" id="about">
      <div className="container max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <span className="font-serif text-3xl font-bold tracking-tight text-foreground block mb-6">
              Aether<span className="text-primary">.</span>
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Menghadirkan pengalaman perjalanan eksklusif yang dirancang khusus untuk jiwa
              pencari keindahan dan ketenangan.
            </p>
            <div className="flex gap-4">
              {["Instagram", "LinkedIn", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Destinasi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-label text-foreground mb-6">Destinasi</h4>
            <ul className="space-y-3">
              {footerLinks.destinasi.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Layanan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-label text-foreground mb-6">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Perusahaan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-label text-foreground mb-6">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
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
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © 2026 Aether Travel. Hak Cipta Dilindungi.
          </p>
          <p className="text-muted-foreground text-xs">
            Dirancang dengan ♥ untuk para penjelajah Indonesia
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
