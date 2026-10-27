import { Link } from 'react-router-dom';
import { CountUp, Plus, Reveal, Sticker, Words } from './Motion';
import { ImageSlot } from './Art';
import { site } from '../data/site';

export function Rates() {
  return (
    <section className="section" aria-labelledby="rates-title">
      <div className="wrap rates">
        <Reveal className="story-media">
          <ImageSlot scene={4} mask="blob1" label="rates-feature" />
        </Reveal>
        <div className="story-copy">
          <div className="title-row">
            <h2 id="rates-title" className="h-section"><Words text="Clear, simple rates" /></h2>
            <Sticker label="Fair" tone="mint" shape="blob" rot={9} style={{ right: -34, top: -26 }} />
          </div>
          <p className="lead" style={{ margin: '18px 0 0' }}>The rates shared with us so far, per hour. Bookings depend on your family’s requirements and availability.</p>
          <div className="rate-figs">
            <div className="rate-fig"><CountUp to={25} prefix="£" /><span>per hour, per child under two (from)</span></div>
            <div className="rate-fig"><CountUp to={20} prefix="£" /><span>per hour, per child aged three and over</span></div>
            <div className="rate-fig"><CountUp to={35} prefix="£" /><span>per hour in total for two siblings</span></div>
          </div>
          <p style={{ marginTop: 28 }}><Link to="/services" className="btn"><Plus />All rates</Link></p>
          <div className="note"><strong>Still being confirmed:</strong>
            <ul>{site.ratesToConfirm.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
