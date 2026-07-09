'use client';

import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'cyan' | 'emerald' | 'violet' | 'amber';
}

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'cyan',
}: DashboardCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-cyan-600/5',
    emerald: 'from-emerald-500/10 to-emerald-600/5',
    violet: 'from-violet-500/10 to-violet-600/5',
    amber: 'from-amber-500/10 to-amber-600/5',
  };

  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-slate-400',
  };

  const trendIcons = {
    up: '📈',
    down: '📉',
    neutral: '→',
  };

  return (
    <motion.div
      className={`card bg-gradient-to-br ${colorClasses[color]}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="section-label">{title}</span>
        </div>
        {icon && (
          <div className="text-2xl rounded-lg bg-slate-800/50 p-2">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <motion.p
        className="text-3xl font-bold text-white mb-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.p>

      {/* Trend */}
      {trend && trendValue && (
        <div className={`flex items-center gap-2 text-sm font-semibold ${trendColors[trend]}`}>
          <span>{trendIcons[trend]}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </motion.div>
  );
}
