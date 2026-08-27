/**
 * SEO helpers.
 *
 * Every route gets its own <title>, meta description and canonical URL.
 * This is what Google Ads reads when scoring "Landing page experience",
 * and what Google Search shows in results.
 */

import { useEffect } from 'react';

export const SITE_URL = 'https://www.nithalalhayaa.com';
export const SITE_NAME = 'مؤسسة نثال لتنقية وتحلية المياه';

export type CategoryKey = 'filter' | 'cooler' | 'mist' | 'maintenance';

interface CategoryMeta {
  slug: string;
  key: CategoryKey;
  navLabel: string;
  h1: string;
  intro: string;
  title: string;
  description: string;
}

/** Category landing pages — one per Google Ads ad group. */
export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'filters',
    key: 'filter',
    navLabel: 'فلاتر وأجهزة تحلية',
    h1: 'فلاتر وأجهزة تحلية المياه في الرياض',
    intro:
      'أجهزة تحلية منزلية وتجارية بـ 6 و7 مراحل ومحطات RO مركزية، مع تركيب فوري في الرياض وضمان يصل إلى 5 سنوات وصيانة دورية مجدولة.',
    title: 'فلاتر وأجهزة تحلية المياه بالرياض | تركيب وضمان — نثال',
    description:
      'أجهزة تحلية مياه 6 و7 مراحل ومحطات RO مركزية للمنازل والمطاعم في الرياض. تركيب فوري، ضمان حتى 5 سنوات، تقسيط عبر تمارا وتابي. اطلب فحصاً مجانياً.',
  },
  {
    slug: 'coolers',
    key: 'cooler',
    navLabel: 'برادات وموزعات مياه',
    h1: 'برادات وموزعات مياه بفلتر تحلية مدمج',
    intro:
      'برادات ذكية متصلة مباشرة بشبكة المياه مع فلترة داخلية — وداعاً لقوارير المياه الثقيلة في المكاتب والمنازل والمقاهي.',
    title: 'برادات وموزعات مياه بفلتر مدمج بالرياض — نثال',
    description:
      'برادات مياه ذكية بفلتر تحلية داخلي متصلة بشبكة المياه، للمكاتب والمنازل والمقاهي في الرياض. تركيب وصيانة وضمان معتمد. اطلب عرض سعر مجاني.',
  },
  {
    slug: 'mist',
    key: 'mist',
    navLabel: 'أنظمة رذاذ وتبريد',
    h1: 'أنظمة رذاذ وتبريد خارجي للحدائق والقصور',
    intro:
      'خطوط رذاذ وتبريد ضبابي مائي لتلطيف حرارة الجلسات الخارجية والاستراحات والكافيهات، بتصميم وتنفيذ مخصص لكل مساحة.',
    title: 'أنظمة رذاذ وتبريد خارجي بالرياض | تركيب مخصص — نثال',
    description:
      'تركيب أنظمة رذاذ وتبريد ضبابي للحدائق والقصور والاستراحات والكافيهات في الرياض. تصميم مخصص لكل مساحة مع ضمان وصيانة. احجز معاينة مجانية.',
  },
  {
    slug: 'maintenance',
    key: 'maintenance',
    navLabel: 'الصيانة وقطع الغيار',
    h1: 'صيانة الفلاتر وقطع الغيار الأصلية',
    intro:
      'أطقم شمعات أصلية وفلاتر حماية الغسالات وخدمة تبديل دوري مجدولة، مع تذكير آلي عبر الواتساب بمواعيد الصيانة.',
    title: 'صيانة فلاتر المياه وتبديل الشمعات بالرياض — نثال',
    description:
      'صيانة فلاتر ومحطات تحلية المياه بالرياض، أطقم شمعات أصلية، فلاتر حماية الغسالات، وتذكير آلي بمواعيد التبديل. اطلب زيارة فني الآن.',
  },
];

export function getCategoryBySlug(slug?: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByKey(key: CategoryKey) {
  return CATEGORIES.find((c) => c.key === key);
}

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
  image?: string;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Applies title, description, canonical, Open Graph and optional JSON-LD
 * for the current route. Cleans the JSON-LD up when the route changes.
 */
export function useSeo({ title, description, path, jsonLd, image }: SeoOptions) {
  const schemaKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('name', 'description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'ar_SA');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (image) {
      const abs = image.startsWith('http') ? image : `${SITE_URL}${image}`;
      setMeta('property', 'og:image', abs);
      setMeta('name', 'twitter:image', abs);
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-route-schema', 'true');
      script.textContent = schemaKey;
      document.head.appendChild(script);
    }

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [title, description, path, image, schemaKey]);
}

/** Breadcrumb JSON-LD builder. */
export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
