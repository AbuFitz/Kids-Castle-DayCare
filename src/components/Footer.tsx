import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { nav, site } from '../data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" aria-label="Kids Castle home"><Logo variant="full" /></Link>
            <p>{site.intro}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">Explore</h2>
              <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="footer-h">Care</h2>
              <ul>
                <li>{site.nursery.showFullAddress ? `Home nursery: ${site.nursery.address.line1}, ${site.nursery.address.area}, ${site.nursery.address.city} ${site.nursery.address.postcode}` : 'Home nursery, East London'}</li>
                <li>Babysitting, North London</li>
                <li>Nanny care, North London</li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">Get in touch</h2>
              <ul>
                <li><Link to="/contact">Enquiry form</Link></li>
                <li><a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
                {site.contact.phone && <li><a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>}
                {site.contact.email && <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kids Castle Daycare &amp; Home Nursery</span>
          <span>East &amp; North London</span>
        </div>
      </div>
    </footer>
  );
}
