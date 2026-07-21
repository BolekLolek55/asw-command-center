"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ScheduleEvent {
  day: number;
  hour: number;
  duration: number;
  title: string;
  room: string;
  color: string;
  type: string;
}

const days = ["PON", "WT", "ŚR", "CZW", "PT", "SOB", "ND"];
const hours = Array.from({ length: 14 }, (_, i) => i + 7);

const events: ScheduleEvent[] = [
  { day: 0, hour: 9, duration: 2, title: "Taktyka Obronna", color: "#4ade80", room: "Sala A-12", type: "Wykład" },
  { day: 1, hour: 11, duration: 2, title: "Prawo Międzynarodowe", color: "#fbbf24", room: "Sala B-04", type: "Wykład" },
  { day: 2, hour: 14, duration: 3, title: "Historia Wojskowości", color: "#60a5fa", room: "Sala C-08", type: "Ćwiczenia" },
  { day: 3, hour: 10, duration: 2, title: "Logistyka", color: "#f87171", room: "Sala A-05", type: "Wykład" },
  { day: 4, hour: 13, duration: 2, title: "Systemy Zbrojeniowe", color: "#fb923c", room: "Lab D-01", type: "Lab" },
  { day: 0, hour: 14, duration: 2, title: "Wywiad", color: "#a78bfa", room: "Sala E-03", type: "Seminarium" },
  { day: 2, hour: 9, duration: 2, title: "Cyberbezpieczeństwo", color: "#22d3ee", room: "Lab F-12", type: "Lab" },
  { day: 4, hour: 9, duration: 2, title: "Obrona Terytorialna", color: "#34d399", room: "Sala G-01", type: "Wykład" },
];

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(29);

  const getEventForCell = (dayIndex: number, hour: number) => {
    return events.find((e) => e.day === dayIndex && e.hour === hour);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide">HARMONOGRAM OPERACJI</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentWeek((w) => w - 1)}
            className="p-1.5 rounded hover:bg-military-accent text-military-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-military-text font-medium">
            Tydzień {currentWeek} (14-20 Lipca 2026)
          </span>
          <button
            onClick={() => setCurrentWeek((w) => w + 1)}
            className="p-1.5 rounded hover:bg-military-accent text-military-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-4 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-8 gap-1 mb-1">
            <div className="text-[10px] text-military-muted text-center py-2 font-bold">CZAS</div>
            {days.map((day) => (
              <div key={day} className="text-[10px] text-military-muted text-center py-2 font-bold">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1">
              <div className="text-[10px] text-military-muted text-center py-3 border-t border-military-border/30">
                {hour}:00
              </div>
              {days.map((_, dayIndex) => {
                const event = getEventForCell(dayIndex, hour);
                if (event) {
                  return (
                    <motion.div
                      key={`${dayIndex}-${hour}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded p-2 text-[10px] cursor-pointer hover:scale-[1.02] transition-transform"
                      style={{
                        backgroundColor: `${event.color}10`,
                        border: `1px solid ${event.color}30`,
                        color: event.color,
                        gridRow: `span ${event.duration}`,
                      }}
                    >
                      <div className="font-bold truncate">{event.title}</div>
                      <div className="flex items-center gap-1 mt-1 opacity-70">
                        <MapPin className="w-2 h-2" />
                        {event.room}
                      </div>
                      <Badge
                        variant="default"
                        className="mt-1 text-[8px]"
                        style={{ borderColor: `${event.color}30`, color: event.color }}
                      >
                        {event.type}
                      </Badge>
                    </motion.div>
                  );
                }
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className="border-t border-military-border/30 hover:bg-military-accent/10 transition-colors min-h-[40px]"
                  />
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-[10px] text-military-muted">LEGENDA:</span>
        {[
          { label: "Wykład", color: "#4ade80" },
          { label: "Ćwiczenia", color: "#60a5fa" },
          { label: "Laboratorium", color: "#fb923c" },
          { label: "Seminarium", color: "#a78bfa" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-military-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
