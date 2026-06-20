/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// import React, { useState, useEffect } from "react";
// import {
//   ShieldCheck,
//   MessageSquare,
//   ArrowLeft,
//   Heart,
//   Sparkles,
//   Medal,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle2,
//   Waves,
//   Award,
//   Users,
//   Zap,
//   Star,
//   Activity,
// } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";

// import heroMainBanner from "@/assets/hero/hero-main-banner.jpg";
// import heroSecondaryBanner from "@/assets/hero/hero-secondary-banner.jpg";
// import tamaraLogo from "@/assets/payment-methods/tamara.svg";
// import tabbyLogo from "@/assets/payment-methods/tabby.svg";

// const HERO_SLIDES = [
//   {
//     image: heroMainBanner,
//     title: "جهاز غولدن برو (7 مراحل المطور)",
//     badge: "المنتج الأكثر مبيعاً بالرياض",
//     desc: "احصل على مياه قلوية صحية فائقة النقاوة لشرب عائلتك وطبخك اليومي مباشرة وبأعلى جودة، بدون عبء القوارير ومتاعب التعبئة اليومية.",
//   },
//   {
//     image: heroSecondaryBanner,
//     title: "عروض الموسم من نثال الذهبية",
//     badge: "بالتعاون مع تمارا وتابي للتقسيط",
//     desc: "مجموعة التحلية والفلترة الأقوى بالمملكة الآن بتقسيط ميسر على 4 دفعات بدون فوائد أو رسوم إضافية مع التركيب الفوري المجاني.",
//   },
// ];

// export default function Hero() {
//   const [activeIdx, setActiveIdx] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (isHovered) return;
//     const timer = setInterval(() => {
//       setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
//     }, 7000);
//     return () => clearInterval(timer);
//   }, [isHovered]);

//   const handleScrollToForm = () => {
//     const element = document.getElementById("lead-form-section");
//     if (element) {
//       const offset = 85;
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section
//       id="hero-section"
//       className="relative min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-28 flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(219,234,254,0.45),transparent_65%),radial-gradient(ellipse_at_bottom_left,rgba(240,249,255,0.4),transparent_60%)] bg-[#fafbfc]"
//       dir="rtl"
//     >
//       {/* Visual background dynamics and layout grids */}
//       <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
//       <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-sky-200/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

//       {/* Global Brand Grid System */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
//           {/* COLUMN 1: Visual Content Hierarchy (Heading, Bulleted value triggers, Action CTA group) */}
//           <div className="lg:col-span-6 flex flex-col items-start gap-6 text-right">
//             {/* Top Micro-Trust Tag Ribbon */}
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-black text-blue-600 border border-blue-50 shadow-[0_4px_12px_rgba(37,99,235,0.04)]"
//             >
//               <Award className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
//               <span>
//                 مؤسسة سعودية معتمدة ومرخصة سِجِل تجاري رقم: 1010620807
//               </span>
//             </motion.div>

//             {/* Main Catchy Statement Block */}
//             <div className="space-y-1">
//               <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0c2340] leading-[1.32] tracking-tight">
//                 مياه نقية وصحية لكل منزل ومنشأة، بأعلى معايير الجودة في المملكة
//               </h1>

//               <div className="h-2"></div>

//               {/* Animating Dynamic Title Sub-Heading */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeIdx}
//                   initial={{ opacity: 0, x: -15 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 15 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex items-center gap-2 text-slate-800 text-base sm:text-lg font-bold"
//                 >
//                   <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
//                   <span>{HERO_SLIDES[activeIdx].title}</span>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Narrative paragraph description */}
//             <AnimatePresence mode="wait">
//               <motion.p
//                 key={activeIdx}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium"
//               >
//                 في مؤسسة نثال الحياة، نؤمن لك ولعملائك أفضل حلول التحلية المركزية والمنزلية، وأنظمة الرذاذ، والبرادات. نخدمك من التصميم وحتى التركيب والصيانة بضمان حقيقي ممتد وفنيين خبراء.
//               </motion.p>
//             </AnimatePresence>

//             {/* High-Impact Trust Value Points Panel */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full border-t border-slate-100 pt-5">
//               <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
//                 <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
//                   <CheckCircle2 className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col text-right">
//                   <span className="text-xs font-extrabold text-slate-800">
//                     ضمان ذهبي ممتد
//                   </span>
//                   <span className="text-[10px] text-slate-600 font-semibold">
//                     يشمل جميع القطع الكهربائية والهيكل
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
//                 <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
//                   <Zap className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col text-right">
//                   <span className="text-xs font-extrabold text-slate-800">
//                     تركيب وتوصيل سريع
//                   </span>
//                   <span className="text-[10px] text-slate-600 font-semibold">
//                     فريق مهندسين معالجة جاهز بالرياض خلال 24 ساعة
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
//                 <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
//                   <Waves className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col text-right">
//                   <span className="text-xs font-extrabold text-slate-800">
//                     فحص وضبط ملوحة مجاني
//                   </span>
//                   <span className="text-[10px] text-slate-600 font-semibold">
//                     نوازن الملوحة حسب رغبتك (من 100 لـ 150)
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
//                 <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
//                   <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
//                 </div>
//                 <div className="flex flex-col text-right">
//                   <span className="text-xs font-extrabold text-slate-800">
//                     صيانة دورية ذكية
//                   </span>
//                   <span className="text-[10px] text-slate-600 font-semibold">
//                     نذكرك بمواعيد تبديل الفلاتر أوتوماتيكياً
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* High-converting Call to action block */}
//             <div className="flex flex-col sm:flex-row gap-3.5 w-full pt-2">
//               <button
//                 onClick={handleScrollToForm}
//                 className="btn-primary relative overflow-hidden px-7 py-4 rounded-xl text-xs sm:text-sm font-black text-center flex items-center justify-center gap-2 flex-1"
//                 id="hero-primary-btn"
//               >
//                 <ShieldCheck className="w-4 h-4 text-sky-200 transition-transform duration-300 group-hover:scale-110" />
//                 <span>احصل على فحص وعرض مجاني</span>
//                 <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
//               </button>

//               <a
//                 href="https://wa.me/966553033199"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn-secondary bg-white hover:bg-slate-50 text-slate-800 px-7 py-4 rounded-xl text-xs sm:text-sm font-black shadow-sm transition-all text-center flex items-center justify-center gap-2.5 border border-slate-200 flex-1"
//                 id="hero-whatsapp-btn"
//               >
//                 <div className="relative flex items-center justify-center">
//                   <MessageSquare className="w-4 h-4 text-emerald-600" />
//                   <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
//                 </div>
//                 <span className="text-slate-800">المهندس المناوب (واتساب)</span>
//               </a>
//             </div>

//             {/* Tamara and Tabby premium instalment shelf */}
//             <div className="w-full border-t border-slate-100 pt-5 space-y-2.5">
//               <div className="flex items-center gap-2 text-xs text-slate-700 font-extrabold">
//                 <Users className="w-3.5 h-3.5 text-blue-600" />
//                 <span>شريت الحين وقسّط على 4 دفعات بدون أي فوائد:</span>
//               </div>
//               <div className="flex flex-wrap items-center gap-3.5">
//                 <div className="bg-[#FFF9E6]/80 hover:bg-[#FFF2CC] rounded-xl px-4 py-2 border border-[#FFE299]/50 flex items-center justify-center h-10 transition-all duration-300 shadow-xs">
//                   <img
//                     src={tamaraLogo}
//                     alt="تمارا لتقسيط مبيعات المياه"
//                     className="h-16 w-auto object-contain"
//                     referrerPolicy="no-referrer"
//                   />
//                 </div>
//                 <div className="bg-[#E5FFF3]/80 hover:bg-[#CCFFE6] rounded-xl px-4 py-2 border border-[#99FFCC]/50 flex items-center justify-center h-10 transition-all duration-300 shadow-xs">
//                   <img
//                     src={tabbyLogo}
//                     alt="تابي لتقسيط فلاتر المياه"
//                     className="h-18 w-auto object-contain"
//                     referrerPolicy="no-referrer"
//                   />
//                 </div>
//                 <div className="mr-auto">
//                   <button
//                     onClick={handleScrollToForm}
//                     className="inline-flex items-center gap-1 text-[11px] font-black text-blue-600 hover:text-blue-700 transition-colors"
//                   >
//                     <span>احسب قسطك الشهري</span>
//                     <span dir="ltr">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* COLUMN 2: Large Visual Showcase Canvas with Interactive Sliders */}
//           <div
//             className="lg:col-span-6 relative w-full h-[360px] sm:h-[420px] md:h-[500px] lg:h-[580px] flex items-center justify-center rounded-[32px] overflow-hidden bg-gradient-to-tr from-[#051121] via-[#091b30] to-[#040f1a] shadow-[0_24px_56px_-12px_rgba(10,30,54,0.18)] border-4 border-white"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             {/* Visual Glassmorphic Grid Lining Backing */}
//             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

//             {/* Soft Ambient glowing flare */}
//             <div className="absolute -top-10 -left-10 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none animate-pulse"></div>

//             {/* Sliding Quick Manual Slides overlays */}
//             <div className="absolute top-5 right-5 z-20 flex gap-2">
//               {HERO_SLIDES.map((slide, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveIdx(idx)}
//                   className={`px-3.5 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-md cursor-pointer ${
//                     activeIdx === idx
//                       ? "bg-blue-600 text-white scale-105 shadow-blue-500/20"
//                       : "bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md border border-slate-100"
//                   }`}
//                 >
//                   {idx === 0
//                     ? "🏆 الأكثر مبيعاً الرياض"
//                     : "🔥 عروض التقسيط المزدوج"}
//                 </button>
//               ))}
//             </div>

//             {/* Float Badge: Quality guarantee and client popularity */}
//             <div className="absolute top-5 left-5 z-20 bg-emerald-500/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-[10px] md:text-xs font-black shadow-lg">
//               <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
//               <span>{HERO_SLIDES[activeIdx].badge}</span>
//             </div>

//             {/* Left and Right navigation buttons */}
//             <button
//               onClick={() =>
//                 setActiveIdx(
//                   (prev) =>
//                     (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
//                 )
//               }
//               className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white p-3 rounded-2xl backdrop-blur-xs z-30 cursor-pointer"
//               aria-label="السابق"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() =>
//                 setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length)
//               }
//               className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white p-3 rounded-2xl backdrop-blur-xs z-30 cursor-pointer"
//               aria-label="التالي"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>

//             {/* Main Visual high-resolution Render frame */}
//             <div className="w-full h-full flex items-center justify-center p-4 bg-[#051121]">
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={activeIdx}
//                   src={HERO_SLIDES[activeIdx].image}
//                   alt={HERO_SLIDES[activeIdx].title}
//                   initial={{ opacity: 0.1, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 1.05 }}
//                   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                   className="w-full h-full object-contain max-h-[100%] max-w-[100%]"
//                   referrerPolicy="no-referrer"
//                 />
//               </AnimatePresence>
//             </div>

//             {/* Overlay trust card (Health authority stats) */}
//             <div className="absolute bottom-5 right-5 left-5 z-20 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white/94 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 text-right">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
//                   <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-[11px] font-black text-[#0c2340]">
//                     ملوحة مياه صحية وموزونة
//                   </span>
//                   <span className="text-[10px] font-bold text-slate-700">
//                     نطاق مثالي آمن: 100 - 150 TDS لشرب مثالي وعذب
//                   </span>
//                 </div>
//               </div>

//               {/* Pagination bullets */}
//               <div className="flex items-center justify-end gap-1.5 self-end sm:self-center">
//                 {HERO_SLIDES.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setActiveIdx(idx)}
//                     className={`h-2.5 rounded-full transition-all cursor-pointer ${
//                       idx === activeIdx
//                         ? "bg-blue-600 w-6 shadow-[0_2px_6px_rgba(37,99,235,0.3)]"
//                         : "bg-slate-200 hover:bg-slate-300 w-2.5"
//                     }`}
//                     aria-label={`شريحة رقم ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  Heart,
  Sparkles,
  Medal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Waves,
  Award,
  Users,
  Zap,
  Star,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import heroMainBanner from "@/assets/hero/hero-main-banner.jpg";
import heroSecondaryBanner from "@/assets/hero/hero-secondary-banner.jpg";
import tamaraLogo from "@/assets/payment-methods/tamara.svg";
import tabbyLogo from "@/assets/payment-methods/tabby.svg";

const HERO_SLIDES = [
  {
    image: heroMainBanner,
    title: "جهاز غولدن برو (7 مراحل المطور)",
    badge: "المنتج الأكثر مبيعاً بالرياض",
    desc: "احصل على مياه قلوية صحية فائقة النقاوة لشرب عائلتك وطبخك اليومي مباشرة وبأعلى جودة، بدون عبء القوارير ومتاعب التعبئة اليومية.",
  },
  {
    image: heroSecondaryBanner,
    title: "عروض الموسم من نثال الذهبية",
    badge: "بالتعاون مع تمارا وتابي للتقسيط",
    desc: "مجموعة التحلية والفلترة الأقوى بالمملكة الآن بتقسيط ميسر على 4 دفعات بدون فوائد أو رسوم إضافية مع التركيب الفوري المجاني.",
  },
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleScrollToForm = () => {
    const element = document.getElementById("lead-form-section");
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-28 flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(219,234,254,0.45),transparent_65%),radial-gradient(ellipse_at_bottom_left,rgba(240,249,255,0.4),transparent_60%)] bg-[#fafbfc]"
      dir="rtl"
    >
      {/* Visual background dynamics and layout grids */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-sky-200/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Global Brand Grid System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          {/* COLUMN 1: Visual Content Hierarchy (Heading, Bulleted value triggers, Action CTA group) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-right">
            {/* Top Micro-Trust Tag Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-black text-blue-600 border border-blue-50 shadow-[0_4px_12px_rgba(37,99,235,0.04)]"
            >
              <Award className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>
                مؤسسة سعودية معتمدة ومرخصة سِجِل تجاري رقم: 1010620807
              </span>
            </motion.div>

            {/* Main Catchy Statement Block */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0c2340] leading-[1.32] tracking-tight">
                مياة نقية وصحية لكل منزل ومنشأة .. <br />
                بأعلى معايير الجودة في المملكة{" "}
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-[#0072ff] to-[#0052cc] bg-clip-text text-transparent px-1">
                    نثال الحياة لتنقية المياة
                  </span>
                  <span className="absolute left-0 bottom-1.5 h-3 w-full bg-blue-100/40 -z-10 rounded-full"></span>
                </span>
              </h2>

              <h3 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0c2340] leading-[1.32] tracking-tight">
                في مؤسسة نثال الحياة ، نؤمن لك ولعملائك أفضل حلول التحلية
                المركزية والمنزلية ،أنظمة الرذاذ، والبرادات . نخدمك من التصميم
                وحتى التركيب والصيانة بضمان
              </h3>

              <div className="h-2"></div>

              {/* Animating Dynamic Title Sub-Heading */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 text-slate-800 text-base sm:text-lg font-bold"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>{HERO_SLIDES[activeIdx].title}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Narrative paragraph description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium"
              >
                {HERO_SLIDES[activeIdx].desc} نوفر لك أحدث محطات تحلية المياه
                المنزلية المتكاملة مع الفحص المجاني للملوحة للمطبخ، البرادة،
                وجدولة الصيانات السنوية في الرياض.
              </motion.p>
            </AnimatePresence>

            {/* High-Impact Trust Value Points Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-extrabold text-slate-800">
                    ضمان ذهبي ممتد
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    يشمل جميع القطع الكهربائية والهيكل
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-extrabold text-slate-800">
                    تركيب وتوصيل سريع
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    فريق مهندسين معالجة جاهز بالرياض خلال 24 ساعة
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Waves className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-extrabold text-slate-800">
                    فحص وضبط ملوحة مجاني
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    نوازن الملوحة حسب رغبتك (من 100 لـ 150)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-extrabold text-slate-800">
                    صيانة دورية ذكية
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    نذكرك بمواعيد تبديل الفلاتر أوتوماتيكياً
                  </span>
                </div>
              </div>
            </div>

            {/* High-converting Call to action block */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full pt-2">
              <button
                onClick={handleScrollToForm}
                className="btn-primary relative overflow-hidden px-7 py-4 rounded-xl text-xs sm:text-sm font-black text-center flex items-center justify-center gap-2 flex-1"
                id="hero-primary-btn"
              >
                <ShieldCheck className="w-4 h-4 text-sky-200 transition-transform duration-300 group-hover:scale-110" />
                <span>احصل على فحص وعرض مجاني</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>

              <a
                href="https://wa.me/966553033199"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary bg-white hover:bg-slate-50 text-slate-800 px-7 py-4 rounded-xl text-xs sm:text-sm font-black shadow-sm transition-all text-center flex items-center justify-center gap-2.5 border border-slate-200 flex-1"
                id="hero-whatsapp-btn"
              >
                <div className="relative flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
                <span className="text-slate-800">المهندس المناوب (واتساب)</span>
              </a>
            </div>

            {/* Tamara and Tabby premium instalment shelf */}
            <div className="w-full border-t border-slate-100 pt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-extrabold">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>شريت الحين وقسّط على 4 دفعات بدون أي فوائد:</span>
              </div>
              <div className="flex flex-wrap items-center gap-3.5">
                <div className="bg-[#FFF9E6]/80 hover:bg-[#FFF2CC] rounded-xl px-4 py-2 border border-[#FFE299]/50 flex items-center justify-center h-10 transition-all duration-300 shadow-xs">
                  <img
                    src={tamaraLogo}
                    alt="تمارا لتقسيط مبيعات المياه"
                    className="h-16 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-[#E5FFF3]/80 hover:bg-[#CCFFE6] rounded-xl px-4 py-2 border border-[#99FFCC]/50 flex items-center justify-center h-10 transition-all duration-300 shadow-xs">
                  <img
                    src={tabbyLogo}
                    alt="تابي لتقسيط فلاتر المياه"
                    className="h-18 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mr-auto">
                  <button
                    onClick={handleScrollToForm}
                    className="inline-flex items-center gap-1 text-[11px] font-black text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>احسب قسطك الشهري</span>
                    <span dir="ltr">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Large Visual Showcase Canvas with Interactive Sliders */}
          <div
            className="lg:col-span-6 relative w-full h-[360px] sm:h-[420px] md:h-[500px] lg:h-[580px] flex items-center justify-center rounded-[32px] overflow-hidden bg-gradient-to-tr from-[#051121] via-[#091b30] to-[#040f1a] shadow-[0_24px_56px_-12px_rgba(10,30,54,0.18)] border-4 border-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Visual Glassmorphic Grid Lining Backing */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* Soft Ambient glowing flare */}
            <div className="absolute -top-10 -left-10 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none animate-pulse"></div>

            {/* Sliding Quick Manual Slides overlays */}
            <div className="absolute top-5 right-5 z-20 flex gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-md cursor-pointer ${
                    activeIdx === idx
                      ? "bg-blue-600 text-white scale-105 shadow-blue-500/20"
                      : "bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md border border-slate-100"
                  }`}
                >
                  {idx === 0
                    ? "🏆 الأكثر مبيعاً الرياض"
                    : "🔥 عروض التقسيط المزدوج"}
                </button>
              ))}
            </div>

            {/* Float Badge: Quality guarantee and client popularity */}
            <div className="absolute top-5 left-5 z-20 bg-emerald-500/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-[10px] md:text-xs font-black shadow-lg">
              <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span>{HERO_SLIDES[activeIdx].badge}</span>
            </div>

            {/* Left and Right navigation buttons */}
            <button
              onClick={() =>
                setActiveIdx(
                  (prev) =>
                    (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white p-3 rounded-2xl backdrop-blur-xs z-30 cursor-pointer"
              aria-label="السابق"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white p-3 rounded-2xl backdrop-blur-xs z-30 cursor-pointer"
              aria-label="التالي"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Main Visual high-resolution Render frame */}
            <div className="w-full h-full flex items-center justify-center p-4 bg-[#051121]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={HERO_SLIDES[activeIdx].image}
                  alt={HERO_SLIDES[activeIdx].title}
                  initial={{ opacity: 0.1, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-contain max-h-[100%] max-w-[100%]"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            {/* Overlay trust card (Health authority stats) */}
            <div className="absolute bottom-5 right-5 left-5 z-20 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white/94 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 text-right">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-[#0c2340]">
                    ملوحة مياه صحية وموزونة
                  </span>
                  <span className="text-[10px] font-bold text-slate-700">
                    نطاق مثالي آمن: 100 - 150 TDS لشرب مثالي وعذب
                  </span>
                </div>
              </div>

              {/* Pagination bullets */}
              <div className="flex items-center justify-end gap-1.5 self-end sm:self-center">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === activeIdx
                        ? "bg-blue-600 w-6 shadow-[0_2px_6px_rgba(37,99,235,0.3)]"
                        : "bg-slate-200 hover:bg-slate-300 w-2.5"
                    }`}
                    aria-label={`شريحة رقم ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
