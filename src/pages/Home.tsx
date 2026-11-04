import { Link } from 'react-router-dom';
import { Arrow, Magnetic, Reveal, Words } from '../components/Motion';
import { NameBlocks } from '../components/Blocks';
import { ReviewCard, leadReviews } from '../components/Reviews';
import { Trust } from '../components/Trust';
import { Cutout } from '../components/Cutout';
import { Cta } from '../components/Cta';
import { services, site, why } from '../data/site';

export default function Home() {
  const [feature, ...rest] = services;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{site.descriptor}</p>
            <h1 id="hero-title">
              <span className="h1-l">Little <em className="mark mark--teal">moments.</em></span>
              <span className="h1-l">Big <em className="mark mark--sun">beginnings.</em></span>
            </h1>
            <p className="hero-sub">{site.intro}</p>
            <div className="hero-cta">
              <Magnetic><Link to="/contact" className="btn btn--tangerine">Enquire about childcare<Arrow /></Link></Magnetic>
              <Link to="/services" className="btn btn--ghost">Explore our services</Link>
            </div>
            <Trust />
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="hero-star hero-star--a" /><span className="hero-star hero-star--b" /><span className="hero-star hero-star--c" />
            <div className="hero-panel"><img src="/art/castle.webp" alt="" width={900} height={703} fetchPriority="high" decoding="async" /></div>
          </div>
        </div>
      </section>

      <section className="section meet" aria-labelledby="meet-title">
        <div className="wrap meet-grid">
          <Reveal className="meet-art"><NameBlocks /></Reveal>
          <Reveal className="meet-copy" delay={0.1}>
            <p className="eyebrow">Meet Mihaela</p>
            {/* OWNER-APPROVAL: draft introduction using only confirmed facts. Add her own words, experience and qualifications once supplied. */}
            <h2 id="meet-title" className="h-section">Hello, I’m Mihaela.</h2>
            <p className="lead">I’m the person behind Kids Castle, providing personal nanny and babysitting care for children from 6 months to 10 years.</p>
            <p>Kids Castle is just me, so when you get in touch you are speaking to the person who will be looking after your children.</p>
            <p><Link to="/about" className="textlink">More about Mihaela<Arrow /></Link></p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Our services</p>
            <h2 id="svc-title" className="h-section"><Words text="Care that comes to you." /></h2>
            <p className="lead">All childcare takes place in your own family home, arranged around your routine.</p>
          </div>
          <div className="svc-grid">
            <Reveal className="svc-feature">
              <article className={`svc svc--${feature.tone}`}>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <p><Link to="/services" className="textlink">How it works<Arrow /></Link></p>
                </div>
                <Cutout name="nursery" w={682} h={760} className="art-svc" />
              </article>
            </Reveal>
            {rest.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <article className={`svc svc--small svc--${s.tone}`}><h3>{s.title}</h3><p>{s.text}</p></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="wrap why">
          <div>
            <p className="eyebrow">Personal care</p>
            <h2 id="why-title" className="h-section"><Words text="Why families choose an independent nanny." /></h2>
          </div>
          <ul className="why-list">
            {why.map((w, i) => (
              <li key={w.title}><span className="why-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h3>{w.title}</h3><p>{w.text}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section reviews-band" aria-labelledby="rev-title">
        <div className="wrap">
          <div className="sec-head sec-head--row">
            <div>
              <p className="eyebrow">Parent reviews</p>
              <h2 id="rev-title" className="h-section"><Words text="In parents’ own words." /></h2>
            </div>
            <Link to="/reviews" className="textlink">Read all {site.google.count} reviews<Arrow /></Link>
          </div>
          <div className="rev-lead">
            <ReviewCard r={leadReviews[0]} featured />
            <div className="rev-side"><ReviewCard r={leadReviews[1]} /></div>
          </div>
          <p className="fine">Reviews are quoted exactly as posted on Google.</p>
        </div>
      </section>
      <Cta />
    </>
  );
}
