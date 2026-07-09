'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseCardProps {
  id?: string;
  title: string;
  description: string;
  progress: string;
  duration: string;
  lessons: number;
  level?: 'Iniciante' | 'Intermediário' | 'Avançado';
  icon?: string;
}

export default function CourseCard({
  id,
  title,
  description,
  progress,
  duration,
  lessons,
  level = 'Iniciante',
  icon,
}: CourseCardProps) {
  const levelColors = {
    'Iniciante': 'badge-success',
    'Intermediário': 'badge-warning',
    'Avançado': 'badge-danger',
  };

  const progressNum = parseInt(progress) || 0;

  return (
    <motion.article
      className="card-interactive group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header com ícone */}
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-2xl bg-cyan-500/10 p-3">
          <span className="text-2xl">{icon || '📚'}</span>
        </div>
        <span className={`badge ${levelColors[level]}`}>{level}</span>
      </div>

      {/* Título e descrição */}
      <h3 className="section-subtitle mb-2 line-clamp-2 group-hover:text-cyan-300 transition">{title}</h3>
      <p className="text-muted mb-4 line-clamp-2">{description}</p>

      {/* Progresso visual */}
      <div className="mb-4">
        <div className="mb-2 flex justify-between">
          <span className="text-xs font-semibold text-slate-300">Progresso</span>
          <span className="text-xs font-bold text-cyan-400">{progress}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${progressNum}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-4 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1 text-slate-400">
          <span>⏱️</span> {duration}
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          <span>📝</span> {lessons} aulas
        </span>
      </div>

      {/* CTA Button */}
      {id && (
        <Link href={`/courses/${id}`} className="btn btn-primary w-full justify-center">
          Continuar
        </Link>
      )}
    </motion.article>
  );
}
