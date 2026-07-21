"use client";

import { motion } from "framer-motion";
import { Radio, ExternalLink, Clock, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface IntelSource {
  name: string;
  status: "active" | "pending" | "error";
  lastUpdate: string;
  type: string;
  url: string;
}

interface IntelAlert {
  priority: "high" | "medium" | "low";
  title: string;
  content: string;
  time: string;
  source: string;
}

const sources: IntelSource[] = [
  { name: "Jane's Defence Weekly", status: "active", lastUpdate: "2h temu", type: "OSINT", url: "#" },
  { name: "Defense News", status: "active", lastUpdate: "15min temu", type: "NEWS", url: "#" },
  { name: "Wojsko i Technika", status: "active", lastUpdate: "1h temu", type: "PL", url: "#" },
  { name: "Raporty NATO", status: "pending", lastUpdate: "1 dzień", type: "CLASSIFIED", url: "#" },
  { name: "Jane's Military Communications", status: "active", lastUpdate: "45min temu", type: "OSINT", url: "#" },
  { name: "Military.com", status: "active", lastUpdate: "30min temu", type: "NEWS", url: "#" },
];

const alerts: IntelAlert[] = [
  {
    priority: "high",
    title: "Nowa doktryna obronna",
    content: "Opublikowano nową wersję doktryny obronnej - wymaga natychmiastowej analizy przed egzaminem",
    time: "2h temu",
    source: "MON",
  },
  {
    priority: "medium",
    title: "Zmiany w strukturze NATO",
    content: "Aktualizacja struktury dowodzenia NATO - wpływ na materiały z Taktyki",
    time: "5h temu",
    source: "NATO",
  },
  {
    priority: "low",
    title: "Nowe symulacje wojenne",
    content: "Dostępne nowe scenariusze symulacyjne w bazie danych ASW",
    time: "1 dzień temu",
    source: "ASW",
  },
  {
    priority: "high",
    title: "Aktualizacja przepisów",
    content: "Zmiany w konwencji genewskiej - wymaga aktualizacji fiszek",
    time: "3h temu",
    source: "UN",
  },
];

const priorityConfig = {
  high: { border: "border-military-red", bg: "bg-military-red/5", text: "text-military-red", icon: AlertTriangle },
  medium: { border: "border-military-yellow", bg: "bg-military-yellow/5", text: "text-military-yellow", icon: Info },
  low: { border: "border-military-blue", bg: "bg-military-blue/5", text: "text-military-blue", icon: CheckCircle },
};

export default function IntelPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide">WYWIAD / ANALIZA</h1>
        <Badge variant="success" className="animate-pulse">
          <Radio className="w-3 h-3 mr-1" />
          LIVE FEED
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sources */}
        <Card className="p-4">
          <h3 className="text-sm font-bold tracking-wider mb-4">ŹRÓDŁA WYWIADOWCZE</h3>
          <div className="space-y-2">
            {sources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded border border-military-border hover:border-military-green/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      source.status === "active"
                        ? "bg-military-green animate-pulse"
                        : source.status === "pending"
                        ? "bg-military-yellow"
                        : "bg-military-red"
                    }`}
                  />
                  <div>
                    <div className="text-xs text-military-text group-hover:text-military-green transition-colors">
                      {source.name}
                    </div>
                    <div className="text-[10px] text-military-muted flex items-center gap-1">
                      <Clock className="w-2 h-2" />
                      Ostatnia aktualizacja: {source.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{source.type}</Badge>
                  <ExternalLink className="w-3 h-3 text-military-muted group-hover:text-military-green transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-4">
          <h3 className="text-sm font-bold tracking-wider mb-4">ANALIZA SYTUACYJNA</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const config = priorityConfig[alert.priority];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded border-l-2 ${config.border} ${config.bg} hover:scale-[1.01] transition-transform cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <config.icon className={`w-3 h-3 ${config.text}`} />
                      <span className={`text-[10px] font-bold ${config.text}`}>
                        {alert.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <span className="text-[10px] text-military-muted">{alert.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-military-text mb-1">{alert.title}</h4>
                  <p className="text-[10px] text-military-muted leading-relaxed">{alert.content}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="default" className="text-[8px]">
                      Źródło: {alert.source}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
