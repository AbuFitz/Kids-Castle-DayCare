// Exercises api/enquiry.js with mock req/res and a mocked fetch. Run: node scripts/test-api.mjs
import handler from '../api/enquiry.js';
const good = { careType: 'Babysitting (North London)', children: 2, ages: '18 months and 4', location: 'Highbury', times: ['Evenings'], name: 'Test <b>Parent</b>', phone: '', email: 'parent@example.com', contactPref: 'email', message: 'Hi\n<script>x</script>', consent: true, website: '' };
const call = async (body, method = 'POST', ip = '1.1.1.1') => { let code, json; const res = { setHeader() {}, status(c) { code = c; return this; }, json(j) { json = j; return this; } }; await handler({ method, body, headers: { 'x-forwarded-for': ip } }, res); return { code, json }; };
const ok = (n, c) => { console.log(c ? 'PASS' : 'FAIL', n); if (!c) process.exitCode = 1; };
const sent = []; globalThis.fetch = async (url, init) => { sent.push(JSON.parse(init.body)); return { ok: true, status: 200 }; };

delete process.env.RESEND_API_KEY;
ok('405 on GET', (await call({}, 'GET')).code === 405);
ok('400 on invalid', (await call({ ...good, children: 99 }, 'POST', '2.2.2.2')).code === 400);
ok('400 without phone or email', (await call({ ...good, email: '', phone: '' }, 'POST', '3.3.3.3')).code === 400);
ok('400 without consent', (await call({ ...good, consent: false }, 'POST', '4.4.4.4')).code === 400);
ok('honeypot is silent 200, sends nothing', (await call({ ...good, website: 'spam' }, 'POST', '5.5.5.5')).code === 200 && sent.length === 0);
ok('501 when not configured', (await call(good, 'POST', '6.6.6.6')).code === 501 && sent.length === 0);

Object.assign(process.env, { RESEND_API_KEY: 'k', ENQUIRY_TO: 'inbox@example.com', ENQUIRY_FROM: 'Kids Castle <hello@example.com>', SITE_URL: 'https://example.com/' });
const r = await call(good, 'POST', '7.7.7.7');
ok('200 when configured', r.code === 200 && r.json.ok);
ok('two emails (business + parent)', sent.length === 2 && sent[0].to === 'inbox@example.com' && sent[1].to === 'parent@example.com');
ok('reply_to is the parent', sent[0].reply_to === 'parent@example.com');
ok('user input is escaped in HTML', !sent[0].html.includes('<script>') && sent[0].html.includes('&lt;script&gt;') && !sent[0].html.includes('<b>Parent'));
ok('logo uses SITE_URL', sent[0].html.includes('https://example.com/brand/03-horizontal-1024.png'));
globalThis.fetch = async () => ({ ok: false, status: 500 });
ok('502 when provider fails', (await call(good, 'POST', '8.8.8.8')).code === 502);
for (let i = 0; i < 7; i++) await call(good, 'POST', '9.9.9.9');
ok('429 after repeated hits', (await call(good, 'POST', '9.9.9.9')).code === 429);
