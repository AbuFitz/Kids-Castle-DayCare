import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BlockPile, Marquee, Plus, Reveal, Sticker, Words } from '../components/Motion';
import { Doodle, ImageSlot } from '../components/Art';
import { ServiceCarousel } from '../components/ServiceCarousel';
import { Steps } from '../components/Steps';
import { Rates } from '../components/Rates';
import { Faq } from '../components/Faq';
import { Cta } from '../components/Cta';
import { site } from '../data/site';

const values = [
  { t: 'Home nursery', p: 'A home setting in Bethnal Green, East London.' },
  { t: 'Babysitting & nannies', p: 'Care in your own home across North London.' },
  { t: 'Flexible hours', p: 'Hourly, evening, weekend and full-day arrangements.' },
  { t: 'Siblings together', p: 'A combined rate when brothers and sisters are cared for together.' },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-top">
            <h1 id="hero-title" className="h-display">
              <span className="line"><Words text="Little moments." immediate delay={0.2} /></span>
              <span className="line"><Words text="Big beginnings." immediate delay={0.45} /></span>
              <Sticker label="Play" tone="orange" shape="cloud" rot={-12} style={{ left: '2%', top: '-4%' }} delay={1} />
              <Sticker label="Little ones" tone="blue" shape="scallop" rot={8} style={{ right: '1%', top: '-6%' }} delay={1.2} />
              <Sticker label="Cosy" tone="mint" shape="blob" rot={-6} style={{ left: '46%', bottom: '-10%' }} delay={1.4} />
            </h1>
          </div>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>{site.intro}</motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}>
            <Link to="/contact" className="btn"><Plus />Send an enquiry</Link>
            <Link to="/services" className="btn btn--ghost">Our services</Link>
          </motion.div>
          <motion.div className="hero-media" initial={{ clipPath: 'inset(18% 6% 0% 6% round 36px 36px 0 0)', y: 40 }} animate={{ clipPath: 'inset(0% 0% 0% 0% round 36px 36px 0 0)', y: 0 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}>
            <ImageSlot scene={0} big className="" label="hero-photo" />
            <Doodle />
          </motion.div>
        </div>
      </section>

      <Marquee items={['Little moments', 'Big beginnings', 'Home nursery', 'Babysitting', 'Nanny care']} />

      <section className="section" aria-labelledby="value-title">
        <div className="wrap">
          <div className="section-head center">
            <div className="title-row">
              <h2 id="value-title" className="h-section"><Words text="Care that fits your family" /></h2>
              <Sticker label="Hello" tone="orange" shape="cloud" rot={-8} style={{ left: '40%', top: -26 }} />
            </div>
          </div>
          <div className="value-grid">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <article className="value-card"><h3>{v.t}</h3><p>{v.p}</p><BlockPile seed={i + 1} /></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="story-title" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <Reveal className="story-media"><ImageSlot scene={1} mask="blob1" label="story-photo" /></Reveal>
          <div className="story-copy">
            <div className="title-row">
              <h2 id="story-title" className="h-section"><Words text="Our story" /></h2>
              <Sticker label="Playful" tone="mint" shape="blob" rot={-10} style={{ left: -22, top: -34 }} />
            </div>
            {/* PROVISIONAL draft copy based on verified facts only; owner biography to be added once supplied. */}
            <p className="lead">Kids Castle offers two kinds of childcare: a home nursery setting in Bethnal Green, East London, and babysitting and nanny services in your own home across North London. Every arrangement is shaped around the family it is for.</p>
            <Link to="/about" className="btn"><Plus />More about us</Link>
          </div>
        </div>
      </section>

      <ServiceCarousel />
      <Steps />
      <Rates />

      {site.showReviews && site.reviews.length > 0 && (
        <section className="section"><div className="wrap">{site.reviews.map((r) => (
          <figure key={r.name} className="review-card" style={{ margin: 0 }}><blockquote>“{r.quote}”</blockquote><figcaption>{r.name}</figcaption></figure>
        ))}</div></section>
      )}

      <section className="section section--paper" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="section-head center">
            <div className="title-row">
              <h2 id="faq-title" className="h-section"><Words text="Have questions?" /></h2>
              <Sticker label="FAQ" tone="blue" shape="cloud" rot={-10} style={{ left: -34, top: -26 }} />
            </div>
          </div>
          <Faq />
        </div>
      </section>
      <Cta />
    </>
  );
}
