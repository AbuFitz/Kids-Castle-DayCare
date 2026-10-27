import { Link } from 'react-router-dom';
import { Arrow, Photo, Reveal, Words } from './Motion';

export function Cta() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta">
          <div className="cta-copy">
            <h2 id="cta-title"><Words text="Tell us what your family needs." /></h2>
            <Reveal delay={0.15}><Link to="/contact" className="btn btn--yellow">Send an enquiry<Arrow /></Link></Reveal>
          </div>
          <Photo src="/images/creative.webp" alt="Children painting and playing together at a table" ratio="4 / 3" className="cta-photo" />
        </div>
      </div>
    </section>
  );
}
