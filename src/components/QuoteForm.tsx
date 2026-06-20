/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QuoteRequest } from '../types';
import { pushGtmEvent } from '../lib/gtm';
import { User, Phone, MapPin, Sliders, FileText, CheckCircle2, MessageSquare, ArrowLeft, RefreshCcw } from 'lucide-react';

interface QuoteFormProps {
  selectedProductName: string;
  onAddQuote: (quote: QuoteRequest) => void;
}

export default function QuoteForm({ selectedProductName, onAddQuote }: QuoteFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [serviceType, setServiceType] = useState('filter');
  const [details, setDetails] = useState('');
  const [preferredProduct, setPreferredProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<QuoteRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto-population of selected product from catalog clicks
  useEffect(() => {
    if (selectedProductName) {
      setPreferredProduct(selectedProductName);
      // Auto-set service type based on product name keyword
      if (selectedProductName.includes('برادة') || selectedProductName.includes('سول أكوا')) {
        setServiceType('cooler');
      } else if (selectedProductName.includes('رذاذ') || selectedProductName.includes('ضباب')) {
        setServiceType('mist');
      } else if (selectedProductName.includes('صيانة') || selectedProductName.includes('فلتر الغسالات') || selectedProductName.includes('حماية')) {
        setServiceType('maintenance');
      } else {
        setServiceType('filter');
      }
    }
  }, [selectedProductName]);

  const validatePhone = (p: string) => {
    // Saudi phone formats: 05xxxxxxxx, 9665xxxxxxxx, +9665xxxxxxxx or at least 9-10 digits
    const cleaned = p.replace(/[\s-+]/g, '');
    return cleaned.length >= 9 && /^\d+$/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field checkups
    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage('الرجاء إدخال اسمك الكامل بشكل صحيح (أكثر من حرفين)');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('رقم الجوال مطلوب للتواصل وإرسال التسعيرة');
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMessage('الرجاء إدخال رقم جوال سعودي صحيح ومكون من أرقام فقط (مثال: 0553033199)');
      return;
    }

    if (!city.trim()) {
      setErrorMessage('الرجاء تحديد مدينتك أو الحي السكني لإرسال المندوب');
      return;
    }

    setIsLoading(true);

    const ticketId = `NETHAL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newQuote: QuoteRequest = {
      id: ticketId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      serviceType: getServiceArabicLabel(serviceType),
      details: details.trim() || `طلب الحصول على استشارة وتركيب ${preferredProduct || 'أحد الأجهزة المتاحة'}`,
      productName: preferredProduct || undefined,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    onAddQuote(newQuote);
    setSubmittedRequest(newQuote);
    setIsLoading(false);
    pushGtmEvent('generate_lead', {
      lead_type: newQuote.serviceType,
      product_name: newQuote.productName || 'غير محدد',
      contact_method: 'whatsapp',
    });
    window.open(getWhatsappPreFilledLink(newQuote), '_blank', 'noopener,noreferrer');

    const formElement = document.getElementById('lead-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const getServiceArabicLabel = (type: string) => {
    switch (type) {
      case 'filter': return 'أجهزة التصفية والتحلية';
      case 'cooler': return 'برادات وموزعات المياه';
      case 'mist': return 'أنظمة الرذاذ والتبريد الخارجي';
      case 'maintenance': return 'الصيانة الدورية وقطع الغيار';
      default: return 'طلب استشارة مخصصة';
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setCity('الرياض');
    setServiceType('filter');
    setDetails('');
    setPreferredProduct('');
    setSubmittedRequest(null);
  };

  const getWhatsappPreFilledLink = (quote: QuoteRequest) => {
    const text = `السلام عليكم ورحمة الله وبركاته،
أود تأكيد طلب الاستشارة وفحص الأملاح المجاني من نثال لتحلية المياه بالرياض.

*معلومات تذكرة الطلب:*
- *الرقم المرجعي:* ${quote.id}
- *الاسم:* ${quote.fullName}
- *الجوال:* ${quote.phone}
- *المدينة:* ${quote.city}
- *الخدمة:* ${quote.serviceType}
${quote.productName ? `- *الجهاز:* ${quote.productName}` : ''}
${quote.details ? `- *التفاصيل:* ${quote.details}` : ''}

يرجى التواصل وتأكيد الموعد الأنسب.`;
    return `https://wa.me/966553033199?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="lead-form-section" className="py-20 md:py-24 bg-gradient-to-br from-blue-900 to-blue-950 text-white relative overflow-hidden" dir="rtl">
      
      {/* Wave SVG or drop shapes */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-sky-200/10"></div>
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Upper Title */}
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-2">
            <span className="section-subheading-tag text-sky-400 bg-sky-400/10 border-sky-400/25">
              احصل على السعر فوراً
            </span>
            <h2 className="section-heading-main !text-white">
              ابدأ خطوتك نحو مياه أنقى.. اطلب استشارتك وعرض السعر المجاني الآن
            </h2>
            <p className="lead-paragraph !text-blue-100">
              بضع ثوانٍ تفصلك عن مياه صحية ونقية 100%. املأ بياناتك البسيطة لتتحرك أقرب سيارات المهندسين والفنيين إليك بالرياض.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full mt-3"></div>
          </div>

          {/* Master Card container */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10">
            
            {submittedRequest ? (
              /* SUCCESS FEEDBACK CARD */
              <div className="text-center py-6 flex flex-col items-center gap-6" id="quote-success-panel">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                </div>

                <h3 className="text-2xl font-extrabold text-[#0a1e36]">
                  تم تجهيز طلبكم وفتح واتساب لإرساله!
                </h3>

                <div className="bg-slate-50 border border-slate-150 p-4.5 rounded-2xl w-full max-w-md text-right flex flex-col gap-2">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs text-slate-600 font-bold">رقم تذكرة المتابعة:</span>
                    <span className="text-xs font-mono font-bold text-blue-600">{submittedRequest.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600 font-bold">مقدم الطلب:</span>
                    <span className="text-xs font-bold text-slate-800">{submittedRequest.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600 font-bold">نوع الخدمة والمنتج:</span>
                    <span className="text-xs font-bold text-slate-800">
                      {submittedRequest.serviceType} {submittedRequest.productName ? `(${submittedRequest.productName})` : ''}
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm font-semibold max-w-lg leading-relaxed">
                  إذا لم يفتح واتساب تلقائياً، اضغط زر التأكيد أدناه لإرسال بيانات الطلب مباشرة إلى فريق نثال.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-4">
                  <a
                    href={getWhatsappPreFilledLink(submittedRequest)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp flex-grow rounded-xl py-3.5 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تأكيد المتابعة عبر واتس اب الآن</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="btn-secondary px-5 py-3.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>تسجيل طلب جديد</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE ENTRY FORM */
              <form onSubmit={handleSubmit} className="space-y-6 text-right" dir="rtl" id="quote-request-form">
                
                {errorMessage && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-semibold border border-red-100 flex items-start gap-2 animate-bounce">
                    <span className="text-sm mt-0.5">⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full name field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-750 flex items-center gap-1.5">
                      <User className="w-4.5 h-4.5 text-blue-500" />
                      <span>الاسم بالكامل <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="مثال: خالد وليد القحطاني"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white p-4.5 pr-4 pl-4 rounded-2xl text-sm font-semibold transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Telephone field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-755 flex items-center gap-1.5">
                      <Phone className="w-4.5 h-4.5 text-blue-500" />
                      <span>رقم الجوال الفعّال <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="مثال: 0553033199"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white p-4.5 pr-4 pl-4 rounded-2xl text-sm font-semibold transition-all font-mono outline-none text-right"
                      />
                    </div>
                    <span className="text-[10px] text-slate-600 font-semibold">سنتصل بك على هذا الرقم أو نرسل عرض السعر واتساب.</span>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* City field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-750 flex items-center gap-1.5">
                      <MapPin className="w-4.5 h-4.5 text-blue-500" />
                      <span>المدينة / الحي السكني <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="مثال: الرياض، حي الياسمين"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white p-4.5 rounded-2xl text-sm font-semibold transition-all outline-none"
                    />
                  </div>

                  {/* Service Type Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-750 flex items-center gap-1.5">
                      <Sliders className="w-4.5 h-4.5 text-blue-500" />
                      <span>نوع الخدمة المطلوبة <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white p-4.5 rounded-2xl text-sm font-semibold transition-all outline-none"
                    >
                      <option value="filter">تركيب / صيانة فلاتر وأجهزة تحلية المياه المنزلية</option>
                      <option value="cooler">تركيب برادات المياه وثلاجات الموزعات</option>
                      <option value="mist">تركيب أنظمة رذاذ وتلطيف ضباب خارجي</option>
                      <option value="maintenance">صيانة دورية / تبديل شمعات فلاتر / صيانة طارئة</option>
                    </select>
                  </div>

                </div>

                {/* Selected product if clicked */}
                {preferredProduct && (
                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">تم اختيار الجهاز التلقائي:</span>
                    <span className="text-xs font-extrabold text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-xl">
                      {preferredProduct}
                    </span>
                  </div>
                )}

                {/* Inquiry Details */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-extrabold text-slate-750 flex items-center gap-1.5">
                    <FileText className="w-4.5 h-4.5 text-blue-500" />
                    <span>تفاصيل الطلب أو ملاحظات خاصة (اختياري)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="مثال: يرجى إحضار جهاز فحص الأملاح، الفلتر مطلوب تركيبه أسفل مجلى المطبخ وتوصيله بصنبور إضافي..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white p-4.5 rounded-2xl text-sm font-semibold transition-all outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submission Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full rounded-2xl py-4.5 text-sm flex items-center justify-center gap-2"
                  id="submit-proposal-btn"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    <>
                      <span>أرسل الطلب واحصل على عرض السعر مجاناً</span>
                      <ArrowLeft className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-slate-600 font-bold block">
                    ⚙️ نحن نحمي خصوصية بياناتك بنسبة 100%. لن يتم تأجير أو بيع معلومات جوالك لأي أطراف خارجية.
                  </span>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
