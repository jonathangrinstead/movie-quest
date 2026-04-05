import Link from "next/link";
import { Film, Zap, Award, TrendingUp, ChevronRight } from "lucide-react";
import { FEATURED_FILMS } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-gold text-sm font-medium mb-4">
              <Zap size={16} />
              <span>Gamify your movie watching</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Level up your<br />
              <span className="text-gold">film taste</span>
            </h1>
            <p className="text-textSecondary text-lg mb-8 max-w-lg">
              Track the movies you watch, earn XP, unlock badges, and climb the leaderboard. 
              Your journey to becoming a cinema legend starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/movies"
                className="inline-flex items-center gap-2 bg-gold text-background px-6 py-3 rounded-lg font-semibold hover:bg-goldDim transition-colors"
              >
                <Film size={18} />
                Browse Movies
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border border-border text-white px-6 py-3 rounded-lg font-semibold hover:bg-card transition-colors"
              >
                <Award size={18} />
                View Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#F5C518 1px, transparent 1px), linear-gradient(90deg, #F5C518 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Films Tracked", value: "2,847", icon: Film },
              { label: "Active Users", value: "1,203", icon: TrendingUp },
              { label: "XP Awarded", value: "894K", icon: Zap },
              { label: "Badges Earned", value: "5,392", icon: Award },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-border rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-gold" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-textMuted">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Films */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Films</h2>
            <p className="text-textSecondary text-sm mt-1">Oscar-winning masterpieces to add to your watchlist</p>
          </div>
          <Link href="/movies" className="flex items-center gap-1 text-gold text-sm font-medium hover:text-goldDim transition-colors">
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURED_FILMS.map((film) => (
            <Link key={film.id} href={`/movies/${film.id}`} className="group">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border group-hover:border-gold transition-colors">
                {film.posterUrl ? (
                  <img src={film.posterUrl} alt={film.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-card flex items-center justify-center">
                    <Film size={32} className="text-textMuted" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-xs">
                    <div className="font-semibold text-white">{film.year}</div>
                    <div className="text-gold flex items-center gap-1">
                      <span>TMDB {film.tmdbRating}</span>
                    </div>
                  </div>
                </div>
                {film.isOscarWinner && (
                  <div className="absolute top-2 right-2">
                    <Award size={16} className="text-gold drop-shadow-lg" />
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium text-white truncate group-hover:text-gold transition-colors">{film.title}</div>
                <div className="text-xs text-textMuted">{film.year}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse Films", desc: "Explore our curated collection of must-watch movies" },
              { step: "02", title: "Mark as Watched", desc: "Log movies you've seen and earn XP for each one" },
              { step: "03", title: "Unlock Badges", desc: "Collect badges and climb the levels as a cinema legend" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="text-5xl font-bold text-gold mb-4">{step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-textSecondary text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
