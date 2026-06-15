/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck, Layers, BadgePercent, Image as ImageIcon, Sparkles, HelpCircle, FileText, ArrowLeft, Heart, Award, GlassWater, Package, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoDark from '@/assets/brand/logo-dark.svg';

interface HeaderProps {
  onOpenAdmin: () => void;
  adminCount: number;
}

export default function Header({ onOpenAdmin, adminCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = isScrolled ? 75 : 90; // variable offset matching header height states
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed z-50 transition-all duration-500 ease-out-quint ${
          isScrolled
            ? 'top-4 left-4 right-4 max-w-7xl mx-auto rounded-2xl bg-white/92 backdrop-blur-lg shadow-[0_16px_36px_-10px_rgba(10,30,54,0.06),0_1px_3px_0_rgba(10,30,54,0.02)] py-2.5 border border-slate-150/60'
            : 'top-0 left-0 right-0 bg-gradient-to-b from-blue-950/20 via-white/10 to-transparent py-5'
        }`}
        dir="rtl"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO & CORPORATE IDENTITY */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Premium Logo Framing holding standard brand SVG */}
              <div className="w-11 h-11 flex relative items-center justify-center p-1 bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md overflow-hidden">
                <img 
                  src={isScrolled ? logoDark : logoMain} 
                  alt="مؤسسة نثال لتنقية المياه" 
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:rotate-6" 
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex flex-col text-right">
                <span className={`text-[17px] tracking-normal leading-tight font-black transition-colors duration-300 ${
                  isScrolled ? 'text-[#0a1e36]' : 'text-[#0a1e36]'
                }`}>
                  مؤسسة نثـال
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#0072ff] leading-none mt-1">
                  لأنظمة وحلول تنقية المياه
                </span>
              </div>
            </div>

            {/* DESKTOP MAIN NAVIGATION */}
            <nav className="hidden md:flex items-center gap-1 xl:gap-2 relative">
              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 rounded-lg cursor-pointer select-none flex items-center gap-1.5 ${
                    isScrolled 
                      ? 'text-slate-600 hover:text-[#0072ff]' 
                      : 'text-slate-800 hover:text-blue-900'
                  }`}
                >
                  {/* Sliding Hover Glass Pill backdrop */}
                  <AnimatePresence>
                    {hoveredIdx === idx && (
                      <motion.span
                        layoutId="navHoverBackdrop"
                        className="absolute inset-0 bg-blue-50/60 rounded-lg -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>

            {/* QUICK CALL TO ACTIONS & CRM INBOX */}
            <div className="hidden lg:flex items-center gap-2.5">
              {adminCount > 0 && (
                <button
                  onClick={onOpenAdmin}
                  className="relative bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-2 rounded-xl border border-amber-200/60 transition-all duration-300 cursor-pointer flex items-center gap-1.5 hover:shadow-xs group"
                  id="header-admin-btn"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping"></span>
                  </span>
                  <span>الطلبات الواردة ({adminCount})</span>
                </button>
              )}

              {/* Verified Hot Dial Direct */}
              <a
                href="tel:+966553033199"
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-[#091b30] hover:text-[#0072ff] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border border-slate-150/70"
                id="header-call-btn"
              >
                <Phone className="w-3.5 h-3.5 text-[#0072ff] animate-pulse" />
                <span dir="ltr">055 303 3199</span>
              </a>

              {/* Main Luxury Free Quote CTA */}
              <button
                onClick={() => scrollToSection('lead-form-section')}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 group"
                id="header-quote-btn"
              >
                <ShieldCheck className="w-4 h-4 text-sky-200 transition-transform duration-300 group-hover:scale-110" />
                <span>احصل على فحص وعرض مجاني</span>
              </button>
            </div>

            {/* RESPONSIVE TOGGLES FOR MOBILE INTERACTIVE VIEWPORT */}
            <div className="flex items-center gap-2.5 md:hidden">
              {adminCount > 0 && (
                <button
                  onClick={onOpenAdmin}
                  className="bg-amber-50 text-amber-800 p-2 rounded-xl text-xs font-bold border border-amber-200/50 flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  <span>{adminCount}</span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2.5 rounded-xl transition-all duration-300 border ${
                  isScrolled 
                    ? 'bg-slate-50 border-slate-150 text-slate-800 hover:bg-slate-100' 
                    : 'bg-white/90 border-transparent text-blue-950 shadow-sm'
                }`}
                id="mobile-menu-toggle"
                aria-label="قائمة التنقل رئيسية"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* STATE-OF-THE-ART FULL MOBILE SIDE-DRAWER UNDERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Blurred dark background sheet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#061224] z-50 backdrop-blur-xs"
            />

            {/* Slide-out Panel container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-white z-50 shadow-2xl flex flex-col justify-between border-l border-slate-100 overflow-hidden"
              id="mobile-nav-panel"
              dir="rtl"
            >
              {/* Drawer Top Header info */}
              <div className="p-5 border-b border-slate-100 bg-linear-to-b from-blue-50/30 to-transparent">
                <div className="flex items-center justify-between">
                  {/* Brand badge */}
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={logoDark} 
                      alt="نثال للمياه" 
                      className="w-8 h-8 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#0a1e36]">مؤسسة نثال الأولى</span>
                      <span className="text-[8px] font-extrabold text-[#0072ff]">لحلول ومعالجة المحطات</span>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-150"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navlinks Stack content */}
              <div className="flex-grow py-4 px-3 overflow-y-auto space-y-1">
                <div className="px-2 pb-2 text-[10px] font-extrabold text-slate-500 tracking-wider">أقسام الموقع الحالية</div>
                {navLinks.map((link, idx) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-right px-4 py-3 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0072ff] hover:bg-blue-50/50 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 group-hover:text-[#0072ff] transition-colors">{link.icon}</span>
                      <span className="font-semibold">{link.label}</span>
                    </div>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0072ff]" />
                  </button>
                ))}
              </div>

              {/* Drawer Footer fast dialing & action buttons */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                <div className="text-[10px] text-center text-slate-500 font-extrabold mb-2">تواصل مباشر مع أحد مهندسينا المعالِجين</div>
                
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+966553033199"
                    className="flex flex-col items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-[#0a1e36] p-3 rounded-xl text-xs font-bold border border-slate-150 text-center transition-colors"
                  >
                    <Phone className="w-4 h-4 text-blue-600 animate-bounce" />
                    <span>اتصال هاتفي</span>
                  </a>

                  <a
                    href="https://wa.me/966553033199"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl text-xs font-bold text-center transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-100" />
                    <span>واتساب مباشر</span>
                  </a>
                </div>

                <button
                  onClick={() => scrollToSection('lead-form-section')}
                  className="btn-primary w-full text-center py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>اطلب فحص ملوحة مجاناً</span>
                </button>

                {/* Secure Trust badge inside drawer */}
                <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-semibold pt-1">
                  <span>صحة عائلتك أمانة نلتزم برعايتها</span>
                  <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Interactive navigation list with contextual micro-icons for modern intuitive layout structure
const navLinks = [
  { id: 'about-section', label: 'عن نثال', icon: <Award className="w-4 h-4" /> },
  { id: 'services-section', label: 'خدماتنا والتركيب', icon: <GlassWater className="w-4 h-4" /> },
  { id: 'products-section', label: 'كتالوج الأجهزة', icon: <Package className="w-4 h-4" /> },
  { id: 'projects-section', label: 'أعمالنا ومشاريعنا', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'before-after-section', label: 'مقارنة قبل وبعد', icon: <Sliders className="w-4 h-4" /> },
  { id: 'process-section', label: 'خطة وجدول العمل', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'faq-section', label: 'الأسئلة والضمانات', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'lead-form-section', label: 'احجز زيارة مجانية', icon: <ShieldCheck className="w-4 h-4" /> }
];

