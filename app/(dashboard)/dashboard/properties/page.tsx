"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/dashboard/PropertyCard";
import { Building2 } from "lucide-react";

interface Property {
  id: string;
  name: string;
  address: string | null;
  checkInToken: string | null;
  checkOutToken: string | null;
  _count: {
    checkIns: number;
    checkOuts: number;
  };
}

export default function ClientPropertiesPage() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/dashboard/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        title="My Properties"
        subtitle="Manage your properties and share check-in links with guests"
        user={{ name: session?.user?.name, email: session?.user?.email }}
      />
      <div className="max-w-7xl mx-auto px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/dashboard/properties/${property.id}`}
                className="block"
              >
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Building2 className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">
                  You haven&apos;t added any properties yet.
                </p>
                <p className="text-sm text-gray-400">
                  Contact your administrator to add properties.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
