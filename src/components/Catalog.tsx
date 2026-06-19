/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { ShieldCheck, Info, CheckCircle2, Bookmark, Sliders, ChevronDown } from 'lucide-react';
import tamaraLogo from '@/assets/payment-methods/tamara.svg';
import tabbyLogo from '@/assets/payment-methods/tabby.svg';

interface CatalogProps {
  onSelectProductForQuote: (productName: string) => void;
  selectedCategory: 'filter' | 'cooler' | 'mist' | 'maintenance' | 'all';
  setSelectedCategory: (cat: 'filter' | 'cooler' | 'mist' | 'maintenance' | 'all') => void;
}

export default function Catalog({ onSelectProductForQuote, selectedCategory, setSelectedCategory }: CatalogProps) {
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const whatsappNumber = '966553033199';

  // Filter the products list
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.type === selectedCategory;
  });

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'filter', label: 'فلاتر وأجهزة تحلية' },
    { id: 'cooler', label: 'برادات وموزعات مياه' },
    { id: 'mist', label: 'أنظمة رذاذ تبريد' },
    { id: 'maintenance', label: 'إكسسوارات وحماية' }
  ];

  const getProductWhatsappLink = (product: Product) => {
    const text = `السلام عليكم، أرغب بطلب هذا المنتج من مؤسسة نثال:

- المنتج: ${product.name}
- العلامة: ${product.brand}
- نوع الطلب: تركيب أو عرض سعر

يرجى التواصل معي لتأكيد التفاصيل.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleOrderProduct = (product: Product) => {
    const pName = product.name;
    onSelectProductForQuote(pName);
    window.open(getProductWhatsappLink(product), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="products-section" className="py-20 md:py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-2">
          <span className="section-subheading-tag">
            معرض الأجهزة والمنتجات
          </span>
          <h2 className="section-heading-main">
            أجهزة ذات كفاءة واعتمادية مطابقة لمنظومتكم السكنية والتجارية
          </h2>
          <p className="lead-paragraph">
            اختر جهازك المفضل واطلع على المزايا التفصيلية. نقوم بالتوصيل والتركيب الفوري في الرياض بضمانات حقيقية.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 border-transparent hover:bg-blue-700'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Image & tag overlays */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                {product.isPopular && (
                  <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 font-bold rounded-lg text-[10px] uppercase tracking-wider shadow-sm animate-pulse">
                    الأكثر طلباً ⭐
                  </div>
                )}
                <div className="absolute top-4 left-4 z-10 bg-blue-900/90 backdrop-blur-md text-white px-2.5 py-1 font-bold rounded-lg text-[10px] shadow-sm">
                  ضمان {product.warrantyYears} {product.warrantyYears === 1 ? 'سنة واحدة' : 'سنوات'}
                </div>

                {/* Main image with Referrer protection */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text components */}
              <div className="p-6 flex flex-col flex-grow text-right">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1 font-mono">
                  {product.brand}
                </span>

                <h3 className="text-lg font-extrabold text-[#0a1e36] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <p className="text-slate-600 text-xs font-bold leading-relaxed mb-6">
                  {product.tagline}
                </p>

                {/* Mini bullet highlights */}
                <div className="flex flex-col gap-2.5 border-t border-slate-50 pt-5 mb-6 self-stretch">
                  <span className="text-[10px] text-slate-600 font-bold mb-1 block">أبرز الميزات الفنية:</span>
                  {product.features.slice(0, 3).map((feat, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-700 font-semibold leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                  <button
                    onClick={() => handleOrderProduct(product)}
                    className="btn-primary flex-grow rounded-xl py-3 text-xs font-bold text-center"
                  >
                    اطلب الآن
                  </button>

                  <button
                    onClick={() => setSelectedProductDetails(product)}
                    className="btn-secondary h-10 w-10 flex items-center justify-center rounded-xl p-0 shrink-0"
                    title="المزيد من المواصفات الفنية"
                  >
                    <Info className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Tabby & Tamara installment option display */}
                <div className="mt-3.5 text-center bg-slate-50/70 border border-slate-100/50 py-1.5 px-3 rounded-xl text-[10px] font-extrabold text-slate-500 flex items-center justify-center gap-1.5">
                  <span>أو بالتقسيط بدون فوائد عبر:</span>
                  <div className="inline-flex items-center gap-1.5">
                    <div className="bg-[#FFFDF6] hover:bg-[#FFF9E6] transition-colors duration-200 px-2.5 py-1 rounded-lg border border-[#FFF0CC] flex items-center justify-center h-7 overflow-hidden">
                      <img src={tamaraLogo} alt="تمارا" className="h-11 w-auto object-contain -my-3" referrerPolicy="no-referrer" />
                    </div>
                    <div className="bg-[#F3FFF9] hover:bg-[#E5FFF3] transition-colors duration-200 px-2.5 py-1 rounded-lg border border-[#D5FFE7] flex items-center justify-center h-7 overflow-hidden">
                      <img src={tabbyLogo} alt="تابي" className="h-12 w-auto object-contain -my-3.5" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal Panel */}
        {selectedProductDetails && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" dir="rtl">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Back covering */}
              <div 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                aria-hidden="true"
                onClick={() => setSelectedProductDetails(null)}
              ></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal Card content */}
              <div className="inline-block align-bottom bg-white rounded-3xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-slate-100">
                
                {/* Header with picture illustration */}
                <div className="relative aspect-[16/6] bg-slate-100 overflow-hidden">
                  <img 
                    src={selectedProductDetails.image} 
                    alt={selectedProductDetails.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 right-6 text-white text-right">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{selectedProductDetails.brand}</span>
                    <h4 className="text-lg sm:text-xl font-extrabold">{selectedProductDetails.name}</h4>
                  </div>
                </div>

                {/* Specs / Manual block */}
                <div className="p-6 sm:p-8">
                  <h5 className="text-sm font-extrabold text-[#0a1e36] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>المواصفات الفنية وجدول القياسات</span>
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedProductDetails.specs.map((spec, index) => (
                      <div key={index} className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 flex flex-col gap-1 text-right">
                        <span className="text-[10px] text-slate-600 font-bold">{spec.label}</span>
                        <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <h5 className="text-sm font-extrabold text-[#0a1e36] mb-3">مزايا حصرية مع هذا الجهاز:</h5>
                  <div className="space-y-2.5 mb-8">
                    {selectedProductDetails.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Manual Actions inside modal */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 border-t border-slate-100 pt-6">
                    <button
                      onClick={() => {
                        handleOrderProduct(selectedProductDetails);
                        setSelectedProductDetails(null);
                      }}
                      className="btn-primary w-full sm:flex-grow rounded-xl py-3 text-sm font-bold text-center"
                    >
                      اطلب هذا الجهاز الآن
                    </button>
                    
                    <button
                      onClick={() => setSelectedProductDetails(null)}
                      className="btn-secondary w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-center"
                    >
                      إغلاق النافذة
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
