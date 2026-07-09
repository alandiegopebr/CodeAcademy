'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface XPCardProps {
  xp: number;
  level?: number;
  progress?: number;
  nextLevelXP?: number;
  showAnimation?: boolean;
}

export default function XPCard({
  xp,
  level = Math.floor(xp / 1000) + 1,
  progress = (xp % 1000) / 10,
  nextLevelXP = level * 1000,
  showAnimation = true,
}: XPCardProps) {
  return (
    <motion.div
      className="card-hover"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="section-label">Seu Progresso</span>
          <h3 className="section-subtitle mt-1">Level {level}</h3>
        </div>
        <div className="rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 p-4">
          <span className="text-3xl">⭐</span>
        </div>
      </div>

      {/* XP Display */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-2">Experiência Total</p>
        <motion.p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
          <AnimatePresence>
            <motion.span
              key={xp}
              initial={showAnimation ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {xp.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span className="text-lg ml-2 text-slate-400">XP</span>
        </motion.p>
      </div>

      {/* Progress to Next Level */}
      <div className="mb-4">
        <div className="mb-2 flex justify-between">
          <span className="text-xs font-semibold text-slate-400">Próximo Level</span>
          <span className="text-xs font-bold text-cyan-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {Math.round((nextLevelXP - xp) / 100) * 100} XP restantes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
        <div className="text-center">
          <p className="text-2xl font-bold text-cyan-400">{level}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Level Atual</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400">
            {Math.max(0, Math.round((nextLevelXP - xp) / 1000))}
          </p>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Níveis até próxima</p>
        </div>
      </div>
    </motion.div>
  );
}
