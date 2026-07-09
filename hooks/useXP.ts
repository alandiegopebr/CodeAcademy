import { getUserXP } from '@/lib/firestore';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

interface UseXPReturn {
  xp: number;
  level: number;
  progress: number;
  weeklyBonus: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const XP_PER_LEVEL = 1000;

export default function useXP(): UseXPReturn {
  const { user } = useAuth();
  const [xp, setXP] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchXP = async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const totalXP = await getUserXP(user.uid);
      setXP(totalXP || 0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch XP');
      setError(error);
      console.error('Error fetching XP:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchXP();
  }, [user?.uid]);

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXP = (level - 1) * XP_PER_LEVEL;
  const nextLevelXP = level * XP_PER_LEVEL;
  const progress = Math.round(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
  const weeklyBonus = Math.floor((xp % 500) / 5);

  return {
    xp,
    level,
    progress: Math.min(progress, 100),
    weeklyBonus,
    loading,
    error,
    refetch: fetchXP,
  };
}
