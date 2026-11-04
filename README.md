# Kids Castle: Nanny & Babysitting Services

Website for Mihaela Oliva's independent nanny and babysitting service in London. Vite + React + TypeScript, prerendered at build time, deployed on Vercel.

## Pages
`/` Home · `/services` · `/about` · `/reviews` · `/contact` · legal: `/privacy`, `/cookies`, `/terms`, `/accessibility`, `/complaints`, `/booking-terms` (draft, `noindex`).
The old `/east-london-home-nursery` and `/north-london-babysitting` pages were removed and 301/308-redirect to `/services` (`vercel.json`).

## Where things live
- **`src/data/site.ts`**: every editable fact: registration wording, contact, services, "why an independent nanny", process steps, FAQs and the nine Google reviews (verbatim). Unapproved rates are kept in `unapprovedRates` and are **not** displayed anywhere.
- **`src/data/seo.ts`**: per-route titles/descriptions, redirects map, JSON-LD (no address, no prices, no review/rating markup).
- **`src/pages/Legal.tsx`**: the six legal documents. Items in `[square brackets]` are owner decisions.
- **`api/enquiry.js`** + **`emails/templates.mjs`**: enquiry endpoint and email templates.

## Enquiry form
Single-page form → `POST /api/enquiry`: server-side zod validation, hidden honeypot, per-IP rate limit, duplicate protection by `submissionId`, sends via Resend to Mihaela and a confirmation to the parent. Set in Vercel: `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` (verified sender), `SITE_URL`. Without them the endpoint answers 501 and the page says plainly that nothing was sent. Nothing is stored on the server. Preview emails: `npm run emails`. Test the endpoint: `npm run test:api`.

## SEO
Set `SITE_URL` (for example `https://your-domain`) so canonical URLs, Open Graph URLs and `sitemap.xml` are generated. `/booking-terms` is `noindex` and left out of the sitemap. Unknown URLs serve the prerendered 404 with a real 404 status.

## Privacy / cookies
No cookies, local storage, analytics, maps or third-party scripts; fonts are self-hosted. That is why there is a Cookie Notice and no consent banner. Adding any non-essential tracking would require a consent mechanism first.

## Local checks
`npm run build`, then `npm run serve:dist` (Vercel-like static server with redirects and a real 404).

## Needs Mihaela's approval before launch
- All copy marked `OWNER-APPROVAL` in the source (Meet Mihaela, About, process steps). No experience, qualifications or philosophy have been invented; add her own words when supplied.
- **Reviews that mention a nursery, staff, a team or premises** (shown verbatim, flagged in `site.ts` with `note`): Irina Oliva, Cristina Ivan, Miha Tecu, Yasin Dewan, Rabbi Uddin. Decide whether to keep them public.
- The "areas" list on the Services page (taken from earlier client material) and the Facebook link.
- Rates, booking terms, retention periods, complaints timings (all marked in the legal pages).
- The Google Business Profile still describes a daycare and home nursery; align it with the registration.
- ICO data protection fee / registration for the enquiry data, and review of all legal pages by a UK legal professional.
- Registered address is shown only in the Privacy Notice. Childcare at that address is awaiting clarification from Ofsted and is not advertised.
