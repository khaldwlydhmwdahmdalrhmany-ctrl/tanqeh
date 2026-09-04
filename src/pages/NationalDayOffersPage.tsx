import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft,
  BadgePercent,
  CheckCircle2,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { NATIONAL_DAY_CAMPAIGN, NationalDayOffer } from '../data/nationalDayOffers';
import { pushGtmEvent } from '../lib/gtm';
import { breadcrumb, SITE_URL, useSeo } from '../lib/seo';

const PAGE_TYPE = 'national_day_offers';

function whatsappHref(message: string) {
  return `https://wa.me/${NATIONAL_DAY_CAMPAIGN.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function pushCampaignCta(location: string, method: 'whatsapp' | 'call', offer?: NationalDayOffer) {
  const parameters = {
    campaign_name: PAGE_TYPE,
    page_type: PAGE_TYPE,
    service_type: 'filter',
    cta_location: location,
    contact_method: method,
    conversion_action: method === 'whatsapp' ? 'whatsapp_click' : 'website_call_click',
    conversion_category: 'lead',
    conversion_priority: 'primary',
    campaign_city: 'riyadh',
    offer_id: offer?.id || 'all_offers',
    offer_name: offer?.name || 'عروض اليوم الوطني',
    offer_price: offer?.currentPrice,
  };

  pushGtmEvent('offer_cta_click', parameters);
  if (offer) {
    pushGtmEvent(offer.trackingEvent, parameters);
  }
}

export default function NationalDayOffersPage() {
  const offerCards = useRef<Record<string, HTMLElement | null>>({});

  useSeo({
    title: 'عروض اليوم الوطني على أجهزة تنقية المياه | مؤسسة نثال',
    description:
      'عروض اليوم الوطني على أجهزة تنقية المياه في الرياض لفترة محدودة وحتى نفاد الكمية، شاملة التركيب والتوصيل.',
    path: NATIONAL_DAY_CAMPAIGN.path,
    image: NATIONAL_DAY_CAMPAIGN.socialImage,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'عروض اليوم الوطني على أجهزة تنقية المياه',
          description:
            'عرضان موسميان على أجهزة تنقية المياه في الرياض من مؤسسة نثال، يشملان التركيب والتوصيل، لفترة محدودة وحتى نفاد الكمية.',
          url: `${SITE_URL}${NATIONAL_DAY_CAMPAIGN.path}`,
        },
        {
          '@type': 'ItemList',
          name: 'عروض أجهزة تنقية المياه',
          numberOfItems: NATIONAL_DAY_CAMPAIGN.offers.length,
          itemListElement: NATIONAL_DAY_CAMPAIGN.offers.map((offer, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: offer.name,
          })),
        },
        breadcrumb([
          { name: 'الرئيسية', path: '/' },
          { name: 'عروض اليوم الوطني', path: NATIONAL_DAY_CAMPAIGN.path },
        ]),
      ],
    },
  });

  useEffect(() => {
    pushGtmEvent('national_day_page_view', {
      campaign_name: PAGE_TYPE,
      page_type: PAGE_TYPE,
      campaign_status: NATIONAL_DAY_CAMPAIGN.mode,
      page_path: NATIONAL_DAY_CAMPAIGN.path,
    });
  }, []);

  useEffect(() => {
    const globalFloatingCtas = document.querySelector<HTMLElement>(
      'aside[aria-label="خيارات التواصل السريع"]',
    );
    const previousDisplay = globalFloatingCtas?.style.display || '';
    const previousBodyPadding = document.body.style.paddingBottom;

    const mobileViewport = window.matchMedia('(max-width: 767px)');
    const syncBodyPadding = () => {
      document.body.style.paddingBottom = mobileViewport.matches
        ? 'calc(5rem + env(safe-area-inset-bottom))'
        : previousBodyPadding;
    };

    if (globalFloatingCtas) globalFloatingCtas.style.display = 'none';
    syncBodyPadding();
    mobileViewport.addEventListener('change', syncBodyPadding);

    return () => {
      mobileViewport.removeEventListener('change', syncBodyPadding);
      if (globalFloatingCtas) globalFloatingCtas.style.display = previousDisplay;
      document.body.style.paddingBottom = previousBodyPadding;
    };
  }, []);

  useEffect(() => {
    if (NATIONAL_DAY_CAMPAIGN.mode !== 'active' || !('IntersectionObserver' in window)) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const offerId = (entry.target as HTMLElement).dataset.offerId;
          if (!offerId || seen.has(offerId)) return;

          seen.add(offerId);
          const offer = NATIONAL_DAY_CAMPAIGN.offers.find((item) => item.id === offerId);
          if (offer) {
            pushGtmEvent('offer_view', {
              campaign_name: PAGE_TYPE,
              page_type: PAGE_TYPE,
              offer_id: offer.id,
              offer_name: offer.name,
              offer_price: offer.currentPrice,
              page_path: NATIONAL_DAY_CAMPAIGN.path,
            });
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 },
    );

    NATIONAL_DAY_CAMPAIGN.offers.forEach((offer) => {
      const card = offerCards.current[offer.id];
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  if (NATIONAL_DAY_CAMPAIGN.mode === 'expired') {
    return <ExpiredCampaign />;
  }

  return (
    <div className="bg-white pb-8 md:pb-0" dir="rtl" data-national-day-page>
      <section className="relative overflow-hidden bg-[#0d4d37] pb-16 pt-32 text-white sm:pt-36 lg:pb-20 lg:pt-40">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,rgba(255,255,255,0.06)_25%,transparent_25%),linear-gradient(315deg,rgba(255,255,255,0.04)_25%,transparent_25%)] [background-position:0_0,28px_28px] [background-size:56px_56px]" />
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#0072ff]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="text-center lg:col-span-6 lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-white/10 px-4 py-2 text-sm font-extrabold text-emerald-50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              عروض اليوم الوطني لأهل الرياض
            </span>

            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:mx-0">
              خلّ مويتكم أنقى بعروض اليوم الوطني
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-emerald-50 lg:mx-0">
              وفر على جهاز تنقية المياه لبيتك في الرياض، وخذ العرض شامل التركيب والتوصيل.
            </p>

            <div
              className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#082f23]/70 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg backdrop-blur-sm lg:mx-0"
              role="status"
              aria-label="العروض متاحة الآن في الرياض والكمية محدودة"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              متاح الآن في الرياض — الكمية محدودة
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {NATIONAL_DAY_CAMPAIGN.offers.map((offer) => (
                <a
                  key={offer.id}
                  href={`#offer-${offer.id}`}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 text-right transition-colors hover:bg-white/15"
                  aria-label={`عرض ${offer.name} بسعر ${offer.currentPrice} ريال`}
                >
                  <span className="block text-xs font-bold text-emerald-100">{offer.name}</span>
                  <span className="mt-1 block text-3xl font-black text-white" dir="ltr">
                    {offer.currentPrice} <small className="text-sm">ريال</small>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
              <a
                id="national-day-hero-whatsapp"
                href={whatsappHref(NATIONAL_DAY_CAMPAIGN.generalWhatsappMessage)}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushCampaignCta('hero', 'whatsapp')}
                data-page-type={PAGE_TYPE}
                data-service-type="filter"
                data-cta-location="hero"
                className="btn-whatsapp flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base sm:max-w-xs"
                aria-label="احصل على عرض اليوم الوطني عبر واتساب"
              >
                <MessageSquare className="h-5 w-5" />
                أرسل واتساب وخذ عرضك
              </a>
              <a
                id="national-day-hero-call"
                href={NATIONAL_DAY_CAMPAIGN.phoneHref}
                onClick={() => pushCampaignCta('hero', 'call')}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white px-6 py-4 text-base font-extrabold text-[#0a1e36] transition-colors hover:bg-emerald-50"
                aria-label="اتصل بمؤسسة نثال للاستفسار عن عروض اليوم الوطني"
              >
                <Phone className="h-5 w-5 text-[#0072ff]" />
                كلّمنا الآن
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-emerald-100 lg:justify-start">
              <ShieldCheck className="h-5 w-5" />
              <span>مؤسسة سعودية مرخصة — سجل تجاري 1010654172</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:col-span-6">
            <div className="absolute inset-8 rounded-full bg-emerald-200/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white p-4 shadow-2xl sm:p-6">
              <img
                src={NATIONAL_DAY_CAMPAIGN.heroProductImage}
                alt="جهاز Purerena مع البرادة ضمن عروض اليوم الوطني"
                width="1200"
                height="801"
                fetchPriority="high"
                className="h-auto w-full rounded-2xl object-contain"
              />
              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-emerald-50 px-4 py-3 text-right">
                <div>
                  <span className="block text-xs font-bold text-emerald-800">فرصة اليوم الوطني</span>
                  <span className="block text-sm font-extrabold text-[#0a1e36]">عرضان لأهل الرياض بأسعار خاصة</span>
                </div>
                <BadgePercent className="h-9 w-9 shrink-0 text-emerald-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <section id="offers" className="bg-slate-50 py-16 md:py-24" aria-labelledby="offers-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <span className="section-subheading-tag">وفر أكثر في المناسبة</span>
              <h2 id="offers-heading" className="section-heading-main mt-3">اختر العرض اللي يناسب بيتك</h2>
              <p className="lead-paragraph">شوف السعر قبل وبعد، واعرف كم توفّر من أول نظرة.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {NATIONAL_DAY_CAMPAIGN.offers.map((offer) => (
                <React.Fragment key={offer.id}>
                  <OfferCard
                    offer={offer}
                    cardRef={(element) => {
                      offerCards.current[offer.id] = element;
                    }}
                  />
                </React.Fragment>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-bold text-slate-600">
              لا تفوّت الفرصة — العروض {NATIONAL_DAY_CAMPAIGN.period.label}.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20" aria-labelledby="benefits-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="section-subheading-tag">قيمة واضحة</span>
              <h2 id="benefits-heading" className="section-heading-main mt-3">كل شيء واضح قبل تطلب</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ['السعر قدّامك', 'تشوف السعر السابق والحالي وقيمة التوفير لكل عرض بوضوح.'],
                ['التركيب والتوصيل مشمولان', 'العرضان يشملان التركيب والتوصيل داخل الرياض.'],
                ['تواصل على طول', 'أرسل لنا واتساب أو كلّمنا من الموقع واسأل عن العرض اللي يناسبك.'],
              ].map(([title, description]) => (
                <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 text-center">
                  <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-700" />
                  <h3 className="mt-4 text-xl font-extrabold text-[#0a1e36]">{title}</h3>
                  <p className="mx-auto mt-3 text-base font-medium leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#071d36] py-16 text-white md:py-20" aria-labelledby="trust-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-sm font-extrabold text-sky-200">
                ثقة نثال
              </span>
              <h2 id="trust-heading" className="mt-4 text-3xl font-extrabold text-white">خبرة موثقة في حلول المياه</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {NATIONAL_DAY_CAMPAIGN.trustItems.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                  <strong className="block text-4xl font-black text-emerald-300">{item.value}</strong>
                  <span className="mt-2 block text-base font-bold text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="section-subheading-tag">أسئلة سريعة</span>
              <h2 id="faq-heading" className="section-heading-main mt-3">قبل ما تطلب العرض</h2>
            </div>
            <div className="space-y-4">
              {[
                ['كيف أطلب العرض؟', 'اختر العرض واضغط واتساب، أو كلّمنا مباشرة من الموقع.'],
                ['هل العرض متاح دائمًا؟', 'العروض لفترة محدودة وحتى نفاد الكمية.'],
                ['هل يشمل العرض التركيب والتوصيل؟', 'نعم، يشمل العرضان التركيب والتوصيل.'],
                ['هل يمكنني الاستفسار قبل الطلب؟', 'نعم، يمكنك التواصل عبر واتساب أو الاتصال قبل اختيار العرض.'],
              ].map(([question, answer]) => (
                <details key={question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer text-base font-extrabold text-[#0a1e36]">{question}</summary>
                  <p className="pt-4 text-base font-medium leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </div>

      <MobileStickyCta />
    </div>
  );
}

function OfferCard({ offer, cardRef }: { offer: NationalDayOffer; cardRef: (element: HTMLElement | null) => void }) {
  return (
    <article
      id={`offer-${offer.id}`}
      ref={cardRef}
      data-offer-id={offer.id}
      className="scroll-mt-28 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_50px_-30px_rgba(10,30,54,0.35)]"
    >
      <div className="grid h-full sm:grid-cols-2">
        <div className="bg-[#e9f4e3] p-4 sm:p-5">
          <img
            src={offer.image}
            alt={offer.imageAlt}
            width="1080"
            height="1420"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-sm rounded-2xl object-contain"
          />
        </div>

        <div className="flex flex-col p-6 text-center sm:p-7 sm:text-right">
          <span className="mx-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-extrabold text-emerald-800 sm:mx-0">
            <BadgePercent className="h-4 w-4" />
            عرض اليوم الوطني
          </span>
          <h3 className="mt-5 text-2xl font-black leading-tight text-[#0a1e36]">{offer.name}</h3>
          <p className="mx-auto mt-3 text-base font-medium leading-7 text-slate-600 sm:mx-0">{offer.description}</p>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="text-sm font-bold text-slate-500">بدلًا من</span>
              <del className="text-lg font-extrabold text-slate-500" dir="ltr">{offer.previousPrice} ريال</del>
            </div>
            <div className="mt-1 text-5xl font-black leading-none text-emerald-800" dir="ltr">
              {offer.currentPrice} <span className="text-xl">ريال</span>
            </div>
            <div className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-emerald-800">
              وفّر {offer.savings} ريال
            </div>
          </div>

          <div className="mt-auto grid gap-3 pt-6">
            <a
              id={`national-day-${offer.id}-whatsapp`}
              href={whatsappHref(offer.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushCampaignCta(`offer_card_${offer.id}`, 'whatsapp', offer)}
              data-product-id={offer.id}
              data-product-name={offer.name}
              data-service-type="filter"
              data-page-type={PAGE_TYPE}
              data-cta-location={`offer_card_${offer.id}`}
              className="btn-whatsapp flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base"
              aria-label={`${offer.ctaLabel} عبر واتساب: ${offer.name}`}
            >
              <MessageSquare className="h-5 w-5" />
              {offer.ctaLabel}
              <ArrowLeft className="h-4 w-4" />
            </a>
            <a
              id={`national-day-${offer.id}-call`}
              href={NATIONAL_DAY_CAMPAIGN.phoneHref}
              onClick={() => pushCampaignCta(`offer_card_${offer.id}`, 'call', offer)}
              className="btn-secondary flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base"
              aria-label={`اتصل للاستفسار عن ${offer.name}`}
            >
              <Phone className="h-5 w-5 text-[#0072ff]" />
              اتصل للاستفسار
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function FinalCta() {
  return (
    <section className="bg-emerald-50 py-16 text-white md:py-20" aria-labelledby="final-cta-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#0d4d37] px-6 py-10 text-center text-white shadow-xl sm:px-10 md:py-14">
          <h2 id="final-cta-heading" className="text-3xl font-black text-white">لا تفوّت العرض — خلّنا نجهّز لك الأنسب</h2>
          <p className="mx-auto mt-4 text-base font-medium leading-7 text-emerald-50">الكمية محدودة، والعرض يشمل التركيب والتوصيل داخل الرياض.</p>
          <div className="mx-auto mt-7 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <a
              id="national-day-final-whatsapp"
              href={whatsappHref(NATIONAL_DAY_CAMPAIGN.generalWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushCampaignCta('final_cta', 'whatsapp')}
              data-page-type={PAGE_TYPE}
              data-service-type="filter"
              data-cta-location="final_cta"
              className="btn-whatsapp flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base"
            >
              <MessageSquare className="h-5 w-5" />
              أرسل واتساب وخذ عرضك
            </a>
            <a
              id="national-day-final-call"
              href={NATIONAL_DAY_CAMPAIGN.phoneHref}
              onClick={() => pushCampaignCta('final_cta', 'call')}
              className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-extrabold text-[#0a1e36] hover:bg-emerald-50"
            >
              <Phone className="h-5 w-5 text-[#0072ff]" />
              كلّمنا الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileStickyCta() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-[125] border-t border-slate-200 bg-white/95 px-3 pt-3 shadow-[0_-8px_30px_rgba(10,30,54,0.12)] backdrop-blur-md md:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }} aria-label="طلب عروض اليوم الوطني">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-2">
        <a
          id="national-day-sticky-whatsapp"
          href={whatsappHref(NATIONAL_DAY_CAMPAIGN.generalWhatsappMessage)}
          target="_blank"
          rel="noreferrer"
          onClick={() => pushCampaignCta('mobile_sticky', 'whatsapp')}
          data-page-type={PAGE_TYPE}
          data-service-type="filter"
          data-cta-location="mobile_sticky"
          className="btn-whatsapp flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-base"
          aria-label="اطلب عرض اليوم الوطني عبر واتساب"
        >
          <MessageSquare className="h-5 w-5" />
          خذ العرض عبر واتساب
        </a>
        <a
          id="national-day-sticky-call"
          href={NATIONAL_DAY_CAMPAIGN.phoneHref}
          onClick={() => pushCampaignCta('mobile_sticky', 'call')}
          className="btn-secondary flex min-h-12 min-w-12 items-center justify-center rounded-xl px-4 py-3"
          aria-label="اتصل الآن"
        >
          <Phone className="h-5 w-5 text-[#0072ff]" />
        </a>
      </div>
    </aside>
  );
}

function ExpiredCampaign() {
  return (
    <div className="bg-slate-50 pb-8 pt-28 md:pb-0 md:pt-32" dir="rtl" data-national-day-page>
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <BadgePercent className="mx-auto h-14 w-14 text-emerald-700" />
          <span className="mt-5 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-800">تحديث العروض</span>
          <h1 className="mt-5 text-4xl font-black text-[#0a1e36]">انتهت عروض هذه المناسبة</h1>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-8 text-slate-600">تواصل معنا لمعرفة العروض المتاحة حاليًا على أجهزة تنقية المياه.</p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <a href={whatsappHref(NATIONAL_DAY_CAMPAIGN.generalWhatsappMessage)} target="_blank" rel="noreferrer" onClick={() => pushCampaignCta('expired_state', 'whatsapp')} data-page-type={PAGE_TYPE} data-service-type="filter" data-cta-location="expired_state" className="btn-whatsapp flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base">
              <MessageSquare className="h-5 w-5" />
              اسأل عن العروض الحالية
            </a>
            <a href={NATIONAL_DAY_CAMPAIGN.phoneHref} onClick={() => pushCampaignCta('expired_state', 'call')} className="btn-secondary flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base">
              <Phone className="h-5 w-5 text-[#0072ff]" />
              اتصل الآن
            </a>
          </div>
        </div>
      </div>
      <MobileStickyCta />
    </div>
  );
}
