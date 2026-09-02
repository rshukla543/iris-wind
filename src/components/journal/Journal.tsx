'use client';

import { motion } from 'framer-motion';

const JOURNAL_POSTS = [
  {
    id: 1,
    title: 'The Practice of Stillness',
    excerpt: 'Finding movement in stillness, stillness in movement. A reflection on twenty years of daily practice.',
    date: '2024-06-15',
    category: 'Reflection',
  },
  {
    id: 2,
    title: 'Breath as the Bridge',
    excerpt: 'How pranayama taught me that breath is not just something we do—it is something we are.',
    date: '2024-05-22',
    category: 'Practice',
  },
  {
    id: 3,
    title: 'Beyond the Mat',
    excerpt: 'Yoga does not end when you step off the mat. The real practice begins when you return to your life.',
    date: '2024-04-10',
    category: 'Philosophy',
  },
] as const;

export function Journal() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-void" />
      
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, var(--chapter-see)/15 0%, transparent 50%)',
      }} />
      
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-mono text-xs md:text-sm tracking-widest uppercase text-warm-mist/60 mb-6"
            style={{ color: 'var(--chapter-see)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            JOURNAL
          </motion.p>
          
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-ivory"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Words from the practice
          </motion.h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JOURNAL_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              className="group p-8 rounded-[2rem] transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(25, 23, 25, 0.8)',
                border: '1px solid rgba(213, 206, 195, 0.1)',
              }}
              whileHover={{ 
                y: -8,
                borderColor: 'var(--chapter-see)',
                background: 'linear-gradient(180deg, rgba(25,23,25,0.9), var(--chapter-see)/10)'
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: 'var(--chapter-see)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              >
                {post.category}
              </motion.div>
              
              <motion.h3
                className="font-display text-2xl font-light text-ivory mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              >
                {post.title}
              </motion.h3>
              
              <motion.p
                className="text-warm-mist/60 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                {post.excerpt}
              </motion.p>
              
              <motion.div
                className="flex items-center gap-2 font-mono text-xs text-warm-mist/40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
              >
                <span>{post.date}</span>
                <motion.div
                  className="w-8 h-px bg-current"
                  animate={{ width: '32px' }}
                  transition={{ duration: 0.3 }}
                />
                <span>Read more</span>
              </motion.div>
            </motion.article>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase border"
            style={{
              borderColor: 'var(--chapter-see)',
              color: 'var(--chapter-see)',
            }}
            whileHover={{ 
              background: 'var(--chapter-see)',
              color: '#070608',
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
