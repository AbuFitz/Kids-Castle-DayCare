import { Link } from 'react-router-dom';
import { Arrow, Photo, Words } from '../components/Motion';
import { Faq } from '../components/Faq';
import { Cta } from '../components/Cta';
import { site } from '../data/site';

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1><Words text="About Kids Castle" immediate /></h1>
          <p className="lead">{site.intro}</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="wrap about-photos">
          <Photo src="/images/art.webp" alt="Children painting at a long table with a carer" ratio="4 / 3" />
          <Photo src="/images/creative.webp" alt="Children playing with paper crafts beside shelves of art supplies" ratio="4 / 3" />
        </div>
      </section>
      <section className="section section--tight">
        <div className="wrap">
          <dl className="glance">
            <div><dt>Home nursery</dt><dd>East London</dd></div>
            <div><dt>Babysitting and nannies</dt><dd>North London</dd></div>
            <div><dt>Hourly rate from</dt><dd>£20 per child</dd></div>
            <div><dt>Siblings</dt><dd>£35 per hour for two</dd></div>
          </dl>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <h2 className="h-section"><Words text="Our journey" /></h2>
            {/* PROVISIONAL draft copy. Owner biography is configurable and left out until the client supplies it. */}
            <p className="lead">Kids Castle Daycare offers two ways of caring for children: a home nursery setting in {site.nursery.area}, and babysitting and nanny care in the family’s own home across North London.</p>
            <ul className="ticks">
              <li>Home nursery setting in East London</li>
              <li>Babysitting and nanny care at home in North London</li>
              <li>Evening, weekend, full-day and sibling arrangements</li>
            </ul>
            <p className="note">{site.nursery.status}</p>
          </div>
          <Photo src="/images/reading.webp" alt="A carer reading a picture book to a group of young children" ratio="4 / 3" />
        </div>
      </section>
      <section className="section section--warm">
        <div className="wrap">
          <h2 className="h-section narrow"><Words text="How we work" /></h2>
          <div className="values">
            <article className="value"><h3>Shaped around you</h3><p>Every booking depends on your family’s requirements and our availability, so we talk it through first.</p></article>
            <article className="value"><h3>Clear about what’s confirmed</h3><p>Where a rate, date or detail isn’t settled yet, we say so rather than guess.</p></article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap faq-grid">
          <h2 className="h-section"><Words text="Questions parents ask" /></h2>
          <div><Faq /><p style={{ marginTop: 28 }}><Link to="/contact" className="btn">Send an enquiry<Arrow /></Link></p></div>
        </div>
      </section>
      <Cta />
    </>
  );
}
