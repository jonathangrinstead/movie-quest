export function calculateXP(film: { isOscarWinner?: boolean }): number {
  let xp = 100;
  if (film.isOscarWinner) xp += 50;
  return xp;
}

export function getLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

export function getXPProgress(xp: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const level = getLevel(xp);
  const currentLevelXP = (level - 1) * 1000;
  const nextLevelXP = level * 1000;
  const current = xp - currentLevelXP;
  const needed = nextLevelXP - currentLevelXP;
  const percent = Math.round((current / needed) * 100);
  return { current, needed, percent };
}

export function getXPForNextLevel(xp: number): number {
  const level = getLevel(xp);
  return level * 1000;
}

export function getLevelTitle(level: number): string {
  if (level >= 10) return "Cinema Legend";
  if (level >= 7) return "Film Connoisseur";
  if (level >= 5) return "Movie Buff";
  if (level >= 3) return "Film Enthusiast";
  if (level >= 2) return "Movie Fan";
  return "Movie Rookie";
}
