"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const privacy = translations[language].privacy;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            {language === "hr" ? "Povratak na početnu" : "Back to Home"}
          </Link>

          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            {privacy.title}
          </h1>
          <p className="mb-8 text-sm text-gray-500">{privacy.lastUpdated}</p>

          <div className="prose prose-lg max-w-none rounded-xl bg-white p-8 shadow-sm">
            <p className="text-gray-600">{privacy.intro}</p>

            {privacy.sections.map((section: { title: string; content: string }, index: number) => (
              <div key={index} className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-2 text-gray-600 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
