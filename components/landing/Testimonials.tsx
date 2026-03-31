"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function Testimonials() {
  const { language } = useLanguage();
  const t = translations[language].testimonials;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % 10);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + 10) % 10);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonials = [
    {
      name: "Maria Papadakis",
      role: "Villa Owner, Santorini",
      avatar: "MP",
      rating: 5,
      text: "SignedStay completely transformed how I manage guest check-ins. What used to take 30 minutes now takes seconds. My guests love the smooth digital experience.",
    },
    {
      name: "Roberto Rossi",
      role: "Property Manager, Amalfi Coast",
      avatar: "RR",
      rating: 5,
      text: "The automatic email confirmations are a game changer. No more chasing guests for signed documents. Everything is organized and ready when I need it.",
    },
    {
      name: "Sophie Laurent",
      role: "Airbnb Superhost, Nice",
      avatar: "SL",
      rating: 5,
      text: "I manage 8 properties and was drowning in paperwork. SignedStay keeps everything sorted by property. The dashboard is incredibly intuitive.",
    },
    {
      name: "Hans Mueller",
      role: "Ferienwohnung Owner, Munich",
      avatar: "HM",
      rating: 5,
      text: "Finally, a solution that understands European rental requirements. GDPR compliance was a must, and SignedStay delivers perfectly.",
    },
    {
      name: "Elena Petrova",
      role: "Hotel Group Director, Athens",
      avatar: "EP",
      rating: 5,
      text: "We rolled this out across 15 apartments. The multi-property dashboard saves our team hours every week. Excellent value for the price.",
    },
    {
      name: "Marco Bianchi",
      role: "Coastal Villa Owner, Tuscany",
      avatar: "MB",
      rating: 5,
      text: "The digital signature feature alone is worth the subscription. Guests sign on their phones before arrival, and I have everything documented.",
    },
    {
      name: "Anna Kowalski",
      role: "Vacation Rental Owner, Krakow",
      avatar: "AK",
      rating: 5,
      text: "Setup was incredibly fast. I was sending check-in links within 10 minutes of signing up. The onboarding experience is flawless.",
    },
    {
      name: "Pierre Dubois",
      role: "Chateau Manager, Loire Valley",
      avatar: "PD",
      rating: 5,
      text: "My guests consistently mention how professional the check-in process feels. It adds that premium touch that justifies higher nightly rates.",
    },
    {
      name: "Isabella Costa",
      role: "Beach Apartment Owner, Algarve",
      avatar: "IC",
      rating: 5,
      text: "The house rules delivery feature means guests actually read the pool hours and WiFi passwords. Fewer questions, happier stays.",
    },
    {
      name: "Thomas Weber",
      role: "Mountain Lodge Owner, Swiss Alps",
      avatar: "TW",
      rating: 5,
      text: "In peak season, I was losing track of check-ins. Now everything is automated. I can focus on guest experience instead of paperwork.",
    },
  ];

  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <Star className="h-4 w-4 fill-indigo-400 text-indigo-400" />
            {t.badge}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full p-8 md:p-12"
                >
                  <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    <Quote className="absolute -top-4 left-8 h-12 w-12 text-primary/10" />
                    
                    <div className="mb-6 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="mb-8 text-lg text-gray-700 leading-relaxed italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-semibold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
