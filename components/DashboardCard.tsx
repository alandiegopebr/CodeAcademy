export default function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">{title}</h3>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
