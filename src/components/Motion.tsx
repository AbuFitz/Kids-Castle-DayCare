import { motion, useReducedMotion, useInView, animate } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -12% 0px' }} transition={{ duration: 0.8, ease, delay }}>
      {children}
    </motion.div>
  );
}

/** Words rise out of a mask, one after another (hero uses `immediate`; sections trigger in view). */
export function Words({ text, immediate = false, delay = 0 }: { text: string; immediate?: boolean; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="h-word">
            <motion.span
              initial={{ y: '115%', rotate: 5 }}
              {...(immediate ? { animate: { y: 0, rotate: 0 } } : { whileInView: { y: 0, rotate: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
              transition={{ duration: 0.9, ease, delay: delay + i * 0.07 }}
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

export function Sticker({ label, tone = 'orange', shape = 'cloud', rot = -8, className = '', style, delay = 0.6, dark }: { label: string; tone?: string; shape?: 'cloud' | 'blob' | 'scallop'; rot?: number; className?: string; style?: React.CSSProperties; delay?: number; dark?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`sticker s-${shape} tone-${tone} ${dark ? 'dark' : ''} ${className}`}
      style={{ ['--rot' as string]: `${rot}deg`, ...style }}
      initial={{ scale: 0, rotate: rot - 40, opacity: 0 }}
      whileInView={{ scale: 1, rotate: rot, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay }}
    >
      <motion.span animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }} style={{ display: 'block' }}>
        {label}
      </motion.span>
    </motion.span>
  );
}

export function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <b ref={ref as React.RefObject<HTMLElement>}>{prefix}{v}{suffix}</b>;
}

const COLORS = ['#179A97', '#F36C38', '#F6BE22', '#3468E8', '#2FB88B'];
/** Blocks drop into the card and settle with a bounce when it scrolls into view. */
export function BlockPile({ seed = 0 }: { seed?: number }) {
  const blocks = Array.from({ length: 6 }, (_, i) => {
    const r = Math.sin((i + 1) * (seed + 3.7)) * 10000;
    const f = r - Math.floor(r);
    return { left: 6 + ((i * 17 + seed * 9) % 78), size: 38 + Math.floor(f * 26), rot: (f - 0.5) * 50, bottom: Math.floor(i / 3) * 40 + 6 + f * 8, c: COLORS[(i + seed) % 5] };
  });
  return (
    <motion.div className="block-pile" aria-hidden="true" initial="hide" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }}>
      {blocks.map((b, i) => (
        <motion.span key={i} className="block" style={{ left: `${b.left}%`, bottom: b.bottom, width: b.size, height: b.size, background: b.c }}
          variants={{ hide: { y: -320, rotate: 0, opacity: 0 }, show: { y: 0, rotate: b.rot, opacity: 1, transition: { type: 'spring', stiffness: 150, damping: 11, mass: 0.9, delay: 0.15 + i * 0.1 } } }} />
      ))}
    </motion.div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const colors = COLORS;
  const row = (k: string) => (
    <div key={k} style={{ display: 'flex' }} aria-hidden={k === 'b' ? 'true' : undefined}>
      {items.map((t, i) => (
        <span key={i}>{t}<i style={{ background: colors[i % 5] }} /></span>
      ))}
    </div>
  );
  return <div className="marquee"><div className="marquee-track">{row('a')}{row('b')}</div></div>;
}

export function Plus() {
  return (
    <svg className="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
  );
}
