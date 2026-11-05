import { m } from 'motion/react';

const tones = ['teal', 'tangerine', 'sun', 'sky', 'mint', 'teal', 'tangerine'];

/** Alphabet blocks spelling a name. Decorative: the adjacent heading carries the text. */
export function NameBlocks({ name = 'MIHAELA', small = false }: { name?: string; small?: boolean }) {
  return (
    <div className={`blocks ${small ? 'blocks--sm' : ''}`} aria-hidden="true">
      {[...name].map((ch, i) => (
        <m.span key={i} className={`block block--${tones[i % tones.length]}`}
          initial={{ y: -16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 160, damping: 16, delay: i * 0.05 }}>{ch}</m.span>
      ))}
    </div>
  );
}
