import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import QuotePage from './pages/QuotePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/filters" element={<CategoryPage categoryKey="filters" />} />
        <Route path="/coolers" element={<CategoryPage categoryKey="coolers" />} />
        <Route path="/mist" element={<CategoryPage categoryKey="mist" />} />
        <Route path="/maintenance" element={<CategoryPage categoryKey="maintenance" />} />

        <Route path="/product/:productId" element={<ProductPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/quote" element={<QuotePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
