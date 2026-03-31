"use client";

import { UserPlus, ClipboardCheck, Database, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const stepsIcons = [UserPlus, ClipboardCheck, Database, LogOut];

export function HowItWorks() {
  const { language } = useLanguage();
  const t = translations[language].how_it_works;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.steps.map((step, index) => {
            const Icon = stepsIcons[index];
            return (
              <div
                key={index}
                className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span className="text-5xl font-black bg-gradient-to-br from-indigo-500 to-blue-400 bg-clip-text text-transparent leading-none mb-4 block">
                  {index + 1}
                </span>
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
