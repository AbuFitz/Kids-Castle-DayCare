import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BRICKS, BRICK_COLORS as C, BRICK_VIEWBOX } from './brickPaths';

const spring = { type: 'spring', stiffness: 120, damping: 15, mass: 1 } as const;

/** The real Kids Castle brick symbol; each brick settles into place once on load. */
export function BrickMark({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -90]);
  const rot = useTransform(scrollY, [0, 700], [0, 4]);
  const from = (x: number, y: number, r: number, delay: number) =>
    reduce ? {} : { initial: { x, y, rotate: r, opacity: 0 }, animate: { x: 0, y: 0, rotate: 0, opacity: 1 }, transition: { ...spring, delay } };
  return (
    <m.div className={className} style={reduce ? undefined : { y, rotate: rot }}>
    <svg viewBox={BRICK_VIEWBOX} role="img" aria-label="Kids Castle building bricks">
      <m.path fill={C.blue} fillRule="evenodd" d={BRICKS.blue} {...from(0, 260, 0, 0.35)} />
      <m.path fill={C.orange} fillRule="evenodd" d={BRICKS.orange_r} {...from(260, 40, 8, 0.55)} />
      <m.path fill={C.yellow} fillRule="evenodd" d={BRICKS.yellow} {...from(0, -300, -4, 0.75)} />
      <m.path fill={C.orange} fillRule="evenodd" d={BRICKS.orange_l} {...from(-300, 0, -12, 0.95)} />
      <m.g style={{ transformOrigin: '320px 280px' }} {...(reduce ? {} : { initial: { rotate: -38, y: -240, opacity: 0 }, animate: { rotate: 0, y: 0, opacity: 1 }, transition: { ...spring, damping: 11, delay: 1.15 } })}>
        <path fill={C.teal} fillRule="evenodd" d={BRICKS.teal_plank} />
        <path fill={C.navy} fillRule="evenodd" d={BRICKS.navy_holes} />
      </m.g>
      <m.path fill={C.navy} fillRule="evenodd" d={BRICKS.navy_underline} {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.6 } })} />
    </svg>
    </m.div>
  );
}
