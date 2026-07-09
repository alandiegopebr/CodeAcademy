export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Fine-tune your experience, notifications, and privacy options.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            <p className="mt-3 text-sm text-slate-400">Control updates, reminders, and announcement preferences.</p>
          </section>
          <section className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Privacy</h2>
            <p className="mt-3 text-sm text-slate-400">Review your data settings and sign-in methods.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
