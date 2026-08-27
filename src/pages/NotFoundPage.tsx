/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, useSeo } from '../lib/seo';

export default function NotFoundPage() {
  useSeo({
    title: 'الصفحة غير موجودة — مؤسسة نثال',
    description: 'الصفحة المطلوبة غير متوفرة. تصفح أقسام موقع مؤسسة نثال لتنقية وتحلية المياه.',
    path: '/404',
  });

  return (
    <div dir="rtl" className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center flex flex-col items-center gap-5">
        <span className="text-6xl font-extrabold text-blue-100">404</span>
        <h1 className="text-2xl font-extrabold text-[#0a1e36]">الصفحة غير موجودة</h1>
        <p className="text-sm text-slate-600 font-bold leading-relaxed">
          الرابط الذي فتحته غير متوفر أو تم تغييره. يمكنك العودة للرئيسية أو تصفح أقسامنا.
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 mt-2">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-blue-900 text-white hover:bg-blue-950 transition-all"
          >
            الصفحة الرئيسية
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-slate-50 border border-slate-200 text-blue-950 hover:bg-blue-50 transition-all"
            >
              {c.navLabel}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
