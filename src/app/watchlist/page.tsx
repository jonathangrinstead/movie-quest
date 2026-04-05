import Link from "next/link";
import { Film } from "lucide-react";

// Mock watchlist data for demo
const MOCK_WATCHLIST = [
  {
    id: "inception",
    title: "Inception",
    year: 2010,
    posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    addedAt: "2026-04-02",
  },
  {
    id: "the-shawshank-redemption",
    title: "The Shawshank Redemption",
    year: 1994,
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryQ3awq2NdC9.jpg",
    addedAt: "2026-03-30",
  },
  {
    id: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    year: 2015,
    posterUrl: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    addedAt: "2026-03-28",
  },
];

export default async function WatchlistPage() {
  const watchlist = MOCK_WATCHLIST;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
      <p className="text-textSecondary mb-8">{watchlist.length} films waiting to be watched</p>

      {watchlist.length === 0 ? (
        <div className="text-center py-16 text-textMuted">
          <Film size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-4">Your watchlist is empty</p>
          <Link href="/movies" className="text-gold hover:text-goldDim transition-colors">
            Browse Movies →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((film) => (
            <Link key={film.id} href={`/movies/${film.id}`} className="group">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border group-hover:border-gold transition-colors bg-card">
                {film.posterUrl ? (
                  <img src={film.posterUrl} alt={film.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film size={32} className="text-textMuted" />
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium text-white truncate group-hover:text-gold transition-colors">{film.title}</div>
                <div className="text-xs text-textMuted">Added {film.addedAt}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}