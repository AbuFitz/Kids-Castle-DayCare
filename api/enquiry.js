// Vercel serverless function: POST /api/enquiry
// Sends the notification to Mihaela and a confirmation to the parent through Resend.
// Nothing is sent unless these environment variables are set in Vercel:
//   RESEND_API_KEY  Resend API key
//   ENQUIRY_TO      inbox that receives enquiries
//   ENQUIRY_FROM    verified sender, e.g. "Kids Castle <hello@your-domain>"
//   SITE_URL        public site URL (used for the logo and links in emails)
// Without them the function answers 501 and the page says plainly that nothing was sent.
import { z } from 'zod';
import { businessNotification, parentConfirmation } from '../emails/templates.mjs';

const CARE = ['Nanny care', 'Babysitting', 'Evening & weekend care', 'Full-day childcare', 'Sibling care', 'Not sure yet'];
const schema = z.object({
  careType: z.enum(CARE),
  ages: z.string().trim().min(1).max(200),
  area: z.string().trim().min(2).max(120),
  schedule: z.string().trim().min(2).max(500),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(200).regex(/^\S+@\S+\.\S+$/, 'invalid email'),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consent: z.literal(true),
  submissionId: z.string().trim().min(8).max(64).regex(/^[A-Za-z0-9_-]+$/),
  website: z.string().max(200).optional(), // honeypot: real users leave it empty
});

const seen = new Map(); // submissionId -> time; best-effort duplicate protection per warm instance
const hits = new Map(); // best-effort, per warm instance
function limited(ip) {
  const now = Date.now(); const list = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  list.push(now); hits.set(ip, list); return list.length > 6;
}

async function send({ key, from, to, replyTo, mail }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject: mail.subject, html: mail.html, text: mail.text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'method_not_allowed' }); }
  const parsed = schema.safeParse(typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid', fields: parsed.error.issues.map((i) => i.path.join('.')) });
  const d = parsed.data;
  if (d.website) return res.status(200).json({ ok: true }); // honeypot: pretend success, send nothing
  if (d.phone && d.phone.replace(/\D/g, '').length < 7) return res.status(400).json({ error: 'invalid', fields: ['phone'] });
  const ip = String(req.headers?.['x-forwarded-for'] ?? 'unknown').split(',')[0].trim();
  if (limited(ip)) return res.status(429).json({ error: 'too_many_requests' });

  for (const [k, t] of seen) if (Date.now() - t > 86_400_000) seen.delete(k);
  if (seen.has(d.submissionId)) return res.status(200).json({ ok: true, duplicate: true }); // a repeat of an enquiry already handled

  const { RESEND_API_KEY: key, ENQUIRY_TO: to, ENQUIRY_FROM: from, SITE_URL: siteUrl = '' } = process.env;
  if (!key || !to || !from) return res.status(501).json({ error: 'not_configured' });

  const opts = { siteUrl: siteUrl.replace(/\/$/, '') };
  try {
    await send({ key, from, to, replyTo: d.email, mail: businessNotification(d, opts) });
    seen.set(d.submissionId, Date.now());
    await send({ key, from, to: d.email, mail: parentConfirmation(d, opts) }).catch(() => {}); // confirmation is best-effort
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'send_failed' });
  }
}
