/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClipboardCheck, Sparkles, Truck, Sliders, Shield, PenTool as Tool } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '١',
      title: 'طلب عرض السعر والاستشارة',
      desc: 'املأ النموذج أسفل الصفحة ببياناتك ونوع الخدمة (فلتر، برادة، رذاذ، صيانة). سيتواصل معك أحد مستشارينا في غضون ساعة لشرح الحلول المتاحة.'
    },
    {
      num: '٢',
      title: 'المعاينة والفحص الفني مجاناً',
      desc: 'يزورك الفني المتخصص لمعاينة الموقع، قياس جودة ونسبة الأملاح المحلّة (PPM) في المياه، والاتفاق على المكان الأفضل لتركيب الفلتر أو نظام الرذاذ.'
    },
    {
      num: '٣',
      title: 'التركيب والتشغيل والضمان الممتد',
      desc: 'يقوم الفري بنقل وتركيب النظام بدقة فائقة وبشكل خفي دون المساس بديكور مطبخك، نختبر ملوحة ونقاوة الماء الخارج، ونسلمك بطاقة الضمان الذهبي.'
    }
  ];

  return (
    <section id="process-section" className="py-20 md:py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="section-subheading-tag">
            خطوات ميسرة وسريعة
          </span>
          <h2 className="section-heading-main">
            كيف نعمل في نثال لتأمين مياهك النقية؟
          </h2>
          <p className="lead-paragraph">
            نهدف لجعل تجربة حصولك على الخدمة مريحة وسلسة للغاية بدءاً من طلبك وحتى متابعة صيانة الفلاتر الدورية لسنوات قادمة.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
        </div>

        {/* Steps display layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-dashed bg-blue-100 -z-5"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-slate-50 hover:bg-blue-50/50 p-8 rounded-3xl border border-slate-150 hover:border-blue-200 transition-all duration-300 relative text-right flex flex-col h-full"
            >
              {/* Floating number circles */}
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300 mb-6">
                {step.num}
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold text-[#0a1e36] mb-3 group-hover:text-blue-700 transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-bold">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic highlights box */}
        <div className="mt-16 bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl text-right">
          
          {/* Ambient glow backgrounds */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-5"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 bg-blue-800/80 rounded-full px-3 py-1 border border-blue-700/50 text-sky-400 text-xs font-bold self-start">
                <Truck className="w-4.5 h-4.5" />
                <span>سرعة قياسية وأمان تملأه الرعاية</span>
              </div>
              
              <h4 className="text-xl sm:text-2xl font-extrabold">التوصيل والتركيب خلال ٢٤ ساعة فقط في الرياض!</h4>
              
              <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-bold">
                نعلم أهمية نقاوة واستمرار المياه لأسرتك ومطبخك أو منشأتك الموقرة. لذا نوفر أطقم طوارئ وفنيين تركيبات مجهزين للتحرك الفوري وإكمال العمل في نفس يوم طلب السعر أو باليوم الذي يليه مباشرة.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-4 self-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <Shield className="w-7 h-7 text-sky-200 flex-shrink-0" />
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-white">ضمان ذهبي ممتد</span>
                  <span className="text-[11px] text-slate-200 font-bold">ضمان خلو من العيوب وسوء السباكة</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <Tool className="w-7 h-7 text-emerald-200 flex-shrink-0" />
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-white">معاينة وفحص فني شامل</span>
                  <span className="text-[11px] text-slate-200 font-bold">فحص الأملاح والشبكة مجاناً</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
