import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/nunito-sans';
import './styles.css';
import App from './App';

const root = document.getElementById('root')!;
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>;
// Pages are prerendered at build time; hydrate them when present, otherwise (dev server) render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
