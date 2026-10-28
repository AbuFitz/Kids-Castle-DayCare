import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';

/** Renders one route to an HTML string for the build-time prerender (scripts/prerender.mjs). */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(<StaticRouter location={url}><App /></StaticRouter>);
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}

export { seo, notFoundSeo, jsonLd, indexableRoutes } from './data/seo';
