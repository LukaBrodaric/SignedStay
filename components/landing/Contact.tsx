"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <Mail className="h-4 w-4" />
            {t.badge}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{t.successTitle}</h3>
                  <p className="mb-6 text-gray-600">
                    {t.successMessage}
                  </p>
                  <Button onClick={() => setSent(false)} variant="outline">
                    {t.sendAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t.nameLabel}
                      </label>
                      <Input
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t.emailLabel}
                      </label>
                      <Input
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {t.subjectLabel}
                    </label>
                    <Input
                      type="text"
                      placeholder={t.subjectPlaceholder}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {t.messageLabel}
                    </label>
                    <textarea
                      className="flex min-h-[150px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary"
                    disabled={loading}
                  >
                    {loading ? (
                      t.sending
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t.submitButton}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                {t.contactInfo}
              </h3>
              <div className="space-y-4">
                <a href="mailto:info@signedstay.com" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                    <Mail className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{t.email}</p>
                    <p className="font-medium">info@signedstay.com</p>
                  </div>
                </a>
                <a href="tel:+385919157424" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                    <Phone className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{t.phone}</p>
                    <p className="font-medium">+385 91 915 7424</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{t.address}</p>
                    <p className="font-medium">Pula, Croatia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-600 to-blue-600 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-white">
                {t.quickResponse}
              </h3>
              <p className="mb-4 text-sm text-white/80">
                {t.quickResponseText}
              </p>
              <div className="rounded-lg bg-white/20 p-4">
                <p className="text-sm text-white/90">
                  <strong>{t.supportHours}</strong>
                  <br />
                  {t.weekdays}
                  <br />
                  {t.saturday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
