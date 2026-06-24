'use client';

import useAuth from '@/hooks/useAuth';
import { getUserXP } from '@/lib/firestore';
import { useEffect, useState } from 'react';

export default function DashboardStats() {
  const { user, loading } = useAuth();
  const [userXP, setUserXP] = useState<number>(0);
  const [loadingXP, setLoadingXP] = useState(true);

  useEffect(() => {
    async function loadUserXP() {
      if (user && !loading) {
        try {
          const xp = await getUserXP(user.uid);
          setUserXP(xp);
        } catch (error) {
          console.error('Error loading XP:', error);
        }
      }
      setLoadingXP(false);
    }
    loadUserXP();
  }, [user, loading]);

  if (loading || loadingXP) {
    return (
      <article className="rounded-3xl bg-slate-950/70 p-6">
        <h2 className="text-lg font-semibold text-white">XP earned</h2>
        <p className="mt-2 text-sm text-slate-400">Loading your XP...</p>
        <div className="mt-4 rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">--</div>
      </article>
    );
  }

  return (
    <article className="rounded-3xl bg-slate-950/70 p-6">
      <h2 className="text-lg font-semibold text-white">XP earned</h2>
      <p className="mt-2 text-sm text-slate-400">You've earned {userXP} XP so far.</p>
      <div className="mt-4 rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
        Next milestone: {Math.ceil((userXP + 1) / 500) * 500} XP
      </div>
    </article>
  );
}
