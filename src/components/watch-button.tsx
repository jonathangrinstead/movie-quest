"use client";

import { useState } from "react";
import { CheckCircle, Zap } from "lucide-react";

export default function WatchButton({ filmId }: { filmId: string }) {
  const [watched, setWatched] = useState(false);
  const [loading, setLoading] = useState(false);

  if (watched) {
    return (
      <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
        <CheckCircle size={18} />
        Watched! +100 XP
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/watch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filmId }),
          });
          if (res.ok) setWatched(true);
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-gold text-background px-6 py-3 rounded-lg font-semibold hover:bg-goldDim transition-colors disabled:opacity-50"
    >
      <Zap size={18} />
      {loading ? "Marking..." : "Mark as Watched"}
    </button>
  );
}