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
- **Type**: Fredoka (display, echoes the chunky rounded wordmark) and Albert Sans (body/UI), both OFL via Fontsource.
- **Hero bricks**: `src/components/BrickMark.tsx` uses the traced brick parts (`brickPaths.ts`, generated).

## Rebuilding the logo
`scripts/logo/trace.py` classifies each pixel of the reference raster against the logo's five colours, restricting each colour to the region where it genuinely occurs (this removes the yellow/navy fringe fragments), smooths at 4x, drops specks, and traces curves with potrace. `build_pack.py` composes the variants. Needs Python with `potracer`, `scipy`, `numpy`, `pillow`, `fonttools`, `brotli`.

Caveats: traced from a low-resolution raster, so letterforms are smoothed reconstructions, not the designer's original outlines. "DAYCARE & HOME NURSERY" is new typography (Nunito ExtraBold outlines) awaiting approval. The logo's teal (`#4eb5a0`) differs slightly from the brand token teal (`#179A97`).

## Not yet supplied / provisional
- **Photography**: none is used. Real photos (the owner, the home nursery, activities) are needed as files. Only use images with the owner's consent and, for any child shown, parental consent. The `Photo` component (`src/components/Motion.tsx`) is ready for them.
- **Phone and email**: the flyer/old-pack details are known to be wrong and are not published. Set `site.contact` once verified.
- **Enquiry form** is not connected. Set `site.formEndpoint`; until then it shows an explicit "not sent" preview state.
- **Address** `16 Montgomery Lodge, Bethnal Green, London E1 4XQ` is as supplied from the Google Business Profile. Set `site.nursery.showFullAddress = false` to show the area only.
- **Reviews**: add verified quotes to `site.reviews` and set `site.showReviews = true`.
- **Still to confirm with the client**: how the eight-hour rate applies, two-year-old pricing, nursery vs home-visit price difference, nursery reopening date, regulator registration (none is claimed).
- Draft copy marked `PROVISIONAL` in code awaits approval; the owner biography is intentionally absent.
