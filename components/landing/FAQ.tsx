"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { AnimatedSection } from "./AnimatedSection";

export function FAQ() {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <div className="space-y-0">
            {t.questions.map((item, index) => (
              <div
                key={index}
                className={`border-b border-slate-200 py-5 transition-all duration-300 ${openIndex === index ? 'bg-white rounded-xl px-4 -mx-4 shadow-sm' : 'hover:bg-white/50'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between cursor-pointer group text-left"
                >
                  <span className="text-slate-900 font-semibold text-lg group-hover:text-indigo-600 transition-colors pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="text-slate-600 leading-relaxed mt-3 text-base">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
