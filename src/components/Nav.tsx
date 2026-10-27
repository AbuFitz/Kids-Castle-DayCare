import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Logo } from './Logo';
import { Plus } from './Motion';
import { nav } from '../data/site';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <motion.div className="nav-frame" initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.1 }}>
          <Link to="/" className="nav-logo" aria-label="Kids Castle home"><Logo variant="horizontal" /></Link>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {nav.map((n) => (
                <li key={n.to}><NavLink to={n.to} end={n.to === '/'}>{n.label}</NavLink></li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <Link to="/contact" className="btn nav-cta"><Plus />Send an enquiry</Link>
            <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}><span /></button>
          </div>
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, scaleY: 0.85, y: -12 }} animate={{ opacity: 1, scaleY: 1, y: 0 }} exit={{ opacity: 0, scaleY: 0.9, y: -8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.05 }}>
                  <NavLink className="m-link" to={n.to} end={n.to === '/'}>{n.label}<span aria-hidden="true">→</span></NavLink>
                </motion.div>
              ))}
              <small>Contact details are being updated. Use the enquiry form.</small>
              <Link to="/contact" className="btn"><Plus />Send an enquiry</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
