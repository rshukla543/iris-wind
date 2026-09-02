'use client';

import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS, RECOGNITIONS } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function ChapterRise({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[2];

  return (
    <ChapterWrapper chapter={chapter} isActive={isActive} progress={progress}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="relative aspect-[3/4] md:aspect-[4/5]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ImagePlaceholder pose="pose-03" chapter={chapter.color} className="h-full" />
        </motion.div>

        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-ivory mb-10">
            Authority earned through{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>decades of devotion.</span>
          </h2>
          
          <div className="space-y-6" role="list" aria-label="Recognitions and achievements">
            {RECOGNITIONS.map((recognition, index) => (
              <motion.div
                key={recognition.year}
                className="group flex items-start gap-6 p-6 rounded-[1.5rem] transition-all duration-300"
                style={{
                  background: 'rgba(25, 23, 25, 0.8)',
                  border: '1px solid rgba(213, 206, 195, 0.1)',
                }}
                whileHover={{ 
                  x: 8,
                  borderColor: `var(--chapter-${chapter.color})`,
                  background: `linear-gradient(90deg, rgba(25,23,25,0.9), var(--chapter-${chapter.color})/10)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="listitem"
              >
                <div className="flex-shrink-0 w-16 text-right" style={{ color: `var(--chapter-${chapter.color})` }}>
                  <span className="font-display text-2xl md:text-3xl font-medium">{recognition.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl font-light text-ivory mb-1">{recognition.title}</h3>
                  <p className="text-warm-mist/60">{recognition.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}