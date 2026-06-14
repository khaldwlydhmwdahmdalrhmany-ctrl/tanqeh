/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sliders, RefreshCcw, Sparkles, AlertCircle } from 'lucide-react';
import projectHomeFilterImg from '@/assets/projects/images/project-home-filter.jpg';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const DEFAULT_IMAGE = projectHomeFilterImg;

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDragging.current = false;
    };
    
    window.addEventListener('mouseup', handleMouseUpGlobal);
    window.addEventListener('touchend', handleMouseUpGlobal);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
      window.removeEventListener('touchend', handleMouseUpGlobal);
    };
  }, []);

  return (
    <section id="before-after-section" className="py-20 md:py-24 bg-slate-50 border-t border-slate-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="section-subheading-tag">
            الفرق الملموس بالعين والدقة
          </span>
          <h2 className="section-heading-main">
            شاهد كفاءة الفلترة والنقاء قبل وبعد التركيب
          </h2>
          <p className="lead-paragraph">
            شاهد الفرق بنفسك! مياه الحنفية العادية المحملة بالمعادن الثقيلة والأملاح مقابل المياه المفلترة والناعمة والصحية الخارجة من أجهزة نثال.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive Drag-and-Compare Image Slider  */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <span className="text-xs font-extrabold text-slate-400 mb-3 block sm:hidden">
              📱 اسحب الشريط الدائري يميناً ويساراً للمقارنة:
            </span>

            <div 
              ref={containerRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
              onMouseDown={(e) => {
                isDragging.current = true;
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                isDragging.current = true;
                handleMove(e.touches[0].clientX);
              }}
              onMouseMove={(e) => {
                if (isDragging.current) handleMove(e.clientX);
              }}
              onTouchMove={(e) => {
                if (isDragging.current) handleMove(e.touches[0].clientX);
              }}
            >
              {/* BEFORE IMAGE (Full size, covered by the slider) */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={DEFAULT_IMAGE} 
                  alt="قبل التصفية" 
                  className="w-full h-full object-cover filter sepia brightness-[0.7] saturate-[1.6]" 
                  referrerPolicy="no-referrer"
                />
                {/* Visual Rust sediment particles overlay simulate */}
                <div className="absolute inset-0 bg-yellow-900/10 mix-blend-color-burn"></div>
                {/* Labels */}
                <div className="absolute bottom-4 right-4 bg-red-600/90 text-white font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-sm">
                  قبل الفلترة (غير صالح للشرب Direct)
                </div>
              </div>

              {/* AFTER IMAGE (Clipped dynamically based on positioning) */}
              <div 
                className="absolute inset-x-0 inset-y-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute top-0 left-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
                  <img 
                    src={DEFAULT_IMAGE} 
                    alt="بعد التصفية" 
                    className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Clean blue-tinted overlay */}
                  <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen"></div>
                </div>
                {/* Label AFTER */}
                <div className="absolute bottom-4 left-4 bg-emerald-600/90 text-white font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-sm">
                  بعد الفلترة (مياه نقية وصحية 100%)
                </div>
              </div>

              {/* Slider Line / Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-white shadow-xl transform -translate-x-1/2 cursor-grab active:cursor-grabbing">
                  <Sliders className="w-4 h-4 rotate-90" />
                </div>
              </div>

            </div>

            <div className="mt-4 flex justify-between w-full px-2 text-slate-600 text-xs font-bold font-mono">
              <span>0% (قبل الفلترة)</span>
              <span>👈 اسحب لمقارنة التصفية 👉</span>
              <span>100% (بعد الفلترة)</span>
            </div>

          </div>

          {/* Comparative Data & Cartridges Breakdown Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-right">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a1e36]">
              لماذا تحتاج فلتر نثال في منزلك بالرياض؟
            </h3>

            <p className="text-slate-600 text-sm font-semibold leading-relaxed">
              تصل المياه للبيوت محملة بالأتربة، وبقايا الصدأ من خزانات المواسير والكلور المستخدم في التطهير. تمر فلاترنا بمراحل متعاقبة لإزالة هذه السموم وإنتاج مياه مريحة للمعدة والكلى.
            </p>

            {/* Static Grid Comparison Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
              <span className="text-xs font-bold text-slate-600">مقارنة فنية سريعة:</span>
              
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-center">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center gap-1.5 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-extrabold">ماء الصنبور التقليدي</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-red-750">250+ PPM</span>
                  <span className="text-[10px] text-slate-600">أملاح زائدة وأتربة دقيقة</span>
                </div>

                <div className="flex flex-col gap-1 border-r border-slate-100">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-extrabold">ماء فلتر نثال موازَن</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-emerald-750">40 - 90 PPM</span>
                  <span className="text-[10px] text-slate-600">نسبة معتدلة ومثلى للشرب</span>
                </div>
              </div>

              {/* Cartridge lifecycle item */}
              <div className="flex items-center gap-4 text-right">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0 text-xl font-bold">
                  🍂
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-800">حماية من تعفن خزانات الأسطح والصدأ</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                    الشمعة الأولى تزيل أطنان الشوائب المترسبة وتمنع وصولها لأكواب أطفالكم أو أوعية الطهي.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/5 rounded-2xl p-4 border border-blue-200/50 text-right">
              <span className="text-xs font-bold text-blue-900 block mb-1">💡 فحص أملاح مجاني وتوصيل سريع</span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                اطلب الخدمة الآن لنرسل لك فني المعاينة مجهزاً بجهاز فحص الأملاح المعتمد لفحص نقاوة مياه منزلك مجاناً وبلا أي التزام!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
