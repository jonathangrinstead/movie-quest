import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLevel, getXPProgress } from "@/lib/gamification";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const watchedFilms = await prisma.watchedFilm.findMany({
    where: { userId: session.user.id },
    include: { film: true },
    orderBy: { watchedAt: "desc" },
  });

  const totalXP = watchedFilms.reduce((sum, wf) => sum + wf.xpEarned, 0);
  const level = getLevel(totalXP);
  const progress = getXPProgress(totalXP);
  const badges = await prisma.userBadge.findMany({
    where: { userId: session.user.id },
    include: { badge: true },
    orderBy: { earnedAt: "desc" },
  });

  return NextResponse.json({
    totalXP,
    level,
    progress,
    totalWatched: watchedFilms.length,
    watchedFilms: watchedFilms.slice(0, 5),
    badges,
  });
}
