/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: 'filter' | 'cooler' | 'mist' | 'maintenance';
  image: string;
  tagline: string;
  stagesCount?: number;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  isPopular?: boolean;
  warrantyYears: number;
  videoUrl?: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  serviceType: string;
  details: string;
  productName?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface Achievement {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  productUsed: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
