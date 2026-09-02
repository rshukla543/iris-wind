'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-void" />
      
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, var(--chapter-root)/20 0%, transparent 50%)',
      }} />
      
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-mono text-xs md:text-sm tracking-widest uppercase text-warm-mist/60 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ color: 'var(--chapter-root)' }}
          >
            IRIS YOG
          </motion.p>
          
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-9xl font-light leading-[1.1] tracking-tight text-ivory mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The Living
            <br />
            <span className="font-medium" style={{ color: 'var(--chapter-root)' }}>Practice</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-warm-mist/70 leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Two decades of daily practice. Yoga Alliance certified. Hatha, Aerial, Pranayama, Dhyana. 
            TEDx speaker. International Day of Yoga 2024.
          </motion.p>
          
          <motion.button
            className="px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase"
            style={{
              background: 'var(--chapter-root)',
              color: '#070608',
            }}
            onClick={() => {
              const element = document.getElementById('arrive');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin the Journey
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-warm-mist/30 flex items-start justify-center p-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: 'var(--chapter-root)' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
