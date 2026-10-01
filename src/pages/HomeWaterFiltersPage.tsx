import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  MessageSquare,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { PRODUCTS } from '../data';
import type { Product } from '../types';
import { breadcrumb, SITE_URL, useSeo } from '../lib/seo';
import { PHONE } from '../lib/schema';

const PAGE_PATH = '/home-water-filters';
const WHATSAPP_NUMBER = PHONE.replace(/\D/g, '');
const FILTER_PRODUCTS = PRODUCTS.filter((product) => product.type === 'filter');
const SEVEN_STAGE_PRODUCTS = FILTER_PRODUCTS.filter((product) => product.stagesCount === 7);

const REVERSE_OSMOSIS_PRODUCTS = FILTER_PRODUCTS.filter((product) => {
  const searchableText = [
    product.name,
    product.brand,
    product.tagline,
    ...product.features,
    ...product.specs.map((spec) => spec.label + ' ' + spec.value),
  ].join(' ');

  return /\bRO\b|reverse\s+osmosis|التناضح العكسي/i.test(searchableText);
});

type ProductFilterId = 'all' | 'seven-stage' | 'reverse-osmosis';

const PRODUCT_FILTERS: {
  id: ProductFilterId;
  label: string;
  products: Product[];
}[] = [
  {
    id: 'all',
    label: 'فلاتر وأجهزة التحلية',
    products: FILTER_PRODUCTS,
  },
  ...(SEVEN_STAGE_PRODUCTS.length > 0
    ? [
        {
          id: 'seven-stage' as const,
          label: 'فلاتر 7 مراحل',
          products: SEVEN_STAGE_PRODUCTS,
        },
      ]
    : []),
  ...(REVERSE_OSMOSIS_PRODUCTS.length > 0
    ? [
        {
          id: 'reverse-osmosis' as const,
          label: 'أنظمة RO والتناضح العكسي',
          products: REVERSE_OSMOSIS_PRODUCTS,
        },
      ]
    : []),
];

function whatsappLink(message: string) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

export default function HomeWaterFiltersPage() {
  const [selectedFilter, setSelectedFilter] = useState<ProductFilterId>('all');
  const activeFilter =
    PRODUCT_FILTERS.find((filter) => filter.id === selectedFilter) ?? PRODUCT_FILTERS[0];
  const featuredProduct =
    FILTER_PRODUCTS.find((product) => product.brand === 'PureRena') ?? FILTER_PRODUCTS[0];

  useSeo({
    title: 'فلاتر مياه منزلية وأجهزة تحلية | نثال الحياة',
    description:
      'استعرض فلاتر المياه المنزلية وأجهزة التحلية والخيارات المتاحة لدى نثال الحياة، وتواصل معنا لمعرفة المنتج المناسب لاحتياجك.',
    path: PAGE_PATH,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          name: 'فلاتر المياه وأجهزة التحلية',
          numberOfItems: FILTER_PRODUCTS.length,
          itemListElement: FILTER_PRODUCTS.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: product.name,
            url: SITE_URL + '/product/' + product.id,
          })),
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: 'فلاتر المياه وأجهزة التحلية', path: PAGE_PATH },
        ]),
      ],
    },
  });

  const faqItems = [
    {
      question: 'ما الفرق بين فلاتر المياه المنزلية والأنظمة متعددة المراحل؟',
      answer:
        'تختلف الخيارات في نوع النظام ومراحله والمواصفات المسجلة لكل منتج. راجع تفاصيل المنتجات المتاحة، أو تواصل مع فريق نثال للمساعدة في اختيار الحل المناسب لاحتياجك.',
    },
    ...(SEVEN_STAGE_PRODUCTS.length > 0
      ? [
          {
            question: 'هل تتوفر لديكم فلاتر مياه 7 مراحل؟',
            answer:
              'تظهر المنتجات المسجلة بسبع مراحل ضمن فئة «فلاتر 7 مراحل» في هذه الصفحة. تواصل معنا لتأكيد الخيارات والتوفر الحالي.',
          },
        ]
      : []),
    {
      question: 'كيف أعرف السعر الحالي؟',
      answer:
        'تواصل معنا عبر واتساب أو الاتصال لمعرفة الخيارات والأسعار المتاحة حاليًا.',
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
          <span className="text-blue-950">فلاتر المياه وأجهزة التحلية</span>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-12 text-white md:py-20">
        <div className="absolute -left-24 -top-28 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl text-center lg:text-right">
            <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
              خيارات المنتجات المتاحة لدى نثال الحياة
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              فلاتر مياه منزلية وأجهزة تحلية
            </h1>
            <p className="mt-5 text-sm font-bold leading-8 text-blue-100 sm:text-base">
              استعرض خيارات فلاتر وتحلية المياه المتاحة لدى نثال الحياة، واختر الفئة المناسبة لاحتياج منزلك أو تواصل معنا للمساعدة في اختيار الحل المناسب.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#products-section"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-blue-950 transition-colors hover:bg-blue-50"
              >
                استعرض المنتجات
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappLink('السلام عليكم، أرغب في الاستفسار عن فلاتر المياه المنزلية وأجهزة التحلية المتاحة لدى نثال الحياة، ومعرفة الخيارات والأسعار الحالية.')}
                target="_blank"
                rel="noopener noreferrer"
                data-page-type="product_landing"
                data-cta-location="hero"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                تواصل عبر واتساب
              </a>
              <a
                href={'tel:' + PHONE}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                اتصل بنا
              </a>
            </div>
          </div>

          {featuredProduct && (
            <Link
              to={'/product/' + featuredProduct.id}
              className="group relative mx-auto block w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-2xl"
              aria-label={'عرض تفاصيل ' + featuredProduct.name}
            >
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                loading="eager"
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-right sm:p-7">
                <span className="text-xs font-extrabold text-sky-200">
                  {featuredProduct.brand}
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                  {featuredProduct.name}
                </h2>
                <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-blue-950">
                  تفاصيل المنتج
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="section-subheading-tag">تصفح حسب الفئة</span>
            <h2 className="section-heading-main mt-3">اختر الفئة التي تبحث عنها</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={
                    'flex min-h-[92px] items-center justify-between gap-4 rounded-2xl border p-5 text-right transition-all ' +
                    (isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50')
                  }
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ' +
                        (isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-blue-700')
                      }
                    >
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-blue-950">
                        {filter.label}
                      </span>
                      <span className="mt-1 block text-xs font-bold text-slate-500">
                        {filter.products.length.toLocaleString('ar-SA')} منتجات
                      </span>
                    </span>
                  </span>
                  <ArrowLeft className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="products-section" className="scroll-mt-8 bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">بيانات المنتجات الحالية</span>
            <h2 className="section-heading-main mt-3" aria-live="polite">
              {selectedFilter === 'all' ? 'المنتجات المتاحة' : activeFilter.label}
            </h2>
            <p className="lead-paragraph">
              اعرض مواصفات كل منتج وتواصل معنا للاستفسار عن السعر أو خيارات التركيب المتاحة.
            </p>
          </div>

          {activeFilter.products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeFilter.products.map((product) => (
                <article
                  key={product.id}
                  className="flex overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex w-full flex-col">
                    <Link
                      to={'/product/' + product.id}
                      className="group relative block aspect-[4/3] overflow-hidden bg-slate-100"
                      aria-label={'عرض تفاصيل ' + product.name}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-6 text-right">
                      <span className="text-[10px] font-extrabold text-blue-600">
                        {product.brand}
                      </span>
                      <Link
                        to={'/product/' + product.id}
                        className="mt-2 text-base font-extrabold text-blue-950 transition-colors hover:text-blue-700"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-2 text-xs font-bold leading-6 text-slate-600">
                        {product.tagline}
                      </p>

                      {(product.stagesCount || product.warrantyYears) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {product.stagesCount && (
                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold text-blue-800">
                              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                              {product.stagesCount} مراحل
                            </span>
                          )}
                          {product.warrantyYears && (
                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-extrabold text-emerald-800">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              ضمان {product.warrantyYears} {product.warrantyYears === 1 ? 'سنة' : 'سنوات'}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <span className="mb-3 block text-[11px] font-extrabold text-slate-700">
                          من مواصفات المنتج
                        </span>
                        <ul className="space-y-2">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-xs font-semibold leading-6 text-slate-600"
                            >
                              <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto flex flex-col gap-2 pt-6">
                        <a
                          href={whatsappLink('السلام عليكم، أرغب في الاستفسار عن المنتج: ' + product.name + ' (' + product.brand + ')، ومعرفة السعر وخيارات التركيب المتاحة.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-product-id={product.id}
                          data-product-name={product.name}
                          data-service-type={product.type}
                          data-page-type="product_landing"
                          data-cta-location="product_card"
                          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-extrabold text-white transition-colors hover:bg-emerald-700"
                        >
                          <MessageSquare className="h-4 w-4" aria-hidden="true" />
                          اسأل عن المنتج عبر واتساب
                        </a>
                        <Link
                          to={'/product/' + product.id}
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-extrabold text-blue-900 transition-colors hover:border-blue-200 hover:bg-blue-50"
                        >
                          تفاصيل المنتج
                          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-slate-600">
              لا توجد منتجات مسجلة ضمن هذه الفئة حاليًا.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-[26px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <span className="section-subheading-tag">دليل اختيار مبسّط</span>
            <h2 className="section-heading-main mt-3 text-right">
              كيف تختار فلتر المياه المناسب؟
            </h2>
            <p className="mt-4 text-sm font-bold leading-8 text-slate-600">
              يعتمد الاختيار على احتياج المنزل ونوع النظام المطلوب والخيارات المتاحة. يمكنك مراجعة المنتجات في الصفحة أو التواصل مع فريق نثال الحياة لمعرفة الأنسب من المنتجات المتوفرة فعليًا.
            </p>
          </article>

          <article className="flex flex-col justify-center rounded-[26px] bg-blue-950 p-6 text-white sm:p-8">
            <span className="text-xs font-extrabold text-sky-300">الأسعار والعروض المتاحة</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              اسأل عن السعر الحالي للمنتج الذي يناسبك
            </h2>
            <p className="mt-3 text-sm font-bold leading-7 text-blue-100">
              تواصل معنا لمعرفة الخيارات والأسعار المتاحة حاليًا.
            </p>
            <a
              href={whatsappLink('السلام عليكم، أود معرفة أسعار وخيارات فلاتر المياه وأجهزة التحلية المتاحة حاليًا لدى نثال الحياة.')}
              target="_blank"
              rel="noopener noreferrer"
              data-page-type="product_landing"
              data-cta-location="price_section"
              className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              اسأل عن السعر عبر واتساب
            </a>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 text-center">
            <span className="section-subheading-tag">أسئلة شائعة</span>
            <h2 className="section-heading-main mt-3">قبل اختيار المنتج</h2>
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
                <p className="pt-4 text-sm font-bold leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink('السلام عليكم، أحتاج مساعدة في اختيار فلتر مياه أو جهاز تحلية مناسب لاحتياجي.')}
              target="_blank"
              rel="noopener noreferrer"
              data-page-type="product_landing"
              data-cta-location="faq_section"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              تواصل عبر واتساب
            </a>
            <a
              href={'tel:' + PHONE}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-blue-950 transition-colors hover:bg-slate-100"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              اتصل بنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
