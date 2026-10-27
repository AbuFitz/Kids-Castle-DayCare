import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Logo } from './Logo';
import { Arrow } from './Motion';
import { nav } from '../data/site';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
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
        <div className="nav-bar wrap">
          <Link to="/" className="nav-logo" aria-label="Kids Castle home"><Logo variant="wordmark" /></Link>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {nav.map((n) => (
                <li key={n.to}><NavLink to={n.to} end={n.to === '/'}>{n.label}</NavLink></li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <Link to="/contact" className="btn nav-cta">Send an enquiry<Arrow /></Link>
            <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}><span /></button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
              <div className="wrap">
                {nav.map((n, i) => (
                  <motion.div key={n.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04 }}>
                    <NavLink className="m-link" to={n.to} end={n.to === '/'}>{n.label}<Arrow /></NavLink>
                  </motion.div>
                ))}
                <small>Phone and email are being updated. Please use the enquiry form.</small>
                <Link to="/contact" className="btn">Send an enquiry<Arrow /></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
