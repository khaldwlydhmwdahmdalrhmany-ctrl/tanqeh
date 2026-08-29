/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, MessageSquare, ShieldCheck, Wrench, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data';
import QuoteForm from '../components/QuoteForm';
import Reviews from '../components/Reviews';
import { useSeo, getCategoryBySlug, breadcrumb, SITE_URL } from '../lib/seo';
import { SERVICE_LANDING_CONTENT } from '../data/serviceLanding';

const WHATSAPP = '966553033199';

export default function CategoryPage() {
  const { pathname } = useLocation();
  const category = getCategoryBySlug(pathname.replace(/^\//, ''));
  if (!category) return <Navigate to="/" replace />;

  const content = SERVICE_LANDING_CONTENT[category.key];
  const products = PRODUCTS.filter((product) => product.type === category.key);
  const path = `/${category.slug}`;
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `السلام عليكم، أرغب في الاستفسار عن ${category.navLabel} لدى مؤسسة نثال ومعرفة السعر وخيارات التنفيذ.`,
  )}`;

  useSeo({
    title: category.title,
    description: category.description,
    path,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Service', name: category.h1, description: category.description, provider: { '@type': 'Organization', name: 'مؤسسة نثال' } },
        { '@type': 'ItemList', name: category.h1, numberOfItems: products.length, itemListElement: products.map((product, index) => ({ '@type': 'ListItem', position: index + 1, name: product.name, url: `${SITE_URL}/product/${product.id}` })) },
        breadcrumb([{ name: 'الرئيسية', path: '/' }, { name: category.navLabel, path }]),
      ],
    },
  });

  const tracking = {
    'data-page-type': 'service_landing',
    'data-service-type': category.key,
  };

  return (
    <div dir="rtl">
      <nav className="bg-slate-50 border-b border-slate-150" aria-label="مسار التنقل">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <Link to="/" className="hover:text-blue-700">الرئيسية</Link><ChevronLeft className="w-3 h-3" />
          <span className="text-blue-950">{category.navLabel}</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-right space-y-5">
            <span className="inline-flex px-4 py-2 rounded-full bg-sky-400/10 border border-sky-300/20 text-sky-200 text-xs font-extrabold">{content.eyebrow}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">{category.h1}</h1>
            <p className="text-blue-100 text-sm sm:text-base leading-8 font-bold max-w-2xl">{content.valueProposition}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#lead-form-section" className="bg-white text-blue-950 hover:bg-blue-50 font-extrabold px-6 py-4 rounded-2xl flex items-center justify-center gap-2">{content.heroCta}<ArrowLeft className="w-4 h-4" /></a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" {...tracking} data-cta-location="hero" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-4 rounded-2xl flex items-center justify-center gap-2"><MessageSquare className="w-5 h-5" />اسأل عبر واتساب</a>
            </div>
          </div>
          <div className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl p-7">
            <h2 className="text-xl font-extrabold mb-5">{content.problemsTitle}</h2>
            <div className="space-y-4">{content.problems.map((problem) => <div key={problem} className="flex items-start gap-3 text-sm font-bold text-blue-50"><CheckCircle2 className="w-5 h-5 text-sky-300 shrink-0" /><span>{problem}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10"><span className="section-subheading-tag">قيمة عملية من البداية</span><h2 className="section-heading-main mt-3">حل مصمم لاحتياجك، لا مجرد منتج</h2></div>
          <div className="grid md:grid-cols-3 gap-6">{content.benefits.map((benefit) => <article key={benefit.title} className="p-7 rounded-3xl bg-slate-50 border border-slate-100"><div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4"><Wrench className="w-5 h-5" /></div><h3 className="text-lg font-extrabold text-blue-950 mb-2">{benefit.title}</h3><p className="text-sm font-bold leading-7 text-slate-600">{benefit.description}</p></article>)}</div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"><div><span className="section-subheading-tag">حلول مرتبطة بالخدمة</span><h2 className="section-heading-main mt-3">خيارات مختارة لـ {category.navLabel}</h2></div><a href="#lead-form-section" className="text-blue-700 font-extrabold text-sm">لست متأكداً؟ اطلب ترشيحاً مجانياً ←</a></div>
          {products.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{products.map((product) => <article key={product.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 flex flex-col"><Link to={`/product/${product.id}`} className="aspect-[4/3] bg-slate-100 overflow-hidden"><img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" /></Link><div className="p-6 flex flex-col flex-1"><span className="text-[10px] text-blue-600 font-extrabold">{product.brand}</span><h3 className="font-extrabold text-blue-950 mt-2">{product.name}</h3><p className="text-xs text-slate-600 font-bold leading-6 mt-2 flex-1">{product.tagline}</p><Link to={`/product/${product.id}`} className="btn-primary rounded-xl py-3 text-xs text-center mt-5">المزيد من التفاصيل</Link></div></article>)}</div> : <p className="text-center font-bold text-slate-600">تواصل معنا لتصميم الحل المناسب لاحتياجك.</p>}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div><span className="section-subheading-tag text-sky-300 bg-sky-400/10 border-sky-300/20">تنفيذ واضح</span><h2 className="text-3xl font-extrabold mt-4 mb-8">من الطلب إلى التشغيل في خطوات منظمة</h2><div className="space-y-5">{content.steps.map((step, index) => <div key={step.title} className="flex gap-4"><span className="w-9 h-9 rounded-full bg-sky-400 text-blue-950 flex items-center justify-center font-black shrink-0">{index + 1}</span><div><h3 className="font-extrabold">{step.title}</h3><p className="text-sm text-blue-100 font-bold leading-6 mt-1">{step.description}</p></div></div>)}</div></div>
          <div className="bg-white text-slate-800 rounded-3xl p-8"><ShieldCheck className="w-12 h-12 text-emerald-600 mb-4" /><h2 className="text-2xl font-extrabold text-blue-950 mb-5">ثقة وضمان بعد التنفيذ</h2><div className="space-y-4">{content.trust.map((item) => <div key={item} className="flex gap-3 font-bold text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />{item}</div>)}</div><a href={whatsappHref} target="_blank" rel="noreferrer" {...tracking} data-cta-location="trust_section" className="btn-whatsapp mt-8 rounded-xl py-4 px-6 flex justify-center gap-2"><MessageSquare className="w-5 h-5" />تحدث مع فريق نثال</a></div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-10"><span className="section-subheading-tag">أسئلة شائعة</span><h2 className="section-heading-main mt-3">قبل أن تطلب الخدمة</h2></div><div className="space-y-4">{content.faq.map((item) => <details key={item.question} className="group border border-slate-200 rounded-2xl p-5 bg-white"><summary className="font-extrabold text-blue-950 cursor-pointer">{item.question}</summary><p className="text-sm text-slate-600 font-bold leading-7 pt-4">{item.answer}</p></details>)}</div></div>
      </section>

      <Reviews />
      <div className="text-center bg-blue-950 text-white pt-16 px-4"><span className="text-sky-300 font-extrabold text-sm">خطوتك التالية</span><h2 className="text-3xl font-extrabold mt-3">{content.formTitle}</h2><p className="text-blue-100 font-bold mt-3">الخدمة محددة مسبقاً؛ أدخل بيانات التواصل فقط وسنجهز طلبك عبر واتساب.</p></div>
      <QuoteForm serviceType={category.key} pageType="service_landing" />
    </div>
  );
}
