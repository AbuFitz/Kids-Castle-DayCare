import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, ScrollWords, Words } from '../components/Motion';
import { AreaChips, Breadcrumbs, Credentials } from '../components/Landing';
import { Rates } from '../components/Rates';
import { Cta } from '../components/Cta';
import { Cutout } from '../components/Cutout';
import { areas, northFaqs } from '../data/site';
const Faq = lazy(() => import('../components/Faq').then((x) => ({ default: x.Faq })));

export default function NorthLondon() {
  return (
    <>
      <section className="page-head page-head--blue">
        <div className="wrap">
          <Breadcrumbs trail={[['Home', '/'], ['North London babysitting']]} />
          <h1><Words text="Babysitter and nanny in North London" immediate /></h1>
          <p className="lead">Professional childcare that comes to your front door, in your child’s own familiar space.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ScrollWords className="statement statement--art" text="The same professional safeguarding as our home nursery, delivered in your own home across North London, billed by the hour with no agency fees." />
          <p className="body-copy">For families who want reliable evening cover, weekend support or a dependable daytime nanny without paying ongoing agency subscription fees. Care is provided by a Paediatric First Aid certified childminder with Enhanced DBS clearance, registered with Tiney, an Ofsted-registered childminder agency.</p>
          <Credentials />
          <Cutout name="nanny" w={531} h={760} className="art-about" />
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="n-what">
        <div className="wrap">
          <h2 id="n-what" className="h-section"><Words text="What you can book" /></h2>
          <div className="values">
            <article className="value"><h3>Daytime nanny care</h3><p>Sole-charge nanny care in your home, including after-school pick-up routines.</p></article>
            <article className="value"><h3>Evening babysitting</h3><p>Reliable cover for work or social commitments, with clear hourly billing.</p></article>
            <article className="value"><h3>Weekend sessions</h3><p>Scheduled weekend care, planned around your shift patterns and family needs.</p></article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="n-where">
        <div className="wrap">
          <h2 id="n-where" className="h-section"><Words text="Where we travel" /></h2>
          <div className="split-cols">
            <div>
              <h3 className="mini">North London neighbourhoods</h3>
              <AreaChips items={areas.north.catchments} label="North London neighbourhoods" />
            </div>
            <div>
              <h3 className="mini">Postcode areas</h3>
              <AreaChips items={areas.north.postcodes} label="North London postcode areas" />
              <p className="body-copy">We also travel to surrounding East London neighbourhoods. Ask if you are not sure we cover your street.</p>
            </div>
          </div>
        </div>
      </section>

      <Rates compact />

      <section className="section">
        <div className="wrap">
          <h2 className="h-section"><Words text="Ready to book?" /></h2>
          <p className="body-copy">Tell us your child’s age, the schedule you need and your area. We will arrange an introductory call.</p>
          <p style={{ marginTop: 24 }}><Link to="/contact" className="btn btn--navy">Check availability<Arrow /></Link></p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="north-faq">
        <div className="wrap faq-grid">
          <h2 id="north-faq" className="h-section"><Words text="Babysitting questions" /></h2>
          <Suspense fallback={<div style={{ minHeight: 480 }} />}><Faq items={northFaqs} /></Suspense>
        </div>
      </section>
      <Cta />
    </>
  );
}
