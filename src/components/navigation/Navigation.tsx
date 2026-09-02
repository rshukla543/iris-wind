'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS } from '@/data/chapters';

const NAV_ITEMS = [
  { label: 'Home', href: '#arrive' },
  { label: 'About', href: '#arrive' },
  { label: 'Programs', href: '#become' },
  { label: 'For Organisations', href: '#become' },
  { label: 'Media', href: '#speak' },
  { label: 'Journal', href: '#become' },
  { label: 'Contact', href: '#become' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(7, 6, 8, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(213, 206, 195, 0.1)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            <motion.button
              onClick={() => scrollToSection('#arrive')}
              className="font-display text-2xl md:text-3xl font-light text-ivory tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              IRIS
            </motion.button>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-mono text-xs tracking-widest uppercase text-warm-mist/70 hover:text-ivory transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="hidden lg:block px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase"
              style={{
                background: 'var(--chapter-root)',
                color: '#070608',
              }}
              onClick={() => scrollToSection('#become')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Work with Iris
            </motion.button>

            <motion.button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full"
              style={{
                background: 'rgba(213, 206, 195, 0.1)',
                border: '1px solid rgba(213, 206, 195, 0.2)',
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                className="w-6 h-0.5 bg-ivory"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 4 : 0,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-ivory mt-1.5"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-ivory mt-1.5"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -4 : 0,
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-void/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-display text-3xl md:text-4xl font-light text-ivory tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="mt-8 px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase"
                style={{
                  background: 'var(--chapter-root)',
                  color: '#070608',
                }}
                onClick={() => scrollToSection('#become')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Work with Iris
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
