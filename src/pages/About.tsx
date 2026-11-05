import { Arrow, Reveal } from '../components/Motion';
import { NameBlocks } from '../components/Blocks';
import { Cutout } from '../components/Cutout';
import { Cta } from '../components/Cta';
import { Link } from 'react-router-dom';
import { alongside, site, training, why } from '../data/site';

export default function About() {
  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap page-head-grid">
          <div>
            <h1 id="h1" className="h1-xl">About <em className="mark mark--sun">Kids Castle.</em></h1>
            <p className="lead">Kids Castle Daycare &amp; Home Nursery provides personal nanny and babysitting care for families across London, for children from {site.ages}.</p>
          </div>
          <Cutout name="girl" w={900} h={750} className="art-head art-head--girl" />
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="story-title">
        <div className="wrap story">
          <Reveal className="story-main">
            {/* OWNER-APPROVAL: draft copy using only confirmed facts. No history, experience or philosophy has been invented. */}
            <h2 id="story-title" className="h-section">Care that fits around your family.</h2>
            <p className="lead">Our care takes place in your own home, so your children stay in the place they know best.</p>
            <p>We offer nanny care, babysitting, evening and weekend care, full-day childcare and sibling care. Days, hours and routines are talked through and agreed with you before anything begins, and rates are discussed individually because every family’s needs are different.</p>
            <p><Link to="/services" className="textlink">See our services<Arrow /></Link></p>
          </Reveal>
          <Reveal className="owner-note" delay={0.1}>
            <NameBlocks />
            <p className="hello">Hello, I’m Mihaela, the owner of Kids Castle.</p>
            <p>I started Kids Castle to give families personal, relaxed childcare in the comfort of their own home.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="wrap why">
          <h2 id="why-title" className="h-section">What it is like to work with us.</h2>
          <ul className="why-list">
            {why.map((w, i) => (<li key={w.title}><span className="why-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h3>{w.title}</h3><p>{w.text}</p></div></li>))}
          </ul>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="train-title">
        <div className="wrap train">
          {/* OWNER-APPROVAL: taken from Mihaela's own public flyer; certificates to be seen before launch. */}
          <div>
            <h2 id="train-title" className="h-section">Training behind the care.</h2>
            <p className="lead">Mihaela’s training, as she lists it:</p>
            <ul className="tick-list">{training.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h3 className="h-small">Alongside care, sessions can include</h3>
            <ul className="tick-list tick-list--soft">{alongside.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="note-weekend">Currently welcoming enquiries for <strong>weekend</strong> care.</p>
          </div>
        </div>
      </section>

      <section className="band-photo" aria-hidden="true"><img src="/photos/pencils.webp" alt="" width={1200} height={900} loading="lazy" decoding="async" /></section>

      <section className="section" id="registration" aria-labelledby="reg-title">
        <div className="wrap reg">
          <h2 id="reg-title" className="h-section">Registration.</h2>
          <div>
            <p className="lead">{site.ofsted.statement}</p>
            <p>Registered on {site.ofsted.registered}. This is a registration, not an inspection grade. You can look it up on <a className="textlink" href={site.ofsted.searchUrl} target="_blank" rel="noreferrer">Ofsted’s website<span className="visually-hidden"> (opens in a new tab)</span></a> using the number above.</p>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
