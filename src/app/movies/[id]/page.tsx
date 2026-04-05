import Link from "next/link";
import { notFound } from "next/navigation";
import { Film, Clock, Star, Award, Calendar, User, CheckCircle, Plus, ExternalLink } from "lucide-react";
import { FILMS, STREAMING_PLATFORMS } from "@/lib/data";
import { calculateXP } from "@/lib/gamification";
import WatchButton from "@/components/watch-button";
import WatchlistButton from "@/components/watchlist-button";

export default async function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const film = FILMS.find((f) => f.id === id);
  if (!film) notFound();

  const xp = calculateXP(film);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link href="/movies" className="inline-flex items-center gap-2 text-textSecondary hover:text-white text-sm mb-6 transition-colors">
        ← Back to Movies
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border">
            {film.posterUrl ? (
              <img src={film.posterUrl} alt={film.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-card flex items-center justify-center">
                <Film size={64} className="text-textMuted" />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {film.isOscarWinner && (
                <span className="inline-flex items-center gap-1 text-gold text-sm">
                  <Award size={16} /> Oscar Winner
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{film.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-textSecondary text-sm">
              <span className="flex items-center gap-1"><Calendar size={14} /> {film.year}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {film.runtime} min</span>
              <span className="flex items-center gap-1 text-gold"><Star size={14} fill="currentColor" /> {film.tmdbRating} TMDB</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4">
            {film.director && (
              <div className="flex items-center gap-2 text-sm">
                <User size={14} className="text-textMuted" />
                <span className="text-textSecondary">Directed by </span>
                <span className="text-white">{film.director}</span>
              </div>
            )}
            <span className="px-3 py-1 bg-card border border-border rounded-full text-xs text-textSecondary">{film.genre}</span>
            <span className="px-3 py-1 bg-card border border-border rounded-full text-xs text-textSecondary">{film.decade}</span>
          </div>

          {/* Synopsis */}
          {film.overview && (
            <div>
              <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wide mb-2">Synopsis</h3>
              <p className="text-white/90 leading-relaxed">{film.overview}</p>
            </div>
          )}

          {/* XP Info */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-textSecondary mb-1">Watch to earn</div>
                <div className="text-2xl font-bold text-gold">+{xp} XP</div>
              </div>
              {film.isOscarWinner && (
                <div className="text-right">
                  <div className="text-xs text-textMuted mb-1">Oscar Bonus</div>
                  <div className="text-lg font-bold text-gold">+50 XP</div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <WatchButton filmId={film.id} />
            <WatchlistButton filmId={film.id} />
          </div>

          {/* Streaming */}
          <div>
            <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wide mb-3">Where to Watch</h3>
            <div className="flex flex-wrap gap-3">
              {STREAMING_PLATFORMS.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-gold transition-colors"
                >
                  <img src={platform.logo} alt={platform.name} className="h-5 w-auto brightness-0 invert" />
                  <span className="text-xs text-textSecondary">{platform.name}</span>
                  <ExternalLink size={12} className="text-textMuted" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
