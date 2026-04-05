# Movie Quest — Specification

## Overview

Movie Quest is a gamified movie tracking web app where users earn XP and badges for watching famous films.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (dark theme)
- **Database:** Prisma + SQLite
- **Auth:** NextAuth v5 (Google OAuth)
- **API:** TMDB API for movie data

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0a0a0a` | Page background |
| `card` | `#1a1a1a` | Cards, panels |
| `cardHover` | `#222222` | Hover state |
| `gold` | `#F5C518` | Primary accent (IMDB gold) |
| `goldDim` | `#c9a316` | Dimmed gold |
| `textPrimary` | `#ffffff` | Main text |
| `textSecondary` | `#a1a1a1` | Secondary text |
| `textMuted` | `#6b6b6b` | Muted text |
| `border` | `#2a2a2a` | Borders |

### Typography

- Font: Inter (system-ui fallback)
- No gradients, shadows, or blur effects
- Clean Carbon-style borders throughout

## Pages

### `/` — Home
- Hero section with "Level up your film taste" headline
- Stats bar (placeholder numbers)
- Featured films grid (6 Oscar-winning films)
- How It Works section

### `/movies` — Browse Films
- Filterable grid of 20 films
- Filter pills: All, Oscar Winners, Action, Drama, Sci-Fi, Thriller
- Cards show: poster, title, year, TMDB rating, genre
- Oscar winner badge overlay

### `/movies/[id]` — Movie Detail
- Large poster + metadata
- Synopsis, director, runtime, TMDB rating
- XP display (+100 base, +50 Oscar bonus)
- "Mark as Watched" button (requires auth)
- "Add to Watchlist" button (requires auth)
- Streaming platform links

### `/dashboard` — User Dashboard (auth required)
- Avatar, username, level badge
- XP progress bar
- Stats: films watched, streak, badges, total XP
- Badge grid (8 badges, earned = gold, locked = gray)
- Recently watched row

### `/watchlist` — Watchlist (auth required)
- Grid of watchlisted films
- Empty state with browse CTA

## Data Models

### Film
```
id, tmdbId, title, year, posterUrl, backdropUrl, overview,
runtime, director, tmdbRating, isOscarWinner, genre, decade
```

### WatchedFilm
```
userId, filmId, watchedAt, xpEarned (unique user+film)
```

### Watchlist
```
userId, filmId, addedAt (unique user+film)
```

### Badge
```
slug, name, description, icon, xpBonus
```

### UserBadge
```
userId, badgeId, earnedAt (unique user+film)
```

## Gamification

- **XP per film:** 100 base + 50 if Oscar winner
- **Level:** `floor(xp / 1000) + 1`
- **Level titles:** Movie Rookie → Movie Fan → Film Enthusiast → Movie Buff → Film Connoisseur → Cinema Legend
- **Badges:** First Steps, Getting Started, Oscar Collector, Week Warrior, Cinema Scholar, Rising Star, Action Hero, Thriller Master

## API Routes

- `GET /api/films` — Returns film array
- `POST /api/watch` — Mark film watched, award XP
- `POST /api/watchlist` — Add film to watchlist
- `GET /api/dashboard` — User stats, watched films, badges

## Environment Variables

```
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=<secret>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<id>
GOOGLE_CLIENT_SECRET=<secret>
TMDB_API_KEY=<key>
```

## TODO

- [ ] Replace hardcoded films with TMDB API calls
- [ ] Real streaming availability from TMDB
- [ ] Streak calculation logic
- [ ] Badge auto-award triggers
- [ ] Leaderboard page
- [ ] Mobile app / PWA
