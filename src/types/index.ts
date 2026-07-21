export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  created_at?: string;
}

export interface Material {
  id: string;
  subject_id: string;
  title: string;
  file_url: string;
  file_type: string;
  file_size: number;
  tags?: string[];
  created_at: string;
  subjects?: { name: string };
}

export interface Flashcard {
  id: string;
  subject_id: string;
  question: string;
  answer: string;
  difficulty: number;
  interval: number;
  repetitions: number;
  ease_factor: number;
  next_review: string;
  last_reviewed?: string;
  created_at: string;
}

export interface StudySession {
  id: string;
  subject_id: string;
  duration: number;
  notes?: string;
  date: string;
}

export interface Mission {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  subject_id?: string;
  created_at: string;
}

export interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}
