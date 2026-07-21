"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-military-panel border border-military-border rounded-lg transition-all duration-300",
        "hover:shadow-lg hover:shadow-military-green/5",
        onClick && "cursor-pointer hover:border-military-green/30 hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  );
}
