import { Link } from 'react-router-dom';
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { Arrow, CountValue, Words } from './Motion';
import { site } from '../data/site';

export function Rates({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const radius = useTransform(scrollYProgress, [0, 1], [72, 0]);
  const inset = useTransform(scrollYProgress, [0, 1], ['6vw', '0vw']);
  return (
    <m.section ref={ref} className="rates" aria-labelledby="rates-title" style={reduce ? undefined : { borderRadius: radius, marginInline: inset }}>
      <div className="wrap">
        <h2 id="rates-title" className="h-section"><Words text="Clear, simple rates" /></h2>
        <p className="rates-lead">The rates shared with us so far. Bookings depend on your family’s requirements and availability.</p>
        <dl className="rate-grid">
          {site.rates.map((r) => (
            <div key={r.label} className="rate-big"><dt>{r.label}</dt><dd><CountValue value={r.value} /><small>{r.unit}</small></dd></div>
          ))}
        </dl>
        <div className="note note--rates"><strong>Still being confirmed</strong>
          <ul>{site.ratesToConfirm.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        {!compact && <p style={{ marginTop: 28 }}><Link to="/contact" className="btn btn--yellow">Ask about your family<Arrow /></Link></p>}
      </div>
    </m.section>
  );
}
