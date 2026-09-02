'use client';

import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS, MEDIA_CATEGORIES } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function ChapterSpeak({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[4];

  return (
    <ChapterWrapper chapter={chapter} isActive={isActive} progress={progress}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="relative aspect-[3/4] md:aspect-[4/5]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ImagePlaceholder pose="pose-05" chapter={chapter.color} className="h-full" />
        </motion.div>

        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-ivory mb-10">
            Voice carries the vibration{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>of lived experience.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-warm-mist/70 leading-relaxed mb-12 max-w-xl">
            TEDx stages. International television. Corporate summits. Retreat circles. 
            Each platform becomes a vessel for sharing the practice beyond the mat.
          </p>
          
          <div className="space-y-4" role="list" aria-label="Media categories">
            {MEDIA_CATEGORIES.map((category, index) => (
              <motion.button
                key={category}
                className="group w-full text-left p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 flex items-center justify-between"
                style={{
                  background: 'rgba(25, 23, 25, 0.8)',
                  border: '1px solid rgba(213, 206, 195, 0.1)',
                  color: '#F1ECE4',
                }}
                whileHover={{ 
                  scale: 1.01,
                  borderColor: `var(--chapter-${chapter.color})`,
                  background: `linear-gradient(90deg, rgba(25,23,25,0.9), var(--chapter-${chapter.color})/10)`
                }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="listitem"
              >
                <span className="font-display text-2xl md:text-3xl font-light tracking-tight">
                  {category}
                </span>
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs"
                  style={{ 
                    background: `var(--chapter-${chapter.color})`,
                    color: '#070608',
                    opacity: 0.5,
                  }}
                >
                  +
                </motion.div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}