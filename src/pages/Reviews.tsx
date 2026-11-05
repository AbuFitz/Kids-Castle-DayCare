import { Arrow } from '../components/Motion';
import { ReviewMarquee, allReviews } from '../components/Reviews';
import { Cta } from '../components/Cta';
import { site } from '../data/site';

export default function Reviews() {
  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap">
          <h1 id="h1" className="h1-xl">What parents <em className="mark mark--teal">say.</em></h1>
          <p className="lead">Reviews from families, quoted exactly as they were posted on Google.</p>
        </div>
      </section>
      <section className="section section--tight reviews-band" aria-label="Google reviews">
        <div className="wrap">
          <ReviewMarquee items={allReviews.slice(0, 5)} label="Parent reviews, first row" seconds={90} />
          <ReviewMarquee items={allReviews.slice(5)} label="Parent reviews, second row" reverse seconds={80} />
          <p className="fine">Shown unedited, with each reviewer’s name as it appears on Google. We do not claim the reviews are independently verified.</p>
          <p><a className="btn btn--tangerine" href={site.google.url} target="_blank" rel="noreferrer">See them on Google<span className="visually-hidden"> (opens in a new tab)</span><Arrow /></a></p>
        </div>
      </section>
      <Cta />
    </>
  );
}
