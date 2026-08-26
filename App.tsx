/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ProjectsPage from './pages/ProjectsPage';
import QuotePage from './pages/QuotePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Route map. Each URL is a real page with its own <title>, meta description
 * and canonical link — this is what Google Ads scores as "landing page
 * experience", and what lets each ad group point at a focused page.
 *
 *   /                     الصفحة الرئيسية
 *   /filters              فلاتر وأجهزة تحلية
 *   /coolers              برادات وموزعات مياه
 *   /mist                 أنظمة رذاذ وتبريد
 *   /maintenance          الصيانة وقطع الغيار
 *   /product/:productId   صفحة منتج مستقلة
 *   /projects             أعمالنا ومشاريعنا
 *   /quote                احجز فحصاً مجانياً
 *   /about                عن نثال
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/filters" element={<CategoryPage />} />
        <Route path="/coolers" element={<CategoryPage />} />
        <Route path="/mist" element={<CategoryPage />} />
        <Route path="/maintenance" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
