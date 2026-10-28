import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';

const photos = [
  { src: '/photos/crafts.webp', alt: 'Children laughing as they hold up painted paper planets at a craft table', w: 1200, h: 886 },
  { src: '/photos/painting.webp', alt: 'A carer helping a group of children paint at a long table by a window', w: 1200, h: 886 },
  { src: '/photos/play.webp', alt: 'Two girls playing with craft planets next to shelves of art supplies', w: 1200, h: 886 },
];

function Slice({ p, i, reduce }: { p: (typeof photos)[number]; i: number; reduce: boolean | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [i % 2 ? '7%' : '-7%', i % 2 ? '-7%' : '7%']);
  return (
    <figure className="band-slice" ref={ref}>
      <m.img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" style={reduce ? undefined : { y, scale: 1.18 }} />
    </figure>
  );
}

/** Full-bleed strip of photographs; each drifts at its own pace as the page scrolls. */
export function PhotoBand() {
  const reduce = useReducedMotion();
  return (
    <section className="band" aria-label="Children at play and making things" tabIndex={0}>
      {photos.map((p, i) => <Slice key={p.src} p={p} i={i} reduce={reduce} />)}
    </section>
  );
}
