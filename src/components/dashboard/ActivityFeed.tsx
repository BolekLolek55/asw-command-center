"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Plus, CheckCircle, Upload } from "lucide-react";

interface Activity {
  time: string;
  action: string;
  type: "view" | "add" | "complete" | "upload";
  subject: string;
}

const activities: Activity[] = [
  { time: "09:32", action: 'Przeglądano: "Taktyka obronna NATO"', type: "view", subject: "Taktyka" },
  { time: "09:15", action: 'Dodano notatkę: "Analiza konfliktu"', type: "add", subject: "Historia" },
  { time: "08:45", action: "Ukończono fiszki: 24/50", type: "complete", subject: "Prawo" },
  { time: "Wczoraj", action: 'Przesłano plik: "Mapa_terr_2024.pdf"', type: "upload", subject: "Terytorium" },
  { time: "Wczoraj", action: "Przeglądano: "Systemy obrony powietrznej"", type: "view", subject: "Bron" },
  { time: "2 dni temu", action: "Ukończono sesję nauki: 2.5h", type: "complete", subject: "Cyber" },
];

const typeConfig = {
  view: { color: "bg-military-blue", icon: Eye },
  add: { color: "bg-military-green", icon: Plus },
  complete: { color: "bg-military-yellow", icon: CheckCircle },
  upload: { color: "bg-purple-400", icon: Upload },
};

export function ActivityFeed() {
  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const config = typeConfig[activity.type];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-2 rounded hover:bg-military-accent/30 transition-colors cursor-pointer group"
          >
            <div className={`w-1 self-stretch rounded-full ${config.color} opacity-60`} />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-military-text group-hover:text-military-green transition-colors truncate">
                {activity.action}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-military-muted">{activity.time}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-military-accent text-military-muted border border-military-green/20">
                  {activity.subject}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
