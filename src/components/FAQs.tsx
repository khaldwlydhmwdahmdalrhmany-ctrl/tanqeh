/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQS } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQs() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 md:py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header visual */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
            <span className="section-subheading-tag">
              الأسئلة المتكررة والتوضيحات
            </span>
            <h2 className="section-heading-main">
              هل لديك أي استفسار آخر بفكرك؟
            </h2>
            <p className="lead-paragraph">
              جمعنا لك هنا أهم الأسئلة الشائعة من عملائنا في الرياض مع إجاباتها الواضحة والشفافة لمساعدتك في اتخاذ القرار الأفضل لبيتك.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
          </div>

          {/* Accordion list */}
          <div className="flex flex-col gap-4">
            {FAQS.map((item) => {
              const isOpen = activeId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-blue-300 shadow-sm bg-blue-50/10' : 'border-slate-150 hover:border-slate-350'
                  }`}
                >
                  {/* Header button triggers */}
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-extrabold text-blue-950 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-550'}`} />
                      <span className="text-sm sm:text-base leading-snug">{item.question}</span>
                    </div>

                    <div className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Animated Body panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold border-t border-slate-100/60 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
