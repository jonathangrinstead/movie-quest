import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateXP } from "@/lib/gamification";
import { FILMS } from "@/lib/data";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filmId } = await request.json();
  const film = FILMS.find((f) => f.id === filmId);
  if (!film) {
    return NextResponse.json({ error: "Film not found" }, { status: 404 });
  }

  const xpEarned = calculateXP(film);

  // Upsert film in DB
  let dbFilm = await prisma.film.findUnique({ where: { tmdbId: film.tmdbId } });
  if (!dbFilm) {
    dbFilm = await prisma.film.create({
      data: {
        tmdbId: film.tmdbId,
        title: film.title,
        year: film.year,
        posterUrl: film.posterUrl,
        backdropUrl: film.backdropUrl,
        overview: film.overview,
        runtime: film.runtime,
        director: film.director,
        tmdbRating: film.tmdbRating,
        isOscarWinner: film.isOscarWinner,
        genre: film.genre,
        decade: film.decade,
      },
    });
  }

  // Upsert watched film
  await prisma.watchedFilm.upsert({
    where: { userId_filmId: { userId: session.user.id, filmId: dbFilm.id } },
    update: {},
    create: { userId: session.user.id, filmId: dbFilm.id, xpEarned },
  });

  return NextResponse.json({ success: true, xpEarned });
}
