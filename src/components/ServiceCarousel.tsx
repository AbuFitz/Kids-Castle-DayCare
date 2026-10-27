import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Reveal, Words } from './Motion';
import { services } from '../data/site';

export function ServiceCarousel() {
  const [ref, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const sync = useCallback(() => { if (!api) return; setPrev(api.canScrollPrev()); setNext(api.canScrollNext()); }, [api]);
  useEffect(() => { if (!api) return; sync(); api.on('select', sync).on('reInit', sync); return () => { api.off('select', sync); }; }, [api, sync]);

  return (
    <section className="section section--warm" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="carousel-head">
          <div>
            <h2 id="svc-title" className="h-section"><Words text="Our childcare services" /></h2>
          </div>
          <div className="carousel-btns">
            <button className="circle-btn" onClick={() => api?.scrollPrev()} disabled={!prev} aria-label="Previous service"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg></button>
            <button className="circle-btn" onClick={() => api?.scrollNext()} disabled={!next} aria-label="Next service"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
        <Reveal>
          <div className="embla" ref={ref}>
            <ul className="embla-track">
              {services.map((s) => (
                <li key={s.id} className={`svc-card t-${s.tone}`}>
                  <span className="pill">{s.area}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to="/contact" className="link-arrow">Enquire<Arrow /></Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
