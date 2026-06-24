import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/70 p-10 shadow-2xl shadow-slate-950/50 backdrop-blur-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">CodeAcademy</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          The modern learning platform for developers. Explore courses, track progress, earn certificates, and collaborate with AI.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link href="/courses" className="rounded-3xl bg-cyan-500 px-6 py-5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Browse courses
          </Link>
          <Link href="/dashboard" className="rounded-3xl border border-slate-700 px-6 py-5 text-center text-sm font-semibold text-white transition hover:border-slate-500">
            Go to dashboard
          </Link>
          <Link href="/register" className="rounded-3xl bg-slate-800 px-6 py-5 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
            Start free trial
          </Link>
        </div>
      </div>
    </main>
  );
}
