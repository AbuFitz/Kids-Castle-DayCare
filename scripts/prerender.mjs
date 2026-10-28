// Build-time prerender: bakes real HTML, per-page head tags and JSON-LD into dist, plus sitemap.xml and robots.txt.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr). Set SITE_URL to emit canonical URLs, Open Graph URLs and the sitemap.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const ssr = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);

const siteUrl = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') || '').replace(/\/$/, '');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { seo, notFoundSeo, jsonLd, indexableRoutes } = ssr;

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const head = (path, meta) => {
  const url = siteUrl ? siteUrl + (path === '/' ? '' : path) : '';
  const ogImage = siteUrl && existsSync(join(dist, 'og.jpg')) ? `${siteUrl}/og.jpg` : '';
  const ld = JSON.stringify(jsonLd(path, siteUrl)).replace(/</g, '\\u003c');
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`,
    url && `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    url && `<meta property="og:url" content="${esc(url)}" />`,
    ogImage && `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}" />`,
    ogImage && `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ].filter(Boolean).join('\n    ');
};

const write = (rel, html) => { const f = join(dist, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
const page = async (path, meta) => {
  const body = await ssr.render(path);
  let html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(path, meta)).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (!html.includes(body.slice(0, 40))) throw new Error('prerender injection failed for ' + path);
  return html;
};

for (const [path, meta] of Object.entries(seo)) {
  write(path === '/' ? 'index.html' : `${path.slice(1)}/index.html`, await page(path, meta));
  console.log('prerendered', path);
}
write('404.html', (await page('/__not-found__', notFoundSeo)));

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = indexableRoutes.map((p) => `  <url><loc>${siteUrl}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n');
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log('sitemap + robots for', siteUrl);
} else {
  write('robots.txt', 'User-agent: *\nAllow: /\nDisallow: /api/\n');
  console.warn('SITE_URL not set: canonical URLs, Open Graph URLs and sitemap.xml were skipped.');
}
