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
  // The old flyer phone/email were wrong and are NOT used. Email below was supplied by the client; phone is still unverified.
  contact: { phone: null as string | null, email: '0998.kidscastle@gmail.com' as string | null },
  // Set to a form endpoint (e.g. https://formspree.io/f/xxxx) when approved; until then the form never claims to send.
  formEndpoint: '/api/enquiry' as string,
  // Rating as supplied by the client. The share link could not be read automatically, so keep this in sync with the live profile.
  // Add `count` only once the number of reviews is verified. Review text is not quoted without permission.
  google: { rating: 5 as number | null, url: 'https://share.google/rJ2DfDpKNA2QhcTUC', count: null as number | null },
  social: { facebook: 'https://www.facebook.com/people/Kids-Castle-Daycare/61556896238767/' },
  nursery: {
    // Address as listed on the Google Business Profile (supplied by the client). Flip showFullAddress to false to show the area only.
    address: { line1: '16 Montgomery Lodge', area: 'Bethnal Green', city: 'London', postcode: 'E1 4XQ' },
    showFullAddress: true,
    area: 'Bethnal Green, East London',
  },
  homeVisits: { area: 'North London', note: 'Care takes place in your own home, subject to your requirements and availability.' },
  rates: [
    { label: 'Children under two', value: 'From £25', unit: 'per hour, per child' },
    { label: 'Children aged three and over', value: '£20', unit: 'per hour, per child' },
    { label: 'Two siblings', value: '£35', unit: 'per hour in total' },
    { label: 'Full day (8 hours)', value: '£180', unit: 'per 8-hour day' },
  ],
  ratesToConfirm: [
    'Pricing for two-year-olds.',
    'Whether home nursery and in-home care prices differ.',
  ],
  credentials: [
    'Registered with Tiney, an Ofsted-registered childminder agency',
    'Follows the Early Years Foundation Stage (EYFS)',
    'Enhanced DBS cleared',
    'Paediatric First Aid certified',
    'Public liability cover',
    'Safeguarded premises',
  ],
  // Reviews quoted verbatim from Google (typos kept). Supplied by the client; keep wording exactly as posted.
  reviews: [
    {
      quote: 'I want to say that this place is the most valuable place that I ever been, my grandchildren love to came in and play , and they get to meet Mihaela the key person and she’s totally lovely , her care and learning structure is helping all the parents that they came to her to fell like a family ! If I can describe you’re settings will be supportive. caring, , respectful and resilient little explorator!',
      name: 'A Google review',
      rating: 5,
    },
  ] as { quote: string; name: string; rating?: number }[],
  showReviews: true,
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/east-london-home-nursery', label: 'East London' },
  { to: '/north-london-babysitting', label: 'North London' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export type Service = { id: string; area: string; title: string; text: string; tone: string; scene: number };
export const services: Service[] = [
  { id: 'home-nursery', area: 'East London', title: 'Home Nursery', text: 'Play-based EYFS childminding in a home setting in Bethnal Green, with home-cooked meals. Enquire to check availability.', tone: 'teal', scene: 0 },
  { id: 'babysitting', area: 'North London', title: 'Babysitting', text: 'Evening babysitting in your own home for work or social commitments, billed clearly by the hour with no agency booking fees.', tone: 'orange', scene: 1 },
  { id: 'nanny', area: 'North London', title: 'Nanny Care', text: 'Daytime sole-charge nanny care and after-school pick-ups in your child’s own familiar environment.', tone: 'blue', scene: 2 },
  { id: 'evening-weekend', area: 'North London', title: 'Evening & Weekend', text: 'Evening and scheduled weekend sessions for the times a standard day does not reach. Availability depends on the booking.', tone: 'yellow', scene: 3 },
  { id: 'siblings', area: 'North London', title: 'Sibling Care', text: 'Care for brothers and sisters together, with a combined rate of £35 per hour for two siblings.', tone: 'mint', scene: 4 },
  { id: 'full-day', area: 'North London', title: 'Full-Day Arrangements', text: 'A consistent full day of care for £180 per 8-hour day: developmental EYFS activities, rest, and freshly prepared meals.', tone: 'teal', scene: 5 },
];

/** PROVISIONAL draft copy: a process outline, not a published timetable. */
export const steps = [
  { tag: 'Step 1', title: 'Tell us what you need', text: 'Share the type of care, your children’s ages, the area and the times you have in mind.' },
  { tag: 'Step 2', title: 'We check availability', text: 'Bookings depend on your requirements and our availability, so we confirm before anything is agreed.' },
  { tag: 'Step 3', title: 'Agree the arrangement', text: 'Rates, hours and any sibling arrangement are talked through and confirmed with you.' },
  { tag: 'Step 4', title: 'Care begins', text: 'Little moments start, whether in the East London home nursery or at your own front door.' },
];

export const faqs = [
  { q: 'How is Kids Castle regulated in the UK?', a: 'Kids Castle is registered with Tiney, an Ofsted-registered childminder agency, and follows the Early Years Foundation Stage (EYFS) framework. Care is provided by a Paediatric First Aid certified childminder with Enhanced DBS clearance, with public liability cover and safeguarded premises.' },
  { q: 'Where do I drop my child off, and where can you travel for babysitting?', a: 'The home nursery is at 16 Montgomery Lodge, Bethnal Green, East London. For nanny and evening babysitting bookings we travel to your home across North London, including Islington, Highbury, Angel, Stoke Newington, Finsbury Park, Holloway, Crouch End and the Camden borders.' },
  { q: 'What are your rates?', a: 'Children under two are £25 per hour. Children aged three and over are £20 per hour. Two siblings are £35 per hour in total, and a full day of 8 hours is £180. We are still confirming pricing for two-year-olds and whether home nursery and in-home prices differ.' },
  { q: 'How are meals and allergies managed?', a: 'Full-day placements include home-cooked lunches and healthy snacks. We can cater for vegetarian, vegan and halal diets and specific allergies, prepared in a clean food preparation area.' },
  { q: 'How do settling-in sessions work?', a: 'Before a full placement we arrange short, gradual settling visits so your child can explore the space, get to know their carer and ease in at their own pace.' },
  { q: 'Do you offer evening and weekend care?', a: 'Yes. Evening babysitting and scheduled weekend sessions can be arranged. Bookings depend on your family’s requirements and our availability.' },
  { q: 'Can you look after siblings together?', a: 'Yes. Two siblings are charged at £35 per hour in total.' },
  { q: 'How do I book a space or check availability?', a: 'Use the enquiry form, or email 0998.kidscastle@gmail.com with your child’s age, the schedule you need and your area. We will arrange an introductory call or a visit to the setting.' },
];

/** Daily rhythm at the East London home nursery, as supplied by the client. */
export const dailyRhythm = [
  { time: '08:00 – 09:00', title: 'Welcome and settling', text: 'Welcoming arrivals, gentle free play and a morning greeting circle.' },
  { time: '09:00 – 09:30', title: 'Morning snack', text: 'A healthy snack with fresh water and milk.' },
  { time: '09:30 – 10:45', title: 'Early learning', text: 'EYFS activities: mark-making, building-block construction, counting games and sensory trays.' },
  { time: '10:45 – 11:45', title: 'Outdoors', text: 'Outdoor play, park exploration and active physical play.' },
  { time: '11:45 – 12:30', title: 'Hot lunch', text: 'A freshly prepared hot lunch with relaxed table manners and conversation.' },
  { time: '12:30 – 14:00', title: 'Rest', text: 'Quiet rest, supervised naps in dedicated cot spaces and gentle reading.' },
  { time: '14:00 – 15:15', title: 'Creative time', text: 'Music, nursery rhymes, painting and imaginative play.' },
  { time: '15:15 – 15:45', title: 'Afternoon snack', text: 'A fruit snack and a hydration break.' },
  { time: '15:45 – 17:00', title: 'Free play and home time', text: 'Free-flow indoor play, a daily milestone review and parent handover.' },
];

/** Areas, as supplied by the client. */
export const areas = {
  east: {
    authority: 'London Borough of Tower Hamlets',
    catchments: ['Bethnal Green', 'Shoreditch', 'Globe Town', 'Cambridge Heath', 'Mile End', 'Bow', 'Stepney', 'Victoria Park borders'],
    stations: ['Bethnal Green (Central line)', 'Cambridge Heath (Overground)', 'Bethnal Green (Overground)', 'Whitechapel (Elizabeth line)'],
    postcodes: ['E2', 'E1', 'E3', 'E8', 'E9'],
  },
  north: {
    catchments: ['Islington', 'Highbury', 'Angel', 'Stoke Newington', 'Finsbury Park', 'Holloway', 'Crouch End', 'Camden borders'],
    postcodes: ['N1', 'N5', 'N16', 'N4', 'N7', 'NW1'],
  },
};

export const eastFaqs = [
  { q: 'Where is the home nursery and how do I get there?', a: 'The home nursery is at 16 Montgomery Lodge, Bethnal Green, in the London Borough of Tower Hamlets. Nearby stations include Bethnal Green (Central line and Overground), Cambridge Heath (Overground) and Whitechapel (Elizabeth line), which suits parents commuting towards Liverpool Street, the City or Canary Wharf.' },
  { q: 'Which areas do families come from?', a: 'Families drop off from Bethnal Green, Shoreditch, Globe Town, Cambridge Heath, Mile End, Bow, Stepney and the Victoria Park borders, across the E2, E1, E3, E8 and E9 postcode areas.' },
  { q: 'What does a day at the home nursery look like?', a: 'Days run from welcoming arrivals at 08:00 to parent handover by 17:00, with play-based EYFS learning, outdoor time, a hot lunch, supervised rest and creative play. The full timetable is on this page.' },
  { q: 'How are meals and allergies managed?', a: 'Full-day placements include home-cooked lunches and healthy snacks. We can cater for vegetarian, vegan and halal diets and specific allergies, prepared in a clean food preparation area.' },
  { q: 'How do settling-in sessions work?', a: 'Before a full placement we arrange short, gradual settling visits so your child can explore the space, get to know their carer and ease in at their own pace.' },
  { q: 'What does it cost?', a: 'Children under two are £25 per hour, children aged three and over are £20 per hour, two siblings are £35 per hour in total, and a full day of 8 hours is £180. Pricing for two-year-olds is still being confirmed, so please ask.' },
];

export const northFaqs = [
  { q: 'Where do you travel for babysitting and nanny care?', a: 'We come to your home across North London, including Islington, Highbury, Angel, Stoke Newington, Finsbury Park, Holloway, Crouch End and the Camden borders (N1, N5, N16, N4, N7 and NW1), and surrounding East London neighbourhoods.' },
  { q: 'Are your babysitters and nannies checked?', a: 'Care is provided by a Paediatric First Aid certified childminder with Enhanced DBS clearance, registered with Tiney, an Ofsted-registered childminder agency, and following the EYFS framework. Public liability cover is in place.' },
  { q: 'What kinds of care can I book?', a: 'Daytime sole-charge nanny care, after-school pick-ups, evening babysitting for work or social commitments, and scheduled weekend sessions.' },
  { q: 'Are there agency fees?', a: 'No. Care is billed clearly by the hour, with no ongoing agency membership or booking commission.' },
  { q: 'What are the hourly rates?', a: 'Children under two are £25 per hour, children aged three and over are £20 per hour, and two siblings are £35 per hour in total. Pricing for two-year-olds is still being confirmed, so please ask.' },
  { q: 'How do I check availability?', a: 'Use the enquiry form, or email 0998.kidscastle@gmail.com with your child’s age, the schedule you need and your area. We will arrange an introductory call.' },
];
