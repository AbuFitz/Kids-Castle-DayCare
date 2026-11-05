import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Reveal } from '../components/Motion';
import { Cutout } from '../components/Cutout';
import { Cta } from '../components/Cta';
import { beforeYouBook, faqs, services, site, steps } from '../data/site';
const Faq = lazy(() => import('../components/Faq').then((x) => ({ default: x.Faq })));

export default function Services() {
  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap page-head-grid">
          <div>
            <h1 id="h1">Nanny &amp; babysitting care, <em className="mark mark--teal">at home.</em></h1>
            <p className="lead">Personal childcare for children aged {site.ages}, provided in your own family home.</p>
          </div>
          <Cutout name="child" w={900} h={808} className="art-head" />
        </div>
      </section>

      <section className="section section--tight" aria-label="Services">
        <div className="wrap">
          <ul className="facts" aria-label="At a glance">
            <li><strong>Where</strong> In your own home</li>
            <li><strong>Ages</strong> {site.ages}</li>
            <li><strong>Arranged</strong> With you, before care starts</li>
          </ul>
          <ol className="svc-rows">
            {services.map((s, i) => (
              <li key={s.id}>
                <Reveal className="svc-row">
                  <span className={`svc-num svc-num--${s.tone}`} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div><h2>{s.title}</h2><p>{s.text}</p></div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="how-title">
        <div className="wrap how">
          <div>
            <h2 id="how-title" className="h-section">From enquiry to care.</h2>
            <p className="lead">{site.ratesNote}</p>
            <p><Link to="/contact" className="btn btn--tangerine">Send an enquiry<Arrow /></Link></p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (<li key={s.title}><span className="step-n" aria-hidden="true">{i + 1}</span><div><h3>{s.title}</h3><p>{s.text}</p></div></li>))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="book-title">
        <div className="wrap book">
          <h2 id="book-title" className="h-section">Choosing childcare? Worth checking.</h2>
          <ul className="book-list">
            {beforeYouBook.map((b) => (<li key={b.title}><h3>{b.title}</h3><p>{b.text}</p></li>))}
          </ul>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title" className="h-section">Questions parents ask.</h2>
          <Suspense fallback={<div style={{ minHeight: 360 }} />}><Faq items={faqs} /></Suspense>
        </div>
      </section>
      <Cta />
    </>
  );
}
