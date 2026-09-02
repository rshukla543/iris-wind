'use client';

import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function ChapterArrive({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[0];
  
  return (
    <ChapterWrapper chapter={chapter} isActive={isActive} progress={progress}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight text-ivory mb-8">
            Before the teacher,{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>there was the practice.</span>
          </h1>
          <p className="text-lg md:text-xl text-warm-mist/70 leading-relaxed mb-12 max-w-xl">
            Two decades of daily practice. Yoga Alliance certified. Hatha, Aerial, Pranayama, Dhyana. 
            TEDx speaker. International Day of Yoga 2024. Tata Play Fitness.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-warm-mist/50 font-mono">
            <span>Hatha Yoga</span>
            <span>Aerial Yoga</span>
            <span>Aerial Pilates</span>
            <span>Pranayama</span>
            <span>Dhyana / Meditation</span>
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-[3/4] md:aspect-[4/5]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ImagePlaceholder pose="pose-01" chapter={chapter.color} className="h-full" />
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}