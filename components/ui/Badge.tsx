import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-indigo-100 text-indigo-700": variant === "default",
          "bg-gray-100 text-gray-700": variant === "secondary",
          "bg-green-100 text-green-700": variant === "success",
          "bg-red-100 text-red-700": variant === "destructive",
          "border border-gray-200 text-gray-600": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
