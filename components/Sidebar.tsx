import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar hidden w-72 shrink-0 space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-slate-100 lg:block">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Navigation</p>
        <Link href="/dashboard" className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">Dashboard</Link>
        <Link href="/courses" className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">Courses</Link>
        <Link href="/leaderboard" className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">Leaderboard</Link>
        <Link href="/certificates" className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">Certificates</Link>
      </div>
    </aside>
  );
}
