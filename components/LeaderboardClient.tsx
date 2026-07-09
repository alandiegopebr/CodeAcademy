'use client';

import { getLeaderboard, type LeaderboardEntry } from '@/lib/firestore';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function LeaderboardClient() {
  const { user, loading } = useAuthContext();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      if (loading) return;

      if (!user) {
        setLeaderboard([]);
        setMessage('Entre na sua conta para consultar o ranking.');
        return;
      }

      setIsLoading(true);
      setMessage(null);

      try {
        const entries = await getLeaderboard(10);
        if (!active) return;

        setLeaderboard(entries);
        if (entries.length === 0) {
          setMessage('O ranking ainda não tem dados públicos para exibir.');
        }
      } catch {
        if (!active) return;
        setLeaderboard([]);
        setMessage('Não foi possível carregar o ranking agora.');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className="px-6 py-8 text-center text-slate-400">
        Carregando ranking...
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-slate-400">
        {message ?? 'Complete aulas para aparecer no ranking.'}
      </div>
    );
  }

  return (
    <>
      {leaderboard.map((person) => (
        <div
          key={`${person.rank}-${person.name}`}
          className="grid grid-cols-[64px_1fr_96px] gap-4 border-b border-slate-800 px-6 py-4 text-sm last:border-b-0 hover:bg-slate-900/50"
        >
          <span className="text-cyan-400">#{person.rank}</span>
          <span>{person.name}</span>
          <span className="font-semibold text-slate-100">{person.xp}</span>
        </div>
      ))}
    </>
  );
}
