import { Link } from 'react-router-dom';
import { Arrow } from '../components/Motion';
import { Cutout } from '../components/Cutout';

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="wrap nf">
        <div>
          <h1>That block has fallen over.</h1>
          <p className="lead">We couldn’t find that page.</p>
          <p style={{ marginTop: 24 }}><Link to="/" className="btn btn--ink">Back home<Arrow /></Link></p>
        </div>
        <Cutout name="castle" w={900} h={703} className="art-404" />
      </div>
    </section>
  );
}
