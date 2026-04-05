"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Bookmark, Check } from "lucide-react";

export default function WatchlistButton({ filmId }: { filmId: string }) {
  const { data: session } = useSession();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="inline-flex items-center gap-2 border border-border text-white px-6 py-3 rounded-lg font-semibold hover:bg-card transition-colors"
      >
        <Bookmark size={18} />
        Sign in to Add
      </button>
    );
  }

  if (added) {
    return (
      <div className="inline-flex items-center gap-2 border border-green-600 text-green-500 px-6 py-3 rounded-lg font-semibold">
        <Check size={18} />
        In Watchlist
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/watchlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filmId }),
          });
          if (res.ok) setAdded(true);
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
      className="inline-flex items-center gap-2 border border-border text-white px-6 py-3 rounded-lg font-semibold hover:bg-card transition-colors disabled:opacity-50"
    >
      <Bookmark size={18} />
      {loading ? "Adding..." : "Add to Watchlist"}
    </button>
  );
}
