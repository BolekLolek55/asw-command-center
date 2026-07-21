import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "border-military-red bg-military-red/5 text-military-red";
    case "medium":
      return "border-military-yellow bg-military-yellow/5 text-military-yellow";
    case "low":
      return "border-military-blue bg-military-blue/5 text-military-blue";
    default:
      return "border-military-border bg-military-panel text-military-muted";
  }
}

export function getSubjectColor(id: string): string {
  const colors: Record<string, string> = {
    taktyka: "#4ade80",
    historia: "#60a5fa",
    prawo: "#fbbf24",
    logistyka: "#f87171",
    wywiad: "#a78bfa",
    bron: "#fb923c",
    cyber: "#22d3ee",
    terytorium: "#34d399",
  };
  return colors[id] || "#4ade80";
}
