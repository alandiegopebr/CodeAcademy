import CertificateCard from '@/components/CertificateCard';
import { listCertificates } from '@/lib/certificates';

export const metadata = {
  title: 'Certificados - CodeAcademy',
  description: 'Veja seus certificados e conquistas',
};

export default function CertificatesPage() {
  const certificates = listCertificates();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <section className="section-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="section-label">Conquistas</span>
              <h1 className="section-title mt-2">Certificados & Prêmios</h1>
              <p className="text-muted mt-3 max-w-2xl">
                Acompanhe as milestones que você completou e as habilidades que já provou. Cada certificado é uma conquista real!
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-4 whitespace-nowrap">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Conquistado</p>
              <p className="text-3xl font-bold text-cyan-400">{certificates.length}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 mt-6 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-emerald-400">3</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Completos</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-amber-400">1</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Em Progresso</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-purple-400">60%</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Taxa Conclusão</p>
            </div>
          </div>
        </section>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div>
            <h2 className="section-subtitle mb-4">Seus Certificados</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </div>
        ) : (
          <section className="section-container text-center py-16">
            <p className="text-6xl mb-4">📜</p>
            <h3 className="section-subtitle">Nenhum certificado ainda</h3>
            <p className="text-muted mt-2">Complete aulas e desafios para ganhar seus primeiros certificados!</p>
          </section>
        )}

        {/* Next Steps */}
        <section className="section-container bg-gradient-to-br from-cyan-500/10 to-slate-900/80">
          <div className="space-y-4">
            <h3 className="section-subtitle">Próximos Certificados Disponíveis</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
                <p className="font-semibold text-slate-200">React Intermediário</p>
                <p className="text-sm text-slate-400 mt-1">Complete 5 aulas de React</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">3 de 5 concluídas</span>
                  <div className="h-2 w-24 rounded-full bg-slate-700 overflow-hidden">
                    <div className="h-full w-3/5 bg-cyan-500" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
                <p className="font-semibold text-slate-200">TypeScript Mastery</p>
                <p className="text-sm text-slate-400 mt-1">Complete 10 aulas de TypeScript</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">2 de 10 concluídas</span>
                  <div className="h-2 w-24 rounded-full bg-slate-700 overflow-hidden">
                    <div className="h-full w-1/5 bg-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
