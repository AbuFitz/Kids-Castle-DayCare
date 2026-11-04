import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Reveal, Words } from '../components/Motion';
import { Cutout } from '../components/Cutout';
import { Cta } from '../components/Cta';
import { faqs, services, site, steps } from '../data/site';
const Faq = lazy(() => import('../components/Faq').then((x) => ({ default: x.Faq })));

export default function Services() {
  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap page-head-grid">
          <div>
            <p className="eyebrow">Our services</p>
            <h1 id="h1">Nanny &amp; babysitting care, <em className="mark mark--teal">at home.</em></h1>
            <p className="lead">Personal childcare for children aged {site.ages}, provided in your own family home by Mihaela.</p>
          </div>
          <Cutout name="child" w={900} h={808} className="art-head" />
        </div>
      </section>

      <section className="section" aria-label="Services">
        <div className="wrap">
          <dl className="svc-facts">
            <div><dt>Where</dt><dd>In your own home</dd></div>
            <div><dt>Ages</dt><dd>{site.ages}</dd></div>
            <div><dt>How it is arranged</dt><dd>Agreed with you before care starts</dd></div>
          </dl>
          <ol className="svc-rows">
            {services.map((s, i) => (
              <li key={s.id}>
                <Reveal className={`svc-row svc-row--${s.tone}`}>
                  <span className="svc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="svc-main"><h2>{s.title}</h2><p>{s.text}</p></div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="h-section"><Words text="From enquiry to care." /></h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}><span className="step-n" aria-hidden="true">{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
          <aside className="note" aria-label="Rates">
            <h3>Rates</h3>
            <p>{site.ratesNote}</p>
            <p><Link to="/contact" className="textlink">Discuss your arrangement<Arrow /></Link></p>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="area-title">
        <div className="wrap area">
          <div>
            <h2 id="area-title" className="h-section"><Words text="Where Mihaela works." /></h2>
            <p className="lead">Care is provided in your own home in London, including North London. Not sure whether you are within reach? Just ask.</p>
          </div>
          <ul className="chips-list" aria-label="Areas, including">
            {site.areas.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title" className="h-section"><Words text="Questions parents ask." /></h2>
          <Suspense fallback={<div style={{ minHeight: 360 }} />}><Faq items={faqs} /></Suspense>
        </div>
      </section>
      <Cta />
    </>
  );
}
