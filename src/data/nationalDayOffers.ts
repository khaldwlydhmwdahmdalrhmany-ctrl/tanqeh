import nationalDayHeroImage from '@/assets/offers/saudi-national-day/national-day-hero.webp';
import anmaxOfferImage from '@/assets/offers/saudi-national-day/offer-anmax.webp';
import purerenaOfferImage from '@/assets/offers/saudi-national-day/offer-purerena-bundle.webp';
import purerenaBundleProductImage from '@/assets/offers/saudi-national-day/purerena-bundle-product.webp';

export type NationalDayCampaignMode = 'active' | 'expired';

export interface NationalDayOffer {
  id: 'anmax' | 'purerena-bundle';
  name: string;
  previousPrice: number;
  currentPrice: number;
  savings: number;
  description: string;
  ctaLabel: string;
  whatsappMessage: string;
  image: string;
  imageAlt: string;
  trackingEvent: 'offer_anmax_click' | 'offer_purerena_click';
}

/**
 * Seasonal campaign controls live in one place so the page can be updated or
 * switched to its expired state without changing its layout.
 */
export const NATIONAL_DAY_CAMPAIGN = {
  mode: 'active' as NationalDayCampaignMode,
  path: '/national-day-offers',
  period: {
    label: 'لفترة محدودة',
    startsAt: null as string | null,
    endsAt: null as string | null,
  },
  phoneNumber: '+966553033199',
  phoneHref: 'tel:+966553033199',
  whatsappNumber: '966553033199',
  generalWhatsappMessage:
    'مرحبًا، أرغب بالاستفادة من عرض اليوم الوطني على أجهزة تنقية المياه.',
  socialImage: nationalDayHeroImage,
  heroProductImage: purerenaBundleProductImage,
  offers: [
    {
      id: 'anmax',
      name: 'جهاز تنقية مياه Anmax',
      previousPrice: 650,
      currentPrice: 596,
      savings: 54,
      description: 'نقاء أفضل لمنزلك بسعر خاص لفترة محدودة.',
      ctaLabel: 'احصل على العرض',
      whatsappMessage: 'مرحبًا، أرغب بعرض جهاز Anmax بسعر 596 ريال.',
      image: anmaxOfferImage,
      imageAlt: 'عرض جهاز تنقية مياه Anmax بسعر 596 ريال',
      trackingEvent: 'offer_anmax_click',
    },
    {
      id: 'purerena-bundle',
      name: 'جهاز Purerena مع برادة',
      previousPrice: 1200,
      currentPrice: 999,
      savings: 201,
      description: 'حل متكامل لمياه أنقى واستخدام يومي أسهل.',
      ctaLabel: 'اطلب العرض الآن',
      whatsappMessage: 'مرحبًا، أرغب بعرض جهاز Purerena مع البرادة بسعر 999 ريال.',
      image: purerenaOfferImage,
      imageAlt: 'عرض جهاز Purerena مع برادة بسعر 999 ريال',
      trackingEvent: 'offer_purerena_click',
    },
  ] satisfies NationalDayOffer[],
  trustItems: [
    { value: '+10', label: 'سنوات من الخبرة' },
    { value: '+5,000', label: 'عميل يثق بنا' },
    { value: '+10,000', label: 'جهاز وفلتر تم تركيبه' },
  ],
} as const;
