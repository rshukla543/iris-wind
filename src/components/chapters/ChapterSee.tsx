'use client';

import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const PHILOSOPHIES = [
  { title: 'Non-duality', detail: 'The separation between teacher and student dissolves in shared practice.' },
  { title: 'Embodied wisdom', detail: 'Truth is not understood intellectually — it is lived through the body.' },
  { title: 'Cyclical nature', detail: 'Every ending contains a beginning. Every breath is both release and return.' },
  { title: 'Radical acceptance', detail: 'Transformation begins where resistance ends. Meet yourself exactly as you are.' },
] as const;

export function ChapterSee({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[5];

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
            Perspective shifts when{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>you stop looking outward.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-warm-mist/70 leading-relaxed mb-12 max-w-xl">
            After twenty years, the practice reveals itself not as a path to somewhere else, 
            but as a return to what was always here. These are the lenses through which the work is seen.
          </p>
          
          <div className="space-y-6" role="list" aria-label="Philosophical perspectives">
            {PHILOSOPHIES.map((philosophy, index) => (
              <motion.div
                key={philosophy.title}
                className="group relative p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 overflow-hidden"
                style={{
                  background: 'rgba(25, 23, 25, 0.8)',
                  border: '1px solid rgba(213, 206, 195, 0.1)',
                }}
                whileHover={{ 
                  borderColor: `var(--chapter-${chapter.color})`,
                  background: `linear-gradient(90deg, rgba(25,23,25,0.9), var(--chapter-${chapter.color})/10)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="listitem"
              >
                <div className="absolute inset-0 -z-10" style={{ 
                  background: `linear-gradient(90deg, var(--chapter-${chapter.color})/10, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              />
                <h3 className="font-display text-xl md:text-2xl font-light text-ivory mb-3">{philosophy.title}</h3>
                <p className="text-warm-mist/60 leading-relaxed">{philosophy.detail}</p>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-px" 
                  style={{ 
                    background: `linear-gradient(90deg, transparent, var(--chapter-${chapter.color}), transparent)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease'
                  }}
                />
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
          <ImagePlaceholder pose="pose-06" chapter={chapter.color} className="h-full" />
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}