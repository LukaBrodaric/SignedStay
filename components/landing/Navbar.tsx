"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/signedstaylogo.svg"
            alt="SignedStay Logo"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="text-xl font-bold text-gray-900">SignedStay</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="#features"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            {t.nav.features}
          </Link>
          <Link
            href="#pricing"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            {t.nav.pricing}
          </Link>
          <Link
            href="#contact"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            {t.nav.contact}
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setLanguage("hr")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                language === "hr"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              HR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                language === "en"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              EN
            </button>
          </div>

          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-gray-600">
              {t.nav.logIn}
            </Button>
          </Link>
          <Link href="#contact">
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg">
              {t.nav.cta}
            </Button>
          </Link>
        </div>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="#features"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.features}
            </Link>
            <Link
              href="#pricing"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="#contact"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
            <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => setLanguage("hr")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === "hr"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                HR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === "en"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                EN
              </button>
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  {t.nav.logIn}
                </Button>
              </Link>
              <Link href="#contact">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  {t.nav.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
