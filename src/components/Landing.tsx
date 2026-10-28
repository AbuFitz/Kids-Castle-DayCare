import { Link } from 'react-router-dom';
import { Words } from './Motion';
import { dailyRhythm, site } from '../data/site';

export function Breadcrumbs({ trail }: { trail: [string, string?][] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>{trail.map(([label, to], i) => <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}{i < trail.length - 1 && <span aria-hidden="true"> / </span>}</li>)}</ol>
    </nav>
  );
}

export function Credentials() {
  return (
    <ul className="creds" aria-label="Registration and safeguarding">
      {site.credentials.map((c) => <li key={c}>{c}</li>)}
    </ul>
  );
}

export function DailyRhythm({ title = 'A day at the home nursery' }: { title?: string }) {
  return (
    <section className="section" aria-labelledby="rhythm-title">
      <div className="wrap">
        <h2 id="rhythm-title" className="h-section"><Words text={title} /></h2>
        <p className="lead">Predictable days help little ones feel secure. Here is how play, learning, meals and rest fit together.</p>
        <ol className="rhythm">
          {dailyRhythm.map((r, i) => (
            <li key={r.time} className={`rh rh--${['teal', 'sun', 'tangerine', 'sky'][i % 4]}`}>
              <time className="rh-time">{r.time}</time>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AreaChips({ items, label }: { items: string[]; label: string }) {
  return <ul className="area-chips" aria-label={label}>{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}
