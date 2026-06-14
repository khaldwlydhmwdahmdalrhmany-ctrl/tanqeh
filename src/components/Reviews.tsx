/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, MessageSquare } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="section-subheading-tag">
            شركاء النجاح والثقة
          </span>
          <h2 className="section-heading-main">
            آراء عملائنا الأوفياء في جودة الخدمة والأجهزة
          </h2>
          <p className="lead-paragraph">
            نسعد ونفخر بخدمة آلاف الأسر وأصحاب المقاهي والمطاعم في الرياض. رضاكم التام هو الدافع الدائم لمؤسستنا.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-150 shadow-sm hover:shadow-md transition-all duration-300 relative text-right flex flex-col h-full"
            >
              {/* Star highlights & dates */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <span className="text-[10px] text-slate-600 font-bold font-mono">
                  {review.date}
                </span>
              </div>

              {/* Review statement */}
              <p className="text-slate-705 text-xs sm:text-sm font-semibold leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>

              {/* Verified Badge / Product Used */}
              <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-blue-950">{review.name}</span>
                  <span className="text-[10px] text-slate-600 font-semibold">{review.role}</span>
                </div>

                <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100 text-[10px] font-extrabold flex items-center gap-1.5 label-product">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>الجهاز: {review.productUsed}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Soft CTA to build quick social proof */}
        <div className="mt-12 text-center bg-white border border-slate-150 max-w-xl mx-auto rounded-2xl p-5 shadow-sm text-xs font-bold text-slate-600 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span>نعتز برأيك الغالي دائماً! هل قمنا بخدمتك مؤخراً؟</span>
          <a
            href="https://wa.me/966553033199"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
          >
            قيمنا وأرسل ملاحظاتك ⭐️
          </a>
        </div>

      </div>
    </section>
  );
}
