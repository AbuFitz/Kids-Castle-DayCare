import { Link } from 'react-router-dom';
import { Arrow, Words } from '../components/Motion';
import { Cta } from '../components/Cta';
import { Rates } from '../components/Rates';
import { services } from '../data/site';

export default function Services() {
  return (
    <>
      <section className="page-head page-head--blue">
        <div className="wrap">
          <h1><Words text="Our services" immediate /></h1>
          <p className="lead">Home nursery care in East London, and babysitting and nanny services in North London.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap svc-grid">
          {services.map((s) => (
            <article key={s.id} className={`svc-tile t-${s.tone}`}>
              <span className="pill">{s.area}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link to="/contact" className="link-arrow">Enquire<Arrow /></Link>
            </article>
          ))}
        </div>
      </section>
      <Rates compact />
      <Cta />
    </>
  );
}
