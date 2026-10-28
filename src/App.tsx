import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';
import { Nav } from './components/Nav';
import { notFoundSeo, seo } from './data/seo';
import { Footer } from './components/Footer';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const EastLondon = lazy(() => import('./pages/EastLondon'));
const NorthLondon = lazy(() => import('./pages/NorthLondon'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const m = seo[location.pathname] ?? notFoundSeo;
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/east-london-home-nursery" element={<EastLondon />} />
            <Route path="/north-london-babysitting" element={<NorthLondon />} />
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
