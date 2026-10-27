import { Link } from 'react-router-dom';
import { BlockPile, Plus, Reveal, Sticker, Words } from '../components/Motion';
import { ImageSlot } from '../components/Art';
import { Faq } from '../components/Faq';
import { Cta } from '../components/Cta';
import { site } from '../data/site';

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="title-row">
            <h1><Words text="About Kids Castle" immediate /></h1>
            <Sticker label="Explore" tone="mint" shape="cloud" rot={-9} style={{ left: -8, top: -34 }} />
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <div className="about-hero">
            <Reveal><ImageSlot scene={0} mask="blob1" label="about-photo-1" /></Reveal>
            <Reveal delay={0.1}><ImageSlot scene={3} mask="blob2" label="about-photo-2" /></Reveal>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><Reveal>
          <div className="glance">
            <div><b>2</b><span>kinds of care</span></div>
            <div><b>East London</b><span>home nursery</span></div>
            <div><b>North London</b><span>babysitting &amp; nannies</span></div>
            <div><b>From £20</b><span>per hour, per child (3+)</span></div>
          </div>
        </Reveal></div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap split">
          <Reveal className="story-media"><ImageSlot scene={5} mask="blob2" label="owner-portrait" /></Reveal>
          <div className="story-copy">
            <div className="title-row"><h2 className="h-section"><Words text="Our journey" /></h2><Sticker label="Playful" tone="orange" shape="scallop" rot={-8} style={{ left: -24, top: -34 }} /></div>
            {/* PROVISIONAL draft copy. Owner biography is configurable and left out until the client supplies it. */}
            <p className="lead">Kids Castle Daycare offers two ways of caring for children: a home nursery setting in {site.nursery.area}, and babysitting and nanny care in the family’s own home across North London.</p>
            <ul className="ticks">
              <li>Home nursery setting in East London</li>
              <li>Babysitting and nanny care at home in North London</li>
              <li>Evening, weekend, full-day and sibling arrangements</li>
            </ul>
            <p className="note" style={{ marginTop: 22 }}>{site.nursery.status}</p>
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="wrap">
          <div className="section-head center"><div className="title-row"><h2 className="h-section"><Words text="How we work" /></h2><Sticker label="Together" tone="blue" shape="blob" rot={8} style={{ right: -34, top: -26 }} /></div></div>
          <div className="values">
            <Reveal><article className="value-big"><h3>Shaped around you</h3><p>Every booking depends on your family’s requirements and our availability, so we talk it through first.</p><BlockPile seed={2} /></article></Reveal>
            <Reveal delay={0.1}><article className="value-big"><h3>Honest about what’s confirmed</h3><p>Where a rate, date or detail isn’t settled yet, we say so rather than guess.</p><BlockPile seed={5} /></article></Reveal>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="afaq">
        <div className="wrap">
          <div className="section-head center"><div className="title-row"><h2 id="afaq" className="h-section"><Words text="Have questions?" /></h2><Sticker label="FAQ" tone="blue" shape="cloud" rot={-10} style={{ left: -34, top: -26 }} /></div></div>
          <Faq />
          <p className="center" style={{ marginTop: 28 }}><Link to="/contact" className="btn"><Plus />Send an enquiry</Link></p>
        </div>
      </section>
      <Cta />
    </>
  );
}
