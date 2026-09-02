'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { Chapter } from '@/data/chapters';

interface ChapterWrapperProps extends HTMLMotionProps<'section'> {
  chapter: Chapter;
  children: ReactNode;
  isActive?: boolean;
  progress?: number;
}

export function ChapterWrapper({ 
  chapter, 
  children, 
  isActive = false, 
  progress = 0,
  className = '',
  style,
  ...props 
}: ChapterWrapperProps) {
  const colorVar = `--chapter-${chapter.color}`;
  
  return (
    <motion.section
      id={chapter.slug}
      data-chapter={chapter.id}
      className={`relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 ${className}`}
      style={{
        ...style,
        [colorVar]: chapter.colorHex,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...props}
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, var(${colorVar})/15 0%, transparent 70%)`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 0%, var(${colorVar})/5 100%)`,
            opacity: isActive ? 1 : 0,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span 
            className="text-xs md:text-sm font-mono tracking-widest uppercase text-warm-mist/60"
            style={{ color: `var(${colorVar})` }}
          >
            {chapter.label}
          </span>
        </motion.div>

        <motion.div
          className="opacity-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isActive ? 1 : 0, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          y: 0 
        }}
        transition={{ delay: 1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ color: `var(${colorVar})` }}
      >
        <div className="flex items-center gap-2 text-warm-mist/40 font-mono text-xs">
          <span>{String(chapter.id).padStart(2, '0')}</span>
          <div className="w-16 h-px bg-current/30" />
          <span>{String(chapter.id + 1).padStart(2, '0')}</span>
        </div>
      </motion.div>
    </motion.section>
  );
}