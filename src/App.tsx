import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ShapeDefs } from './components/Shapes';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const titles: Record<string, string> = {
  '/': 'Kids Castle Daycare & Home Nursery | East & North London',
  '/about': 'About | Kids Castle Daycare',
  '/services': 'Services & Rates | Kids Castle Daycare',
  '/contact': 'Enquire | Kids Castle Daycare',
};

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = titles[location.pathname] ?? 'Page not found | Kids Castle Daycare';
  }, [location.pathname]);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip">Skip to content</a>
      <ShapeDefs />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} id="main" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}
