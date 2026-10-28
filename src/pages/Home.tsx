import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import { Arrow, Magnetic, Marquee, Reveal, ScrollWords, Words } from '../components/Motion';
import { Cutout } from '../components/Cutout';
import { BrickMark } from '../components/BrickMark';
import { Steps } from '../components/Steps';
import { Rates } from '../components/Rates';
import { Cta } from '../components/Cta';
import { site } from '../data/site';
const Faq = lazy(() => import('../components/Faq').then((x) => ({ default: x.Faq })));

const chips = [
  [['Little', 'teal'], ['moments.', 'sun']],
  [['Big', 'tangerine'], ['beginnings.', 'sky']],
] as const;

export default function Home() {
  let n = 0;
  const address = site.nursery.showFullAddress ? site.nursery.address : null;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="chips">
              {chips.map((line, li) => (
                <span key={li} className="chip-line">
                  {line.map(([w, c]) => {
                    const i = n++;
                    return (
                      <m.span key={w} className={`chip chip--${c} ${i % 2 ? 'tilt-r' : 'tilt-l'}`}
                        initial={{ y: -90, opacity: 0, rotate: i % 2 ? 6 : -6 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 130, damping: 12, delay: 0.1 + i * 0.14 }}>{w}</m.span>
                    );
                  })}
                </span>
              ))}
            </h1>
            <m.p className="hero-sub" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>{site.intro}</m.p>
            <m.div className="hero-cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.7 }}>
              <Magnetic><Link to="/contact" className="btn btn--navy">Send an enquiry<Arrow /></Link></Magnetic>
              <Link to="/services" className="btn btn--ghost">Explore our care</Link>
            </m.div>
          </div>
          <div className="hero-art">
            <span className="hero-back" aria-hidden="true" />
            <div className="hero-card"><BrickMark className="hero-bricks" /></div>
            <span className="price-badge">from £20<br />an hour</span>
          </div>
        </div>
      </section>

      <Marquee items={['Home nursery', 'Babysitting', 'Nanny care', 'Sibling care', 'Evenings & weekends', 'Full-day arrangements']} />

      <section className="section" aria-labelledby="care-title">
        <div className="wrap">
          <h2 id="care-title" className="visually-hidden">Our care</h2>
          {/* PROVISIONAL draft copy based on verified facts only; owner biography to be added once supplied. */}
          <ScrollWords className="statement" text="A home nursery in Bethnal Green, and babysitters and nannies in your own home across North London. Every arrangement is shaped around the family it is for." />
          <div className="care-grid">
            <Reveal className="care-a">
              <article className="card card--teal">
                <p className="card-area">East London</p>
                <h3>The home nursery</h3>
                <p>Childminding in a home setting in Bethnal Green.</p>
                {address && <address>{address.line1}<br />{address.area}, {address.city} {address.postcode}</address>}
                <span className="stamp">Being renovated<small>No reopening date confirmed yet</small></span>
                <Cutout name="nursery" w={682} h={760} className="art-nursery" delay={0.1} />
              </article>
            </Reveal>
            <Reveal className="care-b" delay={0.12}>
              <article className="card card--sky">
                <p className="card-area">North London</p>
                <h3>At your front door</h3>
                <p>Babysitters and nannies in your own home, arranged around your family’s routine and availability.</p>
                <ul className="pills"><li>Babysitting</li><li>Nanny care</li><li>Siblings together</li></ul>
                <Cutout name="nanny" w={531} h={760} className="art-nanny" delay={0.2} />
              </article>
            </Reveal>
            {[
              ['Evening & weekend', 'Cover for the times a standard day does not reach. Availability depends on the booking.', 'sun'],
              ['Full-day arrangements', 'Longer days arranged in advance. An eight-hour arrangement is listed at £180.', 'white'],
              ['Sibling care', 'Brothers and sisters looked after together, at a combined rate of £35 an hour for two.', 'tangerine'],
            ].map(([t, d, c], i) => (
              <Reveal key={t} className="care-s" delay={i * 0.1}><article className={`card card--${c}`}><h3>{t}</h3><p>{d}</p>{c === 'sun' && <Cutout name="evening" w={760} h={690} className="art-evening" />}</article></Reveal>
            ))}
          </div>
          <p style={{ marginTop: 32 }}><Link to="/services" className="btn btn--navy">All services<Arrow /></Link></p>
        </div>
      </section>

      <Rates />
      <Steps />

      {site.showReviews && site.reviews.length > 0 && (
        <section className="section"><div className="wrap">{site.reviews.map((r) => (
          <figure key={r.name} className="review-card"><blockquote>“{r.quote}”</blockquote><figcaption>{r.name}</figcaption></figure>
        ))}</div></section>
      )}

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title" className="h-section"><Words text="Questions parents ask." /></h2>
          <Suspense fallback={<div style={{ minHeight: 480 }} />}><Faq /></Suspense>
        </div>
      </section>
      <Cta />
    </>
  );
}
