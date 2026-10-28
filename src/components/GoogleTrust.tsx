import { m } from 'motion/react';
import { Cutout } from './Cutout';
import { site } from '../data/site';

function Star({ i }: { i: number }) {
  return (
    <m.svg viewBox="0 0 24 24" className="g-star" aria-hidden="true"
      initial={{ scale: 0, rotate: -40 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.1 + i * 0.09 }}>
      <path d="M12 2.6l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17.1l-5.9 3.3 1.3-6.5L2.5 9.4l6.6-.8z" />
    </m.svg>
  );
}

/** Google review trust. Shows only what the client has supplied: a rating and the profile link. No invented count or quotes. */
export function GoogleTrust({ variant = 'inline' }: { variant?: 'inline' | 'band' }) {
  const g = site.google;
  if (!g.rating) return null;
  const label = `Rated ${g.rating} out of 5 on Google`;
  const stars = <span className="g-stars" role="img" aria-label={label}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} i={i} />)}</span>;
  if (variant === 'inline')
    return (
      <a className="g-inline" href={g.url} target="_blank" rel="noreferrer">
        {stars}<span><strong>{g.rating.toFixed(1)}</strong> on Google</span>
      </a>
    );
  const review = site.showReviews ? site.reviews[0] : undefined;
  return (
    <section className="g-band" aria-label="Google reviews">
      <div className="wrap g-band-in">
        <div className="g-head">
          <div className="g-mark" aria-hidden="true">G</div>
          <div>
            <p className="g-title">Rated {g.rating} stars on Google</p>
            {stars}
          </div>
        </div>
        {review && (
          <figure className="g-quote">
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>{review.name}, on Google</figcaption>
          </figure>
        )}
        <a className="btn btn--navy" href={g.url} target="_blank" rel="noreferrer">Read our Google reviews</a>
      </div>
      <Cutout name="teddy" w={872} h={900} className="art-teddy" />
    </section>
  );
}
