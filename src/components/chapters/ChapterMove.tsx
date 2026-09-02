'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterWrapper } from './ChapterWrapper';
import { CHAPTERS, PRACTICES } from '@/data/chapters';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function ChapterMove({ isActive, progress }: { isActive: boolean; progress: number }) {
  const chapter = CHAPTERS[1];
  const [activePractice, setActivePractice] = useState<string | null>(null);
  
  return (
    <ChapterWrapper chapter={chapter} isActive={isActive} progress={progress}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="aspect-square min-h-[400px] md:min-h-[500px] relative">
            <ImagePlaceholder pose="pose-02" chapter={chapter.color} className="h-full" />
            
            {activePractice && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="text-center p-8" style={{ color: `var(--chapter-${chapter.color})` }}>
                  <div className="text-2xl md:text-4xl font-display font-light text-ivory mb-2">{activePractice}</div>
                  <div className="text-warm-mist/40 font-mono text-xs tracking-widest">Active practice view</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-ivory mb-10">
            Movement is the method.{' '}
            <br />
            <span className="font-medium" style={{ color: `var(--chapter-${chapter.color})` }}>Flow is the teacher.</span>
          </h2>
          
          <div className="space-y-4" role="list" aria-label="Yoga practices">
            {PRACTICES.map((practice, index) => (
              <motion.button
                key={practice.id}
                className="group w-full text-left p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 flex items-center justify-between"
                style={{
                  background: activePractice === practice.name 
                    ? `var(--chapter-${chapter.color})` 
                    : 'rgba(25, 23, 25, 0.8)',
                  border: activePractice === practice.name 
                    ? 'none' 
                    : '1px solid rgba(213, 206, 195, 0.1)',
                  color: activePractice === practice.name ? '#070608' : '#F1ECE4',
                }}
                onMouseEnter={() => setActivePractice(practice.name)}
                onMouseLeave={() => setActivePractice(null)}
                onClick={() => setActivePractice(activePractice === practice.name ? null : practice.name)}
                onTouchStart={() => setActivePractice(activePractice === practice.name ? null : practice.name)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="listitem"
              >
                <span className="font-display text-2xl md:text-3xl font-light tracking-tight">
                  {practice.name}
                </span>
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs"
                  style={{ 
                    background: activePractice === practice.name 
                      ? '#070608' 
                      : `var(--chapter-${chapter.color})`,
                    color: activePractice === practice.name 
                      ? `var(--chapter-${chapter.color})` 
                      : '#070608',
                    opacity: activePractice === practice.name ? 1 : 0.5,
                  }}
                  animate={{ rotate: activePractice === practice.name ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
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