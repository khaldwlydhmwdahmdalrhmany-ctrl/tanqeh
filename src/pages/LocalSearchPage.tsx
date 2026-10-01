import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  Clock3,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Store,
} from 'lucide-react';
import type { MouseEvent } from 'react';
import { PRODUCTS } from '../data';
import type { Product } from '../types';
import storefrontPhoto from '../assets/nethal-storefront.webp';
import { BUSINESS_LOCATION } from '../data/businessLocation';
import { pushGtmEvent } from '../lib/gtm';
import { PHONE } from '../lib/schema';
import { breadcrumb, SITE_URL, useSeo } from '../lib/seo';

const PAGE_PATH = '/water-filters-riyadh';
const PAGE_TITLE = 'محل فلاتر وتحلية مياه بالرياض | نثال الحياة';
const PAGE_DESCRIPTION =
  'تبحث عن محل فلاتر أو تحلية مياه في الرياض؟ تواصل مع نثال الحياة، اتصل بنا أو افتح الاتجاهات للوصول إلى الموقع بسهولة.';
const WHATSAPP_NUMBER = PHONE.replace(/\D/g, '');
const DISPLAY_PHONE = (() => {
  const digits = PHONE.replace(/\D/g, '');
  return digits.startsWith('966') && digits.length === 12
    ? `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
    : PHONE;
})();

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

type LocalProductCategory = {
  id: string;
  title: string;
  description: string;
  eyebrow: string;
  product: Product;
  href: string;
};

function makeProductCategory(
  id: string,
  title: string,
  description: string,
  eyebrow: string,
  products: Product[],
  href: string,
): LocalProductCategory | null {
  const product = products[0];
  if (!product) return null;

  return { id, title, description, eyebrow, product, href };
}

const PRODUCT_CATEGORIES = [
  makeProductCategory(
    'home-filters',
    'فلاتر المياه المنزلية و7 مراحل',
    'استعرض فلاتر المياه المنزلية متعددة المراحل، ومنها خيارات 7 مراحل المنشورة في الموقع.',
    'فلاتر منزلية',
    SEVEN_STAGE_PRODUCTS,
    '/home-water-filters#products-section',
  ),
  makeProductCategory(
    'reverse-osmosis',
    'أجهزة تحلية المياه وأنظمة RO',
    'تعرّف على أجهزة ومحطات التحلية بالتناضح العكسي المتاحة ضمن المنتجات المنشورة.',
    'تقنية RO',
    REVERSE_OSMOSIS_PRODUCTS,
    '/home-water-filters#products-section',
  ),
  makeProductCategory(
    'filter-supplies',
    'شمعات الفلاتر ومستلزمات الصيانة',
    'استعرض مستلزمات الفلاتر المنشورة، ومنها أطقم التحلية وفلاتر حماية الغسالات.',
    'مستلزمات الفلاتر',
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
    <div dir="rtl" className="local-search-page">
      <style>{`
        @keyframes local-search-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes local-search-soft-glow {
          0%, 100% { box-shadow: 0 8px 24px rgba(2, 132, 199, .16); }
          50% { box-shadow: 0 12px 32px rgba(2, 132, 199, .3); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .local-search-page .local-search-enter { animation: local-search-rise .65s cubic-bezier(.2,.75,.25,1) both; }
          .local-search-page .local-search-direction-cta { animation: local-search-soft-glow 3.4s ease-in-out infinite; }
        }
        /* Keep the shared fixed header readable on this dark hero, and place its breadcrumb below it. */
        body:has(.local-search-page) #main-header {
          background: rgba(255, 255, 255, .97) !important;
          background-image: none !important;
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(226, 232, 240, .9);
          box-shadow: 0 8px 24px rgba(15, 23, 42, .06);
          padding-top: .55rem !important;
          padding-bottom: .55rem !important;
        }
        .local-search-page > nav[aria-label="مسار التنقل"] {
          padding-top: 5.25rem !important;
        }
        .local-search-page .local-search-contact-card h2 { color: #ffffff !important; }
        .local-search-page .local-search-contact-card p { color: #dbeafe !important; }
        .local-search-page .local-search-store-caption h3 { color: #ffffff !important; }
        .local-search-page .local-search-store-caption p { color: #eff6ff !important; }
        .local-search-page summary::-webkit-details-marker { display: none; }
        .local-search-page details[open] .local-search-faq-answer { animation: local-search-rise .25s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .local-search-page *, .local-search-page *::before, .local-search-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
      <nav className="border-b border-slate-100 bg-white" aria-label="مسار التنقل">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[11px] font-bold text-slate-500 sm:px-6 lg:px-8">
          <Link to="/" className="transition-colors hover:text-blue-700">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" aria-hidden="true" />
          <span className="text-blue-950">محل فلاتر وتحلية مياه في الرياض</span>
        </div>
      </nav>

      <section
        className="relative isolate overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 52%, #0284c7 100%)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div aria-hidden="true" className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-cyan-200/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="local-search-enter relative mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-[76px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white shadow-sm backdrop-blur sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
            محل فلاتر وتحلية مياه في حي النسيم الشرقي — الرياض
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.3] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            محل فلاتر وتحلية مياه في الرياض
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-8 text-sky-50 sm:text-lg sm:leading-9">
            تبحث عن محل فلاتر أو تحلية مياه قريب منك؟ تواصل مع نثال الحياة للتعرّف على خيارات فلاتر
            المياه المنزلية وأجهزة التحلية المتاحة، أو افتح الاتجاهات للوصول إلى المعرض في حي النسيم الشرقي.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-950/20 px-3.5 py-1.5 text-xs font-bold text-sky-100 sm:text-sm">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {BUSINESS_LOCATION.district}
          </div>
          <div className="mx-auto mt-7 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <a
              href={BUSINESS_LOCATION.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="local-search-hero-directions"
              data-page-type="local_search"
              data-cta-location="hero"
              onClick={trackDirections}
              className="local-search-direction-cta inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-extrabold text-sky-900 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 active:translate-y-0 active:scale-[.99] sm:text-base"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" />
              احصل على الاتجاهات
            </a>
            <a
              href={'tel:' + PHONE}
              id="local-search-hero-call"
              data-page-type="local_search"
              data-cta-location="hero"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-sm font-extrabold text-white shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 active:translate-y-0 active:scale-[.99] sm:text-base"
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
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:translate-y-0 active:scale-[.99] sm:text-base"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              تواصل عبر واتساب
            </a>
          </div>
          <p className="mt-5 text-xs font-semibold text-sky-100/90 sm:text-sm">
            فلاتر مياه منزلية، فلاتر 7 مراحل، وأجهزة تحلية متاحة للاستعراض.
          </p>
        </div>
      </section>

      <section id="quick-access" className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="section-subheading-tag">الموقع ووسائل التواصل</span>
            <h2 className="section-heading-main mt-3">كل ما تحتاجه للوصول إلينا</h2>
            <p className="lead-paragraph mt-3">
              العنوان، أوقات العمل، وطرق التواصل المباشر مع نثال الحياة في الرياض.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            <article className="group flex min-h-[285px] flex-col rounded-[24px] border border-slate-200 border-t-4 border-t-sky-600 bg-white p-5 text-right shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:border-t-sky-600 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 transition group-hover:scale-105">
                <Store className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">موقع المحل</h3>
              <p className="mt-2 flex-1 text-sm font-medium leading-7 text-slate-600">
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
                className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 active:scale-[.99]"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                افتح الاتجاهات
              </a>
            </article>

            <article className="group flex min-h-[285px] flex-col rounded-[24px] border border-slate-200 border-t-4 border-t-blue-700 bg-white p-5 text-right shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:border-t-blue-700 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition group-hover:scale-105">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">اتصال مباشر</h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                اسأل فريق المبيعات عن فلاتر المياه وأجهزة التحلية المتاحة قبل الزيارة.
              </p>
              <p className="mt-3 text-sm font-extrabold tracking-wide text-slate-800" dir="ltr">
                {DISPLAY_PHONE}
              </p>
              <a
                href={'tel:' + PHONE}
                id="local-search-access-call"
                data-page-type="local_search"
                data-cta-location="quick_access"
                className="mt-auto inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:scale-[.99]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                اتصل الآن
              </a>
            </article>

            <article className="group flex min-h-[285px] flex-col rounded-[24px] border border-slate-200 border-t-4 border-t-emerald-600 bg-white p-5 text-right shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:border-t-emerald-600 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition group-hover:scale-105">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">واتساب</h3>
              <p className="mt-2 flex-1 text-sm font-medium leading-7 text-slate-600">
                أرسل استفسارك عن محل الفلاتر أو أجهزة تحلية المياه في الرياض.
              </p>
              <a
                href={whatsappLink('أرغب في الاستفسار عن خيارات فلاتر المياه وأجهزة التحلية.')}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-access-whatsapp"
                data-page-type="local_search"
                data-cta-location="quick_access"
                className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:scale-[.99]"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                راسلنا على واتساب
              </a>
            </article>

            <article className="group flex min-h-[285px] flex-col rounded-[24px] border border-slate-200 border-t-4 border-t-amber-500 bg-white p-5 text-right shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:border-t-amber-500 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 transition group-hover:scale-105">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">ساعات العمل</h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                ساعات العمل الفني: {BUSINESS_LOCATION.technicalHours}
              </p>
              <p className="mt-2 flex-1 text-xs font-semibold leading-6 text-slate-500">
                {BUSINESS_LOCATION.supportHours}
              </p>
              <a
                href={whatsappLink('أرغب في التأكد من وقت زيارة معرض نثال الحياة.')}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-access-hours"
                data-page-type="local_search"
                data-cta-location="hours_card"
                className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-extrabold text-amber-900 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 active:scale-[.99]"
              >
                اسأل عن وقت الزيارة
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <article
                key={category.id}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white text-right shadow-[0_10px_34px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_44px_rgba(15,23,42,0.12)]"
              >
                <Link
                  to={category.href}
                  className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-sky-300"
                  aria-label={'استعراض فئة ' + category.title}
                >
                  <img
                    src={category.product.image}
                    alt={category.product.name}
                    className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04] sm:p-7"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute right-4 top-4 rounded-full border border-sky-100 bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-sky-800 shadow-sm backdrop-blur">
                    {category.eyebrow}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                  <h3 className="text-lg font-extrabold leading-8 text-slate-900 sm:text-xl">
                    {category.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-medium leading-7 text-slate-600">
                    {category.description}
                  </p>
                  <Link
                    to={category.href}
                    data-page-type="local_search"
                    data-cta-location="product_category"
                    className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-extrabold text-sky-900 transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 active:scale-[.99]"
                  >
                    استعرض الفئة والمنتجات
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:gap-7 lg:px-8">
          <div className="local-search-contact-card relative isolate flex flex-col justify-center overflow-hidden rounded-[28px] bg-blue-950 p-6 text-white shadow-[0_20px_55px_rgba(15,23,42,0.18)] sm:p-9 lg:p-10">
            <div aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                المعرض في {BUSINESS_LOCATION.district}
              </span>
              <h2
                className="mt-5 text-2xl font-extrabold leading-[1.35] sm:text-3xl"
                style={{ color: '#ffffff' }}
              >
                وصول أسرع وتواصل مباشر
              </h2>
              <p
                className="mt-4 max-w-xl text-sm font-medium leading-8 text-blue-100 sm:text-base"
                style={{ color: '#dbeafe' }}
              >
                إذا كنت تبحث عن محل فلاتر أو تحلية مياه في الرياض، تواصل مع نثال الحياة لمعرفة
                الخيارات المتاحة، أو افتح الاتجاهات للوصول إلى المعرض مباشرة.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={BUSINESS_LOCATION.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="local-search-direct-directions"
                  data-page-type="local_search"
                  data-cta-location="local_contact"
                  onClick={trackDirections}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-blue-950 shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 active:scale-[.99]"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  الاتجاهات
                </a>
                <a
                  href={'tel:' + PHONE}
                  id="local-search-direct-call"
                  data-page-type="local_search"
                  data-cta-location="local_contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 active:scale-[.99]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  اتصل الآن
                </a>
                <a
                  href={whatsappLink('أرغب في الاستفسار عن خيارات فلاتر وتحلية المياه قبل زيارة الموقع.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="local-search-direct-whatsapp"
                  data-page-type="local_search"
                  data-cta-location="local_contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:scale-[.99]"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  واتساب
                </a>
              </div>
            </div>
          </div>

          <figure className="group relative min-h-[300px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_16px_42px_rgba(15,23,42,0.12)] sm:min-h-[360px] lg:min-h-0">
            <img
              src={storefrontPhoto}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl brightness-50"
              loading="lazy"
            />
            <img
              src={storefrontPhoto}
              alt="واجهة معرض نثال الحياة لتنقية المياه في الرياض"
              className="absolute inset-0 h-full w-full object-contain brightness-110 contrast-[1.03] transition duration-700 group-hover:scale-[1.025]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/15 to-transparent" />
            <figcaption className="local-search-store-caption absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <span className="inline-flex rounded-full border border-white/25 bg-blue-950/35 px-3 py-1.5 text-xs font-bold backdrop-blur">
                المعرض الفعلي — الرياض
              </span>
              <h3 className="mt-3 text-xl font-extrabold sm:text-2xl" style={{ color: '#ffffff' }}>
                نثال الحياة لتنقية المياه
              </h3>
              <p
                className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-blue-50"
                style={{ color: '#eff6ff' }}
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {BUSINESS_LOCATION.address}
              </p>
            </figcaption>
          </figure>
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
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-sky-700 px-6 py-4 text-sm font-extrabold text-white shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 active:scale-[.99] sm:text-base"
                >
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  افتح الاتجاهات في الخرائط
                </a>
              </div>
            </div>

            <article className="flex flex-col justify-center rounded-[28px] border border-slate-200 bg-white p-6 text-right shadow-[0_10px_34px_rgba(15,23,42,0.06)] sm:p-8">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-50 px-3.5 py-2 text-xs font-extrabold text-sky-800 ring-1 ring-sky-100">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {BUSINESS_LOCATION.district}
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-slate-900 sm:text-2xl">عنوان المحل</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                {BUSINESS_LOCATION.address}
              </p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="flex items-start gap-3 text-sm font-semibold leading-7 text-slate-700">
                  <Clock3 className="mt-1 h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
                  <span>ساعات العمل الفني: {BUSINESS_LOCATION.technicalHours}</span>
                </p>
              </div>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                افتح الاتجاهات في الخرائط للوصول إلى محل فلاتر المياه في الرياض.
              </p>
              <a
                href={BUSINESS_LOCATION.mapCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="local-search-map-directions-card"
                data-page-type="local_search"
                data-cta-location="map_card"
                onClick={trackDirections}
                className="mt-6 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-sky-700 px-5 py-4 text-sm font-extrabold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 active:scale-[.99] sm:text-base"
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
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-[0_6px_22px_rgba(15,23,42,0.04)] transition duration-200 open:border-sky-200 open:shadow-md sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold leading-7 text-slate-900 marker:content-none sm:text-lg">
                  <span>{item.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-sky-700 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="local-search-faq-answer border-t border-slate-100 pt-4 text-sm font-medium leading-8 text-slate-600 sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
