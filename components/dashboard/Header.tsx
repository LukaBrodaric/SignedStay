"use client";

import { User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  user?: {
    name: string | null | undefined;
    email: string | null | undefined;
  };
}

export function Header({ title, subtitle, action, user }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-0">
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        {action}
        <div className="flex items-center gap-3 border-l border-gray-100 pl-4 sm:pl-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-gray-500 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
