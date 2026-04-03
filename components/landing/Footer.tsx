"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
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
            <p className="mt-4 text-sm text-gray-600">
              {language === "hr"
                ? "Digitalna potvrda prijave i odjave za objekte za iznajmljivanje."
                : "Digital check-in and check-out confirmation for rental properties."}
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-gray-900">
              {language === "hr" ? "Proizvod" : "Product"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#features" className="hover:text-gray-900">
                  {language === "hr" ? "Funkcionalnosti" : "Features"}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-gray-900">
                  {language === "hr" ? "Cijene" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-gray-900">
              {language === "hr" ? "Tvrtka" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gray-900">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-gray-900">
              {language === "hr" ? "Kontakt" : "Contact"}
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@signedstay.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Croatia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
