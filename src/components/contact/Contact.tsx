'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Thank you for your message. Iris will be in touch soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-void" />
      
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, var(--chapter-become)/15 0%, transparent 50%)',
      }} />
      
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-mono text-xs md:text-sm tracking-widest uppercase text-warm-mist/60 mb-6"
            style={{ color: 'var(--chapter-become)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            CONTACT
          </motion.p>
          
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-ivory"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Begin the conversation
          </motion.h2>
        </motion.div>
        
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <label htmlFor="name" className="block font-mono text-xs tracking-widest uppercase text-warm-mist/60 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 rounded-[1.5rem] bg-obsidian/50 border border-warm-mist/10 text-ivory placeholder-warm-mist/30 focus:outline-none focus:border-become/50 transition-colors"
                placeholder="Your name"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <label htmlFor="email" className="block font-mono text-xs tracking-widest uppercase text-warm-mist/60 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 rounded-[1.5rem] bg-obsidian/50 border border-warm-mist/10 text-ivory placeholder-warm-mist/30 focus:outline-none focus:border-become/50 transition-colors"
                placeholder="your@email.com"
              />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <label htmlFor="subject" className="block font-mono text-xs tracking-widest uppercase text-warm-mist/60 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-6 py-4 rounded-[1.5rem] bg-obsidian/50 border border-warm-mist/10 text-ivory placeholder-warm-mist/30 focus:outline-none focus:border-become/50 transition-colors"
              placeholder="How can I help?"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <label htmlFor="message" className="block font-mono text-xs tracking-widest uppercase text-warm-mist/60 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-6 py-4 rounded-[1.5rem] bg-obsidian/50 border border-warm-mist/10 text-ivory placeholder-warm-mist/30 focus:outline-none focus:border-become/50 transition-colors resize-none"
              placeholder="Tell me about your practice or inquiry..."
            />
          </motion.div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase"
            style={{
              background: isSubmitting ? 'var(--chapter-become)/50' : 'var(--chapter-become)',
              color: '#070608',
            }}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
