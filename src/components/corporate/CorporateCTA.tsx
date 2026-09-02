'use client';

import { motion } from 'framer-motion';

export function CorporateCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-void" />
      
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, var(--chapter-rise)/15 0%, transparent 50%)',
      }} />
      
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-mono text-xs md:text-sm tracking-widest uppercase text-warm-mist/60 mb-6"
            style={{ color: 'var(--chapter-rise)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            FOR ORGANISATIONS
          </motion.p>
          
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight text-ivory mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Bring the practice to your{' '}
            <span className="font-medium" style={{ color: 'var(--chapter-rise)' }}>organization.</span>
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-warm-mist/70 leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Corporate wellness programs. Leadership workshops. Women's wellness initiatives. 
            Custom sessions designed for teams that want to move better, breathe deeper, and lead stronger.
          </motion.p>
          
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[
              { title: 'Corporate Yoga', desc: 'On-site and virtual sessions for teams' },
              { title: 'Mindfulness', desc: 'Workplace stress reduction programs' },
              { title: 'Leadership', desc: 'Executive workshops and speaking' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-[1.5rem] transition-all duration-300"
                style={{
                  background: 'rgba(25, 23, 25, 0.8)',
                  border: '1px solid rgba(213, 206, 195, 0.1)',
                }}
                whileHover={{ 
                  y: -8,
                  borderColor: 'var(--chapter-rise)',
                  background: 'linear-gradient(180deg, rgba(25,23,25,0.9), var(--chapter-rise)/10)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h3 className="font-display text-xl font-light text-ivory mb-2">{item.title}</h3>
                <p className="text-warm-mist/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button
            className="px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase"
            style={{
              background: 'var(--chapter-rise)',
              color: '#070608',
            }}
            onClick={() => {
              const element = document.getElementById('become');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Inquire for Your Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
