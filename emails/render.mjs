// Renders every template with sample data into emails/out for review: node emails/render.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { templates } from './templates.mjs';
const data = JSON.parse(readFileSync(new URL('./sample.json', import.meta.url), 'utf8'));
const out = new URL('./out/', import.meta.url);
mkdirSync(out, { recursive: true });
const opts = { siteUrl: '../../public', address: '16 Montgomery Lodge, Bethnal Green, London E1 4XQ' };
const index = [];
for (const [name, fn] of Object.entries(templates)) {
  const r = fn(data, opts);
  if (/\{\{|undefined|\[object/.test(r.html + r.text)) throw new Error(`${name}: unresolved placeholder`);
  writeFileSync(new URL(`${name}.html`, out), r.html);
  writeFileSync(new URL(`${name}.txt`, out), r.text);
  index.push(`<li><a href="${name}.html">${name}</a> &middot; <a href="${name}.txt">text</a> &middot; ${r.subject}</li>`);
  console.log('rendered', name, '-', r.subject);
}
writeFileSync(new URL('index.html', out), `<!doctype html><meta charset="utf-8"><title>Email previews</title><ul style="font:16px sans-serif;line-height:2">${index.join('')}</ul>`);
