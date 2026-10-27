import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 0.8, ease, delay }}>
      {children}
    </motion.div>
  );
}

/** Words rise out of a mask, one after another. `immediate` for above-the-fold headings. */
export function Words({ text, immediate = false, delay = 0 }: { text: string; immediate?: boolean; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="h-word">
            <motion.span
              initial={{ y: '110%' }}
              {...(immediate ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
              transition={{ duration: 0.85, ease, delay: delay + i * 0.06 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

/** Responsive photo that unveils (soft clip + gentle settle) as it enters view. */
export function Photo({ src, alt, ratio = '4 / 3', className = '', priority = false, position = 'center' }: { src: string; alt: string; ratio?: string; className?: string; priority?: boolean; position?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      className={`photo ${className}`}
      style={{ aspectRatio: ratio }}
      initial={reduce ? false : { clipPath: 'inset(8% 8% 8% 8% round 36px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition: position }}
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 1.4, ease }}
      />
    </motion.figure>
  );
}

export function Plus() {
  return (
    <svg className="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
  );
}
export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}
