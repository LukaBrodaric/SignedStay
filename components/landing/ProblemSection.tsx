"use client";

import { X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function ProblemSection() {
  const { language } = useLanguage();
  const t = translations[language].problem;

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 border border-white/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {t.intro}
            </p>
            <p className="text-slate-400 text-lg mb-6 italic">
              {t.sub}
            </p>
            <div className="space-y-3 mt-6">
              {t.problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide mb-3 block">
              {t.resolution_label}
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.resolution_title}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              {t.resolution_body}
            </p>
            <ul className="space-y-3">
              {t.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg">✓</span>
                  <span className="text-slate-300">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
