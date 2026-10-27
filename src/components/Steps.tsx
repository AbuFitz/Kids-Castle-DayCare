import { Words } from './Motion';
import { steps } from '../data/site';

export function Steps() {
  return (
    <section className="section" aria-labelledby="steps-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="steps-title" className="h-section"><Words text="Getting started is simple" /></h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.tag} className="step">
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
