import { useState, useEffect } from 'react';

export interface GameSession {
  date: string; // ISO date
  score: number;
  difficultyReached: number;
}

const STORAGE_KEY = 'memory-companion-game-stats';

function loadSessions(): GameSession[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function useGameStats() {
  const [sessions, setSessions] = useState<GameSession[]>(() => loadSessions());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const recordSession = (score: number, difficultyReached: number) => {
    setSessions((s) => [
      ...s,
      { date: new Date().toISOString(), score, difficultyReached },
    ]);
  };

  return { sessions, recordSession };
}
