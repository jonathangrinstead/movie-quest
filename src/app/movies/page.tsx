"use client";

import { useState } from "react";
import Link from "next/link";
import { Film, Award, Star } from "lucide-react";
import { FILMS } from "@/lib/data";

const FILTERS = ["All", "Oscar Winners", "Action", "Drama", "Sci-Fi", "Thriller"];

export default function MoviesPage() {
  const [filter, setFilter] = useState("All");

  const filteredFilms = FILMS.filter((film) => {
    if (filter === "All") return true;
    if (filter === "Oscar Winners") return film.isOscarWinner;
    return film.genre === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Browse Movies</h1>
        <p className="text-textSecondary">Discover must-watch films and track your viewing journey</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-gold text-background" : "bg-card text-textSecondary hover:text-white border border-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredFilms.map((film) => (
          <Link key={film.id} href={`/movies/${film.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border group-hover:border-gold transition-colors bg-card">
              {film.posterUrl ? (
                <img src={film.posterUrl} alt={film.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Film size={32} className="text-textMuted" />
                </div>
              )}
              {film.isOscarWinner && (
                <div className="absolute top-2 right-2">
                  <Award size={16} className="text-gold drop-shadow-lg" />
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80">{film.year}</span>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-medium">{film.tmdbRating}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-sm font-medium text-white truncate group-hover:text-gold transition-colors">{film.title}</div>
              <div className="text-xs text-textMuted">{film.genre} · {film.runtime}min</div>
            </div>
          </Link>
        ))}
      </div>

      {filteredFilms.length === 0 && (
        <div className="text-center py-16 text-textMuted">
          <Film size={48} className="mx-auto mb-4 opacity-50" />
          <p>No films found for this filter</p>
        </div>
      )}
    </div>
  );
}
