import { reviews as all, type Review } from '../data/site';
import { StarIcon } from './Icons';

export const allReviews = all;
const order = ['alexandra', 'madhu', 'adelin'];
export const leadReviews = all.filter((r) => r.lead).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

export function Stars() { return <span className="stars" role="img" aria-label="5 out of 5 stars"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></span>; }

export function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="review">
      <Stars />
      <blockquote><p>{r.text}</p></blockquote>
      <figcaption>{r.name}<span> · Google review</span></figcaption>
    </figure>
  );
}

/**
 * Endless, slow-moving reviews. The list is repeated so the loop has no seam; the repeat is hidden from assistive tech.
 * Pauses while hovered or focused, and does not move at all for people who prefer reduced motion
 * (the row then scrolls by hand instead).
 */
export function ReviewMarquee({ items, label, reverse = false, seconds }: { items: Review[]; label: string; reverse?: boolean; seconds?: number }) {
  const dur = seconds ?? Math.max(40, items.length * 14);
  return (
    <div className="mq" role="region" aria-label={label}>
      <div className="mq-row" tabIndex={0} aria-label={`${label}. Slow-moving list; hover or focus to pause.`}>
        <ul className={`mq-track ${reverse ? 'is-rev' : ''}`} style={{ ['--dur' as string]: `${dur}s` }}>
          {items.map((r) => <li key={r.id}><ReviewCard r={r} /></li>)}
          {items.map((r) => <li key={`${r.id}-copy`} className="mq-copy" aria-hidden="true"><ReviewCard r={r} /></li>)}
        </ul>
      </div>
    </div>
  );
}
