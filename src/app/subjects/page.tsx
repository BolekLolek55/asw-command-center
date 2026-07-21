"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Download, Edit3, Map, BookOpen, Scale, Truck, Eye, Shield, Cpu, Globe } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { getSubjectColor } from "@/lib/utils";
import toast from "react-hot-toast";

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  materials: number;
  progress: number;
}

const subjects: Subject[] = [
  { id: "taktyka", name: "Taktyka i Strategia", icon: <Map className="w-5 h-5" />, materials: 12, progress: 65 },
  { id: "historia", name: "Historia Wojskowości", icon: <BookOpen className="w-5 h-5" />, materials: 8, progress: 40 },
  { id: "prawo", name: "Prawo Międzynarodowe", icon: <Scale className="w-5 h-5" />, materials: 15, progress: 80 },
  { id: "logistyka", name: "Logistyka Wojskowa", icon: <Truck className="w-5 h-5" />, materials: 6, progress: 25 },
  { id: "wywiad", name: "Wywiad i Kontrwywiad", icon: <Eye className="w-5 h-5" />, materials: 9, progress: 55 },
  { id: "bron", name: "Systemy Zbrojeniowe", icon: <Shield className="w-5 h-5" />, materials: 11, progress: 70 },
  { id: "cyber", name: "Wojna Cybernetyczna", icon: <Cpu className="w-5 h-5" />, materials: 7, progress: 30 },
  { id: "terytorium", name: "Obrona Terytorialna", icon: <Globe className="w-5 h-5" />, materials: 5, progress: 90 },
];

const recentFiles = [
  { name: "Doktryna_Obronna_2024.pdf", subject: "Taktyka", type: "PDF", date: "2026-07-17", size: "2.4 MB" },
  { name: "Analiza_konfliktu_UA.mp4", subject: "Historia", type: "VIDEO", date: "2026-07-16", size: "156 MB" },
  { name: "Geneva_Convention_notes.docx", subject: "Prawo", type: "DOC", date: "2026-07-15", size: "1.2 MB" },
  { name: "Logistyka_supply_chain.pptx", subject: "Logistyka", type: "PPT", date: "2026-07-14", size: "8.7 MB" },
  { name: "Cyber_warfare_framework.pdf", subject: "Cyber", type: "PDF", date: "2026-07-13", size: "4.1 MB" },
  { name: "NATO_ORBAT_2024.xlsx", subject: "Taktyka", type: "XLS", date: "2026-07-12", size: "1.8 MB" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide">BAZA MATERIAŁÓW</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-military-muted" />
            <input
              type="text"
              placeholder="Szukaj materiałów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="military-input pl-9 w-64"
            />
          </div>
          <button
            onClick={() => toast("Upload modal - do implementacji", { icon: "📁" })}
            className="military-btn-primary flex items-center gap-2"
          >
            <Plus className="w-3 h-3" />
            Dodaj Materiał
          </button>
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSubjects.map((subject) => {
          const color = getSubjectColor(subject.id);
          return (
            <motion.div key={subject.id} variants={itemVariants}>
              <Card
                className="p-4 cursor-pointer group"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors"
                    style={{
                      backgroundColor: `${color}10`,
                      borderColor: `${color}30`,
                      color: color,
                    }}
                  >
                    {subject.icon}
                  </div>
                  <Badge
                    variant="default"
                    className="border"
                    style={{ borderColor: `${color}30`, color }}
                  >
                    {subject.materials} materiałów
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-military-text mb-2 group-hover:text-military-green transition-colors">
                  {subject.name}
                </h3>
                <ProgressBar
                  value={subject.progress}
                  color=""
                  className="mt-2"
                />
                <div
                  className="absolute bottom-0 left-0 h-1 rounded-b-lg transition-all duration-1000"
                  style={{
                    width: `${subject.progress}%`,
                    backgroundColor: color,
                  }}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-military-muted">Postęp</span>
                  <span className="text-[10px] font-bold" style={{ color }}>
                    {subject.progress}%
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Files */}
      <motion.div variants={itemVariants}>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold tracking-wider">OSTATNIO DODANE MATERIAŁY</h3>
            <Badge variant="info">{recentFiles.length} plików</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-military-muted border-b border-military-border">
                  <th className="text-left py-2 px-3">NAZWA</th>
                  <th className="text-left py-2 px-3">PRZEDMIOT</th>
                  <th className="text-left py-2 px-3">TYP</th>
                  <th className="text-left py-2 px-3">DATA</th>
                  <th className="text-left py-2 px-3">ROZMIAR</th>
                  <th className="text-left py-2 px-3">AKCJA</th>
                </tr>
              </thead>
              <tbody className="text-military-text">
                {recentFiles.map((file, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-military-border/50 hover:bg-military-accent/20 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-military-accent flex items-center justify-center text-[10px] font-bold text-military-green">
                          {file.type}
                        </div>
                        <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-military-muted">{file.subject}</td>
                    <td className="py-3 px-3">
                      <Badge variant="default">{file.type}</Badge>
                    </td>
                    <td className="py-3 px-3 text-military-muted">{file.date}</td>
                    <td className="py-3 px-3 text-military-muted">{file.size}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast("Pobieranie...", { icon: "⬇️" })}
                          className="p-1.5 rounded hover:bg-military-accent text-military-muted hover:text-military-green transition-colors"
                          title="Pobierz"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toast("Edycja...", { icon: "✏️" })}
                          className="p-1.5 rounded hover:bg-military-accent text-military-muted hover:text-military-blue transition-colors"
                          title="Edytuj"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
