/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Projects from '../components/Projects';
import BeforeAfter from '../components/BeforeAfter';
import Reviews from '../components/Reviews';
import QuoteForm from '../components/QuoteForm';
import { useSeo, breadcrumb } from '../lib/seo';

export default function ProjectsPage() {
  useSeo({
    title: 'أعمالنا ومشاريع تركيب فلاتر المياه بالرياض — نثال',
    description:
      'نماذج من مشاريع تركيب محطات التحلية والفلاتر وأنظمة الرذاذ التي نفذتها مؤسسة نثال في منازل ومطاعم ومقاهي ومنشآت بمدينة الرياض.',
    path: '/projects',
    jsonLd: breadcrumb([
      { name: 'الرئيسية', path: '/' },
      { name: 'أعمالنا ومشاريعنا', path: '/projects' },
    ]),
  });

  return (
    <div dir="rtl">
      <section className="bg-gradient-to-b from-blue-50/60 to-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <span className="section-subheading-tag">معرض التنفيذ</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1e36] leading-tight">
            أعمالنا ومشاريعنا في الرياض
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed font-bold max-w-2xl">
            نماذج حقيقية من عمليات التركيب والصيانة التي نفذها فريقنا في منازل
            ومطاعم ومقاهي ومغاسل سيارات ومنشآت تجارية.
          </p>
        </div>
      </section>

      <Projects />
      <BeforeAfter />
      <Reviews />
      <QuoteForm selectedProductName="" />
    </div>
  );
}
