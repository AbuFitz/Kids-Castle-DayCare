# Kids Castle Daycare & Home Nursery

Vite + React + TypeScript. Mobile-first CSS, Motion for animation, Embla carousel, Radix accordion, React Hook Form + Zod.

```bash
npm install
npm run dev      # local
npm run build    # type-check + production build (deployed on Vercel)
```

## Editing business facts
Everything editable lives in `src/data/site.ts` (rates, services, FAQs, process steps, contact details, form endpoint, reviews).
`null` or empty values render as honest "being confirmed" states.

## Not yet supplied / provisional
- **Phone and email**: the flyer/old-pack details are known to be wrong and are not published. Set `site.contact` when verified.
- **Enquiry form** is not connected. Set `site.formEndpoint`; until then it shows an explicit "not sent" preview state.
- **Logo** is a provisional clean-vector build (`src/components/Logo.tsx`); replace with repaired master SVGs once the files are available.
- **Photography**: every `ImageSlot` has a `label` (e.g. `hero-photo`, `owner-portrait`) marking where real photos go. Current art is original illustration, not the real setting.
- **Reviews**: add verified quotes to `site.reviews` and set `site.showReviews = true`.
- **Still to confirm**: eight-hour rate application, two-year-old pricing, nursery vs home-visit price difference, nursery reopening date.
