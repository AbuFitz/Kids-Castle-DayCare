/**
 * Single source of truth for every editable business fact.
 * status: 'verified' may ship as-is; 'provisional' is draft copy awaiting client approval;
 * `null` values are blocking facts (not yet supplied) and render as honest "to be confirmed" states.
 */
export const site = {
  name: 'Kids Castle',
  descriptor: 'Daycare & Home Nursery',
  tagline: 'Little moments. Big beginnings.',
  intro:
    'Warm home nursery care in East London, with flexible babysitting and nanny services for families in North London.',
  // Existing flyer/older-pack phone & email are known to be wrong and must NOT be published.
  contact: { phone: null as string | null, email: null as string | null },
  // Set to a form endpoint (e.g. https://formspree.io/f/xxxx) when approved; until then the form never claims to send.
  formEndpoint: '' as string,
  social: { facebook: 'https://www.facebook.com/people/Kids-Castle-Daycare/61556896238767/' },
  nursery: {
    area: 'Bethnal Green, East London',
    status: 'Currently being renovated. No reopening date has been confirmed.',
  },
  homeVisits: { area: 'North London', note: 'Care takes place in your own home, subject to your requirements and availability.' },
  rates: [
    { label: 'Children under two', value: 'From £25', unit: 'per hour, per child' },
    { label: 'Children aged three and over', value: '£20', unit: 'per hour, per child' },
    { label: 'Two siblings', value: '£35', unit: 'per hour in total' },
    { label: 'Eight-hour arrangement', value: '£180', unit: 'see note below' },
  ],
  ratesToConfirm: [
    'How the eight-hour rate applies.',
    'Pricing for two-year-olds.',
    'Whether nursery and home-visit prices differ.',
  ],
  reviews: [] as { quote: string; name: string; role?: string }[], // only verified parent reviews, once approved
  showReviews: false,
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export type Service = { id: string; area: string; title: string; text: string; tone: string; scene: number };
export const services: Service[] = [
  { id: 'home-nursery', area: 'East London', title: 'Home Nursery', text: 'Childminding in a home setting in Bethnal Green. The setting is being renovated, so please enquire about future availability.', tone: 'teal', scene: 0 },
  { id: 'babysitting', area: 'North London', title: 'Babysitting', text: 'Hourly care in your own home, arranged around what your family needs and when you need it.', tone: 'orange', scene: 1 },
  { id: 'nanny', area: 'North London', title: 'Nanny Care', text: 'Care in your own home that can be arranged around your family’s routine and availability.', tone: 'blue', scene: 2 },
  { id: 'evening-weekend', area: 'North London', title: 'Evening & Weekend', text: 'Evening and weekend cover for the times a standard day does not reach. Availability depends on the booking.', tone: 'yellow', scene: 3 },
  { id: 'siblings', area: 'North London', title: 'Sibling Care', text: 'Care for brothers and sisters together, with a combined rate of £35 per hour for two siblings.', tone: 'mint', scene: 4 },
  { id: 'full-day', area: 'North London', title: 'Full-Day Arrangements', text: 'Longer days arranged in advance. An eight-hour arrangement is listed at £180; how it applies is being confirmed.', tone: 'teal', scene: 5 },
];

/** PROVISIONAL draft copy: a process outline, not a published timetable. */
export const steps = [
  { tag: 'Step 1', title: 'Tell us what you need', text: 'Share the type of care, your children’s ages, the area and the times you have in mind.' },
  { tag: 'Step 2', title: 'We check availability', text: 'Bookings depend on your requirements and our availability, so we confirm before anything is agreed.' },
  { tag: 'Step 3', title: 'Agree the arrangement', text: 'Rates, hours and any sibling arrangement are talked through and confirmed with you.' },
  { tag: 'Step 4', title: 'Care begins', text: 'Little moments start, whether in the East London home nursery or at your own front door.' },
];

export const faqs = [
  { q: 'Where is the home nursery?', a: 'The home nursery setting is in Bethnal Green, East London.' },
  { q: 'Is the nursery open at the moment?', a: 'The nursery is currently undergoing renovations. We have not confirmed a reopening date, so please send an enquiry and we will let you know when there is news.' },
  { q: 'Where do you offer babysitting and nanny care?', a: 'Babysitting and nanny services are provided in North London, in your own home. We have not confirmed coverage in other parts of London.' },
  { q: 'What are your rates?', a: 'Children under two are from £25 per hour per child and children aged three and over are £20 per hour per child. Two siblings are £35 per hour in total. An eight-hour arrangement is £180. We are still confirming pricing for two-year-olds and whether nursery and home-visit prices differ.' },
  { q: 'Do you offer evening and weekend care?', a: 'Evening and weekend care may be available. Bookings depend on your family’s requirements and our availability.' },
  { q: 'Can you look after siblings together?', a: 'Yes. Two siblings are charged at £35 per hour in total.' },
  { q: 'How do I make an enquiry?', a: 'Use the enquiry form and tell us the type of care, your children’s ages and the times you need. Our phone number and email are being updated, so the form is the best route for now.' },
];
