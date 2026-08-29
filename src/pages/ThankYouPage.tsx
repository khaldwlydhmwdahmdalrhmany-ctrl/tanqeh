/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MessageSquare, Phone } from 'lucide-react';
import { QuoteRequest } from '../types';
import { pushGtmEvent } from '../lib/gtm';
import { useSeo } from '../lib/seo';

type ThankYouState = {
  quote?: QuoteRequest;
  whatsappHref?: string;
  pageType?: string;
  serviceType?: string;
};

export default function ThankYouPage() {
  const location = useLocation();
  const state = (location.state as ThankYouState | null) || {};
  const quote = state.quote;

  useSeo({
    title: 'تم استلام طلبك — نثال',
    description: 'تم تجهيز طلبك لدى مؤسسة نثال. يمكنك الآن متابعة الطلب عبر واتساب أو العودة إلى الموقع.',
    path: '/thank-you',
  });

  useEffect(() => {
    if (!quote) return;

    pushGtmEvent('thank_you_view', {
      lead_id: quote.id,
      lead_type: quote.serviceType,
      product_name: quote.productName || 'غير محدد',
      page_type: state.pageType || 'general',
      service_type: state.serviceType || undefined,
      page_path: '/thank-you',
    });
  }, [quote, state.pageType, state.serviceType]);

  const fallbackWhatsapp = `https://wa.me/966553033199?text=${encodeURIComponent(
    'السلام عليكم، قمت بتعبئة طلب على موقع مؤسسة نثال وأرغب في متابعة الطلب.',
  )}`;
  const whatsappHref = state.whatsappHref || fallbackWhatsapp;

  return (
    <div dir="rtl" className="bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/15 text-emerald-300 shadow-xl">
            <CheckCircle2 className="h-11 w-11" />
          </div>
          <span className="mt-6 inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
            تم إرسال النموذج بنجاح
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            شكراً لك، تم تجهيز طلبك بنجاح
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-blue-100 sm:text-base">
            الخطوة التالية هي إرسال تفاصيل الطلب عبر واتساب حتى يتمكن فريق نثال من تأكيد السعر والموعد معك مباشرة.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8 md:p-10">
            {quote && (
              <div className="mx-auto mb-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                <SummaryCard label="رقم الطلب" value={quote.id} />
                <SummaryCard label="الخدمة" value={quote.serviceType} />
                <SummaryCard label="الاسم" value={quote.fullName} />
                <SummaryCard label="المدينة" value={quote.city} />
              </div>
            )}

            <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-page-type="thank_you"
                data-service-type={state.serviceType}
                data-product-name={quote?.productName}
                data-cta-location="thank_you_primary"
                className="btn-whatsapp flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold"
              >
                <MessageSquare className="h-5 w-5" />
                متابعة الطلب عبر واتساب
              </a>

              <a
                href="tel:+966553033199"
                className="btn-secondary flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold"
              >
                <Phone className="h-5 w-5" />
                الاتصال مباشرة
              </a>
            </div>

            <Link to="/" className="mx-auto mt-7 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-blue-700 hover:text-blue-900">
              <Home className="h-4 w-4" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-center">
      <div className="text-[10px] font-extrabold text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-extrabold text-blue-950">{value}</div>
    </div>
  );
}
