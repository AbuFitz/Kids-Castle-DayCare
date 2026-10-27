import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Reveal, Sticker, Words } from './Motion';
import { ImageSlot } from './Art';
import { steps } from '../data/site';

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <section className="section section--paper" aria-labelledby="steps-title">
      <div className="wrap">
        <div className="section-head center">
          <div className="title-row">
            <h2 id="steps-title" className="h-section"><Words text="Getting started" /></h2>
            <Sticker label="Easy" tone="orange" shape="scallop" rot={-7} style={{ right: -26, top: -26 }} dark={false} />
          </div>
        </div>
        <div className="timeline" ref={ref}>
          <div className="timeline-line" aria-hidden="true"><motion.i style={{ scaleY: grow }} /></div>
          {steps.map((s, i) => (
            <Reveal key={s.tag} className="step">
              <span className="pill">{s.tag}</span>
              <div className="step-card">
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
                <ImageSlot scene={i + 1} mask="blob2" label={`step-${i + 1}`} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
