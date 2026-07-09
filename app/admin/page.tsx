'use client';

import useAuth from '@/hooks/useAuth';
import { isAdmin } from '@/lib/admin';
import { approveTeacher, ensureAdminUser, getPendingTeachers, rejectTeacher } from '@/lib/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PendingTeacher {
  id: string;
  email: string;
  displayName?: string;
  requestedAt: any;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [pendingTeachers, setPendingTeachers] = useState<PendingTeacher[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !isAdmin(user)) return;

    const loadPendingTeachers = async () => {
      try {
        // Ensure admin user document exists in Firestore
        await ensureAdminUser(user.uid, user.email!);
        
        const teachers = await getPendingTeachers();
        setPendingTeachers(teachers as any);
      } catch (error) {
        console.error('Error loading pending teachers:', error);
      } finally {
        setIsLoadingTeachers(false);
      }
    };

    loadPendingTeachers();
  }, [user]);

  const handleApprove = async (teacherId: string) => {
    setApprovingId(teacherId);
    try {
      if (user?.email) {
        await approveTeacher(teacherId, user.email);
        setPendingTeachers(pendingTeachers.filter(t => t.id !== teacherId));
      }
    } catch (error) {
      console.error('Error approving teacher:', error);
    } finally {
      setApprovingId(null);
    }
  };

  const handleReject = async (teacherId: string) => {
    setRejectingId(teacherId);
    try {
      if (user?.email) {
        await rejectTeacher(teacherId, user.email);
        setPendingTeachers(pendingTeachers.filter(t => t.id !== teacherId));
      }
    } catch (error) {
      console.error('Error rejecting teacher:', error);
    } finally {
      setRejectingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen py-10 text-slate-100">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
          <p className="text-base text-slate-400">Checking access...</p>
        </div>
      </main>
    );
  }

  if (!user || !isAdmin(user)) {
    return (
      <main className="min-h-screen py-10 text-slate-100">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-white">Access denied</h1>
          <p className="mt-3 text-slate-400">Only the designated administrator can access this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 text-slate-100">
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40 backdrop-blur-sm sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Control center</h1>
            <p className="mt-2 text-slate-400">Manage lessons, review performance, and guide the learning experience from a single place.</p>
          </div>
          <Link href="/admin/lessons" className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Create lesson
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Growth overview</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-300">Active learners: 1,240</div>
              <div className="rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-300">Week growth: +14%</div>
              <div className="rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-300">Course completion: 68%</div>
              <div className="rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-300">Certificates issued: 320</div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Content review</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl bg-slate-900/80 p-4">Pending lessons: 4</div>
              <div className="rounded-2xl bg-slate-900/80 p-4">Pending quizzes: 2</div>
              <div className="rounded-2xl bg-slate-900/80 p-4">New badge requests: 6</div>
            </div>
          </section>
        </div>

        {/* Teachers Approval Section */}
        <section className="mt-8 rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-6">
          <h2 className="text-lg font-semibold text-white">Teacher requests</h2>
          <p className="mt-1 text-sm text-slate-400">Approve or reject teacher approval requests</p>
          
          {isLoadingTeachers ? (
            <p className="mt-4 text-slate-400">Loading teachers...</p>
          ) : pendingTeachers.length === 0 ? (
            <p className="mt-4 text-slate-400">No pending teacher requests</p>
          ) : (
            <div className="mt-6 space-y-4">
              {pendingTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 p-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-white">{teacher.displayName || 'Unknown'}</p>
                    <p className="text-sm text-slate-400">{teacher.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(teacher.id)}
                      disabled={approvingId === teacher.id || rejectingId === teacher.id}
                      className="rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition"
                    >
                      {approvingId === teacher.id ? 'Approving...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(teacher.id)}
                      disabled={approvingId === teacher.id || rejectingId === teacher.id}
                      className="rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition"
                    >
                      {rejectingId === teacher.id ? 'Rejecting...' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
