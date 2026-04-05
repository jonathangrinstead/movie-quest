import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Film, Trash2 } from "lucide-react";

export default async function WatchlistPage() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const watchlist = await prisma.watchlist.findMany({
    where: { userId: session.user.id },
    include: { film: true },
    orderBy: { addedAt: "desc" },
  });

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
          {watchlist.map(({ film, addedAt }) => (
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
                <div className="text-xs text-textMuted">Added {new Date(addedAt).toLocaleDateString()}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
