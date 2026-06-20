/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Achievements from "./components/Achievements";
import Services from "./components/Services";
import Catalog from "./components/Catalog";
import Projects from "./components/Projects";
import BeforeAfter from "./components/BeforeAfter";
import Process from "./components/Process";
import Reviews from "./components/Reviews";
import FAQs from "./components/FAQs";
import QuoteForm from "./components/QuoteForm";
import Footer from "./components/Footer";
import AdminHub from "./components/AdminHub";
import { QuoteRequest } from "./types";
import {
  MessageSquare,
  Phone,
  ShieldCheck,
  Heart,
  Sparkles,
  Sliders,
  Home,
  Building2,
  Coffee,
  Palmtree,
} from "lucide-react";
import projectCommercialRoImg from "@/assets/projects/images/project-commercial-ro.jpg";
import tamaraLogo from "@/assets/payment-methods/tamara.svg";
import tabbyLogo from "@/assets/payment-methods/tabby.svg";

export default function App() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    "filter" | "cooler" | "mist" | "maintenance" | "all"
  >("all");
  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);

  // Hydrate quotes database from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nethal_quotes_db");
      if (stored) {
        setQuotes(JSON.parse(stored));
      } else {
        // Seeding initial simulated quotes to show the customer how the CRM works beautifully
        const sampleQuotes: QuoteRequest[] = [
          {
            id: "NETHAL-90812",
            fullName: "سعد بن ناصر الدوسري",
            phone: "0554109281",
            city: "الرياض - حي النرجس",
            serviceType: "أجهزة التصفية والتحلية",
            details:
              "أرغب في تركيب فلتر غولدن برو بمطبخ شقتي الجديدة وتوصيله بالثلاجة مباشرة.",
            productName: "جهاز تحلية غولدن برو (7 مراحل المتقدم)",
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
            status: "new",
          },
          {
            id: "NETHAL-81230",
            fullName: "عبدالله السديري",
            phone: "0557712101",
            city: "الرياض - حي الملقا",
            serviceType: "أنظمة الرذاذ والتبريد الخارجي",
            productName: "نظام رذاذ التبريد المخصص (للقصور والكافيهات)",
            details:
              "معاينة لتركيب رذاذ تبريد إيطالي لكافيه خارجي بمساحة 12*6 متر لجلسات الزوار.",
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 24 hours ago
            status: "contacted",
          },
        ];
        localStorage.setItem("nethal_quotes_db", JSON.stringify(sampleQuotes));
        setQuotes(sampleQuotes);
      }
    } catch (e) {
      console.error("Error reading localStorage DB:", e);
    }
  }, []);

  // Save changes to localStorage database
  const saveToLocalStorage = (newQuotes: QuoteRequest[]) => {
    try {
      localStorage.setItem("nethal_quotes_db", JSON.stringify(newQuotes));
      setQuotes(newQuotes);
    } catch (e) {
      console.error("Error saving to localStorage DB:", e);
    }
  };

  const handleAddQuote = (quote: QuoteRequest) => {
    const updated = [quote, ...quotes];
    saveToLocalStorage(updated);
  };

  const handleUpdateQuoteStatus = (
    id: string,
    status: "new" | "contacted" | "completed",
  ) => {
    const updated = quotes.map((q) => {
      if (q.id === id) {
        return { ...q, status };
      }
      return q;
    });
    saveToLocalStorage(updated);
  };

  const handleDeleteQuote = (id: string) => {
    const updated = quotes.filter((q) => q.id !== id);
    saveToLocalStorage(updated);
  };

  const handleClearAllQuotes = () => {
    if (
      window.confirm(
        "هل أنت متأكد من مسح جميع تذاكر المتابعة وقائمة العملاء والطلبات؟",
      )
    ) {
      saveToLocalStorage([]);
    }
  };

  const handleProductSelectFromCatalog = (productName: string) => {
    setSelectedProductName(productName);
  };

  const handleCategorySelectFromServices = (
    category: "filter" | "cooler" | "mist" | "maintenance",
  ) => {
    setSelectedCategory(category);
    const element = document.getElementById("products-section");
    if (element) {
      const offset = 80;
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
    <div
      className="bg-white min-h-screen relative font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900"
      dir="rtl"
    >
      {/* Navigation Header */}
      <Header
        onOpenAdmin={() => setIsAdminHubOpen(true)}
        adminCount={quotes.filter((q) => q.status === "new").length}
      />

      {/* Hero Header with Brand messaging */}
      <Hero />

      {/* Key Numbers grid */}
      <Achievements />

      {/* Services Breakdown */}
      <Services onSelectCategory={handleCategorySelectFromServices} />

      {/* Interactive Drag Before and After Visuals Compare */}
      <BeforeAfter />

      {/* Interactive Products Gallery / Details Catalog */}
      <Catalog
        onSelectProductForQuote={handleProductSelectFromCatalog}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Target Audience Segment "من نخدم؟" Card Panel */}
      <section className="py-20 md:py-24 bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
            <span className="section-subheading-tag">
              نطاق تغطيتنا وريادتنا
            </span>
            <h2 className="section-heading-main">
              لمن نقدم خدمات فلاتر وتبريد وتحلية مياه نثال؟
            </h2>
            <p className="lead-paragraph">
              نقوم بتغطية وتلبية متطلبات جميع المنشآت السكنية، التجارية،
              والمقاهي المتخصصة بأعلى معايير الجودة في مدينة الرياض.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {audienceList.map((aud, index) => (
              <div
                key={index}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-150 hover:bg-blue-50/30 hover:border-blue-200 transition-all duration-300 text-center flex flex-col items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 transition-transform duration-300 group-hover:scale-110">
                  {aud.icon}
                </div>
                <h4 className="text-sm font-extrabold text-blue-950">
                  {aud.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-800 leading-relaxed font-bold">
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard "لماذا تختارنا؟" Section */}
      <section
        className="py-20 md:py-24 bg-slate-900 text-white relative overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.2),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-5 text-right items-start">
              <span className="section-subheading-tag text-sky-400 bg-sky-400/10 border-sky-400/20">
                لماذا تختار مؤسسة نثال؟
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                شريكك المضمون لمياه آمنة تدوم لراحة بالك
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-bold">
                لا نبيع مجرد فلاتر، بل نلتزم بشراكة وصداقة طويلة لضمان بقاء مياه
                منزلك صحية وآمنة دوماً. إليك ما يجعلنا متميزين:
              </p>

              <div className="flex flex-col gap-5 mt-4">
                {whyChooseUsList.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold text-white">
                        {item.title}
                      </span>
                      <p className="text-[11px] text-slate-200 mt-0.5 leading-relaxed font-bold">
                        {item.desc}
                      </p>
                      {idx === 2 && (
                        <div className="flex items-center gap-2.5 mt-2.5">
                          <div className="bg-[#FFF9E6] rounded-xl px-3 py-1 border border-[#FFE299]/30 flex items-center justify-center h-8 overflow-hidden transition-all duration-300 hover:border-[#FFE299]/70">
                            <img
                              src={tamaraLogo}
                              alt="تمارا"
                              className="h-12 w-auto object-contain -my-3"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="bg-[#E5FFF3] rounded-xl px-3 py-1 border border-[#99FFCC]/30 flex items-center justify-center h-8 overflow-hidden transition-all duration-300 hover:border-[#99FFCC]/70">
                            <img
                              src={tabbyLogo}
                              alt="تابي"
                              className="h-14 w-auto object-contain -my-4"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950">
                <img
                  src={projectCommercialRoImg}
                  alt="لماذا تختار نثال لتصفية وتحلية المياه"
                  className="w-full aspect-square object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-6 right-6 left-6 text-right">
                  <span className="text-[11px] font-extrabold text-sky-400">
                    ميزة استثنائية وبطاقات العناية
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-white mt-1">
                    تذكير آلي بالصيانة الدورية عبر الواتساب
                  </h4>
                  <p className="text-[11px] text-slate-100 mt-1.5 leading-relaxed font-bold">
                    نسجل تاريخ بيع وتركيب فلترك بدقة لنذكّرك بمواعيد تبديل
                    الشمعات الثلاث، لتظل كفاءتها 100%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Projects/Installations with photos and videos showcase */}
      <Projects />

      {/* Workflow Process Presentation */}
      <Process />

      {/* Customer Feedbacks */}
      <Reviews />

      {/* Accordions Frequently Asked */}
      <FAQs />

      {/* Core Leads Capture Form */}
      <QuoteForm
        selectedProductName={selectedProductName}
        onAddQuote={handleAddQuote}
      />

      {/* Map locator and base credentials details */}
      <Footer />

      {/* Administrative CRM leads box (only visible when toggled) */}
      {isAdminHubOpen && (
        <AdminHub
          quotes={quotes}
          onClose={() => setIsAdminHubOpen(false)}
          onUpdateStatus={handleUpdateQuoteStatus}
          onDeleteQuote={handleDeleteQuote}
          onClearAll={handleClearAllQuotes}
        />
      )}

      {/* FLOATING ACTION CTA BAR - Critical for conversions */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* Float Controls for evaluation: Admin Portal Hub */}
        {/* <button
          onClick={() => setIsAdminHubOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-slate-700 cursor-pointer flex items-center justify-center relative group"
          title="معاينة لوحة تحكم الإداري ومتابعة التذاكر"
        >
          <Sliders className="w-5 h-5 text-sky-400" />
          {quotes.filter((q) => q.status === 'new').length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-605 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white animate-bounce bg-red-600">
              {quotes.filter((q) => q.status === 'new').length}
            </span>
          )}
          
          <span className="absolute left-14 bg-slate-900 text-white rounded-lg text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            لوحة الإداري (CRM)
          </span>
        </button> */}

        {/* Float 1: Direct Phone Connection */}
        <a
          href="tel:+966553033199"
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center relative group"
          id="floating-call-btn"
        >
          <Phone className="w-6 h-6 stroke-[2.5]" />

          <span className="absolute left-14 bg-blue-600 text-white rounded-lg text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            اتصل مبيعات: +966553033199
          </span>
        </a>

        {/* Float 2: Instant WhatsApp Messaging */}
        <a
          href="https://wa.me/966553033199"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center relative group"
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-6 h-6 stroke-[2.5]" />

          <span className="absolute left-14 bg-emerald-600 text-white rounded-lg text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            واتساب مبيعات نثال
          </span>
        </a>
      </div>
    </div>
  );
}

// Structs lists
const audienceList = [
  {
    icon: <Home className="w-6 h-6 text-[#0072ff]" />,
    title: "المنازل والفلل السكنية",
    desc: "لتأمين كفاية تامة ومستمرة لأسرتكم من مياه الشرب المتوازنة والآمنة للكبار والأطفال.",
  },
  {
    icon: <Building2 className="w-6 h-6 text-[#0072ff]" />,
    title: "الشركات والمكاتب والمطابخ",
    desc: "برادات تحلية ذكية مدمجة لحماية الموظفين وصناع القهوة بلا ازدحام أو تبديل مستمر لقوارير المياه.",
  },
  {
    icon: <Coffee className="w-6 h-6 text-[#0072ff]" />,
    title: "المقاهي والمطاعم المتميزة",
    desc: "محطات RO لإزالة الترسبات وتحسين جودة استخلاص القهوة ونكهة الإسبريسو.",
  },
  {
    icon: <Palmtree className="w-6 h-6 text-[#0072ff]" />,
    title: "الحدائق والقصور والاستراحات",
    desc: "خطوط رذاذ إيطالية وتبريد ضبابي مائي لتلطيف الحر اللافح ومقاومة الطقس الجاف.",
  },
];

const whyChooseUsList = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "مياه آمنة وصحيّة 100%",
    desc: "جميع أجهزتنا وفلاترنا حاصلة على شهادات المطابقة القياسية والاعتماد من الهيئات الفنية المرموقة، وتضمن إزالة الشوائب والمعادن الضارة بالكامل.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "ضمان حقيقي ممتد وراحة بال ممتدة",
    desc: "نوفر صيانة دورية مجدولة وتذكيراً مستمراً ومراقبة لكفاءة وضغط مياهك. نلتزم خطياً بضمانات تصل إلى 5 سنوات على القطع وأعمال التركيب.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "دفع بالتقسيط مع تمارا وتابي",
    desc: "لا تحمل هم تكلفة الفلتر الفورية. نوفر تقسيطاً مباشراً بدون فوائد لجميع خدماتنا المعتمدة، لتبقى بيوتكم مليئة بالصحة والنقاء.",
  },
];
