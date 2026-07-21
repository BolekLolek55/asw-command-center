"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Target } from "lucide-react";
import { cn, getPriorityColor } from "@/lib/utils";

interface Task {
  task: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  icon?: React.ReactNode;
}

const tasks: Task[] = [
  {
    task: "Egzamin: Prawo Międzynarodowe",
    deadline: "3 dni",
    priority: "high",
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  {
    task: "Praca semestralna: Taktyka",
    deadline: "1 tydzień",
    priority: "medium",
    icon: <Clock className="w-3 h-3" />,
  },
  {
    task: "Fiszki: Systemy Zbrojeniowe",
    deadline: "2 tygodnie",
    priority: "low",
    icon: <Target className="w-3 h-3" />,
  },
  {
    task: "Symulacja: Obrona terytorialna",
    deadline: "5 dni",
    priority: "high",
    icon: <AlertTriangle className="w-3 h-3" />,
  },
];

export function PriorityTasks() {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "p-3 rounded border cursor-pointer hover:scale-[1.02] transition-transform",
            getPriorityColor(task.priority)
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {task.icon}
              <span className="text-xs font-medium">{task.task}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] opacity-70">Deadline: {task.deadline}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 uppercase font-bold">
              {task.priority}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
