import { areas, eastFaqs, faqs, northFaqs, services, site } from './site';

export type PageSeo = { title: string; description: string; noindex?: boolean };

/** Per-route metadata. Titles are kept near 60 characters, descriptions under 160. */
export const seo: Record<string, PageSeo> = {
  '/': {
    title: 'Kids Castle Daycare | Home Nursery East London & Mobile Babysitting',
    description: 'Home nursery in Bethnal Green, registered with Tiney, plus in-home babysitting and nanny care across North London. EYFS play-based learning, Enhanced DBS checked.',
  },
  '/services': {
    title: 'Childcare Services & Hourly Rates | Kids Castle Daycare London',
    description: 'Home nursery in East London and in-home babysitting and nanny care in North London. £25 an hour under 2, £20 an hour age 3+, £35 for two siblings, £180 full day.',
  },
  '/east-london-home-nursery': {
    title: 'Home Nursery & Childminder in Bethnal Green, East London | Kids Castle',
    description: 'Play-based EYFS home nursery in Bethnal Green near Bethnal Green and Cambridge Heath stations. Home-cooked meals, settling-in visits, Enhanced DBS checked.',
  },
  '/north-london-babysitting': {
    title: 'Babysitter & Nanny in North London | In-Home Childcare | Kids Castle',
    description: 'In-home nanny care, evening babysitting and weekend sessions across Islington, Highbury, Stoke Newington, Finsbury Park and Camden. Enhanced DBS checked, no agency fees.',
  },
  '/about': {
    title: 'About Kids Castle | Registered Home Nursery & Babysitting, London',
    description: 'Kids Castle offers a home nursery in Bethnal Green and in-home childcare across North London, registered with Tiney and following the EYFS framework.',
  },
  '/contact': {
    title: 'Enquire | Kids Castle Daycare, Bethnal Green & North London',
    description: 'Send a childcare enquiry in a few steps: type of care, your children’s ages, area, start date and times. We reply directly about availability.',
  },
  '/privacy': { title: 'Privacy notice | Kids Castle Daycare', description: 'How Kids Castle uses the details you send in an enquiry.', noindex: true },
};
export const notFoundSeo: PageSeo = { title: 'Page not found | Kids Castle Daycare', description: 'This page could not be found.', noindex: true };
export const indexableRoutes = Object.entries(seo).filter(([, v]) => !v.noindex).map(([k]) => k);

const faqLd = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
const crumbs = (siteUrl: string, trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl + path })),
});

/** JSON-LD for a route. No aggregateRating or Review markup: the review count is not verified, so it would be invented data. */
export function jsonLd(path: string, siteUrl: string) {
  const a = site.nursery.address;
  const business = {
    '@type': ['ChildCare', 'LocalBusiness'],
    '@id': `${siteUrl}/#business`,
    name: 'Kids Castle Daycare & Home Nursery',
    description: seo['/'].description,
    url: siteUrl || undefined,
    email: site.contact.email ?? undefined,
    address: { '@type': 'PostalAddress', streetAddress: a.line1, addressLocality: a.area + ', ' + a.city, postalCode: a.postcode, addressCountry: 'GB' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'London Borough of Tower Hamlets' },
      ...areas.east.catchments.map((n) => ({ '@type': 'Place', name: n })),
      ...areas.north.catchments.map((n) => ({ '@type': 'Place', name: n })),
    ],
    sameAs: [site.social.facebook, site.google.url],
    knowsAbout: ['Early Years Foundation Stage', 'Childminding', 'Babysitting', 'Nanny care'],
    makesOffer: [
      { name: 'Childcare for children under two', price: '25' },
      { name: 'Childcare for children aged three and over', price: '20' },
      { name: 'Sibling rate for two children', price: '35' },
    ].map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.name }, priceSpecification: { '@type': 'UnitPriceSpecification', price: o.price, priceCurrency: 'GBP', unitText: 'HOUR' } })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Childcare services', itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text, areaServed: s.area } })) },
  };
  const graph: object[] = [business];
  if (path === '/') graph.push(faqLd(faqs));
  if (path === '/east-london-home-nursery') graph.push(faqLd(eastFaqs), crumbs(siteUrl, [['Home', '/'], ['East London home nursery', path]]));
  if (path === '/north-london-babysitting') graph.push(faqLd(northFaqs), crumbs(siteUrl, [['Home', '/'], ['North London babysitting', path]]));
  if (['/services', '/about', '/contact'].includes(path)) graph.push(crumbs(siteUrl, [['Home', '/'], [seo[path].title.split(' | ')[0], path]]));
  return { '@context': 'https://schema.org', '@graph': graph };
}
