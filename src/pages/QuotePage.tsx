/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import QuoteForm from '../components/QuoteForm';
import Process from '../components/Process';
import Achievements from '../components/Achievements';
import { useSeo, breadcrumb } from '../lib/seo';

export default function QuotePage() {
  useSeo({
    title: 'احجز فحص مياه وعرض سعر مجاني بالرياض — نثال',
    description:
      'احجز زيارة فحص مجانية لعينة مياهك في الرياض واحصل على عرض سعر مخصص لجهاز التحلية أو البرادة أو نظام الرذاذ المناسب لك، دون أي التزام.',
    path: '/quote',
    jsonLd: breadcrumb([
      { name: 'الرئيسية', path: '/' },
      { name: 'احجز فحصاً مجانياً', path: '/quote' },
    ]),
  });

  return (
    <div dir="rtl">
      <section className="bg-gradient-to-b from-blue-50/60 to-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <span className="section-subheading-tag">خدمة مجانية بالكامل</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1e36] leading-tight">
            احجز فحص مياه وعرض سعر مجاني
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed font-bold max-w-2xl">
            يزورك أحد مهندسينا لفحص عينة من مياهك وقياس نسبة الأملاح، ثم يقترح
            الحل الأنسب لمنزلك أو منشأتك مع عرض سعر واضح — دون أي التزام منك.
          </p>
        </div>
      </section>

      <QuoteForm selectedProductName="" />
      <Process />
      <Achievements />
    </div>
  );
}
