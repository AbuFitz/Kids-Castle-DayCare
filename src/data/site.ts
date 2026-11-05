/**
 * Single source of truth for every editable business fact.
 * Anything marked OWNER-APPROVAL is draft wording awaiting Mihaela's sign-off.
 * `null` values are facts not yet supplied and render as honest "get in touch" states.
 */
export const site = {
  name: 'Kids Castle',
  /** Registered trading name: used for the logo, titles and legal documents. */
  fullName: 'Kids Castle Daycare & Home Nursery',
  /** What is actually offered: the descriptor for services, never implying premises-based care. */
  descriptor: 'Nanny & babysitting services',
  tagline: 'Little moments. Big beginnings.',
  intro: 'Warm, personal childcare in the comfort of your own home. Caring for little ones from 6 months to 10 years.',
  owner: 'Mihaela Oliva',
  ages: '6 months to 10 years',
  /** Enquiries: the form, a business phone number and WhatsApp on that number. No email address is published. */
  formEndpoint: '/api/enquiry',
  phone: { display: '07467 500497', tel: '+447467500497', whatsapp: 'https://wa.me/447467500497?text=Hello%20Kids%20Castle%2C%20I%27d%20like%20to%20ask%20about%20childcare.' },
  ofsted: {
    number: '2861033',
    registered: '14 July 2026',
    category: 'Home Childcarer (voluntary part of the Childcare Register)',
    /** Ofsted's official report/registration search; search by the registration number. */
    searchUrl: 'https://reports.ofsted.gov.uk/',
    statement: 'Mihaela Oliva is registered with Ofsted as a home childcarer on the voluntary part of the Childcare Register. Registration number: 2861033.',
  },
  google: { rating: 5, url: 'https://share.google/rJ2DfDpKNA2QhcTUC' },
  facebook: 'https://www.facebook.com/people/Kids-Castle-Daycare/61556896238767/',
  /** Not published anywhere on the site: kept for the owner's records only. */
  private: { registeredAddress: 'Flat 16 Montgomery Lodge, 3 Cleveland Grove, Bethnal Green, London E1 4XQ', email: '0998.kidscastle@gmail.com' },
  /** Rates are NOT published until the owner approves them. Kept here for later use; nothing reads this on the public site. */
  unapprovedRates: [
    { label: 'Children under two', value: 'From £25', unit: 'per hour, per child' },
    { label: 'Children aged three and over', value: '£20', unit: 'per hour, per child' },
    { label: 'Two siblings', value: '£35', unit: 'per hour in total' },
    { label: 'Full day (8 hours)', value: '£180', unit: 'per 8-hour day' },
  ],
  ratesNote: 'Childcare rates depend on your family’s requirements, the ages of the children and the hours of care needed. Send an enquiry to talk through your arrangement.',
};

/** From Mihaela's own public flyer (OWNER-APPROVAL before launch: ask for certificates). Listed as she wrote them. */
export const training = [
  'Preschool Education: The Reggio Emilia Approach (Certificate)',
  'Advanced Training in Child Counselling (QLS Level 6)',
  'Child Development & Brain Development (Certificate)',
  'Safeguarding (Child Protection Training)',
  'Designated Safeguarding Lead (DSL)',
  'Prevent Awareness (UK Government)',
];
/** Also from her flyer: what a session can include. */
export const alongside = [
  'Planning fun and engaging activities',
  'Supporting early learning and development',
  'Healthy meals and snacks',
  'Outdoor play and creative play',
  'Gentle, positive guidance and routine',
];

/** Areas covered, with real coordinates so the illustrative map places them correctly relative to each other. */
export const areas = [
  { name: 'Angel', lat: 51.5322, lon: -0.1058, tone: 'tangerine', label: 'below' },
  { name: 'Islington', lat: 51.5362, lon: -0.1031, tone: 'teal', label: 'right' },
  { name: 'Camden borders', lat: 51.539, lon: -0.143, tone: 'sky', label: 'right' },
  { name: 'Highbury', lat: 51.546, lon: -0.103, tone: 'sun', label: 'right' },
  { name: 'Holloway', lat: 51.553, lon: -0.114, tone: 'mint', label: 'left' },
  { name: 'Finsbury Park', lat: 51.564, lon: -0.106, tone: 'tangerine', label: 'left' },
  { name: 'Stoke Newington', lat: 51.564, lon: -0.073, tone: 'sky', label: 'below' },
  { name: 'Crouch End', lat: 51.58, lon: -0.123, tone: 'teal', label: 'right' },
] as const;

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Our Services' },
  { to: '/about', label: 'About Us' },
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
  { title: 'Direct communication', text: 'You talk straight to the people looking after your children, before and after every booking.' },
  { title: 'A familiar home', text: 'Your children stay in their own surroundings, with their own toys, routines and bedtime.' },
  { title: 'Fits your routine', text: 'Days, hours and routines are talked through and agreed with you before care begins.' },
  { title: 'No agency in between', text: 'You deal with Kids Castle directly, so arrangements stay simple and personal.' },
];

/** PROVISIONAL process outline (OWNER-APPROVAL): describes how an enquiry is handled, not a timetable. */
export const steps = [
  { title: 'Send an enquiry', text: 'Tell us the type of care, your children’s ages, your area and when you need care.' },
  { title: 'We talk it through', text: 'We reply to discuss availability and what your family needs.' },
  { title: 'Agree the arrangement', text: 'Hours, routines and rates are agreed with you before anything starts.' },
];

/** Generic, publicly available good practice for choosing any childcare. Not a claim about Kids Castle. */
export const beforeYouBook = [
  { title: 'Check the registration', text: 'Ask any provider for their Ofsted registration number and look it up on Ofsted’s website.' },
  { title: 'Talk through a typical day', text: 'Share your routines, mealtimes, naps and bedtimes so everyone expects the same thing.' },
  { title: 'Agree the practical details', text: 'Hours, rates, notice and who to call in an emergency are best settled in writing before the first session.' },
  { title: 'Meet and ask questions', text: 'A short conversation first helps you and your children feel comfortable.' },
];

export const faqs = [
  { q: 'Where does the childcare take place?', a: 'In your own home. Care at Mihaela’s own address is awaiting clarification from Ofsted and is not currently offered.' },
  { q: 'What ages do you care for?', a: 'Children from 6 months to 10 years old, including brothers and sisters together.' },
  { q: 'How much does childcare cost?', a: 'Rates depend on your family’s requirements, the ages of the children and the hours of care needed. Send an enquiry and we will talk through your arrangement.' },
  { q: 'How do I check availability?', a: 'Use the enquiry form with the type of care, your children’s ages, your area and the days or hours you have in mind. We will reply to talk it through.' },
  { q: 'Do you cover my area?', a: 'We work in London, including the North London areas on the map. If you are close by but not listed, send an enquiry and ask.' },
  { q: 'Is Kids Castle registered?', a: 'Yes, you can find our registration details on the About page.' },
];

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
