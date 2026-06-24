export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-white">Certificates</h1>
        <p className="mt-2 text-slate-400">View your completed certificates and achievements.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">React UI Specialist</h2>
            <p className="mt-2 text-sm text-slate-400">Awarded for completing the React Basics course with top performance.</p>
            <p className="mt-4 text-sm text-slate-500">Issued 3 days ago</p>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">TypeScript Mastery</h2>
            <p className="mt-2 text-sm text-slate-400">Awarded for completing the TypeScript Pro learning path.</p>
            <p className="mt-4 text-sm text-slate-500">Issued 2 weeks ago</p>
          </div>
          <div className="sm:col-span-2 rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">UI Design Expert</h2>
            <p className="mt-2 text-sm text-slate-400">Earned by completing the UI Design path and submitting the final capstone project.</p>
            <p className="mt-4 text-sm text-slate-500">Issued 1 month ago</p>
          </div>
        </div>
      </div>
    </main>
  );
}
