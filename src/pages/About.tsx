import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import { Arrow, ScrollWords, Words } from '../components/Motion';
import { Cutout } from '../components/Cutout';
const Faq = lazy(() => import('../components/Faq').then((m) => ({ default: m.Faq })));
import { Cta } from '../components/Cta';
import { site } from '../data/site';

export default function About() {
  return (
    <>
      <section className="page-head page-head--teal">
        <div className="wrap">
          <h1><Words text="About Kids Castle" immediate /></h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {/* PROVISIONAL draft copy. Owner biography is configurable and left out until the client supplies it. */}
          <ScrollWords className="statement statement--art" text={`Kids Castle Daycare offers two ways of caring for children: a home nursery setting in ${site.nursery.area}, and babysitting and nanny care in the family’s own home across North London.`} />
          <Cutout name="nursery" w={682} h={760} className="art-about" />
        </div>
      </section>
      <section className="tiles" aria-label="At a glance">
        <div className="tile tile--yellow"><span>Home nursery</span><strong>East London</strong></div>
        <div className="tile tile--blue"><span>Babysitting and nannies</span><strong>North London</strong></div>
        <div className="tile tile--orange"><span>Hourly rate from</span><strong>£20 per child</strong></div>
        <div className="tile tile--teal"><span>Siblings</span><strong>£35 an hour for two</strong></div>
      </section>
      <section className="collage" aria-label="Moments from the day">
        <m.img className="collage-a" src="/photos/reading.webp" alt="A carer reading a picture book to a group of young children on the floor" width={1024} height={536} loading="lazy" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
        <m.img className="collage-b" src="/photos/painting.webp" alt="Children painting at a long table with a carer beside them" width={1200} height={886} loading="lazy" initial={{ opacity: 0, y: 60, rotate: 4 }} whileInView={{ opacity: 1, y: 0, rotate: 2 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />
      </section>
      <section className="section">
        <div className="wrap">
          <h2 className="h-section narrow"><Words text="How we work" /></h2>
          <div className="values">
            <article className="value"><h3>Shaped around you</h3><p>Every booking depends on your family’s requirements and our availability, so we talk it through first.</p></article>
            <article className="value"><h3>Clear about what’s confirmed</h3><p>Where a rate, date or detail isn’t settled yet, we say so rather than guess.</p></article>
            <article className="value"><h3>Evenings, weekends, full days</h3><p>Hourly, evening, weekend and full-day care can be arranged, including for siblings together.</p></article>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="wrap faq-grid">
          <h2 className="h-section"><Words text="Questions parents ask" /></h2>
          <div><Suspense fallback={<div style={{ minHeight: 480 }} />}><Faq /></Suspense><p style={{ marginTop: 28 }}><Link to="/contact" className="btn">Send an enquiry<Arrow /></Link></p></div>
        </div>
      </section>
      <Cta />
    </>
  );
}
