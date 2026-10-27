import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const titles: Record<string, string> = {
  '/': 'Kids Castle Daycare & Home Nursery | East & North London',
  '/about': 'About | Kids Castle Daycare',
  '/services': 'Services & Rates | Kids Castle Daycare',
  '/contact': 'Enquire | Kids Castle Daycare',
};

const descriptions: Record<string, string> = {
  '/': 'Warm home nursery care in East London, with flexible babysitting and nanny services for families in North London.',
  '/about': 'About Kids Castle: a home nursery in Bethnal Green, East London, and babysitting and nanny care in North London.',
  '/services': 'Home nursery, babysitting, nanny, evening, weekend, sibling and full-day care, with the hourly rates shared so far.',
  '/contact': 'Send a childcare enquiry to Kids Castle: care type, children’s ages, area, dates and times.',
};

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = titles[location.pathname] ?? 'Page not found | Kids Castle Daycare';
    document.querySelector('meta[name="description"]')?.setAttribute('content', descriptions[location.pathname] ?? descriptions['/']);
  }, [location.pathname]);
  return (
    <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <AnimatePresence mode="wait">
        <m.main key={location.pathname} id="main" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </m.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
    </LazyMotion>
  );
}
