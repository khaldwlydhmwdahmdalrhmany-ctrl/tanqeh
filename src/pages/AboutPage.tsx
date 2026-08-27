/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Achievements from '../components/Achievements';
import Services from '../components/Services';
import FAQs from '../components/FAQs';
import QuoteForm from '../components/QuoteForm';
import { useNavigate } from 'react-router-dom';
import { useSeo, breadcrumb, getCategoryByKey } from '../lib/seo';
import { ORGANIZATION_SCHEMA } from '../lib/schema';

export default function AboutPage() {
  const navigate = useNavigate();

  useSeo({
    title: 'عن مؤسسة نثال لتنقية وتحلية المياه بالرياض',
    description:
      'مؤسسة سعودية مرخصة (سجل تجاري 1010654172) متخصصة في تركيب وصيانة أنظمة تنقية وتحلية المياه وبرادات المياه وأنظمة الرذاذ في مدينة الرياض.',
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: 'عن نثال', path: '/about' },
        ]),
      ],
    },
  });

  return (
    <div dir="rtl">
      <section className="bg-gradient-to-b from-blue-50/60 to-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <span className="section-subheading-tag">
            مؤسسة سعودية مرخصة — سجل تجاري 1010654172
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1e36] leading-tight">
            عن مؤسسة نثال لحلول المياه
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed font-bold max-w-2xl">
            نعمل في مدينة الرياض على توريد وتركيب وصيانة أنظمة تنقية وتحلية
            المياه للمنازل والمنشآت التجارية. نلتزم بضمانات مكتوبة، وصيانة دورية
            مجدولة، وتذكير آلي بمواعيد تبديل الشمعات — لأن جودة المياه التزام
            مستمر لا عملية بيع لمرة واحدة.
          </p>
        </div>
      </section>

      <Achievements />
      <Services
        onSelectCategory={(category) => {
          const cat = getCategoryByKey(category);
          if (cat) navigate(`/${cat.slug}`);
        }}
      />
      <FAQs />
      <QuoteForm selectedProductName="" />
    </div>
  );
}
