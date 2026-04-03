"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { AnimatedSection } from "./AnimatedSection";

export function Pricing() {
  const { language } = useLanguage();
  const t = translations[language].pricing;

  return (
    <section id="pricing" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700">
            {t.badge}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.sub}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <div className="mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-white p-8 shadow-2xl">
              <div className="absolute inset-0 -z-10">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
              </div>

              <div className="mb-6 text-center">
                <p className="mb-2 text-lg font-medium text-gray-600">
                  {t.per}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">{t.price}</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {t.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/login" className="block">
                <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-base hover:shadow-lg transition-shadow">
                  {t.cta}
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              {t.bundle.split("?")[0]}?{" "}
              <a
                href="mailto:contact@signedstay.com"
                className="font-medium text-primary hover:underline"
              >
                {language === "hr" ? "Kontaktirajte nas" : "Contact us"}
              </a>{" "}
              {language === "hr" ? "za paketnu ponudu." : "for a bundle."}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
