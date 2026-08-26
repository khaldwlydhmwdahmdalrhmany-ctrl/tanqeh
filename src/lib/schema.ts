/**
 * Structured data (Schema.org) shared across routes.
 * Helps Google understand the business and show rich results.
 */

import { SITE_URL, SITE_NAME } from './seo';

export const PHONE = '+966553033199';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'نثال',
  url: SITE_URL,
  telephone: PHONE,
  description:
    'مؤسسة سعودية متخصصة في تركيب وصيانة فلاتر ومحطات تحلية المياه، برادات وموزعات المياه، وأنظمة الرذاذ والتبريد الخارجي في مدينة الرياض.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'الرياض',
    addressRegion: 'منطقة الرياض',
    addressCountry: 'SA',
  },
  areaServed: {
    '@type': 'City',
    name: 'الرياض',
  },
  availableLanguage: ['ar', 'en'],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
      ],
      opens: '09:00',
      closes: '22:00',
    },
  ],
};

/** Product schema without price (quote-based business model). */
export function productSchema(opts: {
  name: string;
  description: string;
  brand: string;
  path: string;
  image?: string;
  warranty?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    brand: { '@type': 'Brand', name: opts.brand },
    url: `${SITE_URL}${opts.path}`,
    ...(opts.image ? { image: `${SITE_URL}${opts.image}` } : {}),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'SAR',
      url: `${SITE_URL}${opts.path}`,
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };
}
