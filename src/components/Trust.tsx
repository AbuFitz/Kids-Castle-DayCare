import { site } from '../data/site';

const Star = () => <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15l-5.3 3 1.1-6L1.4 7.8l6-.8z" /></svg>;

/** Restrained trust line: Google rating and the precise Ofsted registration wording, side by side. */
export function Trust({ dark = false }: { dark?: boolean }) {
  return (
    <ul className={`trust ${dark ? 'trust--dark' : ''}`} aria-label="Reviews and registration">
      <li>
        <a href={site.google.url} target="_blank" rel="noreferrer" className="trust-link">
          <span className="stars" aria-hidden="true"><Star /><Star /><Star /><Star /><Star /></span>
          <span><strong>{site.google.rating.toFixed(1)}</strong> from {site.google.count} Google reviews<span className="visually-hidden"> (opens in a new tab)</span></span>
        </a>
      </li>
      <li>
        <span>Ofsted-registered home childcarer · </span>
        <a href={site.ofsted.searchUrl} target="_blank" rel="noreferrer" className="trust-link">Reg. no. {site.ofsted.number}<span className="visually-hidden"> (opens Ofsted’s search in a new tab)</span></a>
      </li>
    </ul>
  );
}
