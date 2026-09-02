'use client';

import { motion } from 'framer-motion';

interface ImagePlaceholderProps {
  pose: string;
  chapter: string;
  className?: string;
}

const POSE_DESCRIPTIONS: Record<string, string> = {
  'pose-01': 'Seated in grounded cross-legged pose, spine tall, shoulders relaxed',
  'pose-02': 'Standing full-body in strong warrior-inspired yoga stance',
  'pose-03': 'Dynamic side profile transitioning between yoga poses',
  'pose-04': 'Seated meditation pose, eyes softly closed',
  'pose-05': 'Standing portrait, three-quarter body, looking slightly away',
  'pose-06': 'Seated or kneeling pose with hand near heart',
  'pose-07': 'Sophisticated standing portrait with neutral background',
  'pose-08': 'Aerial-inspired pose or elevated movement composition',
  'pose-09': 'Tight editorial face/shoulder portrait',
  'pose-10': 'Backlit silhouette in meditative position',
};

export function ImagePlaceholder({ pose, chapter, className = '' }: ImagePlaceholderProps) {
  const description = POSE_DESCRIPTIONS[pose] || 'Editorial yoga photography';
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        {/* Placeholder gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, var(--chapter-${chapter})/20, transparent)`,
          }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Placeholder content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center p-8">
            <motion.div
              className="text-6xl md:text-8xl font-display font-light text-ivory/20 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              IRIS
            </motion.div>
            <div className="text-warm-mist/30 font-mono text-xs tracking-widest mb-4">
              {pose.toUpperCase().replace('-', ' ')}
            </div>
            <div className="w-24 h-px mx-auto" style={{ background: `var(--chapter-${chapter})` }} />
            <div className="mt-4 text-warm-mist/40 text-sm max-w-xs">
              {description}
            </div>
            <div className="mt-6 text-warm-mist/30 font-mono text-xs">
              [AI IMAGE PLACEHOLDER]
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative border */}
      <div 
        className="absolute -inset-4 border rounded-[2.5rem] pointer-events-none"
        style={{ borderColor: `var(--chapter-${chapter})`, opacity: 0.2 }}
      />
    </div>
  );
}
