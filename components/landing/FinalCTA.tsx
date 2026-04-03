"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { AnimatedSection } from "./AnimatedSection";

export function FinalCTA() {
  const { language } = useLanguage();
  const t = translations[language].final_cta;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative text-center max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-indigo-200 text-lg mt-4 max-w-xl mx-auto">
            {t.text}
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={200}>
          <a
            href="mailto:info@signedstay.com"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mt-8"
          >
            <Mail className="w-5 h-5" />
            {t.button}
          </a>
          <p className="text-indigo-300 text-sm mt-4">
            {t.subtext}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
