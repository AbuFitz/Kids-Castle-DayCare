import { faqs, services, site } from './site';

export type PageSeo = { title: string; description: string; noindex?: boolean };

/** Per-route metadata. Titles are kept near 60 characters, descriptions under 160. */
export const seo: Record<string, PageSeo> = {
  '/': {
    title: 'Kids Castle Daycare & Home Nursery | Nanny & Babysitting in London',
    description: 'Warm, personal nanny and babysitting care in your own home across North London. Children from 6 months to 10 years. Send an enquiry to talk through your family’s needs.',
  },
  '/services': {
    title: 'Nanny & Babysitting Services | Kids Castle Daycare & Home Nursery',
    description: 'Nanny care, babysitting, evening and weekend care, full-day childcare and sibling care in your own home. Rates depend on your family’s needs: send an enquiry to discuss.',
  },
  '/about': {
    title: 'About Kids Castle Daycare & Home Nursery | London Nanny Care',
    description: 'Kids Castle provides personal nanny and babysitting care in the family home for children aged 6 months to 10 years. Registration details and how we work.',
  },
  '/reviews': {
    title: 'Parent Reviews | Kids Castle Daycare & Home Nursery',
    description: 'Read what parents say about Kids Castle, quoted exactly as posted on Google, with a link to our Google Business Profile.',
  },
  '/contact': {
    title: 'Enquire About Childcare | Kids Castle Daycare & Home Nursery',
    description: 'Send a childcare enquiry: type of care, your children’s ages, area and the days you need. We reply directly to talk it through.',
  },
  '/privacy': { title: 'Privacy Notice | Kids Castle', description: 'How Kids Castle collects and uses the personal information you send in an enquiry.' },
  '/cookies': { title: 'Cookie Notice | Kids Castle', description: 'Kids Castle does not use cookies or tracking on this website. Here is what that means.' },
  '/terms': { title: 'Website Terms of Use | Kids Castle', description: 'The terms for using the Kids Castle website.' },
  '/accessibility': { title: 'Accessibility Statement | Kids Castle', description: 'How accessible the Kids Castle website is, how it was tested and how to report a problem.' },
  '/complaints': { title: 'Complaints Information | Kids Castle', description: 'How to raise a concern or complaint about Kids Castle, and how to contact Ofsted.' },
  '/booking-terms': { title: 'Childcare Booking Terms (Draft) | Kids Castle', description: 'Draft booking terms for Kids Castle childcare, awaiting owner approval.', noindex: true },
};
export const notFoundSeo: PageSeo = { title: 'Page not found | Kids Castle', description: 'This page could not be found.', noindex: true };
export const indexableRoutes = Object.entries(seo).filter(([, v]) => !v.noindex).map(([k]) => k);

/** Old routes that no longer apply. vercel.json issues a 301 for each; this map is the single source for it. */
export const redirects: Record<string, string> = {
  '/east-london-home-nursery': '/services',
  '/north-london-babysitting': '/services',
};

const faqLd = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
const crumbs = (siteUrl: string, trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl + path })),
});

/**
 * JSON-LD for a route. No address (childcare at the registered address is not offered), no aggregateRating or Review markup,
 * and no prices (rates are unapproved).
 */
export function jsonLd(path: string, siteUrl: string) {
  const business = {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#business`,
    name: site.fullName,
    alternateName: 'Kids Castle',
    description: seo['/'].description,
    url: siteUrl || undefined,
    telephone: site.phone.tel,
    areaServed: { '@type': 'City', name: 'London' },
    serviceType: ['Nanny care', 'Babysitting'],
    sameAs: [site.facebook, site.google.url],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Childcare services', itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })) },
  };
  const graph: object[] = [business];
  if (path === '/services') graph.push(faqLd(faqs));
  if (path !== '/') graph.push(crumbs(siteUrl, [['Home', '/'], [seo[path]?.title.split(' | ')[0] ?? 'Page', path]]));
  return { '@context': 'https://schema.org', '@graph': graph };
}
