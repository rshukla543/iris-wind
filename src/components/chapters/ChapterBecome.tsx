'use client';

import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS, PROGRAM_OFFERINGS } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function ChapterBecome({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[6];

  return (
    <ChapterWrapper chapter={chapter} isActive={isActive} progress={progress}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-ivory mb-10">
            Transformation begins with{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>a single choice.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-warm-mist/70 leading-relaxed mb-12 max-w-xl">
            The practice meets you where you are. Personal sessions. Digital courses. 
            Corporate programs. Immersive retreats. Choose your entry point.
          </p>
          
          <div className="space-y-8" role="list" aria-label="Program offerings">
            {PROGRAM_OFFERINGS.map((offering, offeringIndex) => (
              <motion.div
                key={offering.id}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 + offeringIndex * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="listitem"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: `var(--chapter-${chapter.color})` }}>
                    {offering.label}
                  </span>
                  <div className="w-16 h-px" style={{ background: `var(--chapter-${chapter.color})` }} />
                </div>
                <p className="text-warm-mist/60 ml-8">{offering.description}</p>
                <div className="grid sm:grid-cols-2 gap-3 ml-8" role="list">
                  {offering.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="group p-4 md:p-6 rounded-[1.5rem] transition-all duration-300 cursor-pointer"
                      style={{
                        background: 'rgba(25, 23, 25, 0.6)',
                        border: '1px solid rgba(213, 206, 195, 0.08)',
                      }}
                      whileHover={{ 
                        x: 8,
                        borderColor: `var(--chapter-${chapter.color})`,
                        background: `linear-gradient(90deg, rgba(25,23,25,0.8), var(--chapter-${chapter.color})/10)`
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                      transition={{ delay: 0.8 + offeringIndex * 0.15 + itemIndex * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      role="listitem"
                    >
                      <h3 className="font-display text-lg font-light text-ivory mb-1">{item.name}</h3>
                      <p className="text-warm-mist/50 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[1/1] flex-shrink-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ImagePlaceholder pose="pose-07" chapter={chapter.color} className="h-full" />
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}