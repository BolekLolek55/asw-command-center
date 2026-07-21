"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
  size?: "sm" | "md";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = "bg-military-green",
  size = "sm",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full bg-military-accent rounded-full overflow-hidden", className)}>
      <div
        className={cn("rounded-full transition-all duration-1000 ease-out", color, size === "sm" ? "h-1.5" : "h-2")}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
