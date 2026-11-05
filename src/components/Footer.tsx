import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { FacebookIcon, GoogleIcon } from './Icons';
import { nav, site } from '../data/site';

const legal: [string, string][] = [
  ['Privacy Notice', '/privacy'], ['Cookie Notice', '/cookies'], ['Terms of Use', '/terms'], ['Accessibility', '/accessibility'], ['Complaints', '/complaints'],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" aria-label="Kids Castle Daycare & Home Nursery, home"><Logo variant="nav" /></Link>
            <p>{site.intro}</p>
            <ul className="social" aria-label="Find us online">
              <li><a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Kids Castle on Facebook (opens in a new tab)"><FacebookIcon /></a></li>
              <li><a href={site.google.url} target="_blank" rel="noreferrer" aria-label="Kids Castle on Google (opens in a new tab)"><GoogleIcon /></a></li>
            </ul>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">Explore</h2>
              <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="footer-h">Get in touch</h2>
              <ul>
                <li><Link to="/contact">Send an enquiry</Link></li>
                <li><a href={`tel:${site.phone.tel}`}>Call {site.phone.display}</a></li>
                <li><a href={site.phone.whatsapp} target="_blank" rel="noreferrer">WhatsApp<span className="visually-hidden"> (opens in a new tab)</span></a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">Legal</h2>
              <ul>{legal.map(([l, t]) => <li key={t}><Link to={t}>{l}</Link></li>)}</ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.fullName}</span>
          <span>Nanny &amp; babysitting in London</span>
        </div>
      </div>
    </footer>
  );
}
