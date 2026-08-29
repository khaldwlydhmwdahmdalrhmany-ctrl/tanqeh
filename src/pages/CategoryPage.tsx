/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronLeft, MessageSquare, ShieldCheck, Wrench } from 'lucide-react';
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
        {
          '@type': 'Service',
          name: category.h1,
          description: category.description,
          provider: { '@type': 'Organization', name: 'مؤسسة نثال' },
        },
        {
          '@type': 'ItemList',
          name: category.h1,
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: product.name,
            url: `${SITE_URL}/product/${product.id}`,
          })),
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: category.navLabel, path },
        ]),
      ],
    },
  });

  const tracking = {
    'data-page-type': 'service_landing',
    'data-service-type': category.key,
  };

  return (
    <div dir="rtl">
      <nav className="border-b border-slate-100 bg-white" aria-label="مسار التنقل">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[11px] font-bold text-slate-500 sm:px-6 lg:px-8">
          <Link to="/" className="transition-colors hover:text-blue-700">الرئيسية</Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="text-blue-950">{category.navLabel}</span>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-16 text-white md:py-24">
        <div className="absolute -left-20 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-right">
            <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
              {content.eyebrow}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{category.h1}</h1>
            <p className="mt-5 text-sm font-bold leading-8 text-blue-100 sm:text-base">{content.valueProposition}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="#lead-form-section" className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-blue-950 transition-colors hover:bg-blue-50">
                {content.heroCta}
                <ArrowLeft className="h-4 w-4" />
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" {...tracking} data-cta-location="hero" className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700">
                <MessageSquare className="h-5 w-5" />
                اسأل عبر واتساب
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-8">
            <h2 className="mb-6 text-center text-xl font-extrabold">{content.problemsTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {content.problems.map((problem) => (
                <div key={problem} className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm font-bold text-blue-50">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" />
                  <span>{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">قيمة عملية من البداية</span>
            <h2 className="section-heading-main mt-3">حل مصمم لاحتياجك، لا مجرد منتج</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {content.benefits.map((benefit) => (
              <article key={benefit.title} className="flex min-h-[245px] flex-col items-center justify-center rounded-[26px] border border-slate-100 bg-slate-50 p-7 text-center transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold text-blue-950">{benefit.title}</h3>
                <p className="mt-3 max-w-xs text-sm font-bold leading-7 text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">حلول مرتبطة بالخدمة</span>
            <h2 className="section-heading-main mt-3">خيارات مختارة لـ {category.navLabel}</h2>
            <a href="#lead-form-section" className="mt-4 inline-flex text-sm font-extrabold text-blue-700">لست متأكداً؟ اطلب ترشيحاً مجانياً ←</a>
          </div>

          {products.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="flex overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex w-full flex-col">
                    <Link to={`/product/${product.id}`} className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" referrerPolicy="no-referrer" />
                    </Link>
                    <div className="flex flex-1 flex-col items-center p-6 text-center">
                      <span className="text-[10px] font-extrabold text-blue-600">{product.brand}</span>
                      <h3 className="mt-2 text-base font-extrabold text-blue-950">{product.name}</h3>
                      <p className="mt-2 flex-1 text-xs font-bold leading-6 text-slate-600">{product.tagline}</p>
                      <Link to={`/product/${product.id}`} className="btn-primary mt-5 w-full rounded-xl py-3 text-center text-xs">المزيد من التفاصيل</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-slate-600">تواصل معنا لتصميم الحل المناسب لاحتياجك.</p>
          )}
        </div>
      </section>

      <section className="bg-blue-950 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-7 sm:p-8">
            <div className="text-center lg:text-right">
              <span className="section-subheading-tag border-sky-300/20 bg-sky-400/10 text-sky-300">تنفيذ واضح</span>
              <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">من الطلب إلى التشغيل بخطوات منظمة</h2>
            </div>
            <div className="mt-8 space-y-4">
              {content.steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4 rounded-2xl bg-white/5 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400 font-black text-blue-950">{index + 1}</span>
                  <div className="text-right">
                    <h3 className="font-extrabold">{step.title}</h3>
                    <p className="mt-1 text-sm font-bold leading-6 text-blue-100">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[28px] bg-white p-8 text-center text-slate-800 shadow-xl">
            <ShieldCheck className="mb-4 h-12 w-12 text-emerald-600" />
            <h2 className="text-2xl font-extrabold text-blue-950">ثقة وضمان بعد التنفيذ</h2>
            <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
              {content.trust.map((item) => (
                <div key={item} className="flex min-h-[72px] items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-center text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href={whatsappHref} target="_blank" rel="noreferrer" {...tracking} data-cta-location="trust_section" className="btn-whatsapp mt-8 flex w-full max-w-sm justify-center gap-2 rounded-xl px-6 py-4">
              <MessageSquare className="h-5 w-5" />
              تحدث مع فريق نثال
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="section-subheading-tag">أسئلة شائعة</span>
            <h2 className="section-heading-main mt-3">قبل أن تطلب الخدمة</h2>
          </div>
          <div className="space-y-4">
            {content.faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm">
                <summary className="cursor-pointer text-sm font-extrabold text-blue-950">{item.question}</summary>
                <p className="pt-4 text-sm font-bold leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <div className="bg-blue-950 px-4 pt-16 text-center text-white">
        <span className="text-sm font-extrabold text-sky-300">خطوتك التالية</span>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight">{content.formTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm font-bold leading-7 text-blue-100">الخدمة محددة مسبقاً؛ أدخل بيانات التواصل فقط وسنجهز طلبك مباشرة.</p>
      </div>
      <QuoteForm serviceType={category.key} pageType="service_landing" />
    </div>
  );
}
