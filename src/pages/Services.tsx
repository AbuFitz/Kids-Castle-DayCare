import { Reveal, Sticker, Words } from '../components/Motion';
import { ImageSlot } from '../components/Art';
import { Cta } from '../components/Cta';
import { services, site } from '../data/site';

export default function Services() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="title-row">
            <h1><Words text="Our services" immediate /></h1>
            <Sticker label="Safe hands" tone="orange" shape="cloud" rot={-10} style={{ left: -6, top: -34 }} />
            <Sticker label="Care" tone="mint" shape="scallop" rot={10} style={{ right: -30, bottom: -20 }} />
          </div>
          <p className="lead">{site.intro}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <div className="svc-grid">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.08}>
                <article className="svc-tile">
                  <ImageSlot scene={s.scene} mask="blob1" label={`service-${s.id}`} />
                  <div className="body"><span className="pill">{s.area}</span><h3>{s.title}</h3><p>{s.text}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="rt">
        <div className="wrap">
          <div className="section-head center"><div className="title-row"><h2 id="rt" className="h-section"><Words text="Rates" /></h2><Sticker label="Per hour" tone="blue" shape="cloud" rot={-8} style={{ left: '100%', top: -20 }} /></div></div>
          <div className="rate-table">
            {site.rates.map((r) => (
              <Reveal key={r.label}><div className="rate-row"><span>{r.label}</span><strong>{r.value}<small>{r.unit}</small></strong></div></Reveal>
            ))}
          </div>
          <div className="note" style={{ maxWidth: 720, margin: '24px auto 0' }}><strong>Still being confirmed:</strong>
            <ul>{site.ratesToConfirm.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
