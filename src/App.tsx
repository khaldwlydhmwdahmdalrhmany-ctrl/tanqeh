import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import HomeWaterFiltersPage from './pages/HomeWaterFiltersPage';
import WaterFilterMaintenancePage from './pages/WaterFilterMaintenancePage';
import LocalSearchPage from './pages/LocalSearchPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import QuotePage from './pages/QuotePage';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';

const NationalDayOffersPage = React.lazy(() => import('./pages/NationalDayOffersPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/filters" element={<CategoryPage />} />
        <Route path="/home-water-filters" element={<HomeWaterFiltersPage />} />
        <Route path="/water-filter-maintenance-riyadh" element={<WaterFilterMaintenancePage />} />
        <Route path="/water-filters-riyadh" element={<LocalSearchPage />} />
        <Route path="/coolers" element={<CategoryPage />} />
        <Route path="/mist" element={<CategoryPage />} />
        <Route path="/maintenance" element={<CategoryPage />} />

        <Route path="/product/:productId" element={<ProductPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        <Route
          path="/national-day-offers"
          element={
            <React.Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-sm font-bold text-slate-600">
                  جاري تحميل العروض...
                </div>
              }
            >
              <NationalDayOffersPage />
            </React.Suspense>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
