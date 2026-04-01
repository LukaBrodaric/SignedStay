"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Plus, Copy, RefreshCw, Pencil, Building2 } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
}

interface Property {
  id: string;
  name: string;
  propertyType: string;
  address: string | null;
  userId: string;
  checkInToken: string | null;
  checkOutToken: string | null;
  user: {
    name: string;
  };
}

export default function AdminPropertiesPage() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    userId: "",
    depositAmount: 600,
  });

  useEffect(() => {
    fetchProperties();
    fetchUsers();
  }, []);

  const fetchProperties = async () => {
    const res = await fetch("/api/admin/properties");
    if (res.ok) {
      const data = await res.json();
      setProperties(data);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ name: "", address: "", userId: "", depositAmount: 600 });
        fetchProperties();
      }
    } finally {
      setLoading(false);
    }
  };

  const generateTokens = async (propertyId: string) => {
    setGeneratingId(propertyId);
    try {
      const res = await fetch(`/api/admin/properties/${propertyId}/generate-tokens`, {
        method: "POST",
      });
      if (res.ok) {
        fetchProperties();
      }
    } finally {
      setGeneratingId(null);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div>
      <Header
        title="Properties"
        subtitle="Manage your properties and check-in links"
        user={{ name: session?.user?.name, email: session?.user?.email }}
        action={
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        }
      />
      <div className="max-w-7xl mx-auto px-8 py-8">
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Property</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProperty} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Property Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Villa Sunshine"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Input
                      type="text"
                      placeholder="123 Beach Street, Miami"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Owner
                    </label>
                    <select
                      className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                      value={formData.userId}
                      onChange={(e) =>
                        setFormData({ ...formData, userId: e.target.value })
                      }
                      required
                    >
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Deposit Amount (EUR)
                    </label>
                    <Input
                      type="number"
                      value={formData.depositAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          depositAmount: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Property"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Property Name
                    </th>
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Owner
                    </th>
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Check-in Link
                    </th>
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Check-out Link
                    </th>
                    <th className="pt-4 pb-4 px-6 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                            <Building2 className="h-4 w-4 text-indigo-600" />
                          </div>
                          <span className="font-semibold text-gray-900">
                            {property.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {property.user.name}
                      </td>
                      <td className="py-4 px-6">
                        {property.checkInToken ? (
                          <div className="flex items-center gap-2">
                            <span className="max-w-[180px] truncate text-sm text-gray-500 font-mono">
                              {baseUrl}/checkin/{property.checkInToken}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                copyToClipboard(
                                  `${baseUrl}/checkin/${property.checkInToken}`,
                                  `checkin-${property.id}`
                                )
                              }
                            >
                              {copiedId === `checkin-${property.id}` ? (
                                <span className="text-green-600 text-xs">Copied!</span>
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="outline">Not generated</Badge>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {property.checkOutToken ? (
                          <div className="flex items-center gap-2">
                            <span className="max-w-[180px] truncate text-sm text-gray-500 font-mono">
                              {baseUrl}/checkout/{property.checkOutToken}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                copyToClipboard(
                                  `${baseUrl}/checkout/${property.checkOutToken}`,
                                  `checkout-${property.id}`
                                )
                              }
                            >
                              {copiedId === `checkout-${property.id}` ? (
                                <span className="text-green-600 text-xs">Copied!</span>
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="outline">Not generated</Badge>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/properties/${property.id}/edit`}>
                            <Button variant="outline" size="sm" className="h-9">
                              <Pencil className="mr-1.5 h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9"
                            onClick={() => generateTokens(property.id)}
                            disabled={generatingId === property.id}
                          >
                            <RefreshCw
                              className={`mr-1.5 h-3.5 w-3.5 ${
                                generatingId === property.id ? "animate-spin" : ""
                              }`}
                            />
                            {property.checkInToken ? "Regenerate" : "Generate"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {properties.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Building2 className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">
                            No properties yet
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            Add your first property to get started
                          </p>
                          <Button onClick={() => setShowForm(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Property
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
