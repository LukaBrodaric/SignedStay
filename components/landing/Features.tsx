"use client";

import {
  Link as LinkIcon,
  FileText,
  Mail,
  BarChart3,
  Home,
  Shield,
  PenTool,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const iconMap: Record<string, any> = {
  Link: LinkIcon,
  FileText,
  Mail,
  BarChart3,
  Home,
  Shield,
  PenTool,
};

export function Features() {
  const { language } = useLanguage();
  const t = translations[language].features;

  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            {t.badge}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 transition-transform duration-300 group-hover:scale-110">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
