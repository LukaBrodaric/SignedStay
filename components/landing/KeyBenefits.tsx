"use client";

import { Clock, TrendingUp, Shield, Users, FileCheck, Bell } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { AnimatedSection } from "./AnimatedSection";

const benefitIcons = [Clock, TrendingUp, Shield, Users, FileCheck, Bell];

export function KeyBenefits() {
  const { language } = useLanguage();
  const t = translations[language].key_benefits;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            {t.badge}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {benefit.stat}
                      </span>
                      <p className="text-xs text-gray-500">{benefit.statLabel}</p>
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
