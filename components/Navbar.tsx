'use client';

import useAuth from '@/hooks/useAuth';
import { isAdmin } from '@/lib/admin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const showAdmin = !loading && !!user && isAdmin(user);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/95 px-6 py-4 text-slate-100 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-semibold text-white">CodeAcademy</Link>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">Dashboard</Link>
          <Link href="/courses" className="text-sm text-slate-300 hover:text-white">Courses</Link>
          <Link href="/lessons" className="text-sm text-slate-300 hover:text-white">Lessons</Link>
          <Link href="/leaderboard" className="text-sm text-slate-300 hover:text-white">Leaderboard</Link>
          <Link href="/profile" className="text-sm text-slate-300 hover:text-white">Profile</Link>
          {showAdmin && <Link href="/admin" className="text-sm text-slate-300 hover:text-white">Admin</Link>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!loading && user ? (
          <>
            <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 md:inline-block">
              {user.email ?? 'Learner'}
            </span>
            <button onClick={handleSignOut} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
              Sign in
            </Link>
            <Link href="/register" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
