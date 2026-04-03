"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useState } from "react";

interface MobileNavProps {
  role: "ADMIN" | "CLIENT";
}

export function MobileNav({ role }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { href: "/admin", label: "Pregled", icon: LayoutDashboard },
    { href: "/admin/users", label: "Korisnici", icon: Users },
    { href: "/admin/properties", label: "Objekti", icon: Building2 },
  ];

  const clientLinks = [
    { href: "/dashboard", label: "Pregled", icon: LayoutDashboard },
    { href: "/dashboard/properties", label: "Moji objekti", icon: Building2 },
  ];

  const links = role === "ADMIN" ? adminLinks : clientLinks;

  return (
    <>
      <div className="md:hidden border-b bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-900">SignedStay</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <span className="font-bold text-gray-900">SignedStay</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t p-4">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                Odjava
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
