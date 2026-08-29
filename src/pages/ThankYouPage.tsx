/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, Phone } from 'lucide-react';
import { QuoteRequest } from '../types';
import { pushGtmEvent } from '../lib/gtm';
import { useSeo } from '../lib/seo';

type ThankYouState = {
  quote?: QuoteRequest;
  pageType?: string;
  serviceType?: string;
  whatsappHandoff?: boolean;
};

function readPersistedHandoff(): ThankYouState {
  try {
    const raw = window.sessionStorage.getItem('nethal_whatsapp_handoff');
    return raw ? (JSON.parse(raw) as ThankYouState) : {};
  } catch {
    return {};
  }
}

export default function ThankYouPage() {
  const location = useLocation();
  const [state] = useState<ThankYouState>(() => {
    const routeState = (location.state as ThankYouState | null) || {};
    if (routeState.quote && routeState.whatsappHandoff) return routeState;
    return readPersistedHandoff();
  });

  const quote = state.quote;
  const isValidHandoff = Boolean(quote && state.whatsappHandoff);

  useSeo({
    title: 'شكراً لتواصلك — نثال',
    description: 'تم فتح واتساب لمتابعة طلبك مع فريق مؤسسة نثال.',
    path: '/thank-you',
  });

  useEffect(() => {
    if (!isValidHandoff || !quote) return;

    const trackingKey = `nethal_thank_you_tracked_${quote.id}`;
    try {
      if (window.sessionStorage.getItem(trackingKey)) return;
    } catch {
      // Continue with tracking when sessionStorage is unavailable.
    }

    pushGtmEvent('thank_you_view', {
      lead_id: quote.id,
      lead_type: quote.serviceType,
      product_name: quote.productName || 'غير محدد',
      page_type: state.pageType || 'general',
      service_type: state.serviceType || undefined,
      page_path: '/thank-you',
      whatsapp_handoff: true,
    });

    try {
      window.sessionStorage.setItem(trackingKey, '1');
    } catch {
      // Tracking already fired; no persistence fallback is required.
    }
  }, [isValidHandoff, quote, state.pageType, state.serviceType]);

  if (!isValidHandoff || !quote) {
    return <Navigate to="/quote" replace />;
  }

  return (
    <div dir="rtl" className="bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/15 text-emerald-300 shadow-xl">
            <CheckCircle2 className="h-11 w-11" />
          </div>
          <span className="mt-6 inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
            تم فتح واتساب للطلب
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            شكراً لك، طلبك جاهز للمتابعة
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-blue-100 sm:text-base">
            تم فتح محادثة واتساب الخاصة بطلبك في تبويب أو تطبيق منفصل. هذه الصفحة تبقى ثابتة في الموقع لتجدها عند الرجوع، بدون أي خطوة إرسال إضافية.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8 md:p-10">
            <div className="mx-auto mb-8 grid max-w-2xl gap-4 sm:grid-cols-2">
              <SummaryCard label="رقم الطلب" value={quote.id} />
              <SummaryCard label="الخدمة" value={quote.serviceType} />
              <SummaryCard label="الاسم" value={quote.fullName} />
              <SummaryCard label="المدينة" value={quote.city} />
            </div>

            <p className="mx-auto max-w-xl text-sm font-bold leading-7 text-slate-600">
              انتهت خطوات الإرسال من الموقع. يمكنك الآن إكمال المحادثة في واتساب، وهذه الصفحة ستظل متاحة حتى لو عدت إليها أو حدّثتها خلال نفس جلسة التصفح.
            </p>

            <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <Link to="/" className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold">
                <Home className="h-5 w-5" />
                العودة إلى الصفحة الرئيسية
              </Link>

              <a
                href="tel:+966553033199"
                className="btn-secondary flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold"
              >
                <Phone className="h-5 w-5" />
                الاتصال مباشرة
              </a>
            </div>
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