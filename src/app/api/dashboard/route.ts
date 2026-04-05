import { NextRequest, NextResponse } from "next/server";
import { getLevel, getXPProgress } from "@/lib/gamification";

// Mock data for demo - no auth required
const MOCK_RESPONSE = {
  totalXP: 2450,
  level: 3,
  progress: { current: 450, needed: 1000, percent: 45 },
  totalWatched: 24,
  watchedFilms: [
    {
      film: {
        id: "the-godfather",
        title: "The Godfather",
        year: 1972,
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      },
      watchedAt: "2026-04-03",
      xpEarned: 150,
    },
  ],
  badges: [
    { badge: { slug: "first-film", name: "First Steps" }, earnedAt: "2026-03-01" },
    { badge: { slug: "ten-films", name: "Getting Started" }, earnedAt: "2026-03-15" },
    { badge: { slug: "oscar-collector", name: "Oscar Collector" }, earnedAt: "2026-03-28" },
  ],
};

export async function GET(request: NextRequest) {
  // No auth check - return mock data
  return NextResponse.json(MOCK_RESPONSE);
}