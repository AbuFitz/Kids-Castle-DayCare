import { Link } from 'react-router-dom';
import { Arrow, Magnetic, Reveal } from '../components/Motion';
import { NameBlocks } from '../components/Blocks';
import { AreaMap } from '../components/AreaMap';
import { ReviewMarquee, allReviews } from '../components/Reviews';
import { GoogleRating } from '../components/GoogleRating';
import { Cta } from '../components/Cta';
import { areas, services, site } from '../data/site';

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="h1-l">Little <em className="chip chip--sun">moments.</em></span>
              <span className="h1-l">Big <em className="chip chip--sky">beginnings.</em></span>
            </h1>
            <p className="hero-sub">{site.intro}</p>
            <div className="hero-cta">
              <Magnetic><Link to="/contact" className="btn btn--tangerine">Enquire about childcare<Arrow /></Link></Magnetic>
              <Link to="/services" className="btn btn--ghost">Explore our services</Link>
            </div>
            <GoogleRating />
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="hero-star hero-star--a" /><span className="hero-star hero-star--b" /><span className="hero-star hero-star--c" />
            <div className="hero-panel"><img src="/art/castle.webp" alt="" width={900} height={703} fetchPriority="high" decoding="async" /></div>
          </div>
        </div>
      </section>

      <section className="section intro" aria-labelledby="intro-title">
        <div className="wrap intro-grid">
          <Reveal className="intro-copy">
            <h2 id="intro-title" className="h-section">Childcare that comes to your door.</h2>
            {/* OWNER-APPROVAL: draft business introduction using only confirmed facts. */}
            <p className="lead">Kids Castle Daycare &amp; Home Nursery provides personal nanny and babysitting care for children from 6 months to 10 years, in the comfort of your own home.</p>
            <p>Every family is different, so every arrangement is talked through with you first: the days, the hours and the routines that matter to your children.</p>
            <p><Link to="/about" className="textlink">About Kids Castle<Arrow /></Link></p>
          </Reveal>
          <Reveal className="owner-note" delay={0.08}>
            <NameBlocks />
            <p className="hello">Hello, I’m Mihaela, the owner of Kids Castle.</p>
            <p>Come and say hello: tell us about your family and we will take it from there.</p>
          </Reveal>
        </div>
      </section>

      <section className="section services-open" aria-labelledby="svc-title">
        <div className="wrap svc-split">
          <h2 id="svc-title" className="h-section svc-h">Care for the way your family lives.</h2>
          <div className="svc-photos" aria-hidden="true">
            <img className="ph ph-a" src="/photos/train.webp" alt="" width={1200} height={800} loading="lazy" decoding="async" />
            <img className="ph ph-b" src="/photos/bricks.webp" alt="" width={1200} height={800} loading="lazy" decoding="async" />
          </div>
          <div className="svc-body">
            <ul className="svc-list">
              {services.map((s) => (
                <li key={s.id}><span className={`dot dot--${s.tone}`} aria-hidden="true" /><div><h3>{s.title}</h3><p>{s.text}</p></div></li>
              ))}
            </ul>
            <p><Link to="/services" className="textlink">How it works<Arrow /></Link></p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="area-title">
        <div className="wrap area-split">
          <Reveal><AreaMap /></Reveal>
          <div>
            <h2 id="area-title" className="h-section">Across North London.</h2>
            <p className="lead">We come to you, in {areas.length} neighbourhoods and the streets between them.</p>
            <ul className="chips-list" aria-label="Areas covered">
              {areas.map((a) => <li key={a.name}><span className={`dot dot--${a.tone}`} aria-hidden="true" />{a.name}</li>)}
            </ul>
            <p className="fine">Just outside the map? Send an enquiry and ask.</p>
          </div>
        </div>
      </section>

      <section className="section reviews-band" id="reviews" aria-labelledby="rev-title">
        <div className="wrap">
          <div className="sec-head sec-head--row">
            <h2 id="rev-title" className="h-section">In parents’ own words.</h2>
            <a href={site.google.url} target="_blank" rel="noreferrer" className="textlink">See them on Google<span className="visually-hidden"> (opens in a new tab)</span><Arrow /></a>
          </div>
          <ReviewMarquee items={allReviews} label="Parent reviews" seconds={150} />
          <p className="fine">Reviews are quoted exactly as posted on Google.</p>
        </div>
      </section>
      <Cta />
    </>
  );
}
