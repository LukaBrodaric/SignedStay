"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SignaturePad } from "@/components/forms/SignatureCanvas";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";

interface Property {
  id: string;
  name: string;
  depositAmount: number;
}

export default function CheckInPage() {
  const params = useParams();
  const token = params.token as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    numberOfGuests: 1,
    arrivalDate: "",
    departureDate: "",
    estimatedDepartureHour: "10:00",
    depositConfirmed: false,
    conditionConfirmed: false,
    signatureDataUrl: "",
  });

  useEffect(() => {
    fetchProperty();
  }, [token]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/validate-token?token=${token}&type=checkin`);
      if (res.ok) {
        const data = await res.json();
        setProperty(data.property);
      } else {
        setError("This link is invalid or has expired.");
      }
    } catch {
      setError("This link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.depositConfirmed || !formData.conditionConfirmed) {
      setError("Please confirm both the deposit and property condition.");
      return;
    }

    if (!formData.signatureDataUrl) {
      setError("Please provide your signature.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/forms/checkin/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit check-in");
        return;
      }

      setSubmittedData(data.checkIn);
      setSuccess(true);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mb-4 text-6xl">🔒</div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Invalid Link
              </h1>
              <p className="text-gray-600">{error}</p>
              <Link href="/" className="mt-6 inline-block">
                <Button>Go to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Thank you, {submittedData.guestName}!
              </h1>
              <p className="mb-6 text-gray-600">
                Your check-in is complete.
              </p>

              <div className="mx-auto mb-6 max-w-sm rounded-lg bg-gray-50 p-4 text-left">
                <h3 className="mb-3 font-semibold text-gray-900">
                  Check-in Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property:</span>
                    <span className="font-medium">{property?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Arrival:</span>
                    <span className="font-medium">
                      {new Date(submittedData.arrivalDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Departure:</span>
                    <span className="font-medium">
                      {new Date(submittedData.departureDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests:</span>
                    <span className="font-medium">{submittedData.numberOfGuests}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                A confirmation has been sent to {formData.guestEmail}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <CardTitle>Check-In - {property?.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData({ ...formData, guestName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.guestEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, guestEmail: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Number of Guests <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.numberOfGuests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfGuests: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Est. Departure Hour <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.estimatedDepartureHour}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedDepartureHour: e.target.value })
                    }
                  >
                    <option value="00:00">00:00</option>
                    <option value="01:00">01:00</option>
                    <option value="02:00">02:00</option>
                    <option value="03:00">03:00</option>
                    <option value="04:00">04:00</option>
                    <option value="05:00">05:00</option>
                    <option value="06:00">06:00</option>
                    <option value="07:00">07:00</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Arrival Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) =>
                      setFormData({ ...formData, arrivalDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Departure Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) =>
                      setFormData({ ...formData, departureDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    checked={formData.depositConfirmed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        depositConfirmed: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm text-gray-700">
                    I confirm the deposit of €{property?.depositAmount} EUR for
                    incidentals has been paid <span className="text-red-500">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    checked={formData.conditionConfirmed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        conditionConfirmed: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that the villa is in great condition, clean, and
                    that I&apos;ve been briefed on the general safety, pool and house
                    rules. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              <SignaturePad
                onChange={(dataUrl) =>
                  setFormData({ ...formData, signatureDataUrl: dataUrl })
                }
              />

              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Complete Check-In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
