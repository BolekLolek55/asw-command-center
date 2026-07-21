# ASW Command Center 🎖️

**Centrum Dowodzenia dla studentów Akademii Sztuki Wojennej**

Interaktywna platforma do zarządzania materiałami nauki, planowania operacji (egzaminów), analizy wywiadowczej i treningu taktycznego.

## 🚀 Szybki Start (3 kroki)

### Krok 1: Wgraj bazę danych do Supabase

1. Wejdź w [Supabase Dashboard](https://supabase.com/dashboard/project/vjofajtlxuvgrougxzkm)
2. **SQL Editor → New Query**
3. Otwórz plik `supabase/migrations/001_initial_schema.sql` z tego folderu
4. Skopiuj całą zawartość i wklej do edytora SQL
5. Kliknij **Run** — to utworzy wszystkie tabele i dane testowe

### Krok 2: Utwórz Storage Bucket

1. W Supabase Dashboard wejdź w **Storage**
2. Kliknij **New Bucket**
3. Nazwij: `materials`
4. Ustaw **Public** na ON (aby pliki były dostępne)
5. Kliknij **Create bucket**

### Krok 3: Zainstaluj i uruchom lokalnie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy na Netlify

### Opcja A — One-Click Deploy (zalecane)

1. Wypchnij kod na GitHub
2. W Netlify: **Add new site → Import from GitHub**
3. Wybierz repozytorium
4. Ustaw zmienne środowiskowe w Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://vjofajtlxuvgrougxzkm.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqb2ZhanRseHV2Z3JvdWd4emttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTM0OTUsImV4cCI6MjA5NjQyOTQ5NX0.IyRmrOt_Tl60Zaei6El9OloLsM0oZbekE3JtBGR6dvM`
5. Kliknij **Deploy**

### Opcja B — Manualny deploy

```bash
npm run build
# Wgraj folder `out/` przez drag&drop w Netlify Dashboard
```

---

## 📁 Struktura Projektu

```
asw-command-center/
├── src/
│   ├── app/              # Next.js App Router (strony)
│   │   ├── page.tsx      # Dashboard (Pulpit Dowodzenia)
│   │   ├── subjects/     # Baza materiałów
│   │   ├── schedule/     # Harmonogram operacji
│   │   ├── intel/        # Wywiad / Analiza
│   │   ├── map/          # Mapa taktyczna
│   │   ├── flashcards/   # Fiszki SRS
│   │   └── stats/        # Raporty zdolności
│   ├── components/
│   │   ├── ui/           # Komponenty UI (Card, Badge, ProgressBar)
│   │   ├── dashboard/    # ActivityFeed, PriorityTasks
│   │   ├── Sidebar.tsx   # Boczny panel nawigacji
│   │   └── TickerBar.tsx # Ticker giełdowy
│   ├── lib/
│   │   ├── supabase.ts   # Klient Supabase + helper functions
│   │   └── utils.ts      # Utility functions
│   └── types/
│       ├── index.ts      # Typy aplikacji
│       └── database.ts   # Typy Supabase (auto-generowane)
├── supabase/
│   └── migrations/       # Schemat bazy danych SQL
└── public/               # Statyczne pliki
```

---

## 🎯 Funkcjonalności

### ✅ Zaimplementowane
- [x] Dashboard z statystykami i aktywnościami
- [x] Ticker giełdowy (złoto, BTC, S&P 500, NASDAQ, WTI, EUR/PLN)
- [x] Baza materiałów per przedmiot z postępem
- [x] Harmonogram tygodniowy (widok taktyczny)
- [x] Panel wywiadowczy z alertami i źródłami
- [x] Interaktywna mapa taktyczna z markerami
- [x] System fiszek z algorytmem SRS
- [x] Raporty postępów, wykresy i heatmapa
- [x] Motyw wojskowy (scanline, grid, glowing elements)

### 🚧 W trakcie / Do zrobienia
- [ ] Upload plików do Supabase Storage
- [ ] Autentykacja użytkowników (Supabase Auth)
- [ ] Timer Pomodoro (Tryb "Operacja")
- [ ] AI Asystent (OpenAI API + RAG)
- [ ] PWA (offline mode)
- [ ] Powiadomienia push
- [ ] Prawdziwe dane giełdowe (API)

---

## 🎖️ Motyw Wojskowy

- **Kolorystyka**: Ciemna zieleń wojskowa (#0a0f0d, #0d1a14, #1a3c2e)
- **Akcenty**: Taktyczna zieleń (#4ade80), alert czerwony (#ef4444), ostrzeżenie żółte (#fbbf24)
- **Typografia**: JetBrains Mono (monospace, jak w terminalu)
- **Efekty**: Scanline overlay, grid background, glowing elements
- **Język**: Polski z terminologią wojskową

---

## 📊 Baza Danych (Supabase)

### Tabele
| Tabela | Opis |
|--------|------|
| `subjects` | Przedmioty (Taktyka, Prawo, Historia...) |
| `materials` | Materiały (PDF, VIDEO, DOC...) |
| `flashcards` | Fiszki z algorytmem SRS |
| `study_sessions` | Sesje nauki |
| `missions` | Zadania / Egzaminy |
| `intel_sources` | Źródła wywiadowcze |
| `activities` | Log aktywności |

---

## 📝 Licencja

Prywatny projekt edukacyjny dla studentów ASW.

---

**Autor**: Student ASW  
**Wersja**: 1.0.0  
**Status**: 🟢 OPERATIONAL
