import { m } from 'motion/react';

/** Cut-out illustration that settles into place and may overhang its card. Decorative: adjacent text carries the meaning. */
export function Cutout({ name, w, h, className = '', delay = 0 }: { name: string; w: number; h: number; className?: string; delay?: number }) {
  return (
    <m.img
      className={`cutout ${className}`}
      src={`/art/${name}.webp`}
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      initial={{ opacity: 0, y: 36, rotate: -4, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 13, delay }}
    />
  );
}
