"use client";

import { Home, Building2, Briefcase, Globe, LayoutGrid } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const targetIcons = [Home, Building2, Briefcase, Globe, LayoutGrid];

export function WhoIsFor() {
  const { language } = useLanguage();
  const t = translations[language].target;

  return (
    <section className="bg-indigo-600 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.headline}
            </h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              {t.body}
            </p>
          </div>

          <div>
            <p className="text-indigo-200 font-medium mb-4">{t.sub}</p>
            <div className="space-y-3">
              {t.users.map((user, index) => {
                const Icon = targetIcons[index];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm border border-white/10"
                  >
                    <Icon className="text-indigo-200 w-5 h-5 flex-shrink-0" />
                    <span className="text-white font-medium">{user}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-indigo-200 text-sm mt-6 italic">
              {t.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
