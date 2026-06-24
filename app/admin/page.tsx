'use client';

import useAuth from '@/hooks/useAuth';
import { isAdmin } from '@/lib/admin';

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
          <p className="text-base text-slate-400">Checking access...</p>
        </div>
      </main>
    );
  }

  if (!user || !isAdmin(user)) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-white">Access denied</h1>
          <p className="mt-3 text-slate-400">Only the designated administrator can access this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
        <p className="mt-2 text-slate-400">Manage course content, users, and platform settings.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">User metrics</h2>
            <p className="mt-3 text-sm text-slate-400">Track active learners, engagement, and course completion rates.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">Active learners: 1,240</div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">Week growth: 14%</div>
            </div>
          </section>
          <section className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Content review</h2>
            <p className="mt-3 text-sm text-slate-400">Approve new lessons, quizzes, and AI prompts for the platform.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-900/80 p-4">Pending lessons: 4</div>
              <div className="rounded-3xl bg-slate-900/80 p-4">Pending quizzes: 2</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
