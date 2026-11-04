import { Link } from 'react-router-dom';
import { Arrow, Magnetic } from './Motion';
import { Cutout } from './Cutout';
import { site } from '../data/site';

export function Cta({ title = 'Let’s talk about what your family needs.' }: { title?: string }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap cta-in">
        <div>
          <h2 id="cta-title">{title}</h2>
          <p>Tell Mihaela a little about your children and the care you have in mind. She will reply to talk it through, with no obligation.</p>
          <div className="cta-row">
            <Magnetic><Link to="/contact" className="btn btn--ink">Enquire about childcare<Arrow /></Link></Magnetic>
            <a className="cta-mail" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
        <Cutout name="teddy" w={872} h={900} className="art-cta" />
      </div>
    </section>
  );
}
