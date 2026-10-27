import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Sticker, Words } from './Motion';
import { Stack } from './Art';

export function Cta() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta">
          <div style={{ position: 'relative', paddingBottom: 24 }}>
            <h2 id="cta-title"><Words text="Ready to get started?" /></h2>
            <Sticker label="Hello!" tone="yellow" shape="scallop" rot={10} style={{ right: 0, top: -44 }} />
            <Link to="/contact" className="btn"><Plus />Send an enquiry</Link>
          </div>
          <div className="cta-art">
            <svg className="circle-text" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text><textPath href="#circ">Little moments • Big beginnings • </textPath></text>
            </svg>
            <motion.div style={{ position: 'absolute', inset: 0 }} initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 90, damping: 14 }}>
              <Stack className="stack" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
