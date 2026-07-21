"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight, Brain, Target, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  subject: string;
  difficulty: number;
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "Jakie są 5 zasad wojny według Clausewitza?",
    answer: "1. Cel wojny - narzucenie woli przeciwnikowi\n2. Maksymalne użycie siły\n3. Decydujące rozstrzygnięcie\n4. Ograniczone środki\n5. Niepewność i tarcie",
    subject: "Taktyka",
    difficulty: 3,
  },
  {
    id: 2,
    question: "Co to jest OODA Loop?",
    answer: "Observe, Orient, Decide, Act - cykl decyzyjny opracowany przez Johna Boyda. Szybkość przejścia przez pętlę decyduje o przewadze taktycznej.",
    subject: "Taktyka",
    difficulty: 2,
  },
  {
    id: 3,
    question: "Jakie są 4 konwencje genewskie?",
    answer: "I - Pole walki (1864)\nII - Marynarka wojenna (1906)\nIII - Jeńcy wojenni (1929/1949)\nIV - Ochrona cywilów (1949)",
    subject: "Prawo",
    difficulty: 4,
  },
  {
    id: 4,
    question: "Co oznacza skrót C4ISR?",
    answer: "Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance - system dowodzenia i zarządzania informacją w NATO.",
    subject: "Cyber",
    difficulty: 3,
  },
  {
    id: 5,
    question: "Jakie są 3 poziomy wojny według doktryny NATO?",
    answer: "Strategiczny, operacyjny, taktyczny. Każdy poziom wymaga innych zasobów i podejścia do planowania.",
    subject: "Taktyka",
    difficulty: 2,
  },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ reviewed: 24, total: 50, streak: 7 });

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  const handleDifficulty = (level: "hard" | "medium" | "easy") => {
    toast.success(`Oznaczono jako: ${level}`, { icon: level === "easy" ? "✅" : level === "medium" ? "⚠️" : "❌" });
    handleNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide">TAKTYCZNE FISZKI</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-military-green" />
            <span className="text-xs text-military-muted">
              Dzisiaj: {stats.reviewed}/{stats.total}
            </span>
          </div>
          <div className="w-32">
            <ProgressBar value={(stats.reviewed / stats.total) * 100} />
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-center gap-2 text-military-yellow">
        <Zap className="w-4 h-4" />
        <span className="text-xs font-bold">SERIA: {stats.streak} DNI</span>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: isFlipped ? 180 : 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.4 }}
            className="relative h-80 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <Card
              className="absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-[10px] text-military-muted tracking-widest mb-4">PYTANIE</div>
              <h3 className="text-lg font-bold text-military-text text-center leading-relaxed">
                {currentCard.question}
              </h3>
              <Badge variant="default" className="mt-4">
                {currentCard.subject}
              </Badge>
              <div className="absolute bottom-4 text-[10px] text-military-muted">
                Kliknij, aby odkryć odpowiedź
              </div>
            </Card>

            {/* Back */}
            <Card
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="text-[10px] text-military-green tracking-widest mb-4">ODPOWIEDŹ</div>
              <p className="text-sm text-military-text text-center leading-relaxed whitespace-pre-line">
                {currentCard.answer}
              </p>
              <Badge variant="success" className="mt-4">
                Poziom trudności: {currentCard.difficulty}/5
              </Badge>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-military-accent border border-military-border text-military-muted hover:text-military-text hover:border-military-green transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDifficulty("hard")}
            className="px-4 py-2 rounded bg-military-red/10 border border-military-red/30 text-military-red text-xs hover:bg-military-red/20 transition-colors flex items-center gap-1"
          >
            <Target className="w-3 h-3" />
            TRUDNE
          </button>
          <button
            onClick={() => handleDifficulty("medium")}
            className="px-4 py-2 rounded bg-military-yellow/10 border border-military-yellow/30 text-military-yellow text-xs hover:bg-military-yellow/20 transition-colors"
          >
            ŚREDNIE
          </button>
          <button
            onClick={() => handleDifficulty("easy")}
            className="px-4 py-2 rounded bg-military-green/10 border border-military-green/30 text-military-green text-xs hover:bg-military-green/20 transition-colors"
          >
            ŁATWE
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-military-accent border border-military-border text-military-muted hover:text-military-text hover:border-military-green transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-1">
        {flashcards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-military-green w-4"
                : index < currentIndex
                ? "bg-military-green/50"
                : "bg-military-accent"
            }`}
          />
        ))}
      </div>

      <div className="text-center text-[10px] text-military-muted">
        Karta {currentIndex + 1} z {flashcards.length}
      </div>
    </motion.div>
  );
}
