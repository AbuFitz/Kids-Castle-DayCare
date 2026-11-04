import { Link } from 'react-router-dom';
import { Arrow, Reveal, Words } from '../components/Motion';
import { NameBlocks } from '../components/Blocks';
import { ReviewCard, leadReviews } from '../components/Reviews';
import { Cutout } from '../components/Cutout';
import { Cta } from '../components/Cta';
import { site, why } from '../data/site';

export default function About() {
  return (
    <>
      <section className="page-head page-head--about" aria-labelledby="h1">
        <div className="wrap">
          <p className="eyebrow">About Mihaela</p>
          <h1 id="h1" className="h1-xl">Hello, I’m <em className="mark mark--sun">Mihaela.</em></h1>
          <NameBlocks />
        </div>
      </section>

      <section className="section" aria-labelledby="who-title">
        <div className="wrap about-grid">
          <Reveal className="about-main">
            {/* OWNER-APPROVAL: only confirmed facts are used. Add personal story, experience and qualifications in her own words once she supplies them. */}
            <h2 id="who-title" className="h-section">The person behind Kids Castle.</h2>
            <p className="lead">Kids Castle is run personally by Mihaela Oliva, who provides personal nanny and babysitting care for children from 6 months to 10 years.</p>
            <p>Mihaela works independently and is the only childcare provider. There is no team or agency behind the name: when you enquire, you are speaking to the person who will care for your children.</p>
            <p>Care takes place in your own home, with days, hours and routines agreed with you before anything begins.</p>
            <p><Link to="/contact" className="btn btn--tangerine">Enquire about childcare<Arrow /></Link></p>
          </Reveal>
          <Reveal className="about-side" delay={0.1}>
            <Cutout name="girl" w={900} h={750} className="art-about" />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="work-title">
        <div className="wrap">
          <h2 id="work-title" className="h-section"><Words text="Working with one carer." /></h2>
          <ul className="why-list why-list--wide">
            {why.map((w, i) => (
              <li key={w.title}><span className="why-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h3>{w.title}</h3><p>{w.text}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="reg-title">
        <div className="wrap reg">
          <div>
            <p className="eyebrow">Registration</p>
            <h2 id="reg-title" className="h-section">Registered with Ofsted.</h2>
          </div>
          <div>
            <p className="lead">{site.ofsted.statement}</p>
            <p>Registered on {site.ofsted.registered}. This is a registration, not an inspection grade. You can look up the registration on <a className="textlink" href={site.ofsted.searchUrl} target="_blank" rel="noreferrer">Ofsted’s website<span className="visually-hidden"> (opens in a new tab)</span></a> using the number above.</p>
          </div>
        </div>
      </section>

      <section className="section reviews-band" aria-labelledby="say-title">
        <div className="wrap">
          <div className="sec-head sec-head--row">
            <h2 id="say-title" className="h-section"><Words text="What parents say." /></h2>
            <Link to="/reviews" className="textlink">All {site.google.count} reviews<Arrow /></Link>
          </div>
          <div className="rev-trio">{leadReviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div>
        </div>
      </section>
      <Cta />
    </>
  );
}
