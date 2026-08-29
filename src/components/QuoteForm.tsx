/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, MapPin, Phone, Sliders, User } from 'lucide-react';
import { QuoteRequest } from '../types';
import { pushGtmEvent } from '../lib/gtm';

interface QuoteFormProps {
  selectedProductName?: string;
  serviceType?: 'filter' | 'cooler' | 'mist' | 'maintenance';
  pageType?: string;
}

const CONTROL_CLASS =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50';

export default function QuoteForm({
  selectedProductName = '',
  serviceType: fixedServiceType,
  pageType = 'general',
}: QuoteFormProps) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [serviceType, setServiceType] = useState(fixedServiceType || 'filter');
  const [details, setDetails] = useState('');
  const [preferredProduct, setPreferredProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (fixedServiceType) {
      setServiceType(fixedServiceType);
      return;
    }

    if (!selectedProductName) return;

    setPreferredProduct(selectedProductName);
    if (selectedProductName.includes('برادة') || selectedProductName.includes('سول أكوا')) {
      setServiceType('cooler');
    } else if (selectedProductName.includes('رذاذ') || selectedProductName.includes('ضباب')) {
      setServiceType('mist');
    } else if (
      selectedProductName.includes('صيانة') ||
      selectedProductName.includes('فلتر الغسالات') ||
      selectedProductName.includes('حماية')
    ) {
      setServiceType('maintenance');
    } else {
      setServiceType('filter');
    }
  }, [selectedProductName, fixedServiceType]);

  const getServiceArabicLabel = (type: string) => {
    switch (type) {
      case 'filter':
        return 'أجهزة التصفية والتحلية';
      case 'cooler':
        return 'برادات وموزعات المياه';
      case 'mist':
        return 'أنظمة الرذاذ والتبريد الخارجي';
      case 'maintenance':
        return 'الصيانة الدورية وقطع الغيار';
      default:
        return 'طلب استشارة مخصصة';
    }
  };

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[\s-+]/g, '');
    return cleaned.length >= 9 && /^\d+$/.test(cleaned);
  };

  const getWhatsappPreFilledLink = (quote: QuoteRequest) => {
    const text = `السلام عليكم ورحمة الله وبركاته،
أود متابعة طلب الاستشارة من مؤسسة نثال.

*معلومات الطلب:*
- *الرقم المرجعي:* ${quote.id}
- *الاسم:* ${quote.fullName}
- *الجوال:* ${quote.phone}
- *المدينة:* ${quote.city}
- *الخدمة:* ${quote.serviceType}
${quote.productName ? `- *الجهاز:* ${quote.productName}` : ''}
${quote.details ? `- *التفاصيل:* ${quote.details}` : ''}

يرجى التواصل معي لتأكيد التفاصيل والموعد المناسب.`;

    return `https://wa.me/966553033199?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage('الرجاء إدخال الاسم الكامل بشكل صحيح.');
      return;
    }

    if (!phone.trim() || !validatePhone(phone)) {
      setErrorMessage('الرجاء إدخال رقم جوال صحيح للتواصل معك.');
      return;
    }

    if (!city.trim()) {
      setErrorMessage('الرجاء تحديد المدينة أو الحي.');
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
      details: details.trim() || `طلب استشارة بخصوص ${preferredProduct || getServiceArabicLabel(serviceType)}`,
      productName: preferredProduct || undefined,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    pushGtmEvent('generate_lead', {
      lead_type: newQuote.serviceType,
      product_name: newQuote.productName || 'غير محدد',
      contact_method: 'whatsapp',
      page_type: pageType,
      service_type: serviceType,
      cta_location: 'quote_form',
    });

    navigate('/thank-you', {
      state: {
        quote: newQuote,
        whatsappHref: getWhatsappPreFilledLink(newQuote),
        pageType,
        serviceType,
      },
    });
  };

  return (
    <section
      id="lead-form-section"
      className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-16 md:py-20"
      dir="rtl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_42%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="section-subheading-tag border-sky-300/20 bg-sky-400/10 text-sky-300">
            طلب سريع وواضح
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            احصل على عرض سعر مناسب لاحتياجك
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-bold leading-7 text-blue-100">
            املأ البيانات الأساسية وسنجهز طلبك في خطوة واحدة، ثم تنتقل إلى صفحة تأكيد مستقلة وواضحة.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white p-5 shadow-2xl sm:p-8 md:p-10">
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-xs font-extrabold text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" id="quote-request-form">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldLabel icon={<User className="h-4 w-4" />} label="الاسم بالكامل" required>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="مثال: خالد أحمد" className={CONTROL_CLASS} />
              </FieldLabel>

              <FieldLabel icon={<Phone className="h-4 w-4" />} label="رقم الجوال" required>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="مثال: 0553033199" className={`${CONTROL_CLASS} text-right font-mono`} />
              </FieldLabel>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldLabel icon={<MapPin className="h-4 w-4" />} label="المدينة / الحي" required>
                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="مثال: الرياض، حي الياسمين" className={CONTROL_CLASS} />
              </FieldLabel>

              <FieldLabel icon={<Sliders className="h-4 w-4" />} label="الخدمة المطلوبة" required={!fixedServiceType}>
                {fixedServiceType ? (
                  <div className="flex min-h-[54px] items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-4 text-center text-sm font-extrabold text-blue-950">
                    {getServiceArabicLabel(fixedServiceType)}
                  </div>
                ) : (
                  <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className={CONTROL_CLASS}>
                    <option value="filter">فلاتر وأجهزة تحلية المياه</option>
                    <option value="cooler">برادات وموزعات المياه</option>
                    <option value="mist">أنظمة الرذاذ والتبريد الخارجي</option>
                    <option value="maintenance">الصيانة وقطع الغيار</option>
                  </select>
                )}
              </FieldLabel>
            </div>

            {preferredProduct && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-center">
                <span className="text-xs font-bold text-slate-600">المنتج المحدد</span>
                <div className="mt-1 text-sm font-extrabold text-blue-800">{preferredProduct}</div>
              </div>
            )}

            <FieldLabel icon={<FileText className="h-4 w-4" />} label="تفاصيل إضافية (اختياري)">
              <textarea rows={4} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="اكتب أي تفاصيل تساعدنا على تجهيز العرض المناسب لك..." className={`${CONTROL_CLASS} resize-none`} />
            </FieldLabel>

            <button type="submit" disabled={isLoading} id="submit-proposal-btn" className="btn-primary mx-auto flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold disabled:cursor-not-allowed disabled:opacity-70">
              <span>{isLoading ? 'جاري تجهيز الطلب...' : 'إرسال الطلب ومتابعة التأكيد'}</span>
              {!isLoading && <ArrowLeft className="h-4 w-4" />}
            </button>

            <p className="mx-auto max-w-2xl text-center text-[10px] font-bold leading-5 text-slate-500">
              بالضغط على «إرسال الطلب» فإنك توافق على{' '}
              <a href="#privacy" className="font-extrabold text-blue-700 underline underline-offset-2">سياسة الخصوصية</a>. نستخدم بياناتك فقط للتواصل معك بخصوص طلبك.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ icon, label, required = false, children }: { icon: React.ReactNode; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-right">
      <span className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
        <span className="text-blue-600">{icon}</span>
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
      </span>
      {children}
    </label>
  );
}
