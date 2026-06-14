/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuoteRequest } from '../types';
import { X, Search, Trash2, Eye, ShieldCheck, MailOpen, UserCheck, Calendar, RefreshCcw, Download, MessageSquare } from 'lucide-react';

interface AdminHubProps {
  quotes: QuoteRequest[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'new' | 'contacted' | 'completed') => void;
  onDeleteQuote: (id: string) => void;
  onClearAll: () => void;
}

export default function AdminHub({ quotes, onClose, onUpdateStatus, onDeleteQuote, onClearAll }: AdminHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [activeViewQuery, setActiveViewQuery] = useState<QuoteRequest | null>(null);

  const getFilteredQuotes = () => {
    return quotes.filter((q) => {
      const matchSearch = q.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.phone.includes(searchTerm) || 
                          q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchService = filterService === 'all' || q.serviceType.includes(filterService) || (q.productName && q.productName.includes(filterService));
      return matchSearch && matchService;
    });
  };

  const filtered = getFilteredQuotes();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(quotes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'nethal_water_quotes_leads.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-50 text-red-700 border-red-200';
      case 'contacted': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-105';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'جديد - في الانتظار';
      case 'contacted': return 'تم التواصل';
      case 'completed': return 'مكتمل ومغلق';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" dir="rtl">
      
      {/* Blurred cover backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        
        {/* Main Administrative Screen box */}
        <div className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh] text-slate-800">
          
          {/* Top Panel Title */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
              <div className="flex flex-col text-right">
                <h3 className="text-lg font-extrabold leading-none">لوحة التحكم بالإداري ومتابعة طلبات المياه</h3>
                <span className="text-[10px] text-slate-300 font-semibold mt-1">مستودع المبيعات وطلبات أسعار مؤسسة نثال لتصفية وتحلية المياه</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-100 bg-slate-50 p-4 gap-4 text-center">
            <div className="bg-white p-3 rounded-2xl border border-slate-150">
              <span className="text-[10px] text-slate-400 font-bold block mb-0.5">إجمالي التذاكر المسجلة</span>
              <span className="text-xl font-extrabold text-blue-900 font-mono">{quotes.length}</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-150">
              <span className="text-[10px] text-slate-400 font-bold block mb-0.5">تذاكر جديدة قيد الانتظار</span>
              <span className="text-xl font-extrabold text-red-600 font-mono">
                {quotes.filter(q => q.status === 'new').length}
              </span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-150">
              <span className="text-[10px] text-slate-400 font-bold block mb-0.5">عملاء تم التواصل معهم</span>
              <span className="text-xl font-extrabold text-orange-600 font-mono">
                {quotes.filter(q => q.status === 'contacted').length}
              </span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-150">
              <span className="text-[10px] text-slate-400 font-bold block mb-0.5">تركيبات وأعمال مكتملة</span>
              <span className="text-xl font-extrabold text-emerald-600 font-mono">
                {quotes.filter(q => q.status === 'completed').length}
              </span>
            </div>
          </div>

          {/* Search, filters, tools banner */}
          <div className="p-4 bg-white border-b border-slate-150 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              {/* Search text box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم، الجوال، التذكرة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl py-2.5 pr-10 pl-4 text-xs font-semibold outline-none"
                />
              </div>

              {/* Service custom drop filter */}
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl py-2.5 px-3 text-xs font-semibold outline-none"
              >
                <option value="all">كل الخدمات والأجهزة</option>
                <option value="أجهزة">أجهزة تحلية ومحطات</option>
                <option value="برادات">برادات وموزعات مياه</option>
                <option value="رذاذ">أنظمة רذاذ وتبريد</option>
                <option value="صيانة">صيانة وإكسسوارات</option>
              </select>
            </div>

            {/* Clear database or export elements */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleExportJSON}
                disabled={quotes.length === 0}
                className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                title="تصدير جهات الاتصال والطلبات كمصفوفة بيانات"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير البيانات</span>
              </button>

              <button
                onClick={onClearAll}
                disabled={quotes.length === 0}
                className="bg-red-50 hover:bg-red-100 disabled:bg-slate-50 disabled:text-slate-300 text-red-600 border border-red-100 rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                title="مسح المعارضة والأرصدة بالمتصفح"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح كل السجلات</span>
              </button>
            </div>
          </div>

          {/* Active Data table listing */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
            {filtered.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center gap-4 text-slate-400">
                <div className="text-5xl">📥</div>
                <h4 className="text-sm font-extrabold text-slate-705">لا توجد طلبات أو تذاكر مطابقة حالياً</h4>
                <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed text-center">
                  سجلّات الطلبات التي يسجلها المستخدمون في نموذج "اطلب عرض سعر" ستظهر فوراً هنا مع كامل التفاصيل وهيكل المتابعة.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-right"
                  >
                    {/* Customer metrics */}
                    <div className="flex flex-col gap-1.5 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg">
                          {quote.id}
                        </span>
                        
                        <span className="text-sm font-extrabold text-[#0a1e36]">{quote.fullName}</span>
                        
                        <span className={`text-[10px] font-bold border rounded-lg px-2 py-0.5 ${getStatusColor(quote.status)}`}>
                          {getStatusLabel(quote.status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-semibold pt-1">
                        <span>📱 الجوال: <a href={`tel:${quote.phone}`} className="font-mono text-blue-600 hover:underline">{quote.phone}</a></span>
                        <span>📍 المنطقة: {quote.city}</span>
                        <span>🛠️ الخدمة: {quote.serviceType}</span>
                      </div>

                      {quote.productName && (
                        <span className="text-[11px] text-blue-700 font-extrabold bg-blue-50/50 self-start px-2 py-0.5 rounded border border-dashed border-blue-200 mt-1">
                          نوع الجهاز: {quote.productName}
                        </span>
                      )}
                    </div>

                    {/* Operational Actions */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 md:border-0 pt-3 md:pt-0">
                      
                      {/* View Query Details */}
                      <button
                        onClick={() => setActiveViewQuery(quote)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-900 border border-slate-250 p-2.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="معاينة تفاصيل الشكوى والطلب بالكامل"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">تفاصيل الطلب</span>
                      </button>

                      {/* Status selectors toggle directly */}
                      <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                        <button
                          onClick={() => onUpdateStatus(quote.id, 'new')}
                          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${quote.status === 'new' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          قيد الانتظار
                        </button>
                        <button
                          onClick={() => onUpdateStatus(quote.id, 'contacted')}
                          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${quote.status === 'contacted' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          تم التواصل
                        </button>
                        <button
                          onClick={() => onUpdateStatus(quote.id, 'completed')}
                          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${quote.status === 'completed' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          أنجز
                        </button>
                      </div>

                      {/* Delete Lead record */}
                      <button
                        onClick={() => onDeleteQuote(quote.id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/50 p-2.5 rounded-xl transition-all cursor-pointer"
                        title="حذف هذا السجل الفردي"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Internal Details modal overview */}
      {activeViewQuery && (
        <div className="fixed inset-0 z-[120] overflow-y-auto" dir="rtl">
          <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={() => setActiveViewQuery(null)}></div>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative border border-slate-150 text-right">
              
              <h4 className="text-lg font-extrabold text-[#0a1e36] mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                <MailOpen className="w-5 h-5 text-blue-500" />
                <span>تفاصيل تذكرة: {activeViewQuery.id}</span>
              </h4>

              <div className="space-y-4 text-sm font-semibold mb-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-0.5">اسم العميل:</span>
                  <p className="text-slate-800 font-extrabold">{activeViewQuery.fullName}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-0.5">رقم الاتصال والجوال المعالَج:</span>
                  <a href={`tel:${activeViewQuery.phone}`} className="text-blue-600 font-mono text-base hover:underline">{activeViewQuery.phone}</a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">المدينة والحي:</span>
                    <p className="text-slate-800">{activeViewQuery.city}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">نوع تذكرة الخدمة:</span>
                    <p className="text-slate-800">{activeViewQuery.serviceType}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-0.5">تفاصيل الملاحظات المسجلة:</span>
                  <p className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-slate-650 leading-relaxed font-semibold">
                    {activeViewQuery.details}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-0.5">تاريخ التقديم والزمن:</span>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(activeViewQuery.createdAt).toLocaleString('ar-SA')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${activeViewQuery.phone.replace(/[\s-+]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>مراسلة العميل في الواتساب</span>
                </a>

                <button
                  onClick={() => setActiveViewQuery(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-5 py-3 text-xs font-bold"
                >
                  إغلاق
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
