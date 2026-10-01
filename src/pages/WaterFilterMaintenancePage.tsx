import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Droplets,
  Filter,
  MessageSquare,
  PackageCheck,
  Phone,
  Wrench,
} from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { breadcrumb, SITE_URL, useSeo } from '../lib/seo';
import { PHONE } from '../lib/schema';

const PAGE_PATH = '/water-filter-maintenance-riyadh';
const WHATSAPP_NUMBER = PHONE.replace(/\D/g, '');

const SERVICE_CARDS = [
  {
    type: 'installation',
    title: 'تركيب فلاتر المياه',
    description:
      'تركيب فلتر ماء منزلي أو جهاز تحلية، مع ضبط الجهاز وفق نوعه ومتطلبات الموقع في الرياض.',
    message: 'أرغب في الاستفسار عن تركيب فلتر مياه منزلي. ما التفاصيل المطلوبة؟',
    icon: Droplets,
  },
  {
    type: 'maintenance',
    title: 'صيانة فلاتر المياه',
    description:
      'استفسر عن صيانة وتشخيص فلتر المياه المنزلي وأجهزة التحلية بحسب نوع الجهاز والحالة.',
    message: 'أرغب في الاستفسار عن صيانة فلتر مياه. سأرسل نوع الجهاز ووصف المشكلة.',
    icon: Wrench,
  },
  {
    type: 'replacement',
    title: 'تغيير الفلاتر ومراحل التحلية',
    description:
      'تتوفر أطقم فلاتر للتحلية، ومنها طقم 7 مراحل. أرسل موديل الجهاز للتأكد من التوافق.',
    message: 'أرغب في الاستفسار عن تغيير فلاتر أو مراحل جهاز التحلية. سأرسل الموديل للتأكد من التوافق.',
    icon: Filter,
  },
  {
    type: 'parts',
    title: 'قطع الغيار ومستلزمات الفلاتر',
    description:
      'استفسر عن قطع الغيار والفلاتر المتاحة، وتأكد من ملاءمتها لنوع جهازك وموديله قبل الطلب.',
    message: 'أرغب في الاستفسار عن قطع غيار أو مستلزمات متاحة لفلتر المياه لدي.',
    icon: PackageCheck,
  },
];

const REQUEST_STEPS = [
  {
    title: 'اختر الخدمة أو اشرح المشكلة',
    description: 'حدد إن كان طلبك للتركيب أو الصيانة أو تغيير الفلاتر، أو اكتب ما يحتاجه جهازك.',
  },
  {
    title: 'أرسل بيانات التواصل الأساسية',
    description: 'أضف رقم الجوال ونوع الجهاز أو الفلتر، والموديل والحي إن توفرا.',
  },
  {
    title: 'تأكيد تفاصيل الخدمة',
    description: 'يتواصل معك الفريق عبر القناة المتاحة لتأكيد التفاصيل والخدمة المناسبة.',
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
  useSeo({
    title: 'صيانة وتركيب فلاتر المياه بالرياض | نثال الحياة',
    description:
      'اطلب خدمة صيانة أو تركيب فلاتر المياه من نثال الحياة في الرياض. تواصل عبر الاتصال أو واتساب لمعرفة الخدمات المتاحة.',
    path: PAGE_PATH,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'صيانة وتركيب فلاتر المياه في الرياض',
          serviceType: [
            'تركيب فلاتر المياه',
            'صيانة فلاتر المياه',
            'تغيير فلاتر ومراحل التحلية',
            'قطع الغيار ومستلزمات الفلاتر المتاحة',
          ],
          areaServed: { '@type': 'City', name: 'الرياض' },
          provider: { '@id': SITE_URL + '/#organization' },
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: 'صيانة وتركيب فلاتر المياه', path: PAGE_PATH },
        ]),
      ],
    },
  });

  const faqItems = [
    {
      question: 'هل تقدمون صيانة فلاتر المياه؟',
      answer:
        'نعم، تتوفر صيانة وتشخيص أجهزة التحلية بحسب نوع الجهاز والحالة. أرسل نوع الفلتر ووصف المشكلة لتأكيد الخدمة المناسبة.',
    },
    {
      question: 'هل يمكن طلب تركيب فلتر جديد؟',
      answer:
        'نعم، يذكر الموقع خدمة تركيب فلاتر وأجهزة التحلية في الرياض. أرسل نوع الفلتر ومعلومات الموقع لمعرفة التفاصيل المناسبة.',
    },
    {
      question: 'هل يمكن طلب تغيير فلتر ماء منزلي أو مراحل الفلتر؟',
      answer:
        'تتوفر أطقم فلاتر للتحلية، ومنها طقم 7 مراحل. تختلف الملاءمة حسب موديل الجهاز، لذلك نتحقق من التوافق قبل الطلب.',
    },
    {
      question: 'ما المعلومات المطلوبة قبل طلب الصيانة؟',
      answer:
        'رقم التواصل ونوع الجهاز أو الفلتر وموديله إن توفر، مع وصف مختصر للمشكلة والحي؛ تساعد هذه المعلومات على توجيه الطلب بشكل أفضل.',
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
          <span className="text-blue-950">صيانة وتركيب فلاتر المياه</span>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-16 text-white md:py-24">
        <div className="absolute -left-24 -top-28 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-extrabold text-sky-200">
            خدمات الفلاتر في الرياض
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            صيانة وتركيب فلاتر المياه في الرياض
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm font-bold leading-8 text-blue-100 sm:text-base">
            تحتاج صيانة أو تركيب فلتر مياه؟ تواصل مع نثال الحياة لمعرفة الخدمات المتاحة وطلب
            المساعدة حسب نوع جهازك واحتياجك.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink('أرغب في معرفة خدمات صيانة وتركيب فلاتر المياه المتاحة لنوع جهازي واحتياجي.')}
              target="_blank"
              rel="noreferrer"
              id="maintenance-hero-whatsapp"
              data-page-type="service_landing"
              data-service-type="maintenance"
              data-cta-location="hero"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
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
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-white/15"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              اتصل لطلب الخدمة
            </a>
            <a
              href="#lead-form-section"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-blue-950 transition-colors hover:bg-blue-50"
            >
              اطلب خدمة
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" id="maintenance-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">الخدمات المتاحة</span>
            <h2 className="section-heading-main mt-3">خدمات الفلاتر المتاحة</h2>
            <p className="lead-paragraph mt-4">
              تختلف التفاصيل والقطع المناسبة حسب نوع الجهاز والاحتياج؛ استفسر عن الخدمة قبل الطلب.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICE_CARDS.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.type}
                  className="flex h-full flex-col rounded-[26px] border border-slate-200 bg-white p-6 text-right shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg sm:p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
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
                    data-service-type={service.type}
                    data-cta-location="service_card"
                    className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-extrabold text-blue-800 transition-colors hover:bg-blue-100"
                  >
                    استفسر عن الخدمة
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-blue-950 px-4 py-12 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <span className="text-sm font-extrabold text-sky-300">طلب الخدمة</span>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
            أرسل تفاصيل الجهاز والخدمة المطلوبة
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-7 text-blue-100">
            أدخل بيانات التواصل، واكتب في خانة التفاصيل نوع الخدمة ونوع الفلتر أو الموديل والحي
            ووصف المشكلة إن وجد.
          </p>
        </div>
      </div>
      <QuoteForm serviceType="maintenance" pageType="service_landing" />

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-subheading-tag">خطوات طلب الخدمة</span>
            <h2 className="section-heading-main mt-3">كيف تطلب الخدمة؟</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {REQUEST_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[24px] border border-slate-100 bg-white p-6 text-center shadow-sm"
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
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">تواصل معنا لطلب الخدمة</h2>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-blue-100">
              تواصل عبر واتساب أو الاتصال للاستفسار عن الخدمة المناسبة لنوع الفلتر أو الجهاز لديك.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappLink('أرغب في الاستفسار عن صيانة أو تركيب فلتر المياه المناسب لنوع جهازي.')}
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

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="section-subheading-tag">أسئلة شائعة</span>
            <h2 className="section-heading-main mt-3">أسئلة عن صيانة وتركيب الفلاتر</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-extrabold text-blue-950">
                  {item.question}
                </summary>
                <p className="pt-4 text-sm font-bold leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
