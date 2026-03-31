"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div
            className="h-[800px] w-[800px] rounded-full opacity-30 blur-[120px]"
            style={{
              background:
                "linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #8b5cf6 100%)",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 backdrop-blur-sm px-5 py-2 text-sm font-medium text-indigo-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.headline}
          </span>
        </h1>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href="/login">
            <Button
              size="lg"
              className="h-12 bg-gradient-to-r from-primary to-secondary px-8 text-base shadow-lg hover:shadow-xl transition-all"
            >
              {t.cta_primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-white/50 backdrop-blur-sm">
              {t.cta_secondary}
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{t.below_cta.split(" · ")[0]}</span>
          </div>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{t.below_cta.split(" · ")[1]}</span>
          </div>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{t.below_cta.split(" · ")[2]}</span>
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200/50 bg-white/80 p-3 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="rounded-md bg-white/80 px-3 py-1 text-xs text-gray-500 font-medium">
                  checkin.yourproperty.com
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-5 w-1/3 rounded bg-gradient-to-r from-gray-200 to-gray-100" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-gradient-to-r from-gray-100 to-gray-50" />
                  <div className="h-3 w-full rounded bg-gradient-to-r from-gray-100 to-gray-50" />
                  <div className="h-3 w-2/3 rounded bg-gradient-to-r from-gray-100 to-gray-50" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-9 w-24 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20" />
                  <div className="h-9 w-24 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20" />
                </div>
                <div className="mt-6 rounded-xl border-2 border-dashed border-gray-200 bg-white/50 p-6">
                  <div className="flex h-24 items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <span className="text-sm">{t.signaturePad}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
