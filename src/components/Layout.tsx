/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Legal, { useLegalHash } from './Legal';
import { pushGtmEvent } from '../lib/gtm';

/** Scrolls to top on every route change (in-page hash links are left alone). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        pushGtmEvent('click_phone', {
          phone_number: href.replace('tel:', ''),
          element_id: link.id || 'unidentified_phone_link',
          page_path: window.location.pathname,
        });
      } else if (href.includes('wa.me/')) {
        pushGtmEvent('click_whatsapp', {
          element_id: link.id || 'unidentified_whatsapp_link',
          product_id: link.dataset.productId || undefined,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener('click', trackContactClick);
    return () => document.removeEventListener('click', trackContactClick);
  }, []);

  return null;
}

export default function Layout() {
  const legal = useLegalHash();

  return (
    <div
      className="bg-white min-h-screen relative font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900"
      dir="rtl"
    >
      <ScrollToTop />

      <Header />

      <main>
        <Outlet />
      </main>

      <Footer onOpenLegal={legal.open} />

      {legal.openTab && (
        <Legal tab={legal.openTab} onChangeTab={legal.open} onClose={legal.close} />
      )}

      {/* FLOATING ACTION CTA BAR - Critical for conversions */}
      <aside
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[120] flex flex-col gap-3"
        aria-label="خيارات التواصل السريع"
      >
        <a
          href="tel:+966553033199"
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center relative group"
          id="floating-call-btn"
          aria-label="اتصل بمبيعات نثال"
        >
          <Phone className="w-6 h-6 stroke-[2.5]" />
          <span className="absolute left-14 bg-blue-600 text-white rounded-lg text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            اتصل مبيعات: +966553033199
          </span>
        </a>

        <a
          href="https://wa.me/966553033199"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center relative group"
          id="floating-whatsapp-btn"
          aria-label="تواصل مع مبيعات نثال عبر واتساب"
        >
          <MessageSquare className="w-6 h-6 stroke-[2.5]" />
          <span className="absolute left-14 bg-emerald-600 text-white rounded-lg text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            واتساب مبيعات نثال
          </span>
        </a>
      </aside>
    </div>
  );
}
