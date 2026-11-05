import { site } from '../data/site';
import { Stars } from './Reviews';

/** Quiet rating line. No review count, no registration details: those live on the Reviews and About pages. */
export function GoogleRating() {
  return (
    <a href={site.google.url} target="_blank" rel="noreferrer" className="rating">
      <Stars /><span>Rated <strong>{site.google.rating.toFixed(1)}</strong> on Google<span className="visually-hidden"> (opens in a new tab)</span></span>
    </a>
  );
}
