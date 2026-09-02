'use client';

import { motion } from 'framer-motion';

const FOOTER_LINKS = [
  { label: 'Home', href: '#arrive' },
  { label: 'About', href: '#arrive' },
  { label: 'Programs', href: '#become' },
  { label: 'For Organisations', href: '#become' },
  { label: 'Media', href: '#speak' },
  { label: 'Journal', href: '#become' },
  { label: 'Contact', href: '#become' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-20 px-6 md:px-12 lg:px-20 border-t border-warm-mist/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('#arrive')}
              className="font-display text-3xl md:text-4xl font-light text-ivory tracking-tight mb-4"
              whileHover={{ scale: 1.05 }}
            >
              IRIS
            </motion.button>
            <p className="text-warm-mist/60 leading-relaxed max-w-md">
              Two decades of daily practice. Yoga Alliance certified. Hatha, Aerial, Pranayama, Dhyana. 
              TEDx speaker. International Day of Yoga 2024.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="font-mono text-xs tracking-widest uppercase text-warm-mist/60 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link, index) => (
                <li key={link.label}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-warm-mist/70 hover:text-ivory transition-colors text-sm"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="font-mono text-xs tracking-widest uppercase text-warm-mist/60 mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link, index) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-warm-mist/70 hover:text-ivory transition-colors text-sm"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          className="pt-8 border-t border-warm-mist/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-warm-mist/50 text-sm font-mono">
            © 2024 Iris Yog. All rights reserved.
          </p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              className="text-warm-mist/50 hover:text-ivory transition-colors text-sm"
              whileHover={{ y: -2 }}
            >
              Privacy
            </motion.a>
            <motion.a
              href="#"
              className="text-warm-mist/50 hover:text-ivory transition-colors text-sm"
              whileHover={{ y: -2 }}
            >
              Terms
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
