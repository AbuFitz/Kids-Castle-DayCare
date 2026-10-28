import { Link } from 'react-router-dom';
import { Arrow, Magnetic, Words } from './Motion';
import { Cutout } from './Cutout';

const bricks = ['teal', 'tangerine', 'sky', 'white'];
export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap cta-inner">
        <h2 id="cta-title"><Words text="Tell us what your family needs." /></h2>
        <p>Share the type of care, your children’s ages, the area and the times you have in mind. We’ll check availability and talk it through.</p>
        <Magnetic><Link to="/contact" className="btn btn--navy btn--lg">Send an enquiry<Arrow /></Link></Magnetic>
      </div>
      <Cutout name="child" w={900} h={808} className="art-letter" />
      {bricks.map((c, i) => <span key={c} className={`float-brick fb-${i} fb--${c}`} aria-hidden="true" />)}
    </section>
  );
}
