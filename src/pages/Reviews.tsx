import { Link } from 'react-router-dom';
import { Arrow, Words } from '../components/Motion';
import { ReviewCard, ReviewTrack, allReviews } from '../components/Reviews';
import { Trust } from '../components/Trust';
import { Cta } from '../components/Cta';
import { site } from '../data/site';

export default function Reviews() {
  const [first, ...others] = allReviews;
  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap">
          <p className="eyebrow">Reviews</p>
          <h1 id="h1" className="h1-xl">Parents, <em className="mark mark--teal">in their words.</em></h1>
          <p className="lead">All {site.google.count} Google reviews, quoted exactly as they were posted.</p>
          <Trust />
        </div>
      </section>

      <section className="section" aria-label="Google reviews">
        <div className="wrap">
          <div className="rev-desktop">
            <ReviewCard r={first} featured />
            <ul className="rev-cols">{others.map((r) => <li key={r.id}><ReviewCard r={r} /></li>)}</ul>
          </div>
          <div className="rev-mobile"><ReviewTrack items={allReviews} label="Parent reviews" /></div>
          <p className="fine">These reviews come from the Kids Castle Google Business Profile and are shown unedited, with the reviewer’s name as it appears on Google. We do not claim the reviews are independently verified.</p>
          <p><a className="btn btn--ink" href={site.google.url} target="_blank" rel="noreferrer">Read them on Google<span className="visually-hidden"> (opens in a new tab)</span><Arrow /></a></p>
        </div>
      </section>
      <section className="section section--tint" aria-labelledby="next-title">
        <div className="wrap">
          <h2 id="next-title" className="h-section"><Words text="Curious how it works?" /></h2>
          <p className="lead">See what Kids Castle offers, or meet Mihaela.</p>
          <p className="row"><Link to="/services" className="btn btn--ghost">Our services</Link><Link to="/about" className="btn btn--ghost">About Mihaela</Link></p>
        </div>
      </section>
      <Cta />
    </>
  );
}
