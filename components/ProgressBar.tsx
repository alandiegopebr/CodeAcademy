export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="rounded-full bg-slate-900/70 p-1">
      <div className="h-3 rounded-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}
