import { Link } from 'react-router-dom';
import { Plus } from '../components/Motion';
export default function NotFound() {
  return (<section className="page-head" style={{ minHeight: '70vh' }}><div className="wrap"><h1>Oops, that block fell over.</h1><p className="lead">We couldn’t find that page.</p><p style={{ marginTop: 24 }}><Link to="/" className="btn"><Plus />Back home</Link></p></div></section>);
}
