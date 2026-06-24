export default function CourseCard({ title, description, progress, duration, lessons }: { title: string; description: string; progress: string; duration: string; lessons: number }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-cyan-500 hover:bg-slate-900">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>{duration}</span>
        <span>{lessons} aulas</span>
      </div>
      <p className="mt-4 text-sm text-cyan-300">Progress: {progress}</p>
    </article>
  );
}
