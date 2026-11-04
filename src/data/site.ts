/**
 * Single source of truth for every editable business fact.
 * Anything marked OWNER-APPROVAL is draft wording awaiting Mihaela's sign-off.
 * `null` values are facts not yet supplied and render as honest "get in touch" states.
 */
export const site = {
  name: 'Kids Castle',
  /** Public-facing positioning, as confirmed by the owner. */
  descriptor: 'Nanny & Babysitting Services',
  /** Business name as registered with Google; used in legal documents and the footer only. */
  legalName: 'Kids Castle Daycare & Home Nursery',
  tagline: 'Little moments. Big beginnings.',
  intro: 'Warm, personal childcare in the comfort of your own home. Caring for little ones from 6 months to 10 years.',
  provider: 'Mihaela Oliva',
  ages: '6 months to 10 years',
  contact: { phone: null as string | null, email: '0998.kidscastle@gmail.com' },
  formEndpoint: '/api/enquiry',
  /** Registered address, used in the legal documents only. Childcare at this address is awaiting clarification from Ofsted and is not advertised. */
  registeredAddress: ['Flat 16 Montgomery Lodge', '3 Cleveland Grove', 'Bethnal Green', 'London E1 4XQ', 'United Kingdom'],
  ofsted: {
    number: '2861033',
    registered: '14 July 2026',
    category: 'Home Childcarer (voluntary part of the Childcare Register)',
    /** Ofsted's official report/registration search; search by the registration number. */
    searchUrl: 'https://reports.ofsted.gov.uk/',
    statement: 'Mihaela Oliva is registered with Ofsted as a home childcarer on the voluntary part of the Childcare Register. Registration number: 2861033.',
  },
  google: { rating: 5, count: 9, url: 'https://share.google/rJ2DfDpKNA2QhcTUC' },
  social: { facebook: 'https://www.facebook.com/people/Kids-Castle-Daycare/61556896238767/' },
  /** Rates are NOT published until the owner approves them. Kept here for later use; nothing reads this on the public site. */
  unapprovedRates: [
    { label: 'Children under two', value: 'From £25', unit: 'per hour, per child' },
    { label: 'Children aged three and over', value: '£20', unit: 'per hour, per child' },
    { label: 'Two siblings', value: '£35', unit: 'per hour in total' },
    { label: 'Full day (8 hours)', value: '£180', unit: 'per 8-hour day' },
  ],
  ratesNote: 'Childcare rates depend on your family’s requirements, the ages of the children and the hours of care needed. Get in touch to discuss your arrangement.',
  areaNote: 'London, including North London',
  areas: ['Islington', 'Highbury', 'Angel', 'Stoke Newington', 'Finsbury Park', 'Holloway', 'Crouch End', 'Camden borders'],
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Our Services' },
  { to: '/about', label: 'About Mihaela' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

export type Service = { id: string; title: string; text: string; where: string; tone: 'teal' | 'tangerine' | 'sky' | 'sun' | 'mint' };
/** Descriptions only restate confirmed facts: care is in the family's own home, availability and hours are agreed with the parent. */
export const services: Service[] = [
  { id: 'nanny', title: 'Nanny care', tone: 'teal', where: 'In your home', text: 'Regular care for your children in your own home, on the days and hours that suit your family.' },
  { id: 'babysitting', title: 'Babysitting', tone: 'tangerine', where: 'In your home', text: 'Someone you can talk to directly, looking after your children at home when you need an evening or a few hours.' },
  { id: 'evening-weekend', title: 'Evening & weekend care', tone: 'sky', where: 'In your home', text: 'Care outside the usual working day. Availability depends on the booking and is confirmed with you first.' },
  { id: 'full-day', title: 'Full-day childcare', tone: 'sun', where: 'In your home', text: 'A full day of care at home, with the hours and routine agreed with you beforehand.' },
  { id: 'siblings', title: 'Sibling care', tone: 'mint', where: 'In your home', text: 'Brothers and sisters looked after together, whatever their ages between 6 months and 10 years.' },
];

export const why = [
  { title: 'Direct communication', text: 'You speak to Mihaela herself, before and after every booking. No agency in between.' },
  { title: 'A familiar home', text: 'Your children stay in their own surroundings, with their own toys, routines and bedtime.' },
  { title: 'Personal attention', text: 'One carer getting to know your family, rather than a rota of different faces.' },
  { title: 'Arranged with you', text: 'Days, hours and routines are talked through and agreed with you before care begins.' },
];

/** PROVISIONAL process outline (OWNER-APPROVAL): describes how an enquiry is handled, not a timetable. */
export const steps = [
  { title: 'Send an enquiry', text: 'Tell Mihaela the type of care, your children’s ages, your area and when you need care.' },
  { title: 'Talk it through', text: 'Mihaela replies to discuss availability and what your family needs.' },
  { title: 'Agree the arrangement', text: 'Hours, routines and rates are agreed with you before anything starts.' },
];

export const faqs = [
  { q: 'Where does the childcare take place?', a: 'In your own home. Care at Mihaela’s own address is awaiting clarification from Ofsted and is not currently offered.' },
  { q: 'Who will look after my children?', a: 'Mihaela Oliva. She works independently and is the only childcare provider; there is no team or agency behind Kids Castle.' },
  { q: 'What ages do you care for?', a: 'Children from 6 months to 10 years old, including brothers and sisters together.' },
  { q: 'How is Mihaela registered?', a: site_ofsted_answer() },
  { q: 'How much does childcare cost?', a: 'Rates depend on your family’s requirements, the ages of the children and the hours of care needed. Get in touch to discuss your arrangement.' },
  { q: 'How do I check availability?', a: 'Send an enquiry through the form or email 0998.kidscastle@gmail.com with the type of care, your children’s ages, your area and the days or hours you have in mind. Mihaela will reply to talk it through.' },
];
function site_ofsted_answer() {
  return 'Mihaela Oliva is registered with Ofsted as a home childcarer on the voluntary part of the Childcare Register (registration number 2861033). This is a registration, not an inspection grade. You can check it on Ofsted’s website.';
}

/**
 * The nine Google reviews, quoted exactly as posted (spelling and punctuation kept).
 * Source: the Google Business Profile, retrieved 2026-11-04. Dates are not shown because Google only gives relative dates.
 * `note` flags wording the owner may want to review before these stay public (references to a nursery, staff or premises).
 * `lead` marks reviews used as highlights on the Home and About pages.
 */
export type Review = { id: string; name: string; text: string; lead?: boolean; note?: string };
export const reviews: Review[] = [
  { id: 'adelin', name: 'Adelin Bejenaru', lead: true, text: 'Mihaela is a truly wonderful person with a big heart and a genuine passion for working with children. Her dedication, patience and love for little ones are reflected in everything she does. Kids Castle Daycare is a lovely, safe and welcoming environment where children can learn, play, grow and feel loved. You can truly see how much effort, care and attention Mihaela puts into her work every single day. Her kindness, professionalism and commitment make a real difference in children\'s lives. Highly recommended! ❤️ Thank you, Mihaela, for everything you do!' },
  { id: 'alexandra', name: 'Alexandra Demian', lead: true, text: 'An absolutely wonderful nanny! ❤️ She is kind, caring, patient, and truly amazing with children. She creates a warm, safe, and loving environment where little ones feel happy and comfortable. Her dedication, kindness, and genuine love for children really shine through. I would highly recommend her to any family looking for someone trustworthy, reliable, and truly special! 🌸' },
  { id: 'madhu', name: 'madhu shalini', lead: true, text: 'Mihaela is an amazing person! My daughter loves her and so does Michaela. I love the way she cares all the kids! She makes every kid feel special and home.' },
  { id: 'larisa', name: 'Larisa Oliva', text: 'When is about our kids the first thing in mind is there safety and security, also an happy environment! When we choose Kids Castle daycare we see that my kids will be loved, cared and supported through all aspects!' },
  { id: 'irina', name: 'Irina Oliva', note: 'Refers to "this place" and children coming in to play, which suggests premises.', text: 'I want to say that this place is the most valuable place that I ever been, my grandchildren love to came in and play , and they get to meet Mihaela the key person and she’s totally lovely , her care and learning structure is helping all the parents that they came to her to fell like a family ! If I can describe you’re settings will be supportive. caring, , respectful and resilient little explorator!' },
  { id: 'cristina', name: 'Cristina Ivan', note: 'Says the child loves to come "at your house", which suggests care at Mihaela’s home.', text: 'I highly recommend. I can t thank you enough for your help and for the way you take care of my son! He loves to come at your house ! He is very happy every times I take him there! 🥰🥰' },
  { id: 'miha', name: 'Miha Tecu', note: 'Describes a "nursery" and "staff".', text: 'Absolutely lovely nursery! ❤️ The staff are so caring, kind and welcoming. I have complete peace of mind knowing my little one is happy, safe and well looked after. Couldn\'t recommend them enough! ❤️' },
  { id: 'yasin', name: 'Yasin Dewan', note: 'Describes a "nursery" and "staff".', text: 'Kids Castle Daycare and Nursery is a wonderful place for children! The staff are incredibly kind, caring, friendly, and professional. They create a warm, safe, and welcoming environment where children can feel happy, comfortable, and confident. A special thank you to the lovely lady mihaela who runs the nursery for her hard work and dedication. I would highly recommend Kids Castle Daycare and Nursery to any parent looking for a caring and trustworthy place for their child.' },
  { id: 'rabbi', name: 'Rabbi Uddin', note: 'Describes a "children\'s care centre" and a "team".', text: 'A wonderful children\'s care centre with a warm, friendly and caring team. The staff are very supportive, helpful and kind. Highly recommended for their excellent service' },
];
