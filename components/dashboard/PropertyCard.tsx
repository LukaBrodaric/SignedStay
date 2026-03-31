"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Copy, ExternalLink, Building2, LogIn, LogOut } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string | null;
    checkInToken: string | null;
    checkOutToken: string | null;
    _count?: {
      checkIns: number;
      checkOuts: number;
    };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [copiedIn, setCopiedIn] = useState(false);
  const [copiedOut, setCopiedOut] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";
  const checkInUrl = property.checkInToken
    ? `${baseUrl}/checkin/${property.checkInToken}`
    : null;
  const checkOutUrl = property.checkOutToken
    ? `${baseUrl}/checkout/${property.checkOutToken}`
    : null;

  const copyToClipboard = async (text: string, setCopied: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50">
              <Building2 className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{property.name}</CardTitle>
              {property.address && (
                <p className="text-sm text-gray-500 mt-0.5">{property.address}</p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checkInUrl && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 mb-1">Check-in Link</p>
                <p className="text-sm text-gray-600 font-mono truncate">
                  {checkInUrl.replace(baseUrl, 'signedstay.com')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(checkInUrl, setCopiedIn)}
                >
                  {copiedIn ? (
                    <span className="text-xs text-green-600 font-medium">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(checkInUrl, '_blank')}>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          )}

          {checkOutUrl && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 mb-1">Check-out Link</p>
                <p className="text-sm text-gray-600 font-mono truncate">
                  {checkOutUrl.replace(baseUrl, 'signedstay.com')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(checkOutUrl, setCopiedOut)}
                >
                  {copiedOut ? (
                    <span className="text-xs text-green-600 font-medium">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(checkOutUrl, '_blank')}>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          )}

          {!checkInUrl && !checkOutUrl && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-sm text-amber-700">
                No links generated yet. Contact your administrator to generate links.
              </p>
            </div>
          )}

          {property._count && (
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <LogIn className="h-4 w-4" />
                <span>{property._count.checkIns} check-ins</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <LogOut className="h-4 w-4" />
                <span>{property._count.checkOuts} check-outs</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
