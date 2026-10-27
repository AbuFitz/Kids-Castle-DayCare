import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Arrow, Photo, Words } from '../components/Motion';
import { ServiceCarousel } from '../components/ServiceCarousel';
import { Steps } from '../components/Steps';
import { Rates } from '../components/Rates';
import { Faq } from '../components/Faq';
import { Cta } from '../components/Cta';
import { site } from '../data/site';

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="h-display">
              <span className="line"><Words text="Little moments." immediate delay={0.15} /></span>
              <span className="line"><Words text="Big beginnings." immediate delay={0.4} /></span>
            </h1>
            <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>{site.intro}</motion.p>
            <motion.div className="hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.8 }}>
              <Link to="/contact" className="btn">Send an enquiry<Arrow /></Link>
              <Link to="/services" className="btn btn--ghost">See our services</Link>
            </motion.div>
          </div>
          <Photo src="/images/play.webp" alt="Children laughing as they hold up painted crafts at a table" ratio="5 / 4" className="hero-photo" priority position="35% center" />
        </div>
        <div className="wrap">
          <div className="two-ways">
            <Link to="/services" className="way way--teal">
              <span className="way-area">East London</span>
              <strong>Home nursery</strong>
              <span>Bethnal Green. {site.nursery.status}</span>
            </Link>
            <Link to="/services" className="way way--blue">
              <span className="way-area">North London</span>
              <strong>Babysitting and nanny care</strong>
              <span>In your own home, arranged around your family.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="story-title">
        <div className="wrap split">
          <Photo src="/images/reading.webp" alt="A carer reading a picture book to a group of young children on the floor" ratio="4 / 3" />
          <div>
            <h2 id="story-title" className="h-section"><Words text="Two ways to care, one approach" /></h2>
            {/* PROVISIONAL draft copy based on verified facts only; owner biography to be added once supplied. */}
            <p className="lead">Kids Castle offers a home nursery setting in Bethnal Green, East London, and babysitting and nanny services in your own home across North London. Every arrangement is shaped around the family it is for.</p>
            <Link to="/about" className="btn btn--ghost">About Kids Castle<Arrow /></Link>
          </div>
        </div>
      </section>

      <ServiceCarousel />
      <Steps />
      <Rates />

      {site.showReviews && site.reviews.length > 0 && (
        <section className="section"><div className="wrap">{site.reviews.map((r) => (
          <figure key={r.name} className="review-card"><blockquote>“{r.quote}”</blockquote><figcaption>{r.name}</figcaption></figure>
        ))}</div></section>
      )}

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title" className="h-section"><Words text="Questions parents ask" /></h2>
          <Faq />
        </div>
      </section>
      <Cta />
    </>
  );
}
