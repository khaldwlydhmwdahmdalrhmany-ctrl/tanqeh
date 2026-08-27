/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, MessageSquare, Phone } from 'lucide-react';
import { PRODUCTS } from '../data';
import QuoteForm from '../components/QuoteForm';
import FAQs from '../components/FAQs';
import Reviews from '../components/Reviews';
import { useSeo, getCategoryBySlug, breadcrumb, CATEGORIES, SITE_URL } from '../lib/seo';
import { PHONE } from '../lib/schema';

const WHATSAPP = '966553033199';

export default function CategoryPage() {
  const { pathname } = useLocation();
  const category = getCategoryBySlug(pathname.replace(/^\//, ''));

  if (!category) return <Navigate to="/" replace />;

  const products = PRODUCTS.filter((p) => p.type === category.key);
  const path = `/${category.slug}`;

  useSeo({
    title: category.title,
    description: category.description,
    path,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          name: category.h1,
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: `${SITE_URL}/product/${p.id}`,
          })),
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: category.navLabel, path },
        ]),
      ],
    },
  });

  return (
    <div dir="rtl">
      {/* Breadcrumb */}
      <nav className="bg-slate-50 border-b border-slate-150" aria-label="مسار التنقل">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <Link to="/" className="hover:text-blue-700">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-blue-950">{category.navLabel}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <span className="section-subheading-tag">مؤسسة نثال — الرياض</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1e36] leading-tight">
            {category.h1}
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed font-bold max-w-2xl">
            {category.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full max-w-lg">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `السلام عليكم، أرغب بالاستفسار عن ${category.navLabel} لدى مؤسسة نثال.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              استشارة مجانية عبر واتساب
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              اتصل بنا
            </a>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <p className="text-center text-sm font-bold text-slate-500">
              نعمل حالياً على تحديث هذا القسم. تواصل معنا مباشرة وسنساعدك في اختيار الأنسب.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link to={`/product/${p.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {p.isPopular && (
                      <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                        الأكثر طلباً
                      </span>
                    )}
                  </Link>

                  <div className="p-6 text-right flex flex-col gap-3 flex-1">
                    <span className="text-[10px] font-extrabold text-blue-600">{p.brand}</span>

                    <Link to={`/product/${p.id}`}>
                      <h2 className="text-sm font-extrabold text-[#0a1e36] leading-snug hover:text-blue-700 transition-colors">
                        {p.name}
                      </h2>
                    </Link>

                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed flex-1">
                      {p.tagline}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 self-start">
                      <ShieldCheck className="w-3 h-3" />
                      ضمان {p.warrantyYears} سنوات
                    </span>

                    <Link
                      to={`/product/${p.id}`}
                      className="mt-2 bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      التفاصيل وطلب عرض سعر
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Other categories */}
          <div className="mt-16 pt-10 border-t border-slate-150">
            <h2 className="text-sm font-extrabold text-slate-500 mb-4">تصفح أقسامنا الأخرى</h2>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-slate-50 border border-slate-200 text-blue-950 hover:bg-blue-50 hover:border-blue-200 transition-all"
                >
                  {c.navLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reviews />
      <FAQs />
      <QuoteForm selectedProductName="" />
    </div>
  );
}
