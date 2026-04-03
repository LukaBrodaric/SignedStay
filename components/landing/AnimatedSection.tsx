"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: false });

  const animationClasses = {
    "fade-up": "opacity-0 translate-y-8",
    "fade-in": "opacity-0",
    "fade-left": "opacity-0 -translate-x-8",
    "fade-right": "opacity-0 translate-x-8",
  };

  const animationActiveClasses = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-in": "opacity-100",
    "fade-left": "opacity-100 translate-x-0",
    "fade-right": "opacity-100 translate-x-0",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? animationActiveClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
