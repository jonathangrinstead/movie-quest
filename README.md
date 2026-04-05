# Movie Quest

> Level up your film taste

Movie Quest is a gamified movie tracking web app. Track the movies you watch, earn XP, unlock badges, and climb the ranks from Movie Rookie to Cinema Legend.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark theme)
- **Prisma** + SQLite
- **NextAuth** (Google OAuth)
- **TMDB API** integration ready

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Create `.env.local` (or edit `.env`):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
TMDB_API_KEY="your-tmdb-api-key"
```

### 3. Set up database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    api/                  # API routes
      auth/[...nextauth]/ # NextAuth handler
      films/              # Films API
      watch/              # Mark watched API
      watchlist/          # Watchlist API
      dashboard/         # Dashboard stats API
    movies/              # Movies browse page
      [id]/              # Movie detail page
    dashboard/           # User dashboard
    watchlist/           # User watchlist
  components/            # React components
  lib/                   # Utilities
    auth.ts              # NextAuth config
    prisma.ts            # Prisma client
    gamification.ts      # XP/level calculations
    data.ts              # Film data + badges
  generated/prisma/     # Prisma generated client
```

## Features

- Browse 20 curated famous films
- Filter by genre or Oscar winners
- Mark films as watched to earn XP
- Add films to watchlist for later
- Earn badges based on achievements
- Level up as you watch more films
- Dashboard with XP progress and stats

## Gamification

| Action | XP |
|--------|-----|
| Watch a film | 100 XP |
| Watch an Oscar winner | +50 XP bonus |

### Levels

| Level | Title |
|-------|-------|
| 1 | Movie Rookie |
| 2 | Movie Fan |
| 3 | Film Enthusiast |
| 5 | Movie Buff |
| 7 | Film Connoisseur |
| 10+ | Cinema Legend |

## Design

Dark cinema aesthetic inspired by Letterboxd:
- Background: `#0a0a0a`
- Cards: `#1a1a1a`
- Gold accent: `#F5C518` (IMDB gold)
- Carbon-style borders, no gradients or shadows

## License

MIT
