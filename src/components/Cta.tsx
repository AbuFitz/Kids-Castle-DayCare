import { Link } from 'react-router-dom';
import { Arrow, Words } from './Motion';

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap cta-inner">
        <h2 id="cta-title"><Words text="Tell us what your family needs." /></h2>
        <Link to="/contact" className="btn btn--yellow">Send an enquiry<Arrow /></Link>
      </div>
    </section>
  );
}
