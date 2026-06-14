/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ACHIEVEMENTS } from '../data';
import { Award, Users, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';

const icons = [
  <Award className="w-8 h-8 text-blue-500" />,
  <Users className="w-8 h-8 text-cyan-500" />,
  <ShieldCheck className="w-8 h-8 text-blue-600" />,
  <ClipboardCheck className="w-8 h-8 text-emerald-500" />
];

export default function Achievements() {
  return (
    <section id="about-section" className="bg-white py-20 md:py-24 border-y border-slate-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((metric, index) => (
            <div
              key={metric.id}
              className="flex flex-col items-center md:items-start text-center md:text-right p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-blue-50/70"
            >
              {/* Colored Icon Envelope */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                {icons[index % icons.length]}
              </div>

              {/* Numerical value */}
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-mono tracking-tight mb-2">
                {metric.value}
              </span>

              {/* Title / Description */}
              <span className="text-sm font-extrabold text-slate-800 mb-1">
                {metric.label}
              </span>

              {/* Explanatory subtext */}
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
