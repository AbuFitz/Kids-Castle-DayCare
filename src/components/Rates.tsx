import { Link } from 'react-router-dom';
import { Arrow, Photo, Words } from './Motion';
import { site } from '../data/site';

export function Rates({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section section--warm" aria-labelledby="rates-title">
      <div className="wrap split">
        {!compact && <Photo src="/images/art.webp" alt="Children painting together with a carer helping" ratio="5 / 4" className="rates-photo" />}
        <div>
          <h2 id="rates-title" className="h-section"><Words text="Clear, simple rates" /></h2>
          <p className="lead">The rates shared with us so far. Bookings depend on your family’s requirements and availability.</p>
          <div className="rate-table">
            {site.rates.map((r) => (
              <div key={r.label} className="rate-row"><span>{r.label}</span><strong>{r.value}<small>{r.unit}</small></strong></div>
            ))}
          </div>
          <div className="note"><strong>Still being confirmed</strong>
            <ul>{site.ratesToConfirm.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          {!compact && <p style={{ marginTop: 24 }}><Link to="/contact" className="btn">Ask about your family<Arrow /></Link></p>}
        </div>
      </div>
    </section>
  );
}
