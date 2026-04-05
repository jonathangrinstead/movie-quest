# Movie Quest

A Next.js web app that gamifies watching famous and Oscar-winning movies. Users earn XP, unlock badges, and track their film-watching journey.

## Beatles Team

This project is built by a team of AI agents (the Beatles), managed via `~/.openclaw/canvas/main/beatles_state.json`.

- **John** — Frontend (Next.js pages, components, Tailwind styling)
- **Paul** — Backend (Prisma schema, API routes, TMDB/JustWatch integration, auth)
- **George** — Research (film catalogue, gamification system, design tokens)
- **Ringo** — Testing (Vitest, component tests, accessibility QA)

## Specs

All specs are in `~/.openclaw/canvas/paul_specs/`:
- `spec_001_movie_quest_project.md` — Project overview
- `spec_002_john_frontend_tasks.md` — John's frontend tasks
- `spec_003_paul_backend_tasks.md` — Paul's backend tasks
- `spec_004_george_research_tasks.md` — George's research tasks
- `spec_005_ringo_testing_tasks.md` — Ringo's testing tasks

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- TMDB API (movie data)
- JustWatch (streaming links)
- NextAuth (authentication)
- Vitest (testing)

## Setup

```bash
cd ~/.openclaw/workspace/projects/movie-quest

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add TMDB_API_KEY to .env.local

# Initialize database
npx prisma generate
npx prisma db push

# Seed film data
npx prisma db seed

# Run dev server
npm run dev
```

## Design System

- Dark theme: #0a0a0a background, #1a1a1a cards
- Gold accent: #F5C518 (IMDB gold)
- Text: #fafafa primary, #a0a0a0 secondary
- Borders: 1px #2a2a2a, no shadows/gradients/blur
- Fonts: Inter (Google Fonts)
