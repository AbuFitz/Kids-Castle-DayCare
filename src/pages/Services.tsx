import { Link } from 'react-router-dom';
import { Arrow, Reveal, Words } from '../components/Motion';
import { Cta } from '../components/Cta';
import { Cutout } from '../components/Cutout';
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
            <Reveal key={s.id}><article className={`svc-tile t-${s.tone} ${['home-nursery','nanny','evening-weekend'].includes(s.id) ? 'has-art' : ''}`}>
              <span className="pill">{s.area}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link to="/contact" className="link-arrow">Enquire<Arrow /></Link>
              {s.id === 'home-nursery' && <Cutout name="nursery" w={682} h={760} className="art-tile" />}
              {s.id === 'nanny' && <Cutout name="nanny" w={531} h={760} className="art-tile" />}
              {s.id === 'evening-weekend' && <Cutout name="evening" w={760} h={690} className="art-tile" />}
            </article></Reveal>
          ))}
        </div>
      </section>
      <Rates compact />
      <Cta />
    </>
  );
}
