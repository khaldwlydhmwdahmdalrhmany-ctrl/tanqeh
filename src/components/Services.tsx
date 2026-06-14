/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sprout, Snowflake, Wrench, GlassWater, ArrowLeft, ThermometerSnowflake, Droplets, PenTool as Tool } from 'lucide-react';

interface ServicesProps {
  onSelectCategory: (category: 'filter' | 'cooler' | 'mist' | 'maintenance') => void;
}

export default function Services({ onSelectCategory }: ServicesProps) {
  const servicesList = [
    {
      id: 'filter',
      title: 'أجهزة تنقية وتحلية المياه',
      description: 'حلول ذكية متطورة لتنقية مياه الشرب والطهي للأسر والمطاعم بتركيب آمن تماماً وصيانة متكاملة.',
      icon: <GlassWater className="w-7 h-7 text-blue-600" />,
      color: 'border-blue-100 hover:border-blue-400 bg-blue-50/10',
      bullets: [
        'فلاتر منزلية متعددة المراحل (5، 6، 7 مراحل فيتنامي وفوق)',
        'أنظمة التناضح العكسي (RO) المتقدمة بمواصفات عالمية',
        'محطات وأجهزة تحلية مركزية للفلل والقصور بالكامل',
        'حلول متكاملة للمنازل والمزارع والمقاهي لإطالة عمر المعدات'
      ]
    },
    {
      id: 'cooler',
      title: 'برادات وثلاجات المياه المتطورة',
      description: 'مجموعة برادات متصلة مباشرة بالفلاتر، توفر مياه باردة وساخنة ونقية دون الحاجة لقارورة تقليدية.',
      icon: <Snowflake className="w-7 h-7 text-cyan-500" />,
      color: 'border-cyan-100 hover:border-cyan-400 bg-cyan-50/10',
      bullets: [
        'برادات مدمجة بفلتر تحلية داخلي للمكاتب والشركات',
        'موزعات مياه فخمة ومريحة تتصل بفلتر المنزل مباشرة',
        'حلول تبريد وتحلية لبرادات المساجد والمساكن والمستشفيات',
        'أجهزة بضوابط وقفل أمان للماء الساخن لحماية الأطفال'
      ]
    },
    {
      id: 'mist',
      title: 'أنظمة الرذاذ والضباب',
      description: 'لطّف أجواءك الخارجية واخفض درجات الحرارة حتى 15 درجة مئوية في الصيف بضباب مائي رقيق ومنعش.',
      icon: <Droplets className="w-7 h-7 text-teal-500" />,
      color: 'border-teal-100 hover:border-teal-400 bg-teal-50/10',
      bullets: [
        'أنظمة رذاذ مخصصة للقصور والفلل والحدائق المنزلية',
        'رذاذ تلطيف وتبريد للجلسات والاستراحات والمستودعات',
        'تركيبات تجارية للمقاهي والمطاعم المفتوحة لجذب الزوار',
        'فوهات سيراميك مانعة للتنقيط ومضخات إيطالية أصلية'
      ]
    },
    {
      id: 'maintenance',
      title: 'الصيانة وخدمات ما بعد البيع وبطاقات العناية',
      description: 'نتابع معك صلاحية فلاترك دورياً ونمنحك جدول صيانة دورية يضمن صلاحية ونقاوة المياه طوال العام.',
      icon: <Wrench className="w-7 h-7 text-emerald-600" />,
      color: 'border-emerald-100 hover:border-emerald-400 bg-emerald-50/10',
      bullets: [
        'تغيير شمعات الفلاتر دورياً بأسعار قطع معلنة ومنافسة',
        'صيانة طارئة وفورية للبرادات والأعطال وتسربات الشبكة',
        'تنظيف وتعقيم الأجهزة وخزانات الفلاتر والتبريد المركزي',
        'عقود صيانة سنوية ميسرة للشركات والمنازل والمطاعم'
      ]
    }
  ];

  return (
    <section id="services-section" className="py-20 md:py-24 bg-slate-50/50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with precise visual context */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="section-subheading-tag">
            ماذا نقدم لعملائنا؟
          </span>
          <h2 className="section-heading-main">
            حلول متكاملة تضمن لك الأمان والرفاهية والنقاء
          </h2>
          <p className="lead-paragraph">
            نهتم بأدق التفاصيل لتقديم تجربة خدمة فريدة تجمع بين دقة الهندسة وجودة المكونات وسرعة الفنيين في تلبية طلباتكم.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
        </div>

        {/* Services Cards Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col bg-white rounded-3xl p-8 border hover:shadow-xl transition-all duration-300 group relative ${service.color}`}
            >
              <div className="flex items-start justify-between mb-6">
                {/* Icon wrapper with soft shadow */}
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                {/* Section bullet */}
                <span className="text-[11px] font-extrabold text-slate-300 font-mono">
                  SERVICE // {service.id.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold text-blue-950 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-700 text-xs sm:text-sm font-bold leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Highlights List */}
              <ul className="flex flex-col gap-3.5 mb-8 text-right self-stretch flex-grow border-t border-slate-100 pt-6">
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Call to catalog navigation */}
              <button
                onClick={() => onSelectCategory(service.id as any)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 transition-colors mt-auto self-start group cursor-pointer"
              >
                <span>استعرض المنتجات والمواصفات</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
