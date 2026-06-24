export default function AIPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-white">AI Studio</h1>
        <p className="mt-2 text-slate-400">Use AI-powered guidance to improve your code, prepare for interviews, and learn faster.</p>
        <div className="mt-8 grid gap-6 rounded-3xl bg-slate-950/70 p-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-white">Guided help</h2>
            <p className="mt-3 text-sm text-slate-400">Ask questions about your coursework and receive actionable examples.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Smart lessons</h2>
            <p className="mt-3 text-sm text-slate-400">Get personalized path suggestions based on your progress and interests.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
