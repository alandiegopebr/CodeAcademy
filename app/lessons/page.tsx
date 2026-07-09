import LessonsClient from '../../components/LessonsClient';

export const metadata = {
  title: 'Aulas - CodeAcademy',
  description: 'Acompanhe aulas, XP e progresso de aprendizado.',
};

export default function LessonsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <section className="section-container">
          <span className="section-label">Trilha Prática</span>
          <h1 className="section-title mt-2">Aulas</h1>
          <p className="text-muted mt-3 max-w-2xl">
            Avance em pequenos módulos com exercícios práticos, marque o que concluiu e acompanhe seu XP em tempo real. Complete todas as aulas para conseguir certificados.
          </p>

          {/* Stats */}
          <div className="grid gap-4 mt-6 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-cyan-400">24</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Total de Aulas</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-emerald-400">8</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Completas</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-violet-400">33%</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Progresso</p>
            </div>
          </div>
        </section>

        {/* Lessons */}
        <LessonsClient />
      </div>
    </main>
  );
}
