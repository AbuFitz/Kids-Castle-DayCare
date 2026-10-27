import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Reveal } from './Motion';
import { nav, site } from '../data/site';

const C = ['#179A97', '#F36C38', '#F6BE22', '#3468E8', '#2FB88B'];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-castle" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => <i key={i} style={{ background: C[i % 5], marginTop: i % 2 ? 0 : 14 }} />)}
      </div>
      <div className="wrap">
        <div className="footer-grid">
          <Reveal className="big-logo"><Link to="/" aria-label="Kids Castle home"><Logo variant="full" /></Link></Reveal>
          <div className="footer-cols">
            <div>
              <h4>Navigate</h4>
              <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
            </div>
            <div>
              <h4>Care</h4>
              <ul>
                <li>Home nursery, East London</li>
                <li>Babysitting, North London</li>
                <li>Nanny care, North London</li>
              </ul>
            </div>
            <div>
              <h4>Get in touch</h4>
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
          <a className="soc" href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Kids Castle on Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1E293B" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9S15.5 3.6 14.2 3.6c-2.7 0-4.4 1.6-4.4 4.5v2.4H7v3.3h2.8V22z" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
