/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldAlert, CheckCircle } from 'lucide-react';
import logoWhite from '@/assets/brand/logo-white.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-right mb-12">
          
          {/* Column 1: Info and brand statements */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 select-none">
              <div className="w-12 h-12 flex relative items-center justify-center p-1 bg-white/5 rounded-xl border border-slate-800 shadow-inner overflow-hidden">
                <img 
                  src={logoWhite} 
                  alt="شعار نثال الأبيض" 
                  className="h-full w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-extrabold text-white">مؤسسة نثـال لتنقية المياه</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
              شريكك الوطني الأول لحلول محطات التحلية المركزية، الفلاتر المنزلية، البرادات العائلية والتعليمية، وأنظمة الضباب الرطبة في الرياض وبأسرع وتيرة تنفيذ وصيانة بالمملكة.
            </p>

            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center gap-2.5 text-xs">
                <Clock className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                <span>ساعات العمل الفني: يومياً من ٨:٠٠ صباحاً وحتى ١٠:٠٠ مساءً</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                <span>طاقم مبيعات وخدمة عملاء طوارئ متوفر ٢٤/٧</span>
              </div>
            </div>
          </div>

          {/* Column 2: Specific contact details */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white border-r-2 border-blue-500 pr-2 pb-0.5">
              بيانات التواصل والمبيعات
            </h4>

            <div className="flex flex-col gap-4 pt-2">
              <a 
                href="tel:+966553033199" 
                className="flex items-start gap-2.5 hover:text-white transition-colors text-xs text-slate-300"
              >
                <Phone className="w-4.5 h-4.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold">المبيعات الرئيسية (جوال مباشر):</span>
                  <span className="font-mono text-xs font-semibold">+966 55 303 3199</span>
                </div>
              </a>

              <a 
                href="tel:0557745770" 
                className="flex items-start gap-2.5 hover:text-white transition-colors text-xs text-slate-300"
              >
                <Phone className="w-4.5 h-4.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold">المعرض الرئيسي والمنشآت:</span>
                  <span className="font-mono text-xs font-semibold">0557745770</span>
                </div>
              </a>

              <a 
                href="https://www.google.com/maps/place/%D9%86%D8%AB%D8%A7%D9%84+%D8%A7%D9%84%D9%8A%D8%A7%D8%A9+%D9%84%D8%AA%D9%86%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D9%85%D9%8A%D8%A7%D9%87%E2%80%AD/@24.7458668,46.841739,17.5z/data=!4m6!3m5!1s0x3e2fab4b4d5d438d:0x5c44e336d6406038!8m2!3d24.7455363!4d46.8388651!16s%2Fg%2F11w1d__hg_?authuser=0&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-blue-450 transition-colors text-xs text-slate-300 group"
              >
                <MapPin className="w-4.5 h-4.5 text-blue-500 group-hover:text-blue-450 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold group-hover:underline">الموقع ومعرضنا الرئيسي بالرياض (اضغط للخريطة):</span>
                  <span className="text-slate-300 group-hover:text-slate-100">شارع أبي الأسود الدؤلي، حي النسيم الشرقي، الرياض 14223</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Mail className="w-4.5 h-4.5 text-blue-500 flex-shrink-0" />
                <span>khaldwlydhmwd9@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 3: Interactive Responsive Google Map embed block */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white border-r-2 border-blue-500 pr-2 pb-0.5 animate-pulse">
              خريطة الوصول للمعرض (Google Map)
            </h4>
            
            <a 
              href="https://www.google.com/maps/place/%D9%86%D8%AB%D8%A7%D9%84+%D8%A7%D9%84%D9%8A%D8%A7%D8%A9+%D9%84%D8%AA%D9%86%D9%82%D9%8A%D9%8E%D8%A9+%D8%A7%D9%84%D9%85%D9%8A%D8%A7%D9%87%E2%80%AD/@24.7458668,46.841739,17.5z/data=!4m6!3m5!1s0x3e2fab4b4d5d438d:0x5c44e336d6406038!8m2!3d24.7455363!4d46.8388651!16s%2Fg%2F11w1d__hg_?authuser=0&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="relative block w-full aspect-[16/9] lg:aspect-auto lg:h-44 rounded-2xl overflow-hidden shadow-md border border-slate-800 bg-slate-950 group/map cursor-pointer"
            >
              {/* Overlay with subtle tint and helpful tooltip */}
              <div className="absolute inset-0 z-20 bg-blue-950/0 group-hover/map:bg-blue-950/20 transition-all duration-300 flex items-center justify-center">
                <div className="bg-blue-600/95 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-xl border border-blue-400 opacity-0 group-hover/map:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/map:translate-y-0 flex items-center gap-1.5">
                  <span>🗺️ افتح الاتجاهات على الخريطة مباشرة</span>
                </div>
              </div>

              {/* Underlying visual iframe with disabled pointerEvents to allow clicking the anchor tag */}
              <iframe
                title="موقع مؤسسة نثال لتنقية المياه على خرائط جوجل"
                src="https://maps.google.com/maps?q=24.7455363,46.8388651&hl=ar&z=16&t=&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </a>
          </div>

        </div>

        {/* Closing details and license block */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-center text-xs text-slate-300 gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span>© {currentYear} مؤسسة نثـال لتنقية وتحلية ومحطات المياه والبرادات. جميع الحقوق محفوظة ومسجلة بالمملكة العربية السعودية.</span>
            <span className="text-[10px] text-slate-400">ترخيص تجاري معتمد وتقديم خاضع لشروط التجارة السكنية.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="text-slate-200 font-extrabold bg-blue-950 px-2 py-0.5 rounded text-[10px]">Tamara</span>
            <span className="text-slate-200 font-extrabold bg-cyan-950 px-2 py-0.5 rounded text-[10px]">Tabby</span>
            <span className="text-slate-300">فحص مائي معتمد</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
