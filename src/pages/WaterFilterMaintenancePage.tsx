import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Droplets,
  MessageSquare,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { breadcrumb, SITE_URL, useSeo } from '../lib/seo';
import { PHONE } from '../lib/schema';

const PAGE_PATH = '/water-filter-maintenance-riyadh';
const WHATSAPP_NUMBER = PHONE.replace(/\D/g, '');

const SERVICE_CARDS = [
  {
    title: 'صيانة فلاتر المياه',
    description:
      'استفسر عن تشخيص وصيانة جهاز التحلية ومراجعة الفلاتر والتوصيلات وفق نوع الجهاز والحالة.',
    message: 'أرغب في الاستفسار عن صيانة فلتر مياه. سأرسل نوع الجهاز ووصف المشكلة.',
  },
  {
    title: 'تغيير فلاتر المياه والشمعات',
    description:
      'تتوفر أطقم فلاتر للتحلية، ومنها طقم 7 مراحل. أرسل موديل الجهاز للتأكد من التوافق.',
    message: 'أرغب في الاستفسار عن تغيير فلاتر أو شمعات جهاز التحلية. ما المعلومات المطلوبة للتأكد من التوافق؟',
  },
  {
    title: 'فلاتر وقطع الصيانة المتاحة',
    description:
      'استفسر عن الفلاتر وقطع الصيانة المسجلة في الموقع، وتأكد من ملاءمتها لجهازك قبل الطلب.',
    message: 'أرغب في الاستفسار عن فلاتر أو قطع صيانة متاحة لجهازي. سأرسل الموديل أو صورة المنتج.',
  },
];

const WARNING_SIGNS = [
  'ضعف تدفق المياه أو توقف الجهاز',
  'تغيّر طعم المياه أو رائحتها',
  'تسرب أو صوت غير معتاد من الجهاز',
  'الحاجة إلى تغيير الفلاتر أو مراحل التحلية',
];

const REQUEST_STEPS = [
  {
    title: 'اختر الخدمة أو صف المشكلة',
    description: 'حدد ما إذا كان طلبك صيانة أو تغيير فلاتر أو استفساراً عن قطعة.',
  },
  {
    title: 'أرسل معلومات الجهاز',
    description: 'اذكر نوع الفلتر أو الموديل، وأضف وصفاً مختصراً للمشكلة والحي.',
  },
  {
    title: 'تأكيد تفاصيل الطلب',
    description: 'يتواصل معك الفريق لتأكيد الخدمة والقطع المتاحة لجهازك.',
  },
];

function whatsappLink(message: string) {
  return (
    'https://wa.me/' +
    WHATSAPP_NUMBER +
    '?text=' +
    encodeURIComponent('السلام عليكم، ' + message)
  );
}

export default function WaterFilterMaintenancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'صيانة فلاتر المياه بالرياض وتغيير الشمعات | نثال الحياة',
    description:
      'اطلب صيانة فلاتر المياه في الرياض أو استفسر عن تغيير فلتر الماء المنزلي ومراحل التحلية وقطع الصيانة المتاحة. أرسل نوع الجهاز والمشكلة عبر واتساب.',
    path: PAGE_PATH,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'صيانة فلاتر المياه وتغيير الفلاتر في الرياض',
          serviceType: [
            'صيانة فلاتر المياه',
            'تغيير فلاتر وشمعات التحلية',
            'الاستفسار عن قطع الصيانة المتاحة',
          ],
          areaServed: { '@type': 'City', name: 'الرياض' },
          provider: { '@id': SITE_URL + '/#organization' },
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: 'صيانة فلاتر المياه', path: PAGE_PATH },
        ]),
      ],
    },
  });

  const faqItems = [
    {
      question: 'هل تقدمون صيانة فلاتر المياه؟',
      answer:
        'نعم، تتوفر خدمة صيانة وتشخيص أجهزة التحلية بحسب نوع الجهاز والحالة. أرسل نوع الفلتر ووصف المشكلة لتأكيد الخدمة المناسبة.',
    },
    {
      question: 'هل يمكن طلب تغيير فلتر ماء منزلي أو مراحل الفلتر؟',
      answer:
        'تتوفر أطقم فلاتر للتحلية، ومنها طقم 7 مراحل. تختلف الملاءمة حسب موديل الجهاز، لذلك نتحقق من التوافق قبل الطلب.',
    },
    {
      question: 'هل تتوفر قطع غيار لكل أنواع الفلاتر؟',
      answer:
        'تختلف القطع المتاحة وملاءمتها حسب الجهاز. أرسل اسم الموديل أو صورة الفلتر لنساعدك في التأكد من توفر القطعة المناسبة.',
    },
    {
      question: 'ما المعلومات المطلوبة قبل طلب الصيانة؟',
      answer:
        'رقم التواصل، ونوع الجهاز أو الفلتر، وموديله إن توفر، ووصف مختصر للمشكلة والحي تساعد على توجيه الطلب بشكل أفضل.',
    },
  ];

  return (
    <div dir="rtl">
      <nav className="border-b border-slate-100 bg-white" aria-label="مسار التنقل">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[11px] font-bold text-slate-500 sm:px-6 lg:px-8">
          <Link to="/" className="transition-colors hover:text-blue-700">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" aria-hidden="true" />
          <span className="text-blue-950">صيانة فلاتر المياه</span>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-14 text-white md:py-20">
        <div className="absolute -left-24 -top-28 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-right">
            <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
              صيانة الفلاتر وقطع الصيانة المتاحة في الرياض
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              صيانة فلاتر المياه وتغيير الشمعات في الرياض
            </h1>
            <p className="mt-5 text-sm font-bold leading-8 text-blue-100 sm:text-base">
              تحتاج صيانة فلتر ماء منزلي أو تغيير مراحل الفلتر؟ أرسل نوع الجهاز ووصف المشكلة،
              وسيتواصل معك فريق نثال لتأكيد الخدمة والفلاتر أو قطع الصيانة المتاحة.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#lead-form-section"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-blue-950 transition-colors hover:bg-blue-50"
              >
                اطلب خدمة صيانة
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappLink('أرغب في الاستفسار عن صيانة فلاتر المياه أو تغيير الفلاتر وقطع الصيانة المتاحة.')}
                target="_blank"
                rel="noreferrer"
                id="maintenance-hero-whatsapp"
                data-page-type="service_landing"
                data-service-type="maintenance"
                data-cta-location="hero"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                تواصل عبر واتساب
              </a>
              <a
                href={'tel:' + PHONE}
                id="maintenance-hero-call"
                data-page-type="service_landing"
                data-service-type="maintenance"
                data-cta-location="hero"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-white/15"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                اتصل لطلب الخدمة
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-8">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-300/15 text-sky-200">
              <Droplets className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="text-center text-xl font-extrabold">متى تطلب صيانة فلتر المياه؟</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {WARNING_SIGNS.map((item) => (
                <li
                  key={item}
                  className="flex min-h-[58px] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-blue-50"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" id="maintenance-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">خدمات الفلاتر المتاحة</span>
            <h2 className="section-heading-main mt-3">صيانة وتغيير فلاتر المياه في الرياض</h2>
            <p className="lead-paragraph mt-4">
              تختلف الخدمة والقطع المناسبة حسب نوع الجهاز وموديله؛ تواصل معنا لتأكيد ما يناسب فلترك.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_CARDS.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-[26px] border border-slate-200 bg-white p-6 text-right shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-extrabold text-blue-950">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm font-bold leading-7 text-slate-600">
                  {service.description}
                </p>
                <a
                  href={whatsappLink(service.message)}
                  target="_blank"
                  rel="noreferrer"
                  data-page-type="service_landing"
                  data-service-type="maintenance"
                  data-cta-location="service_card"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-extrabold text-blue-800 transition-colors hover:bg-blue-100"
                >
                  استفسر عن الخدمة
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <span className="section-subheading-tag">طلب الخدمة</span>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight text-blue-950 sm:text-3xl">
              ما المعلومات التي تسرّع توجيه طلب الصيانة؟
            </h2>
            <p className="mt-4 text-sm font-bold leading-7 text-slate-600">
              جهّز رقم التواصل ونوع الفلتر أو الجهاز، وأضف الموديل والحي ووصف المشكلة إن توفرت.
              يمكنك كتابة هذه التفاصيل في خانة الملاحظات بالنموذج.
            </p>
            <div className="mt-7 space-y-3">
              {[
                'نوع الجهاز أو فلتر المياه',
                'اسم الموديل أو صورة الملصق إن توفرت',
                'وصف مختصر للمشكلة أو الفلاتر المطلوب تغييرها',
                'الحي أو المنطقة للتواصل بشأن الخدمة',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-blue-950 p-7 text-white sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-300/15 text-sky-200">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold">طلب واضح قبل تنفيذ الخدمة</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-blue-100">
              نراجع نوع الجهاز ووصف المشكلة أولاً، ثم نوضح لك الخدمة والقطع المتاحة ومدى توافقها
              مع جهازك قبل متابعة الطلب.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'خدمات مرتبطة بالفلاتر وأجهزة التحلية',
                'تأكيد توافق الفلتر أو القطعة مع الموديل',
                'طلب التواصل عبر القناة المناسبة',
                'لا تُعرض أسعار خدمة غير منشورة',
              ].map((item) => (
                <div key={item} className="flex min-h-[64px] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-blue-50">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a
              href="#lead-form-section"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 text-sm font-extrabold text-blue-950 transition-colors hover:bg-blue-50 sm:w-auto"
            >
              اطلب خدمة صيانة
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">خطوات طلب الخدمة</span>
            <h2 className="section-heading-main mt-3">كيف تطلب صيانة فلتر ماء منزلي؟</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {REQUEST_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[24px] border border-slate-100 bg-slate-50 p-6 text-center"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-lg font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-blue-950">{step.title}</h3>
                <p className="mt-2 text-sm font-bold leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-950 py-14 text-white md:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-right lg:px-8">
          <div>
            <span className="text-sm font-extrabold text-sky-300">تحتاج مساعدة الآن؟</span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">استفسر عن الخدمة المناسبة لفلترك</h2>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-blue-100">
              تواصل عبر واتساب أو الاتصال لمعرفة خيارات الصيانة والفلاتر وقطع الغيار المتاحة لجهازك.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappLink('أحتاج مساعدة بخصوص صيانة فلتر مياه أو تغيير الفلاتر.')}
              target="_blank"
              rel="noreferrer"
              id="maintenance-contact-whatsapp"
              data-page-type="service_landing"
              data-service-type="maintenance"
              data-cta-location="quick_contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              واتساب
            </a>
            <a
              href={'tel:' + PHONE}
              id="maintenance-contact-call"
              data-page-type="service_landing"
              data-service-type="maintenance"
              data-cta-location="quick_contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-white/15"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              اتصل الآن
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="section-subheading-tag">إجابات عن الصيانة والتغيير</span>
            <h2 className="section-heading-main mt-3">أسئلة شائعة عن صيانة فلاتر المياه</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <details
                  key={item.question}
                  open={isOpen}
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenFaq(index);
                    else if (openFaq === index) setOpenFaq(null);
                  }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm"
                >
                  <summary className="cursor-pointer text-sm font-extrabold text-blue-950">
                    {item.question}
                  </summary>
                  <p className="pt-4 text-sm font-bold leading-7 text-slate-600">{item.answer}</p>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-blue-950 px-4 pt-14 text-center text-white">
        <span className="text-sm font-extrabold text-sky-300">ابدأ بطلبك</span>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl">
          اطلب صيانة الفلتر أو استفسر عن تغيير الفلاتر
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-7 text-blue-100">
          أدخل بيانات التواصل، واكتب نوع الجهاز والموديل أو المشكلة في خانة التفاصيل الاختيارية.
        </p>
      </div>
      <QuoteForm serviceType="maintenance" pageType="service_landing" />
    </div>
  );
}
