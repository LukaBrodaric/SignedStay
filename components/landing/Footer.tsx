"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="border-t bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/signedstaylogo.svg"
              alt="SignedStay Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-900">SignedStay</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {t.privacy}
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {t.terms}
            </Link>
            <Link
              href="#contact"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {t.contact}
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
