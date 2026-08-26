/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Phone,
  ChevronLeft,
  Sliders,
  Info,
} from 'lucide-react';
import { PRODUCTS } from '../data';
import QuoteForm from '../components/QuoteForm';
import { useSeo, getCategoryByKey, breadcrumb, SITE_URL } from '../lib/seo';
import { productSchema, PHONE } from '../lib/schema';
import tamaraLogo from '@/assets/payment-methods/tamara.svg';
import tabbyLogo from '@/assets/payment-methods/tabby.svg';

const WHATSAPP = '966553033199';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) return <Navigate to="/" replace />;

  const category = getCategoryByKey(product.type);
  const path = `/product/${product.id}`;

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `السلام عليكم، أرغب بطلب هذا المنتج من مؤسسة نثال:\n\n- المنتج: ${product.name}\n- العلامة: ${product.brand}\n- نوع الطلب: تركيب أو عرض سعر\n\nيرجى التواصل معي لتأكيد التفاصيل.`,
  )}`;

  useSeo({
    title: `${product.name} | تركيب وضمان بالرياض — نثال`,
    description: `${product.tagline} ضمان ${product.warrantyYears} سنوات، تركيب فوري في الرياض، وتقسيط عبر تمارا وتابي. اطلب عرض سعر مجاني.`,
    path,
    image: product.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        productSchema({
          name: product.name,
          description: product.tagline,
          brand: product.brand,
          path,
          image: product.image,
        }),
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          ...(category ? [{ name: category.navLabel, path: `/${category.slug}` }] : []),
          { name: product.name, path },
        ]),
      ],
    },
  });

  return (
    <div dir="rtl">
      {/* Breadcrumb */}
      <nav className="bg-slate-50 border-b border-slate-150" aria-label="مسار التنقل">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[11px] font-bold text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-blue-700">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3 h-3" />
          {category && (
            <>
              <Link to={`/${category.slug}`} className="hover:text-blue-700">
                {category.navLabel}
              </Link>
              <ChevronLeft className="w-3 h-3" />
            </>
          )}
          <span className="text-blue-950">{product.name}</span>
        </div>
      </nav>

      {/* Main product block */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.isPopular && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                    الأكثر طلباً
                  </span>
                )}
              </div>

              {product.videoUrl && (
                <video
                  src={product.videoUrl}
                  controls
                  playsInline
                  preload="none"
                  poster={product.image}
                  className="w-full mt-4 rounded-3xl border border-slate-200 bg-slate-900"
                >
                  متصفحك لا يدعم تشغيل الفيديو.
                </video>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-6 flex flex-col gap-5 text-right">
              <span className="section-subheading-tag self-start">{product.brand}</span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1e36] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-slate-700 leading-relaxed font-bold">
                {product.tagline}
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl px-3 py-1.5 text-[11px] font-extrabold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ضمان {product.warrantyYears} سنوات
                </span>
                {product.stagesCount && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl px-3 py-1.5 text-[11px] font-extrabold">
                    <Sliders className="w-3.5 h-3.5" />
                    {product.stagesCount} مراحل فلترة
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-extrabold">
                  تركيب فوري في الرياض
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  data-product-id={product.id}
                >
                  <MessageSquare className="w-5 h-5" />
                  اطلب عرض سعر عبر واتساب
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  اتصل بنا الآن
                </a>
              </div>

              {/* Installments */}
              <div className="flex items-center gap-2.5 mt-1">
                <span className="text-[11px] font-bold text-slate-500">
                  أو بالتقسيط بدون فوائد عبر:
                </span>
                <div className="bg-[#FFF9E6] rounded-xl px-3 border border-[#FFE299]/40 flex items-center h-8 overflow-hidden">
                  <img src={tamaraLogo} alt="تمارا" className="h-12 w-auto object-contain -my-3" />
                </div>
                <div className="bg-[#E5FFF3] rounded-xl px-3 border border-[#99FFCC]/40 flex items-center h-8 overflow-hidden">
                  <img src={tabbyLogo} alt="تابي" className="h-14 w-auto object-contain -my-4" />
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 bg-slate-50 rounded-3xl border border-slate-150 p-6">
                <h2 className="text-base font-extrabold text-[#0a1e36] flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  المميزات الرئيسية
                </h2>
                <ul className="flex flex-col gap-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                      <span className="text-xs text-slate-700 leading-relaxed font-bold">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specs table */}
          <div className="mt-12 lg:mt-16">
            <h2 className="text-lg font-extrabold text-[#0a1e36] flex items-center gap-2 mb-5">
              <Info className="w-5 h-5 text-blue-600" />
              المواصفات التفصيلية
            </h2>
            <div className="rounded-3xl border border-slate-200 overflow-hidden">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-4 ${
                    i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                  }`}
                >
                  <span className="text-xs font-extrabold text-blue-950">{spec.label}</span>
                  <span className="sm:col-span-2 text-xs text-slate-700 font-bold leading-relaxed">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Related products */}
          {category && (
            <RelatedProducts currentId={product.id} type={product.type} label={category.navLabel} slug={category.slug} />
          )}
        </div>
      </section>

      {/* Lead form pre-filled with this product */}
      <QuoteForm selectedProductName={product.name} />
    </div>
  );
}

function RelatedProducts({
  currentId,
  type,
  label,
  slug,
}: {
  currentId: string;
  type: string;
  label: string;
  slug: string;
}) {
  const related = PRODUCTS.filter((p) => p.type === type && p.id !== currentId).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-lg font-extrabold text-[#0a1e36]">أجهزة أخرى في {label}</h2>
        <Link
          to={`/${slug}`}
          className="text-xs font-extrabold text-blue-700 hover:text-blue-900 flex items-center gap-1"
        >
          عرض الكل
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden bg-slate-50">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 text-right">
              <span className="text-[10px] font-extrabold text-blue-600">{p.brand}</span>
              <h3 className="text-sm font-extrabold text-[#0a1e36] mt-1 leading-snug">{p.name}</h3>
              <p className="text-[11px] text-slate-600 font-bold mt-2 leading-relaxed line-clamp-2">
                {p.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
