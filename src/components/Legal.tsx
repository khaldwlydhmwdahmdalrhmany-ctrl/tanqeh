import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

/**
 * سياسة الخصوصية والشروط والأحكام.
 * وجود هذه الصفحة إلزامي في سياسات إعلانات Google لأي موقع يجمع بيانات
 * شخصية (الاسم / رقم الجوال) عبر نموذج.
 * يمكن الوصول إليها مباشرة عبر:  https://your-domain.com/#privacy
 *                                https://your-domain.com/#terms
 */

type Tab = 'privacy' | 'terms';

export function useLegalHash() {
  const [openTab, setOpenTab] = useState<Tab | null>(null);

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'privacy' || h === 'terms') setOpenTab(h);
      else setOpenTab(null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const close = () => {
    setOpenTab(null);
    if (window.location.hash === '#privacy' || window.location.hash === '#terms') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return { openTab, open: (t: Tab) => setOpenTab(t), close };
}

interface LegalProps {
  tab: Tab;
  onChangeTab: (t: Tab) => void;
  onClose: () => void;
}

export default function Legal({ tab, onChangeTab, onClose }: LegalProps) {
  return (
    <div className="fixed inset-0 z-[130] overflow-y-auto" dir="rtl">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="flex items-start justify-center min-h-screen p-4 py-10">
        <div className="relative bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-5 text-white flex items-center justify-between rounded-t-3xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChangeTab('privacy')}
                className={`text-xs font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${tab === 'privacy' ? 'bg-white text-blue-950' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
              >
                <ShieldCheck className="w-4 h-4" />
                سياسة الخصوصية
              </button>
              <button
                onClick={() => onChangeTab('terms')}
                className={`text-xs font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${tab === 'terms' ? 'bg-white text-blue-950' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
              >
                <FileText className="w-4 h-4" />
                الشروط والأحكام
              </button>
            </div>

            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 sm:p-8 text-right text-slate-700 text-sm leading-relaxed font-semibold space-y-5">
            {tab === 'privacy' ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      </div>
    </div>
  );
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-extrabold text-[#0a1e36] pt-2">{children}</h3>
);

function PrivacyContent() {
  return (
    <>
      <h2 className="text-xl font-extrabold text-[#0a1e36]">سياسة الخصوصية</h2>
      <p className="text-xs text-slate-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>

      <p>
        تحترم مؤسسة نثال لتنقية المياه («المؤسسة»، «نحن») خصوصية زوّار موقعها، وتلتزم بحماية
        البيانات الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.
      </p>

      <H>البيانات التي نجمعها</H>
      <p>
        عند تعبئتك نموذج «اطلب عرض سعر» نطلب منك: الاسم، رقم الجوال، المدينة أو الحي، نوع الخدمة
        المطلوبة، وأي ملاحظات تكتبها. تقديم هذه البيانات اختياري تماماً، ويمكنك بدلاً من ذلك
        التواصل معنا هاتفياً أو عبر واتساب مباشرة.
      </p>

      <H>كيف تُعالَج بياناتك</H>
      <p>
        لا يقوم هذا الموقع بتخزين بياناتك على المتصفح ولا على أي خادم تابع لنا. عند الضغط على زر
        الإرسال، تُجهَّز رسالة واتساب تحتوي على البيانات التي أدخلتها، وأنت من يرسلها إلينا بضغطة
        منك. ولا يتم إرسال أي شيء تلقائياً دون تدخلك.
      </p>

      <H>الغرض من الاستخدام</H>
      <p>
        تُستخدم بياناتك حصراً للرد على استفسارك، وإعداد عرض السعر، وتنسيق موعد المعاينة أو التركيب،
        ومتابعة الصيانة الدورية. لا نبيع بياناتك ولا نؤجّرها ولا نشاركها مع أي طرف ثالث لأغراض
        تسويقية.
      </p>

      <H>ملفات تعريف الارتباط وأدوات القياس</H>
      <p>
        نستخدم Google Tag Manager وGoogle Analytics وGoogle Ads لقياس أداء الموقع والحملات
        الإعلانية. تجمع هذه الأدوات بيانات تصفح مجهّلة الهوية (الصفحات المزارة، مصدر الزيارة، نوع
        الجهاز) ولا تربطها باسمك أو رقم جوالك. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك.
      </p>

      <H>حقوقك</H>
      <p>
        يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها من سجلاتنا، وسحب موافقتك في أي وقت. يكفي
        مراسلتنا على بيانات التواصل الموضحة في تذييل الموقع وسنستجيب خلال مدة معقولة.
      </p>

      <H>أمن المعلومات</H>
      <p>
        الموقع محمي بشهادة تشفير SSL/HTTPS. ونتخذ إجراءات تنظيمية وتقنية معقولة لحماية أي بيانات
        تصلنا عبر قنوات التواصل من الوصول أو الإفصاح غير المصرح به.
      </p>

      <H>خصوصية الأطفال</H>
      <p>خدماتنا موجهة للبالغين، ولا نجمع عن قصد أي بيانات من أشخاص دون سن الثامنة عشرة.</p>

      <H>التعديلات على السياسة</H>
      <p>
        قد نحدّث هذه السياسة من وقت لآخر، ويسري التحديث فور نشره على هذه الصفحة مع تعديل تاريخ آخر
        تحديث أعلاه.
      </p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <h2 className="text-xl font-extrabold text-[#0a1e36]">الشروط والأحكام</h2>
      <p className="text-xs text-slate-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>

      <H>طبيعة الخدمة</H>
      <p>
        تقدم مؤسسة نثال خدمات توريد وتركيب وصيانة أجهزة تنقية وتحلية المياه، وبرادات وموزعات
        المياه، وأنظمة الرذاذ والتبريد الخارجي، داخل مدينة الرياض والمناطق المجاورة.
      </p>

      <H>عروض الأسعار</H>
      <p>
        الأسعار المعروضة على الموقع استرشادية وقابلة للتغيير، ولا تُعد عرضاً ملزماً. يُعتمد السعر
        النهائي بعد المعاينة الميدانية وإصدار عرض سعر مكتوب، وتُضاف ضريبة القيمة المضافة وفق
        الأنظمة المعمول بها في المملكة.
      </p>

      <H>التركيب والمواعيد</H>
      <p>
        تُحدَّد مواعيد المعاينة والتركيب بالتنسيق المسبق مع العميل، وقد تتأثر بظروف خارجة عن
        إرادتنا. يلتزم العميل بتوفير مصدر مياه وكهرباء ومساحة مناسبة لإتمام التركيب.
      </p>

      <H>الضمان</H>
      <p>
        يشمل الضمان عيوب التصنيع وأعمال التركيب وفق المدة الموضحة في فاتورة كل منتج. ولا يشمل سوء
        الاستخدام، أو العبث بالجهاز، أو إجراء الصيانة عبر جهة غير معتمدة، أو التلف الناتج عن ارتفاع
        نسبة الأملاح أو ضغط المياه بما يتجاوز الحدود التشغيلية.
      </p>

      <H>الصيانة الدورية</H>
      <p>
        استمرار فعالية الضمان مرتبط بإجراء الصيانة الدورية وتبديل الشمعات في مواعيدها المحددة. وهي
        خدمة مدفوعة ما لم يُنص على خلاف ذلك في العقد.
      </p>

      <H>الاستبدال والاسترجاع</H>
      <p>
        تُقبل طلبات الاستبدال أو الاسترجاع خلال المدة النظامية للمنتجات غير المستخدمة وبكامل
        تغليفها الأصلي، وفقاً لنظام التجارة الإلكترونية ولائحته التنفيذية في المملكة.
      </p>

      <H>خدمات التقسيط</H>
      <p>
        خدمات الدفع الآجل عبر «تمارا» و«تابي» تخضع لشروط وأحكام تلك الشركات وموافقتها الائتمانية،
        ونحن لسنا طرفاً في العلاقة التمويلية بينك وبينها.
      </p>

      <H>الملكية الفكرية</H>
      <p>جميع المحتويات والصور والعلامات الظاهرة على هذا الموقع مملوكة للمؤسسة ولا يجوز نسخها دون إذن كتابي.</p>

      <H>القانون الواجب التطبيق</H>
      <p>تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص الجهات القضائية السعودية بأي نزاع ينشأ عنها.</p>
    </>
  );
}
