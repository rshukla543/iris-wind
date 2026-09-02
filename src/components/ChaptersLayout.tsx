'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS } from '@/data/chapters';
import { ChapterArrive } from '@/components/chapters/ChapterArrive';
import { ChapterMove } from '@/components/chapters/ChapterMove';
import { ChapterRise } from '@/components/chapters/ChapterRise';
import { ChapterFeel } from '@/components/chapters/ChapterFeel';
import { ChapterSpeak } from '@/components/chapters/ChapterSpeak';
import { ChapterSee } from '@/components/chapters/ChapterSee';
import { ChapterBecome } from '@/components/chapters/ChapterBecome';
import { WebGLCanvas } from '@/components/webgl/WebGLCanvas';

const ChapterComponents: Record<string, React.FC<{ isActive: boolean; progress: number }>> = {
  arrive: ChapterArrive,
  move: ChapterMove,
  rise: ChapterRise,
  feel: ChapterFeel,
  speak: ChapterSpeak,
  see: ChapterSee,
  become: ChapterBecome,
};

export function ChaptersLayout() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLLoaded, setWebGLLoaded] = useState(false);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / docHeight, 1);
    setScrollProgress(progress);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    const timer = setTimeout(() => setWebGLLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = CHAPTERS.findIndex((c) => c.slug === entry.target.id);
          if (index !== -1) {
            setActiveChapter(index);
          }
        }
      });
    }, options);

    CHAPTERS.forEach((chapter, index) => {
      const element = document.getElementById(chapter.slug);
      if (element && observerRef.current) {
        chapterRefs.current[index] = element;
        observerRef.current.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToChapter = (index: number) => {
    isScrollingRef.current = true;
    const element = chapterRefs.current[index];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      if (activeChapter < CHAPTERS.length - 1) {
        scrollToChapter(activeChapter + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeChapter > 0) {
        scrollToChapter(activeChapter - 1);
      }
    } else if (e.key >= '1' && e.key <= '7') {
      e.preventDefault();
      scrollToChapter(parseInt(e.key) - 1);
    }
  };

  return (
    <>
      <WebGLCanvas 
        scrollProgress={scrollProgress} 
        chapterIndex={activeChapter} 
        isLoaded={webGLLoaded} 
      />

      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        aria-label="Chapter navigation"
        role="navigation"
      >
        <div className="flex flex-col gap-3">
          {CHAPTERS.map((chapter, index) => (
            <motion.button
              key={chapter.slug}
              className="group relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: activeChapter === index 
                  ? `var(--chapter-${chapter.color})` 
                  : 'rgba(25, 23, 25, 0.6)',
                border: activeChapter === index 
                  ? 'none' 
                  : '1px solid rgba(213, 206, 195, 0.15)',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToChapter(index)}
              aria-label={chapter.label}
              aria-current={activeChapter === index ? 'true' : 'false'}
            >
              <span 
                className="font-mono text-xs font-medium transition-colors"
                style={{ 
                  color: activeChapter === index ? '#070608' : '#D5CEC3',
                  opacity: activeChapter === index ? 1 : 0.6,
                }}
              >
                {String(chapter.id).padStart(2, '0')}
              </span>
              <motion.span
                className="absolute right-full mr-3 whitespace-nowrap font-mono text-xs text-warm-mist/60 opacity-0 pointer-events-none"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {chapter.label}
              </motion.span>
            </motion.button>
          ))}
        </div>
      </nav>

      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden flex items-center gap-2"
        aria-label="Chapter indicator"
        role="navigation"
      >
        {CHAPTERS.map((chapter, index) => (
          <motion.button
            key={chapter.slug}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: activeChapter === index 
                ? `var(--chapter-${chapter.color})` 
                : 'rgba(213, 206, 195, 0.3)',
              width: activeChapter === index ? '24px' : '8px',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToChapter(index)}
            aria-label={chapter.label}
            aria-current={activeChapter === index ? 'true' : 'false'}
          />
        ))}
      </div>

      <main 
        className="min-h-screen"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="main"
      >
        <AnimatePresence mode="wait">
          {CHAPTERS.map((chapter, index) => {
            const Component = ChapterComponents[chapter.slug];
            const isActive = activeChapter === index;
            const chapterProgress = Math.max(0, Math.min(1, scrollProgress * CHAPTERS.length - index));
            
            return (
              <Component
                key={chapter.slug}
                isActive={isActive}
                progress={chapterProgress}
              />
            );
          })}
        </AnimatePresence>
      </main>
    </>
  );
}