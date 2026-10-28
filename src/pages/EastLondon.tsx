import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, ScrollWords, Words } from '../components/Motion';
import { AreaChips, Breadcrumbs, Credentials, DailyRhythm } from '../components/Landing';
import { Rates } from '../components/Rates';
import { Cta } from '../components/Cta';
import { Cutout } from '../components/Cutout';
import { areas, eastFaqs, site } from '../data/site';
const Faq = lazy(() => import('../components/Faq').then((x) => ({ default: x.Faq })));

export default function EastLondon() {
  const a = site.nursery.address;
  return (
    <>
      <section className="page-head page-head--teal">
        <div className="wrap">
          <Breadcrumbs trail={[['Home', '/'], ['East London home nursery']]} />
          <h1><Words text="Home nursery and childminding in Bethnal Green" immediate /></h1>
          <p className="lead">Play-based Early Years Foundation Stage care in a calm, safeguarded home setting in East London.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ScrollWords className="statement statement--art" text="Where early childhood development meets the warmth and safety of home: a small, parent drop-off setting in Bethnal Green, with home-cooked meals and individual attention." />
          <p className="body-copy">Kids Castle is registered with Tiney, an Ofsted-registered childminder agency, and follows every statutory standard of the Early Years Foundation Stage. Children get a quiet domestic setting where they can form real bonds with their carer, build confidence and learn through play, with low child-to-carer ratios so every baby and toddler is seen.</p>
          <Credentials />
          <Cutout name="nursery" w={682} h={760} className="art-about" />
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="where-title">
        <div className="wrap">
          <h2 id="where-title" className="h-section"><Words text="Finding us in Bethnal Green" /></h2>
          <div className="split-cols">
            <div>
              <h3 className="mini">The setting</h3>
              <address className="addr">{a.line1}<br />{a.area}, {a.city} {a.postcode}<br />{areas.east.authority}</address>
              <h3 className="mini">Nearby stations</h3>
              <AreaChips items={areas.east.stations} label="Nearby stations" />
              <p className="body-copy">Handy for working parents commuting on the Central line or the Elizabeth line towards Liverpool Street, the City and Canary Wharf, with a close-to-home drop-off instead of a large commercial nursery.</p>
            </div>
            <div>
              <h3 className="mini">Families we welcome from</h3>
              <AreaChips items={areas.east.catchments} label="Neighbourhoods we serve" />
              <h3 className="mini">Postcode areas</h3>
              <AreaChips items={areas.east.postcodes} label="Postcode areas" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="h-section"><Words text="How we care" /></h2>
          <div className="values">
            <article className="value"><h3>Play-based EYFS learning</h3><p>Early phonics, sensory discovery, fine motor crafting, outdoor activity and social group development, all through play.</p></article>
            <article className="value"><h3>A calm, safeguarded home</h3><p>A quiet domestic setting with low child-to-carer ratios, led by a Paediatric First Aid certified childminder with Enhanced DBS clearance.</p></article>
            <article className="value"><h3>Home-cooked meals</h3><p>Fresh, balanced home-cooked lunches and snacks, with vegetarian, vegan, halal and specific allergy needs catered for.</p></article>
          </div>
        </div>
      </section>

      <DailyRhythm />
      <Rates compact />

      <section className="section" aria-labelledby="settle-title">
        <div className="wrap">
          <h2 id="settle-title" className="h-section"><Words text="Settling in, gently" /></h2>
          <p className="body-copy">Before a full placement we arrange short, gradual settling visits. Your child explores the space, gets to know their carer and eases in naturally, without rushing the goodbye.</p>
          <p style={{ marginTop: 24 }}><Link to="/contact" className="btn btn--navy">Ask about a place<Arrow /></Link></p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="east-faq">
        <div className="wrap faq-grid">
          <h2 id="east-faq" className="h-section"><Words text="Home nursery questions" /></h2>
          <Suspense fallback={<div style={{ minHeight: 480 }} />}><Faq items={eastFaqs} /></Suspense>
        </div>
      </section>
      <Cta />
    </>
  );
}
