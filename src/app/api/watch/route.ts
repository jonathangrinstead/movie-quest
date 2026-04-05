import { NextRequest, NextResponse } from "next/server";
import { FILMS } from "@/lib/data";
import { calculateXP } from "@/lib/gamification";

// Demo user ID - no auth required
const DEMO_USER_ID = "demo-user-001";

export async function POST(request: NextRequest) {
  const { filmId } = await request.json();
  const film = FILMS.find((f) => f.id === filmId);
  if (!film) {
    return NextResponse.json({ error: "Film not found" }, { status: 404 });
  }

  const xpEarned = calculateXP(film);

  // In demo mode, we just return success without persisting
  // In a real app, this would save to the database
  return NextResponse.json({ 
    success: true, 
    xpEarned,
    userId: DEMO_USER_ID,
    message: "Demo mode - film marked as watched" 
  });
}