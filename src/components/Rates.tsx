import { Link } from 'react-router-dom';
import { Arrow, CountValue, Reveal, Words } from './Motion';
import { site } from '../data/site';

const tone = ['tag--teal', 'tag--sun', 'tag--tangerine', 'tag--sky'];

export function Rates({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rates" id="rates" aria-labelledby="rates-title">
      <div className="wrap">
        <div className="rates-head">
          <h2 id="rates-title" className="h-section"><Words text="Clear, simple rates." /></h2>
          <p className="rates-lead">The rates shared with us so far. Bookings depend on your family’s requirements and availability.</p>
        </div>
        <ul className="tags">
          {site.rates.map((r, i) => (
            <li key={r.label} className="tag-wrap">
              <span className="tag-string" aria-hidden="true" />
              <div className={`tag ${tone[i % 4]}`} style={{ animationDelay: `${i * 400}ms` }}>
                <span className="tag-hole" aria-hidden="true" />
                <p className="tag-label">{r.label}</p>
                <div className="tag-val"><CountValue value={r.value} /><small>{r.unit}</small></div>
              </div>
            </li>
          ))}
        </ul>
        <Reveal>
          <div className="note note--rates"><strong>Still being confirmed</strong>
            <ul>{site.ratesToConfirm.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </Reveal>
        {!compact && <p style={{ marginTop: 28 }}><Link to="/contact" className="btn btn--navy">Ask about your family<Arrow /></Link></p>}
      </div>
    </section>
  );
}
