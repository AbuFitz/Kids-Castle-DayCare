import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Words } from './Motion';
import { ImageSlot } from './Art';
import { services } from '../data/site';
import { Sticker } from './Motion';

export function ServiceCarousel() {
  const [ref, api] = useEmblaCarousel({ align: 'start', dragFree: false, containScroll: 'trimSnaps' });
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const sync = useCallback(() => { if (!api) return; setPrev(api.canScrollPrev()); setNext(api.canScrollNext()); }, [api]);
  useEffect(() => { if (!api) return; sync(); api.on('select', sync).on('reInit', sync); return () => { api.off('select', sync); }; }, [api, sync]);

  return (
    <section className="section" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="carousel-head">
          <div className="title-row">
            <h2 id="svc-title" className="h-section"><Words text="Our childcare services" /></h2>
            <Sticker label="Explore" tone="blue" shape="cloud" rot={-9} style={{ left: -6, top: -22 }} />
          </div>
          <div className="carousel-btns">
            <button className="circle-btn" onClick={() => api?.scrollPrev()} disabled={!prev} aria-label="Previous service"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg></button>
            <button className="circle-btn" onClick={() => api?.scrollNext()} disabled={!next} aria-label="Next service"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </div>
      <Reveal>
        <div className="wrap">
          <div className="embla" ref={ref}>
            <ul className="embla-track" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {services.map((s) => (
                <li key={s.id} className={`svc-card t-${s.tone}`}>
                  <span className="pill">{s.area}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ImageSlot scene={s.scene} mask="heart" label={`service-${s.id}`} />
                </li>
              ))}
            </ul>
          </div>
          <p style={{ marginTop: 22 }}><Link to="/services" className="btn btn--ghost">See rates &amp; details</Link></p>
        </div>
      </Reveal>
    </section>
  );
}
