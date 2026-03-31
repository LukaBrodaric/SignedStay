"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Property {
  id: string;
  name: string;
  propertyType: string;
  address: string | null;
  description: string | null;
  depositAmount: number;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const PROPERTY_TYPES = [
  "Villa",
  "Apartment",
  "House",
  "Studio",
  "Bungalow",
  "Chalet",
  "Cottage",
  "Loft",
  "Townhouse",
  "Other",
];

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    propertyType: "Villa",
    address: "",
    description: "",
    depositAmount: 600,
    userId: "",
  });

  useEffect(() => {
    fetchProperty();
    fetchUsers();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/admin/properties/${propertyId}`);
      if (res.ok) {
        const data = await res.json();
        setProperty(data);
        setFormData({
          name: data.name,
          propertyType: data.propertyType || "Villa",
          address: data.address || "",
          description: data.description || "",
          depositAmount: data.depositAmount,
          userId: data.userId,
        });
      }
    } catch (err) {
      setError("Failed to load property");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError("Property name is required");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/properties/${propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/properties");
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update property");
      }
    } catch (err) {
      setError("Failed to update property");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header title="Edit Property" user={{ name: session?.user?.name, email: session?.user?.email }} />
        <div className="p-6 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <Header title="Edit Property" user={{ name: session?.user?.name, email: session?.user?.email }} />
        <div className="p-6 text-center text-gray-500">Property not found</div>
      </div>
    );
  }

  return (
    <div>
      <Header title={`Edit: ${property.name}`} user={{ name: session?.user?.name, email: session?.user?.email }} />
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/properties")}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Properties
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
                Property updated successfully! Redirecting...
              </div>
            )}
            
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Property Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value })
                    }
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Deposit Amount (EUR)
                  </label>
                  <Input
                    type="number"
                    value={formData.depositAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        depositAmount: parseFloat(e.target.value) || 600,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Assigned User
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.userId}
                    onChange={(e) =>
                      setFormData({ ...formData, userId: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>


              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/properties")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}