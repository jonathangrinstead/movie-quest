import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLevel, getXPProgress, getLevelTitle } from "@/lib/gamification";
import { BADGES } from "@/lib/data";
import { Film, Award, Zap, Flame, Trophy, Lock } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const watchedFilms = await prisma.watchedFilm.findMany({
    where: { userId: session.user.id },
    include: { film: true },
    orderBy: { watchedAt: "desc" },
  });

  const totalXP = watchedFilms.reduce((sum, wf) => sum + wf.xpEarned, 0);
  const level = getLevel(totalXP);
  const progress = getXPProgress(totalXP);
  const title = getLevelTitle(level);

  const userBadges = await prisma.userBadge.findMany({
    where: { userId: session.user.id },
    include: { badge: true },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {session.user.image ? (
          <img src={session.user.image} alt={session.user.name || ""} className="w-16 h-16 rounded-full border-2 border-gold" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-card border-2 border-gold flex items-center justify-center">
            <span className="text-2xl font-bold text-gold">{session.user.name?.[0] || "?"}</span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{session.user.name}</h1>
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
          { label: "Films Watched", value: watchedFilms.length, icon: Film },
          { label: "Current Streak", value: "3 days", icon: Flame },
          { label: "Badges Earned", value: userBadges.length, icon: Award },
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
            const earned = userBadges.some((ub) => ub.badge.slug === badge.slug);
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
      {watchedFilms.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Recently Watched</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {watchedFilms.slice(0, 5).map(({ film, watchedAt, xpEarned }) => (
              <div key={film.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {film.posterUrl && (
                  <img src={film.posterUrl} alt={film.title} className="w-full aspect-[2/3] object-cover" />
                )}
                <div className="p-3">
                  <div className="text-sm font-medium text-white truncate">{film.title}</div>
                  <div className="text-xs text-textMuted">{new Date(watchedAt).toLocaleDateString()}</div>
                  <div className="text-xs text-gold mt-1">+{xpEarned} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
