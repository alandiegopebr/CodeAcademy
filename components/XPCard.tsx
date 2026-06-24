export default function XPCard({ xp }: { xp: number }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-white">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Current XP</p>
      <p className="mt-4 text-3xl font-semibold">{xp}</p>
    </div>
  );
}
