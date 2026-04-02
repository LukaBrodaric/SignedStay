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

export default function CheckOutPage() {
  const params = useParams();
  const token = params.token as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedGuestName, setSubmittedGuestName] = useState("");

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    depositReturned: false,
    incidentDescription: "",
    signatureDataUrl: "",
  });

  useEffect(() => {
    fetchProperty();
  }, [token]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/validate-token?token=${token}&type=checkout`);
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

    if (!formData.guestName) {
      setError("Please enter your name.");
      return;
    }

    if (formData.depositReturned === false && !formData.incidentDescription) {
      setError("Please describe the issue with the deposit.");
      return;
    }

    if (!formData.signatureDataUrl) {
      setError("Please provide your signature.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/forms/checkout/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit check-out");
        return;
      }

      setSubmittedGuestName(data.checkOut.guestName);
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Thank you!
              </h1>
              <p className="text-gray-600">
                Your check-out has been recorded.
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
              <CardTitle>Check-Out - {property?.name}</CardTitle>
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
                  Email Address <span className="text-gray-400">(optional)</span>
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.guestEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, guestEmail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  I confirm that everything went well and that the owner returned
                  the deposit of €{property?.depositAmount} EUR{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="depositReturned"
                      className="h-4 w-4"
                      checked={formData.depositReturned === true}
                      onChange={() =>
                        setFormData({ ...formData, depositReturned: true, incidentDescription: "" })
                      }
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="depositReturned"
                      className="h-4 w-4"
                      checked={formData.depositReturned === false}
                      onChange={() =>
                        setFormData({ ...formData, depositReturned: false })
                      }
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {!formData.depositReturned && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    If the previous answer is No, please describe the issue:{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={4}
                    placeholder="Describe the issue with the deposit..."
                    value={formData.incidentDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, incidentDescription: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Signature <span className="text-red-500">*</span>
                </label>
                <SignaturePad
                  onChange={(dataUrl) =>
                    setFormData({ ...formData, signatureDataUrl: dataUrl || "" })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Complete Check-Out"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
