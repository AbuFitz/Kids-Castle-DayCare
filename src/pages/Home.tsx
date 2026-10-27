import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Arrow, ScrollMarquee, ScrollWords, Words } from '../components/Motion';
import { BrickMark } from '../components/BrickMark';
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
              <Link to="/contact" className="btn btn--navy">Send an enquiry<Arrow /></Link>
              <Link to="/services" className="btn btn--outline">See our services</Link>
            </motion.div>
          </div>
          <BrickMark className="hero-bricks" />
        </div>
        <div className="ways">
          <Link to="/services" className="way way--teal">
            <span className="way-area">East London</span>
            <strong>Home nursery</strong>
            <span>Bethnal Green. {site.nursery.status}</span>
            <Arrow />
          </Link>
          <Link to="/services" className="way way--blue">
            <span className="way-area">North London</span>
            <strong>Babysitting and nanny care</strong>
            <span>In your own home, arranged around your family.</span>
            <Arrow />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="story-title">
        <div className="wrap">
          <h2 id="story-title" className="visually-hidden">About Kids Castle</h2>
          {/* PROVISIONAL draft copy based on verified facts only; owner biography to be added once supplied. */}
          <ScrollWords className="statement" text="A home nursery in Bethnal Green, and babysitters and nannies in your own home across North London. Every arrangement is shaped around the family it is for." />
          <p style={{ marginTop: 32 }}><Link to="/about" className="btn btn--outline-dark">About Kids Castle<Arrow /></Link></p>
        </div>
      </section>

      <ScrollMarquee items={['Little moments', 'Big beginnings']} />
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
