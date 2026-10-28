# Kids Castle Daycare & Home Nursery

Vite + React + TypeScript, mobile-first CSS. Motion (animation), Embla (carousel), Radix (accordion), React Hook Form + Zod (enquiry form).

```bash
npm install
npm run dev      # local
npm run build    # type-check + production build (Vercel runs this)
```

## Where things live
- **Business facts**: `src/data/site.ts` (rates, services, FAQs, process steps, address, contact details, form endpoint, reviews). `null`/empty values render honest "being confirmed" states.
- **Logo**: `public/brand/` (SVG masters plus PNG/WebP exports and favicons). Rebuilt as clean Bézier curves from the client's raster by `scripts/logo/` (see below). The client-uploaded pack (pixel-stepped traces) is kept untouched in `brand-source-uploaded-pack-v2/` for reference and is not deployed.
- **Type**: Plus Jakarta Sans (display) and Nunito Sans (body), both OFL via Fontsource.
- **Hero bricks**: `src/components/BrickMark.tsx` uses the traced brick parts (`brickPaths.ts`, generated).

## Rebuilding the logo
`scripts/logo/trace.py` classifies each pixel of the reference raster against the logo's five colours, restricting each colour to the region where it genuinely occurs (this removes the yellow/navy fringe fragments), smooths at 4x, drops specks, and traces curves with potrace. `build_pack.py` composes the variants. Needs Python with `potracer`, `scipy`, `numpy`, `pillow`, `fonttools`, `brotli`.

Caveats: traced from a low-resolution raster, so letterforms are smoothed reconstructions, not the designer's original outlines. "DAYCARE & HOME NURSERY" is new typography (Nunito ExtraBold outlines) awaiting approval. The logo's teal (`#4eb5a0`) differs slightly from the brand token teal (`#179A97`).

## SEO
- **Pre-rendered pages**: `npm run build` renders every route to real HTML (`scripts/prerender.mjs`), with per-page title, description, robots, canonical, Open Graph and JSON-LD (business, FAQ, breadcrumbs). The client hydrates it.
- **Set `SITE_URL`** (Vercel env var, e.g. `https://your-domain`) so canonical URLs, Open Graph URLs and `sitemap.xml` are generated. Without it they are skipped. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used as a fallback.
- **Landing pages**: `/east-london-home-nursery` and `/north-london-babysitting` carry the local content (areas, stations, postcodes, daily rhythm, FAQs). Edit text in `src/data/site.ts`; page titles and descriptions are in `src/data/seo.ts`.
- Unknown URLs get the prerendered 404 with a real 404 status. No `aggregateRating` markup is emitted because the review count is not verified.
- After launch: add the site in Google Search Console and submit `sitemap.xml`; keep the Google Business Profile name, address and categories identical to the site.

## Enquiry form and email
- Multi-step form (`src/pages/Contact.tsx`) posts to `/api/enquiry` (`api/enquiry.js`): validates, honeypot, rate limit, then sends via Resend. Set `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` (verified sender) and `SITE_URL` in Vercel. Until then the endpoint answers 501 and the page says nothing was sent.
- Email templates are in `emails/templates.mjs` (parent confirmation, business notification, follow-up). Preview with `npm run emails` (writes `emails/out/`). Test the endpoint with `npm run test:api`.

## Local checks
`npm run build`, then `npm run serve:dist` serves the prerendered build the way Vercel does (directory indexes, real 404).

## Not yet supplied / provisional
- **Phone number**: not yet verified, so not published. Email `0998.kidscastle@gmail.com` was supplied and is published.
- **Credentials** (Tiney registration, Enhanced DBS, Paediatric First Aid, public liability cover) are as supplied by the client. Add the Tiney registration reference and keep certificates current.
- **Google rating** (5.0) is as supplied; add `google.count` only once verified. The one review shown is quoted verbatim as supplied.
- **Address postcode**: the Google Business Profile lists E1 4XQ; the client's brief said E2. The site uses E1 4XQ. Confirm which is correct.
- **Still to confirm**: pricing for two-year-olds, and whether home nursery and in-home prices differ.
- **Photography**: the photo band and child cut-out are supplied template material; replace with the nursery's own photographs when available (consent needed for any child shown).
- Draft copy marked `PROVISIONAL` in code awaits approval; the owner biography is intentionally absent.
