'use client';

import DashboardCard from '@/components/DashboardCard';
import useAuth from '@/hooks/useAuth';
import useCourses from '@/hooks/useCourses';
import useXP from '@/hooks/useXP';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { xp, level, progress } = useXP();
  const { courses } = useCourses();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.section
          className="section-container"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="section-label">Seu Espaço</span>
            <h1 className="section-title mt-2">Bem-vindo de volta! 👋</h1>
            <p className="text-muted mt-2 max-w-2xl">
              {loading ? 'Carregando seu perfil…' : user ? `Continue sua jornada, ${user.email}!` : 'Veja seus cursos ativos, progresso, certificados e posição no ranking.'}
            </p>
          </motion.div>
        </motion.section>

        {/* Stats Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardCard
            title="Seu XP"
            value={xp.toLocaleString()}
            icon="⭐"
            color="cyan"
            trend="up"
            trendValue="+120 hoje"
          />
          <DashboardCard
            title="Level Atual"
            value={level}
            icon="🎯"
            color="emerald"
          />
          <DashboardCard
            title="Cursos"
            value={courses.length}
            icon="📚"
            color="violet"
          />
          <DashboardCard
            title="Streak"
            value="7 dias"
            icon="🔥"
            color="amber"
            trend="up"
            trendValue="+1 dia"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Continue Learning */}
          <motion.article
            className="lg:col-span-2 card-hover"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-subtitle">Continuar aprendendo</h2>
                <p className="text-muted mt-1">Você está no meio do React Basics</p>
              </div>
              <span className="text-4xl">🚀</span>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-semibold text-slate-300">Progresso</span>
                  <span className="text-sm font-bold text-cyan-400">{progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-slate-800/50 p-3 text-center">
                <p className="text-2xl font-bold text-cyan-400">7</p>
                <p className="text-xs text-slate-400 mt-1">Lições Completas</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">5</p>
                <p className="text-xs text-slate-400 mt-1">Restando</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 p-3 text-center">
                <p className="text-2xl font-bold text-violet-400">58%</p>
                <p className="text-xs text-slate-400 mt-1">Conclusão</p>
              </div>
            </div>

            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/lessons" className="btn btn-primary w-full justify-center">
                Abrir Aula →
              </Link>
            </motion.div>
          </motion.article>

          {/* Achievements Sidebar */}
          <motion.article
            className="card-hover"
            variants={itemVariants}
          >
            <h3 className="section-subtitle mb-4">Conquistas 🏆</h3>
            <div className="space-y-3">
              <motion.div
                className="rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-amber-500/20 p-4"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm font-semibold text-amber-300">5 Aulas</p>
                <p className="text-xs text-slate-400 mt-1">Complete 5 aulas</p>
              </motion.div>
              <motion.div
                className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-emerald-500/20 p-4"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm font-semibold text-emerald-300">Streak Iniciado</p>
                <p className="text-xs text-slate-400 mt-1">Dia 7 de sequência</p>
              </motion.div>
              <motion.div
                className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 p-4 opacity-50"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm font-semibold text-cyan-300">100 XP</p>
                <p className="text-xs text-slate-400 mt-1">Ganhe 100 XP (próximo)</p>
              </motion.div>
            </div>
          </motion.article>
        </motion.div>

        {/* Quick Actions */}
        <motion.section
          className="section-container"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="section-subtitle mb-4">Ações Rápidas</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/courses" className="btn btn-primary justify-center">
              Explorar Cursos
            </Link>
            <Link href="/leaderboard" className="btn btn-secondary justify-center">
              Ver Ranking
            </Link>
            <Link href="/profile" className="btn btn-secondary justify-center">
              Meu Perfil
            </Link>
            <Link href="/certificates" className="btn btn-secondary justify-center">
              Certificados
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
