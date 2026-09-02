'use client';

import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS, PRACTICES } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function ChapterFeel({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[3];

  return (
    <ChapterWrapper chapter={chapter} isActive={isActive} progress={progress}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-ivory mb-10">
            The heart connects what{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>the mind separates.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-warm-mist/70 leading-relaxed mb-12 max-w-xl">
            Beyond asana lies the practice of connection. Pranayama bridges breath and being. 
            Dhyana dissolves the boundary between self and other. This is where yoga becomes union.
          </p>
          
          <div className="space-y-4" role="list" aria-label="Connection practices">
            {PRACTICES.slice(2).map((practice, index) => (
              <motion.div
                key={practice.id}
                className="group flex items-center gap-4 p-4 md:p-6 rounded-[1.5rem] transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(25, 23, 25, 0.6)',
                  border: '1px solid rgba(213, 206, 195, 0.08)',
                }}
                whileHover={{ 
                  x: 8,
                  borderColor: `var(--chapter-${chapter.color})`,
                  background: `linear-gradient(90deg, rgba(25,23,25,0.8), var(--chapter-${chapter.color})/10)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="listitem"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                  background: `var(--chapter-${chapter.color})`,
                  opacity: 0.2 
                }}>
                  <span className="font-display text-xl font-light" style={{ color: `var(--chapter-${chapter.color})` }}>
                    {String(index + 3).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-light text-ivory">{practice.name}</h3>
                  <p className="text-warm-mist/50 text-sm mt-1">
                    {practice.id === 'pranayama' ? 'Breath as the bridge to presence' : 'Meditation as the path to unity'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-[3/4] md:aspect-[4/5]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ImagePlaceholder pose="pose-04" chapter={chapter.color} className="h-full" />
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}