"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

const variants = {
  default: "bg-military-accent text-military-muted border-military-accent",
  success: "bg-military-green/10 text-military-green border-military-green/30",
  warning: "bg-military-yellow/10 text-military-yellow border-military-yellow/30",
  error: "bg-military-red/10 text-military-red border-military-red/30",
  info: "bg-military-blue/10 text-military-blue border-military-blue/30",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded text-[10px] font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
