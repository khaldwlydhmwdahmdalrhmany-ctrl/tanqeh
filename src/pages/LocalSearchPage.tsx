import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Droplets,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Store,
} from 'lucide-react';
import type { MouseEvent } from 'react';
import { PRODUCTS } from '../data';
import type { Product } from '../types';
import { BUSINESS_LOCATION } from '../data/businessLocation';
import { pushGtmEvent } from '../lib/gtm';
import { PHONE } from '../lib/schema';
import { breadcrumb, SITE_URL, useSeo } from '../lib/seo';

const PAGE_PATH = '/water-filters-riyadh';
const PAGE_TITLE = 'محل فلاتر وتحلية مياه بالرياض | نثال الحياة';
const PAGE_DESCRIPTION =
  'تبحث عن محل فلاتر أو تحلية مياه في الرياض؟ تواصل مع نثال الحياة، اتصل بنا أو افتح الاتجاهات للوصول إلى الموقع بسهولة.';
const WHATSAPP_NUMBER = PHONE.replace(/\D/g, '');

const FILTER_PRODUCTS = PRODUCTS.filter((product) => product.type === 'filter');
const SEVEN_STAGE_PRODUCTS = FILTER_PRODUCTS.filter((product) => product.stagesCount === 7);
const REVERSE_OSMOSIS_PRODUCTS = FILTER_PRODUCTS.filter((product) => {
  const searchableText = [
    product.name,
    product.tagline,
    ...product.features,
    ...product.specs.map((spec) => spec.label + ' ' + spec.value),
  ].join(' ');

  return /\bRO\b|reverse\s+osmosis|التناضح العكسي/i.test(searchableText);
});
const FILTER_ACCESSORY_PRODUCTS = PRODUCTS.filter((product) => product.type === 'maintenance');
const FEATURED_PRODUCT =
  FILTER_PRODUCTS.find((product) => product.brand === 'PureRena') ?? FILTER_PRODUCTS[0];

type LocalProductCategory = {
  id: string;
  title: string;
  description: string;
  count: number;
  product: Product;
  href: string;
};

function makeProductCategory(
  id: string,
  title: string,
  description: string,
  products: Product[],
  href: string,
): LocalProductCategory | null {
  const product = products[0];
  if (!product) return null;

  return { id, title, description, count: products.length, product, href };
}

const PRODUCT_CATEGORIES = [
  makeProductCategory(
    'home-filters',
    'فلاتر المياه وأجهزة التحلية',
    'تعرّف على فلاتر وأجهزة التحلية المنشورة ضمن منتجات نثال الحياة.',
    FILTER_PRODUCTS,
    '/filters',
  ),
  makeProductCategory(
    'seven-stage',
    'فلاتر 7 مراحل',
    'خيارات مدرجة لفلاتر التحلية ذات السبع مراحل، مع تفاصيل كل منتج.',
    SEVEN_STAGE_PRODUCTS,
    '/home-water-filters#products-section',
  ),
  makeProductCategory(
    'reverse-osmosis',
    'أنظمة RO والتناضح العكسي',
    'أنظمة ومحطات تحلية بالتناضح العكسي مدرجة ضمن المنتجات.',
    REVERSE_OSMOSIS_PRODUCTS,
    '/home-water-filters#products-section',
  ),
  makeProductCategory(
    'filter-supplies',
    'الفلاتر والمستلزمات',
    'فلاتر ومستلزمات مياه منشورة، ومنها أطقم التحلية وفلاتر حماية الغسالات.',
    FILTER_ACCESSORY_PRODUCTS,
    '/maintenance',
  ),
].filter((category): category is LocalProductCategory => category !== null);

function whatsappLink(message: string) {
  return (
    'https://wa.me/' +
    WHATSAPP_NUMBER +
    '?text=' +
    encodeURIComponent('السلام عليكم، ' + message)
  );
}

function trackDirections(event: MouseEvent<HTMLAnchorElement>) {
  const link = event.currentTarget;
  pushGtmEvent('click_directions', {
    element_id: link.id || 'local_search_directions',
    page_type: 'local_search',
    cta_location: link.dataset.ctaLocation || 'unknown',
    page_path: window.location.pathname,
  });
}

export default function LocalSearchPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': SITE_URL + PAGE_PATH,
          url: SITE_URL + PAGE_PATH,
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          about: { '@id': SITE_URL + '/#organization' },
          mainEntity: { '@id': SITE_URL + '/#organization' },
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: 'محل فلاتر وتحلية مياه في الرياض', path: PAGE_PATH },
        ]),
      ],
    },
  });

  const faqItems = [
    {
      question: 'أين أجد محل فلاتر مياه في الرياض؟',
      answer:
        'يمكنك الوصول إلى نثال الحياة من خلال زر الاتجاهات في هذه الصفحة أو التواصل مباشرة عبر الاتصال وواتساب.',
    },
    {
      question: 'هل يمكنني التواصل قبل زيارة المحل؟',
      answer:
        'نعم، استخدم وسائل التواصل الظاهرة في الصفحة للاستفسار عن الخيارات المتاحة قبل الزيارة.',
    },
    {
      question: 'كيف أصل إلى موقع نثال الحياة؟',
      answer:
        'استخدم زر «احصل على الاتجاهات» لفتح الموقع في خدمة الخرائط المرتبطة بالموقع.',
    },
  ];

  return (
    <div dir="rtl">
      <nav className="border-b border-slate-100 bg-white" aria-label="مسار التنقل">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[11px] font-bold text-slate-500 sm:px-6 lg:px-8">
          <Link to="/" className="transition-colors hover:text-blue-700">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" aria-hidden="true" />
          <span className="text-blue-950">محل فلاتر وتحلية مياه في الرياض</span>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
        <div className="absolute -left-24 -top-28 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              نثال الحياة — الرياض
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:mx-0 lg:text-5xl">
              محل فلاتر وتحلية مياه في الرياض
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-7 text-blue-100 sm:text-base sm:leading-8 lg:mx-0">
              تبحث عن محل فلاتر أو تحلية مياه قريب منك؟ تواصل مع نثال الحياة وتعرّف على الخيارات
              المتاحة، أو افتح الاتجاهات للوصول إلى الموقع مباشرة.
            </p>
            <p className="mt-3 text-xs font-extrabold text-sky-200 sm:text-sm">
              {BUSINESS_LOCATION.district}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <a
                href={BUSINESS_LOCATION.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-hero-directions"
                data-page-type="local_search"
                data-cta-location="hero"
                onClick={trackDirections}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-blue-950 shadow-lg transition-colors hover:bg-blue-50 sm:w-auto"
              >
                <Navigation className="h-5 w-5" aria-hidden="true" />
                احصل على الاتجاهات
              </a>
              <a
                href={'tel:' + PHONE}
                id="local-search-hero-call"
                data-page-type="local_search"
                data-cta-location="hero"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-white/15 sm:w-auto"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                اتصل الآن
              </a>
              <a
                href={whatsappLink('أرغب في معرفة خيارات فلاتر وتحلية المياه وموقع المعرض في الرياض.')}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-hero-whatsapp"
                data-page-type="local_search"
                data-cta-location="hero"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
              >
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                واتساب
              </a>
            </div>
          </div>

          {FEATURED_PRODUCT && (
            <figure className="mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/20 bg-white/10 shadow-2xl">
                <img
                  src={FEATURED_PRODUCT.image}
                  alt={FEATURED_PRODUCT.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/95 via-blue-950/60 to-transparent px-5 pb-5 pt-16 text-right sm:px-7 sm:pb-7">
                  <span className="text-xs font-extrabold text-sky-200">
                    من خيارات الفلاتر المنشورة
                  </span>
                  <div className="mt-2 text-lg font-extrabold leading-7 text-white sm:text-xl">
                    {FEATURED_PRODUCT.name}
                  </div>
                </div>
              </div>
            </figure>
          )}
        </div>
      </section>

      <section id="quick-access" className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="section-subheading-tag">الموقع ووسائل التواصل</span>
            <h2 className="section-heading-main mt-3">كل ما تحتاجه للوصول إلينا</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right shadow-sm sm:p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Store className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-extrabold text-blue-950">موقع المحل</h3>
              <p className="mt-2 flex-1 text-sm font-bold leading-7 text-slate-600">
                {BUSINESS_LOCATION.address}
              </p>
              <a
                href={BUSINESS_LOCATION.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-access-directions"
                data-page-type="local_search"
                data-cta-location="quick_access"
                onClick={trackDirections}
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-blue-800"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                احصل على الاتجاهات
              </a>
            </article>

            <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right shadow-sm sm:p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-extrabold text-blue-950">اتصل بنا</h3>
              <p className="mt-2 flex-1 text-sm font-bold leading-7 text-slate-600">
                تواصل مع فريق نثال الحياة للاستفسار عن الخيارات المنشورة قبل زيارتك.
              </p>
              <a
                href={'tel:' + PHONE}
                id="local-search-access-call"
                data-page-type="local_search"
                data-cta-location="quick_access"
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-extrabold text-blue-800 transition-colors hover:bg-blue-50"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                اتصل الآن
              </a>
            </article>

            <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-right shadow-sm sm:p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-extrabold text-blue-950">ساعات العمل</h3>
              <p className="mt-2 text-sm font-bold leading-7 text-slate-600">
                ساعات العمل الفني: {BUSINESS_LOCATION.technicalHours}
              </p>
              <p className="mt-1 text-xs font-bold leading-6 text-slate-500">
                {BUSINESS_LOCATION.supportHours}
              </p>
              <a
                href={whatsappLink('أرغب في الاستفسار عن خيارات فلاتر المياه قبل زيارة المحل.')}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-access-whatsapp"
                data-page-type="local_search"
                data-cta-location="quick_access"
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                واتساب
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="local-products" className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="section-subheading-tag">فئات المنتجات المنشورة</span>
            <h2 className="section-heading-main mt-3">حلول فلاتر وتحلية المياه في مكان واحد</h2>
            <p className="lead-paragraph mt-4">
              استعرض الفئات المتاحة فعليًا في الموقع واختر ما يناسب احتياجك.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((category) => (
              <article
                key={category.id}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white text-right shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
              >
                <Link
                  to={category.href}
                  className="relative block aspect-[4/3] overflow-hidden bg-blue-50"
                  aria-label={'استعراض فئة ' + category.title}
                >
                  <img
                    src={category.product.image}
                    alt={category.product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-extrabold text-blue-900 shadow-sm">
                    {category.count.toLocaleString('ar-SA')} منتجات منشورة
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-base font-extrabold leading-7 text-blue-950">
                    {category.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-bold leading-7 text-slate-600">
                    {category.description}
                  </p>
                  <Link
                    to={category.href}
                    data-page-type="local_search"
                    data-cta-location="product_category"
                    className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-extrabold text-blue-800 transition-colors hover:bg-blue-100"
                  >
                    استعرض المنتجات
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="rounded-[28px] bg-blue-950 p-6 text-white shadow-xl sm:p-9">
            <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
              محل فلاتر وتحلية في الرياض
            </span>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
              وصول أسرع وتواصل مباشر
            </h2>
            <p className="mt-4 text-sm font-bold leading-7 text-blue-100 sm:text-base sm:leading-8">
              إذا كان هدفك العثور على محل فلاتر أو تحلية مياه في الرياض، يمكنك التواصل مباشرة مع
              نثال الحياة أو استخدام الاتجاهات للوصول إلى الموقع دون خطوات إضافية.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={BUSINESS_LOCATION.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-direct-directions"
                data-page-type="local_search"
                data-cta-location="local_contact"
                onClick={trackDirections}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-blue-950 transition-colors hover:bg-blue-50"
              >
                <Navigation className="h-5 w-5" aria-hidden="true" />
                احصل على الاتجاهات
              </a>
              <a
                href={'tel:' + PHONE}
                id="local-search-direct-call"
                data-page-type="local_search"
                data-cta-location="local_contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-white/15"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                اتصل الآن
              </a>
              <a
                href={whatsappLink('أرغب في الاستفسار عن خيارات فلاتر وتحلية المياه قبل زيارة الموقع.')}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-direct-whatsapp"
                data-page-type="local_search"
                data-cta-location="local_contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                واتساب
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-blue-950 sm:text-2xl">
              موقع واضح وخيارات موثقة
            </h2>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-600">
              اعرف موقع المحل قبل الانطلاق، واستعرض فئات المنتجات المسجلة في الموقع، أو اسأل فريق
              نثال عن الخيارات المتاحة قبل الزيارة.
            </p>
            <div className="mt-5 space-y-3">
              <p className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                <span>{BUSINESS_LOCATION.address}</span>
              </p>
              <p className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
                <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                <span>فلاتر منزلية، أجهزة تحلية، فلاتر مراحل ومستلزمات مدرجة في الموقع.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="local-map" className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="section-subheading-tag">الخريطة والموقع</span>
            <h2 className="section-heading-main mt-3">اعرف موقع نثال الحياة في الرياض</h2>
            <p className="lead-paragraph mt-4">
              افتح الاتجاهات في الخرائط للوصول إلى موقع المعرض في حي النسيم الشرقي.
            </p>
          </div>

          <div className="grid items-stretch gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:gap-7">
            <div className="relative min-h-[280px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 shadow-lg sm:min-h-[360px]">
              <iframe
                title="موقع مؤسسة نثال لتنقية المياه على خرائط جوجل"
                src={BUSINESS_LOCATION.mapEmbedUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full pointer-events-none"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-950/10 p-4">
                <a
                  href={BUSINESS_LOCATION.mapCardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="local-search-map-directions"
                  data-page-type="local_search"
                  data-cta-location="map"
                  onClick={trackDirections}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-xl transition-colors hover:bg-blue-800"
                >
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  افتح الاتجاهات في الخرائط
                </a>
              </div>
            </div>

            <article className="flex flex-col justify-center rounded-[28px] border border-slate-200 bg-white p-6 text-right shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-blue-950">موقع المعرض</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-600">
                {BUSINESS_LOCATION.address}
              </p>
              <p className="mt-4 text-sm font-bold leading-7 text-slate-600">
                افتح الموقع في خرائط جوجل لبدء الاتجاهات من مكانك.
              </p>
              <a
                href={BUSINESS_LOCATION.mapCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-map-directions-card"
                data-page-type="local_search"
                data-cta-location="map_card"
                onClick={trackDirections}
                className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 text-sm font-extrabold text-white transition-colors hover:bg-blue-800"
              >
                <Navigation className="h-5 w-5" aria-hidden="true" />
                افتح الاتجاهات في الخرائط
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <span className="section-subheading-tag">أسئلة شائعة</span>
            <h2 className="section-heading-main mt-3">أسئلة عن زيارة محل فلاتر المياه</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-extrabold text-blue-950">
                  {item.question}
                </summary>
                <p className="pt-4 text-sm font-bold leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


