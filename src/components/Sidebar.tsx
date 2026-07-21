"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Radio,
  Map,
  Layers,
  BarChart3,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Pulpit Dowodzenia", icon: LayoutDashboard, href: "/" },
  { id: "subjects", label: "Baza Materiałów", icon: BookOpen, href: "/subjects" },
  { id: "schedule", label: "Harmonogram", icon: Calendar, href: "/schedule" },
  { id: "intel", label: "Wywiad / Analiza", icon: Radio, href: "/intel" },
  { id: "map", label: "Mapa Taktyczna", icon: Map, href: "/map" },
  { id: "flashcards", label: "Taktyczne Fiszki", icon: Layers, href: "/flashcards" },
  { id: "stats", label: "Raporty", icon: BarChart3, href: "/stats" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-military-panel border-r border-military-border flex flex-col transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-military-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-military-accent flex items-center justify-center border border-military-green/30 shrink-0">
            <Shield className="w-6 h-6 text-military-green" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-sm font-bold text-military-green tracking-wider">ASW COMMAND</h1>
              <p className="text-[10px] text-military-muted">Akademia Sztuki Wojennej</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded text-xs transition-all duration-200 group",
                isActive
                  ? "bg-military-accent text-military-green border-l-2 border-military-green"
                  : "text-military-muted hover:bg-military-accent/50 hover:text-military-text"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-glow")} />
              {!collapsed && <span className="font-medium truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Operator Status */}
      <div className="p-4 border-t border-military-border">
        <div className="bg-military-accent rounded p-3 border border-military-green/20">
          {!collapsed ? (
            <>
              <div className="text-[10px] text-military-muted mb-1">OPERATOR STATUS</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-military-green animate-pulse" />
                <span className="text-xs text-military-green">ACTIVE DUTY</span>
              </div>
              <div className="mt-2 text-[10px] text-military-muted">Clearance: TOP SECRET</div>
            </>
          ) : (
            <div className="w-2 h-2 rounded-full bg-military-green animate-pulse mx-auto" />
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 border-t border-military-border text-military-muted hover:text-military-text transition-colors flex items-center justify-center"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
