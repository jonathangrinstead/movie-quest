import { Film, Award, Zap, Flame, Trophy, Lock } from "lucide-react";
import { getLevel, getXPProgress, getLevelTitle } from "@/lib/gamification";
import { BADGES } from "@/lib/data";

// Mock data for demo
const MOCK_USER = {
  name: "Film Fan",
  level: 3,
  totalXP: 2450,
  watchedCount: 24,
  streak: "3 days",
  title: "Film Enthusiast",
};

const MOCK_WATCHED_FILMS = [
  {
    id: "the-godfather",
    title: "The Godfather",
    year: 1972,
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    watchedAt: "2026-04-03",
    xpEarned: 150,
  },
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    year: 2008,
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW1Warb1XZHRFiSsEifwqFHE.jpg",
    watchedAt: "2026-04-01",
    xpEarned: 150,
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    year: 1994,
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIl40f9vCNlbGanyiASq9JKaY.jpg",
    watchedAt: "2026-03-28",
    xpEarned: 150,
  },
  {
    id: "inception",
    title: "Inception",
    year: 2010,
    posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    watchedAt: "2026-03-25",
    xpEarned: 100,
  },
];

const EARNED_BADGE_SLUGS = ["first-film", "ten-films", "oscar-collector"];

export default async function DashboardPage() {
  const totalXP = MOCK_USER.totalXP;
  const level = getLevel(totalXP);
  const progress = getXPProgress(totalXP);
  const title = getLevelTitle(level);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-card border-2 border-gold flex items-center justify-center">
          <span className="text-2xl font-bold text-gold">{MOCK_USER.name[0]}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{MOCK_USER.name}</h1>
          <p className="text-gold text-sm">{title}</p>
        </div>
      </div>

      {/* Level Card */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
              <Trophy size={24} className="text-background" />
            </div>
            <div>
              <div className="text-sm text-textSecondary">Level {level}</div>
              <div className="text-xl font-bold text-white">{title}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gold">{totalXP} XP</div>
            <div className="text-xs text-textMuted">Total earned</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-textMuted mb-2">
            <span>{progress.current} / {progress.needed} XP</span>
            <span>{progress.percent}%</span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Films Watched", value: MOCK_USER.watchedCount, icon: Film },
          { label: "Current Streak", value: MOCK_USER.streak, icon: Flame },
          { label: "Badges Earned", value: EARNED_BADGE_SLUGS.length, icon: Award },
          { label: "Total XP", value: totalXP, icon: Zap },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className="text-gold" />
              <span className="text-xs text-textSecondary">{label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {BADGES.map((badge) => {
            const earned = EARNED_BADGE_SLUGS.includes(badge.slug);
            return (
              <div
                key={badge.slug}
                className={`flex flex-col items-center text-center p-4 rounded-lg border ${
                  earned ? "bg-gold/10 border-gold" : "bg-card border-border opacity-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${earned ? "bg-gold" : "bg-border"}`}>
                  {earned ? <Award size={20} className="text-background" /> : <Lock size={20} className="text-textMuted" />}
                </div>
                <div className="text-xs font-semibold text-white">{badge.name}</div>
                <div className="text-xs text-textMuted mt-1">{badge.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Watched */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recently Watched</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {MOCK_WATCHED_FILMS.map((film) => (
            <div key={film.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {film.posterUrl && (
                <img src={film.posterUrl} alt={film.title} className="w-full aspect-[2/3] object-cover" />
              )}
              <div className="p-3">
                <div className="text-sm font-medium text-white truncate">{film.title}</div>
                <div className="text-xs text-textMuted">{film.watchedAt}</div>
                <div className="text-xs text-gold mt-1">+{film.xpEarned} XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}