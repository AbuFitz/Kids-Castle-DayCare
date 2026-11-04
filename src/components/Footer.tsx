import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { nav, site } from '../data/site';

const legal: [string, string][] = [
  ['Privacy Notice', '/privacy'], ['Cookie Notice', '/cookies'], ['Terms of Use', '/terms'],
  ['Accessibility', '/accessibility'], ['Complaints', '/complaints'], ['Booking Terms (draft)', '/booking-terms'],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" aria-label="Kids Castle home"><Logo variant="lockup" /></Link>
            <p className="footer-pos">{site.descriptor}</p>
            <p>{site.intro}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">Explore</h2>
              <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="footer-h">Get in touch</h2>
              <ul>
                <li><Link to="/contact">Enquiry form</Link></li>
                <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
                <li><a href={site.google.url} target="_blank" rel="noreferrer">Google reviews<span className="visually-hidden"> (opens in a new tab)</span></a></li>
                <li><a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook<span className="visually-hidden"> (opens in a new tab)</span></a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">Legal</h2>
              <ul>{legal.map(([l, t]) => <li key={t}><Link to={t}>{l}</Link></li>)}</ul>
            </div>
          </div>
        </div>
        <p className="footer-reg">
          Mihaela Oliva is registered with Ofsted as a home childcarer on the voluntary part of the Childcare Register. Registration number:{' '}
          <a href={site.ofsted.searchUrl} target="_blank" rel="noreferrer">{site.ofsted.number}<span className="visually-hidden"> (opens Ofsted’s search in a new tab)</span></a>.
        </p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.legalName}</span>
          <span>Nanny &amp; babysitting in London</span>
        </div>
      </div>
    </footer>
  );
}
