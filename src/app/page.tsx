"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, TrendingUp, AlertTriangle, FileText, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PriorityTasks } from "@/components/dashboard/PriorityTasks";

const stats = [
  {
    title: "TOTAL MATERIAŁÓW",
    value: "73",
    subtext: "+12 w tym tygodniu",
    icon: BookOpen,
    color: "text-military-green",
    bgColor: "bg-military-green/10",
    borderColor: "border-military-green/30",
  },
  {
    title: "GODZINY NAUKI",
    value: "142h",
    subtext: "Cel: 200h / semestr",
    icon: Clock,
    color: "text-military-blue",
    bgColor: "bg-military-blue/10",
    borderColor: "border-military-blue/30",
  },
  {
    title: "POSTĘP OGÓLNY",
    value: "57%",
    subtext: "Semestr w toku",
    icon: TrendingUp,
    color: "text-military-yellow",
    bgColor: "bg-military-yellow/10",
    borderColor: "border-military-yellow/30",
    showProgress: true,
    progressValue: 57,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold tracking-wide">PULPIT DOWODZENIA</h1>
          <span className="px-2 py-0.5 text-[10px] bg-military-accent text-military-green border border-military-green/30 rounded animate-pulse">
            LIVE
          </span>
        </div>
        <div className="text-xs text-military-muted">
          <span className="text-military-green">●</span> SYSTEM OPERATIONAL
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="p-4 hover:border-military-green/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-military-muted tracking-widest">{stat.title}</span>
                <div className={`w-8 h-8 rounded flex items-center justify-center ${stat.bgColor} border ${stat.borderColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-[10px] mt-1 ${stat.color}`}>{stat.subtext}</div>
              {stat.showProgress && (
                <ProgressBar value={stat.progressValue!} className="mt-3" color="bg-military-yellow" />
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold tracking-wider">OSTATNIE AKTYWNOŚCI</h3>
              <span className="text-[10px] text-military-muted">LIVE FEED</span>
            </div>
            <ActivityFeed />
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold tracking-wider">PRIORYTETOWE ZADANIA</h3>
              <AlertTriangle className="w-4 h-4 text-military-yellow" />
            </div>
            <PriorityTasks />
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Nowy Materiał", icon: FileText, href: "/subjects" },
          { label: "Fiszki", icon: Target, href: "/flashcards" },
          { label: "Szybka Notatka", icon: FileText, href: "#" },
          { label: "Timer Nauki", icon: Clock, href: "#" },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="military-panel p-3 rounded hover:border-military-green/30 transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded bg-military-accent flex items-center justify-center group-hover:bg-military-green/20 transition-colors">
              <action.icon className="w-4 h-4 text-military-green" />
            </div>
            <span className="text-xs text-military-text group-hover:text-military-green transition-colors">
              {action.label}
            </span>
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
