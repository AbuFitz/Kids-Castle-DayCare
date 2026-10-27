import { Words } from './Motion';
import { steps } from '../data/site';

const colours = ['teal', 'orange', 'blue', 'yellow'];
export function Steps() {
  return (
    <section className="section" aria-labelledby="steps-title">
      <div className="wrap">
        <h2 id="steps-title" className="h-section narrow"><Words text="Getting started is simple" /></h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.tag} className="step">
              <span className={`step-n c-${colours[i]}`} aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
