import LeaderboardClient from '@/components/LeaderboardClient';

export const metadata = {
  title: 'Leaderboard - CodeAcademy',
  description: 'Veja os melhores aprendizes e compare seu XP',
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <section className="section-container">
          <span className="section-label">Competição Saudável</span>
          <h1 className="section-title mt-2">Ranking Global</h1>
          <p className="text-muted mt-3 max-w-2xl">
            Veja os melhores aprendizes e compare seu XP. Trabalhe duro para chegar ao topo do ranking!
          </p>

          {/* Quick Stats */}
          <div className="grid gap-4 mt-6 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-cyan-400">🥇</p>
              <p className="text-sm text-slate-300 mt-2 font-semibold">Top Position</p>
              <p className="text-xs text-slate-500">1250 XP</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-cyan-400">👤</p>
              <p className="text-sm text-slate-300 mt-2 font-semibold">Sua Posição</p>
              <p className="text-xs text-slate-500">#42 com 650 XP</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-cyan-400">📊</p>
              <p className="text-sm text-slate-300 mt-2 font-semibold">Total Players</p>
              <p className="text-xs text-slate-500">234 aprendizes</p>
            </div>
          </div>
        </section>

        {/* Leaderboard Table */}
        <div className="card">
          <div className="mb-6">
            <h2 className="section-subtitle">Top 50 Aprendizes</h2>
            <p className="text-muted mt-1">Os melhores estudantes da comunidade CodeAcademy</p>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[64px_1fr_120px] gap-4 border-b border-slate-800 px-4 py-3 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              <span>Rank</span>
              <span>Estudante</span>
              <span>XP</span>
            </div>

            {/* Leaderboard Content */}
            <LeaderboardClient />
          </div>
        </div>

        {/* Info Section */}
        <section className="section-container bg-gradient-to-br from-cyan-500/10 to-slate-900/80">
          <div className="space-y-4">
            <h3 className="section-subtitle">Como Funciona</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">⭐</span>
                <span>Ganhe XP completando aulas, atividades e desafios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">📈</span>
                <span>Suba no ranking conforme seu XP aumenta</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">🏆</span>
                <span>Ganhe prêmios e reconhecimento ao atingir marcos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">🔥</span>
                <span>Mantenha uma sequência para ganho bonus de XP</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
