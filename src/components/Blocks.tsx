import { m } from 'motion/react';

const tones = ['teal', 'tangerine', 'sun', 'sky', 'mint', 'teal', 'tangerine'];

/** Alphabet blocks spelling a name: a typographic stand-in for a portrait. Decorative, the text is repeated by the adjacent heading. */
export function NameBlocks({ name = 'MIHAELA' }: { name?: string }) {
  return (
    <div className="blocks" aria-hidden="true">
      {[...name].map((ch, i) => (
        <m.span key={i} className={`block block--${tones[i % tones.length]}`}
          initial={{ y: -24, opacity: 0, rotate: i % 2 ? 4 : -4 }} whileInView={{ y: 0, opacity: 1, rotate: i % 2 ? 2 : -2 }}
          viewport={{ once: true }} transition={{ type: 'spring', stiffness: 140, damping: 14, delay: i * 0.06 }}>{ch}</m.span>
      ))}
    </div>
  );
}
