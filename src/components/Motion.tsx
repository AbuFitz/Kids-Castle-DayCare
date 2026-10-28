import { animate, m, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <m.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 0.8, ease, delay }}>
      {children}
    </m.div>
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
            <m.span
              initial={{ y: '110%' }}
              {...(immediate ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
              transition={{ duration: 0.85, ease, delay: delay + i * 0.06 }}
            >
              {(() => {
                const mm = w.match(/^(.*?)([.,!?]+)$/);
                return mm ? <>{mm[1]}<span className="punct">{mm[2]}</span></> : w;
              })()}
            </m.span>
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
    <m.figure
      className={`photo ${className}`}
      style={{ aspectRatio: ratio }}
      initial={reduce ? false : { clipPath: 'inset(8% 8% 8% 8% round 36px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.1, ease }}
    >
      <m.img
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
    </m.figure>
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

/** Scroll-linked statement: each word lights up as the reader scrolls through it. */
function ScrollWord({ children, p, a, b }: { children: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.52, 1]);
  return <m.span style={{ opacity: o }}>{children}</m.span>;
}
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const words = text.split(' ');
  if (reduce) return <p ref={ref} className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}><ScrollWord p={scrollYProgress} a={(i / words.length) * 0.85} b={(i / words.length) * 0.85 + 0.12}>{w}</ScrollWord>{i < words.length - 1 ? ' ' : ''}</span>
        ))}
      </span>
    </p>
  );
}

/** Two big type rows that slide in opposite directions as the band scrolls past. */
export function ScrollMarquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-34%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-34%', '4%']);
  const row = (k: string) => Array.from({ length: 3 }, (_, r) => items.map((t, i) => <span key={`${k}${r}${i}`}>{t}<i aria-hidden="true" /></span>));
  return (
    <div className="bigtype" ref={ref} aria-hidden="true">
      <m.div className="bigtype-row" style={reduce ? undefined : { x: x1 }}>{row('a')}</m.div>
      <m.div className="bigtype-row bigtype-row--alt" style={reduce ? undefined : { x: x2 }}>{row('b')}</m.div>
    </div>
  );
}

/** Counts up to the number inside a value like "From £25" or "£180" when it scrolls into view. */
export function CountValue({ value }: { value: string }) {
  const m = value.match(/^(.*?)£(\d+)$/);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const target = m ? Number(m[2]) : 0;
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!m || !inView || reduce) return;
    const c = animate(0, target, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, target, reduce]);
  if (!m) return <strong>{value}</strong>;
  return <strong ref={ref as React.RefObject<HTMLElement>}><span className="visually-hidden">{value}</span>{m[1] && <span className="from" aria-hidden="true">{m[1]}</span>}<span aria-hidden="true">£{n}</span></strong>;
}
