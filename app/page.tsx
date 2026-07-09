import Link from 'next/link';

const highlights = [
  'Aulas curtas e práticas',
  'Progresso com XP e ranking',
  'Conteúdo preparado para crescer',
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-sm lg:flex-row lg:p-12">
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Aprenda com foco e ritmo</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">CodeAcademy transforma estudo em progresso real.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Uma plataforma moderna para evoluir em tecnologia com trilhas objetivas, metas visuais e acompanhamento de XP em tempo real.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses" className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Ver trilhas
            </Link>
            <Link href="/dashboard" className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500">
              Abrir dashboard
            </Link>
            <Link href="/register" className="rounded-2xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
              Criar conta
            </Link>
          </div>
        </div>

        <div className="flex-1 rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-6">
          <div className="rounded-[1.25rem] border border-cyan-400/30 bg-cyan-400/10 p-4 text-sm text-cyan-100">
            <p className="font-semibold">O que você encontra aqui</p>
            <ul className="mt-3 space-y-2 text-slate-300">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Trilhas</p>
              <p className="mt-2 text-2xl font-semibold text-white">8+</p>
            </div>
            <div className="rounded-2xl bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Aulas</p>
              <p className="mt-2 text-2xl font-semibold text-white">30</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
