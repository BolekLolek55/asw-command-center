-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Subjects table
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#4ade80',
  icon TEXT NOT NULL DEFAULT 'shield',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Materials table
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcards table (SRS - Spaced Repetition System)
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty INTEGER NOT NULL DEFAULT 3,
  interval INTEGER NOT NULL DEFAULT 1,
  repetitions INTEGER NOT NULL DEFAULT 0,
  ease_factor DECIMAL(3,2) NOT NULL DEFAULT 2.5,
  next_review TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_reviewed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study sessions table
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  duration INTEGER NOT NULL,
  notes TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Missions/Tasks table
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Intel sources table
CREATE TABLE intel_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'OSINT',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'error')),
  last_fetch TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities log table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'view' CHECK (type IN ('view', 'add', 'complete', 'upload', 'study')),
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  material_id UUID REFERENCES materials(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE intel_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for development - change for production)
CREATE POLICY "Allow all" ON subjects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON materials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON flashcards FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON study_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON missions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON intel_sources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON activities FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_materials_subject ON materials(subject_id);
CREATE INDEX idx_flashcards_subject ON flashcards(subject_id);
CREATE INDEX idx_flashcards_next_review ON flashcards(next_review);
CREATE INDEX idx_study_sessions_date ON study_sessions(date);
CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_activities_created ON activities(created_at);

-- Insert sample data
INSERT INTO subjects (name, color, icon, description) VALUES
  ('Taktyka i Strategia', '#4ade80', 'map', 'Podstawy taktyki i strategii wojskowej'),
  ('Historia Wojskowości', '#60a5fa', 'book', 'Historia konfliktow i bitew'),
  ('Prawo Miedzynarodowe', '#fbbf24', 'scale', 'Prawo konfliktow zbrojnych i humanitarne'),
  ('Logistyka Wojskowa', '#f87171', 'truck', 'Zaopatrzenie i transport wojskowy'),
  ('Wywiad i Kontrwywiad', '#a78bfa', 'eye', 'Operacje wywiadowcze i kontrwywiadowcze'),
  ('Systemy Zbrojeniowe', '#fb923c', 'shield', 'Bron i systemy obronne'),
  ('Wojna Cybernetyczna', '#22d3ee', 'cpu', 'Operacje w cyberprzestrzeni'),
  ('Obrona Terytorialna', '#34d399', 'globe', 'Obrona terytorium panstwa');

-- Insert sample flashcards
INSERT INTO flashcards (subject_id, question, answer, difficulty) VALUES
  ((SELECT id FROM subjects WHERE name = 'Taktyka i Strategia'), 
   'Jakie sa 5 zasad wojny wedlug Clausewitza?',
   '1. Cel wojny - narzucenie woli przeciwnikowi
2. Maksymalne uzycie sily
3. Decydujace rozstrzygniecie
4. Ograniczone srodki
5. Niepewnosc i tarcie',
   3),
  ((SELECT id FROM subjects WHERE name = 'Taktyka i Strategia'),
   'Co to jest OODA Loop?',
   'Observe, Orient, Decide, Act - cykl decyzyjny opracowany przez Johna Boyda.',
   2),
  ((SELECT id FROM subjects WHERE name = 'Prawo Miedzynarodowe'),
   'Jakie sa 4 konwencje genewskie?',
   'I - Pole walki (1864)
II - Marynarka wojenna (1906)
III - Jency wojenni (1929/1949)
IV - Ochrona cywilow (1949)',
   4);

-- Insert sample missions
INSERT INTO missions (title, description, deadline, priority, status, subject_id) VALUES
  ('Egzamin: Prawo Miedzynarodowe', 'Przygotowanie do egzaminu z prawa konfliktow zbrojnych', NOW() + INTERVAL '3 days', 'high', 'pending', (SELECT id FROM subjects WHERE name = 'Prawo Miedzynarodowe')),
  ('Praca semestralna: Taktyka', 'Analiza taktyki obronnej NATO', NOW() + INTERVAL '7 days', 'medium', 'in_progress', (SELECT id FROM subjects WHERE name = 'Taktyka i Strategia')),
  ('Fiszki: Systemy Zbrojeniowe', 'Przerobienie 50 fiszek przed kolokwium', NOW() + INTERVAL '14 days', 'low', 'pending', (SELECT id FROM subjects WHERE name = 'Systemy Zbrojeniowe'));

-- Insert sample intel sources (bez apostrofow w nazwach)
INSERT INTO intel_sources (name, url, type, status) VALUES
  ('Janes Defence Weekly', 'https://www.janes.com', 'OSINT', 'active'),
  ('Defense News', 'https://www.defensenews.com', 'NEWS', 'active'),
  ('Wojsko i Technika', 'https://www.wojskoitechnika.pl', 'PL', 'active'),
  ('Raporty NATO', 'https://www.nato.int', 'CLASSIFIED', 'pending');
