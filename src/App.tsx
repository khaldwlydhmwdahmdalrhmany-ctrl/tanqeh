import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import QuotePage from './pages/QuotePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/filters"
            element={<CategoryPage categoryKey="filters" />}
          />
          <Route
            path="/coolers"
            element={<CategoryPage categoryKey="coolers" />}
          />
          <Route
            path="/mist"
            element={<CategoryPage categoryKey="mist" />}
          />
          <Route
            path="/maintenance"
            element={<CategoryPage categoryKey="maintenance" />}
          />

          <Route path="/product/:productId" element={<ProductPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/quote" element={<QuotePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
