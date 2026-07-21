"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, BookOpen, Target, Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { getSubjectColor } from "@/lib/utils";

const subjects = [
  { id: "taktyka", name: "Taktyka", progress: 65, hours: 32 },
  { id: "historia", name: "Historia", progress: 40, hours: 18 },
  { id: "prawo", name: "Prawo", progress: 80, hours: 28 },
  { id: "logistyka", name: "Logistyka", progress: 25, hours: 12 },
  { id: "wywiad", name: "Wywiad", progress: 55, hours: 22 },
  { id: "bron", name: "Systemy Zbr.", progress: 70, hours: 20 },
  { id: "cyber", name: "Cyber", progress: 30, hours: 10 },
];

const weeklyHours = [
  { day: "Pon", hours: 3.5 },
  { day: "Wt", hours: 5.2 },
  { day: "Śr", hours: 4.0 },
  { day: "Czw", hours: 6.5 },
  { day: "Pt", hours: 2.8 },
  { day: "Sob", hours: 7.0 },
  { day: "Nd", hours: 1.5 },
];

const achievements = [
  { name: "Nocny Marek", desc: "10h nauki nocą", icon: "🌙", unlocked: true },
  { name: "Maraton", desc: "5h bez przerwy", icon: "🏃", unlocked: true },
  { name: "Ekspert", desc: "100 fiszek opanowanych", icon: "🧠", unlocked: false },
  { name: "Strateg", desc: "Ukończono Taktykę", icon: "⚔️", unlocked: false },
];

export default function StatsPage() {
  const totalHours = weeklyHours.reduce((sum, d) => sum + d.hours, 0);
  const avgHours = (totalHours / 7).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-lg font-bold tracking-wide">RAPORTY ZDOLNOŚCI</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Godzin", value: "142h", icon: Clock, color: "text-military-green" },
          { label: "Średnia Dziennie", value: `${avgHours}h`, icon: TrendingUp, color: "text-military-blue" },
          { label: "Materiały", value: "73", icon: BookOpen, color: "text-military-yellow" },
          { label: "Seria", value: "7 dni", icon: Flame, color: "text-military-red" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 text-center">
            <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-[10px] text-military-muted">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Progress Chart */}
        <Card className="p-4">
          <h3 className="text-sm font-bold tracking-wider mb-4">POSTĘP PRZEDMIOTÓW</h3>
          <div className="h-64 flex items-end justify-around gap-2 px-4">
            {subjects.map((subject) => {
              const color = getSubjectColor(subject.id);
              return (
                <div key={subject.id} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-[10px] font-bold" style={{ color }}>
                    {subject.progress}%
                  </span>
                  <div className="w-full bg-military-accent rounded-t relative overflow-hidden" style={{ height: `${subject.progress * 2}px` }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 rounded-t"
                      style={{ backgroundColor: color, opacity: 0.3 }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t"
                      style={{ backgroundColor: color, height: `${subject.progress}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-military-muted text-center truncate w-full">
                    {subject.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Weekly Hours */}
        <Card className="p-4">
          <h3 className="text-sm font-bold tracking-wider mb-4">TYGODNIOWY CZAS NAUKI</h3>
          <div className="space-y-3">
            {weeklyHours.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <span className="text-[10px] text-military-muted w-8">{day.day}</span>
                <div className="flex-1 bg-military-accent rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(day.hours / 8) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-military-green h-2 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-military-text w-10 text-right">{day.hours}h</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-military-border">
            <div className="flex justify-between text-xs">
              <span className="text-military-muted">Suma tygodniowa:</span>
              <span className="text-military-green font-bold">{totalHours}h</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-4">
        <h3 className="text-sm font-bold tracking-wider mb-4">ODZNAKI I OSIĄGNIĘCIA</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.name}
              className={`p-3 rounded border text-center transition-all ${
                ach.unlocked
                  ? "border-military-green/30 bg-military-green/5 hover:scale-105 cursor-pointer"
                  : "border-military-border bg-military-panel opacity-50"
              }`}
            >
              <div className="text-2xl mb-1">{ach.icon}</div>
              <div className="text-xs font-bold text-military-text">{ach.name}</div>
              <div className="text-[10px] text-military-muted">{ach.desc}</div>
              {ach.unlocked && (
                <Badge variant="success" className="mt-2 text-[8px]">UNLOCKED</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Heatmap */}
      <Card className="p-4">
        <h3 className="text-sm font-bold tracking-wider mb-4">AKTYWNOŚĆ (OSTATNIE 30 DNI)</h3>
        <div className="grid grid-cols-15 gap-1">
          {Array.from({ length: 30 }, (_, i) => {
            const intensity = Math.random();
            return (
              <div
                key={i}
                className="w-4 h-4 rounded-sm transition-all hover:scale-125 cursor-pointer"
                style={{
                  backgroundColor:
                    intensity > 0.7
                      ? "#4ade80"
                      : intensity > 0.4
                      ? "#2d5a3f"
                      : intensity > 0.1
                      ? "#1a3c2e"
                      : "#0d1a14",
                }}
                title={`Dzień ${i + 1}: ${Math.floor(intensity * 10)}h`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-military-muted">Mniej</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#0d1a14]" />
            <div className="w-3 h-3 rounded-sm bg-[#1a3c2e]" />
            <div className="w-3 h-3 rounded-sm bg-[#2d5a3f]" />
            <div className="w-3 h-3 rounded-sm bg-[#4ade80]" />
          </div>
          <span className="text-[10px] text-military-muted">Więcej</span>
        </div>
      </Card>
    </motion.div>
  );
}
