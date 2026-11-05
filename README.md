# Kids Castle Daycare & Home Nursery: nanny & babysitting services

Website for Kids Castle (owner Mihaela Oliva): nanny and babysitting care in the family's own home, London. Vite + React + TypeScript, prerendered at build time, deployed on Vercel.

## Pages
`/` Home (reviews are on the home page) · `/services` · `/about` · `/contact` · legal: `/privacy`, `/cookies`, `/terms`, `/accessibility`, `/complaints`, `/booking-terms` (draft, `noindex`).
The old `/east-london-home-nursery` and `/north-london-babysitting` pages and the separate `/reviews` page were removed; they redirect permanently to `/services` and `/` (`vercel.json`).

## Where things live
- **`src/data/site.ts`**: every editable fact: registration wording, contact, services, "why an independent nanny", process steps, FAQs and the nine Google reviews (verbatim). Unapproved rates are kept in `unapprovedRates` and are **not** displayed anywhere.
- **`src/data/seo.ts`**: per-route titles/descriptions, redirects map, JSON-LD (no address, no prices, no review/rating markup).
- **`src/pages/Legal.tsx`**: the six legal documents. Items in `[square brackets]` are owner decisions.
- **`api/enquiry.js`** + **`emails/templates.mjs`**: enquiry endpoint and email templates.

## Enquiry form
Single-page form → `POST /api/enquiry`: server-side zod validation, hidden honeypot, per-IP rate limit, duplicate protection by `submissionId`, sends via Resend to Mihaela and a confirmation to the parent. Set in Vercel: `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` (verified sender), `SITE_URL`. Without them the endpoint answers 501 and the page says plainly that nothing was sent. Nothing is stored on the server. Preview emails: `npm run emails`. Test the endpoint: `npm run test:api`.

## SEO
Set `SITE_URL` (for example `https://your-domain`) so canonical URLs, Open Graph URLs and `sitemap.xml` are generated. `/booking-terms` is `noindex` and left out of the sitemap. Unknown URLs serve the prerendered 404 with a real 404 status.

## Contact routes
The form, the business phone (`07467 500497`, `site.phone`) and WhatsApp on that number (floating button bottom-right on every page). No email address is published anywhere; the owner's email lives only in `site.private` and the Resend environment variables.

## Privacy / cookies
No cookies, local storage, analytics or third-party scripts; fonts are self-hosted and the area map is a pre-rendered OpenStreetMap image served from this site (credited on the page). That is why there is a Cookie Notice and no consent banner.

## Local checks
`npm run build`, then `npm run serve:dist` (Vercel-like static server with redirects and a real 404).

## Needs the owner's approval before launch
- Copy marked `OWNER-APPROVAL` in the source (home intro, About, process steps). The training list and "sessions can include" list on About are taken from Mihaela's own public flyer: check certificates before leaving them live.
- **Rates are hidden.** Her flyer shows £25/hour (1 child) and £35/hour (2 children); the client was unsure, so nothing is shown. Re-enable via `site.unapprovedRates` once confirmed.
- **Reviews that mention a nursery, staff, a team or premises** (verbatim, flagged in `site.ts`): Irina Oliva, Cristina Ivan, Miha Tecu, Yasin Dewan, Rabbi Uddin.
- The trading name "Daycare & Home Nursery" is in the logo and titles as requested; Ofsted registration is as a home childcarer (details only on the About page), so no nursery premises or Early Years Register claims are made.
- The "areas" list and map (from earlier client material), stock photographs (Unsplash, generic objects only) and the Facebook link.
- Booking terms, retention periods, complaints timings (marked in the legal pages), ICO data protection fee, and review of all legal pages by a UK legal professional.
- Registered address and email are not published.
