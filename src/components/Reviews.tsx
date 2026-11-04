import { useRef } from 'react';
import { reviews as all, type Review } from '../data/site';

const Stars = () => <span className="stars stars--sm" role="img" aria-label="5 out of 5 stars">★★★★★</span>;

export function ReviewCard({ r, featured = false }: { r: Review; featured?: boolean }) {
  return (
    <figure className={`review ${featured ? 'review--featured' : ''}`}>
      <Stars />
      <blockquote><p>{r.text}</p></blockquote>
      <figcaption>{r.name}<span> · Google review</span></figcaption>
    </figure>
  );
}

/** Swipeable on phones (scroll-snap, no autoplay) with explicit controls; becomes an editorial grid on wider screens. */
export function ReviewTrack({ items, label }: { items: Review[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = ref.current; if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((first?.offsetWidth ?? 280) + 16), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <div className="track" role="region" aria-roledescription="carousel" aria-label={label}>
      <ul className="track-list" ref={ref} tabIndex={0} aria-label={`${label}: scroll sideways for more`}>
        {items.map((r) => <li key={r.id}><ReviewCard r={r} /></li>)}
      </ul>
      <div className="track-ctl" aria-label="Review controls">
        <button type="button" onClick={() => go(-1)} aria-label="Previous review">←</button>
        <button type="button" onClick={() => go(1)} aria-label="Next review">→</button>
      </div>
    </div>
  );
}
const order = ['alexandra', 'madhu', 'adelin'];
export const leadReviews = all.filter((r) => r.lead).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
export { all as allReviews };
