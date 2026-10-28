import { Link } from 'react-router-dom';
import { Arrow } from '../components/Motion';
import { Cutout } from '../components/Cutout';

export default function NotFound() {
  return (
    <section className="page-head page-head--sun404">
      <div className="wrap nf">
        <div>
          <h1>Oops, that block fell over.</h1>
          <p className="lead">We couldn’t find that page.</p>
          <p style={{ marginTop: 24 }}><Link to="/" className="btn btn--navy">Back home<Arrow /></Link></p>
        </div>
        <Cutout name="castle" w={900} h={703} className="art-404" />
      </div>
    </section>
  );
}
