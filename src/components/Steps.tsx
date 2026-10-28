import { Reveal, Words } from './Motion';
import { steps } from '../data/site';

const tone = ['teal', 'sun', 'tangerine', 'sky'];
export function Steps() {
  return (
    <section className="section" id="steps" aria-labelledby="steps-title">
      <div className="wrap">
        <h2 id="steps-title" className="h-section"><Words text="Getting started." /></h2>
        <p className="lead">Four blocks, one on top of the other.</p>
        <ol className="stairs">
          {steps.map((s, i) => (
            <li key={s.tag} className={`stair stair--${tone[i]}`} style={{ ['--i' as string]: i }}>
              <Reveal delay={(3 - i) * 0.1} y={36} className="stair-in">
                <span className="stair-n" aria-hidden="true">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
