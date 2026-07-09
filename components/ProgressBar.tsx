'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'animated';
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({
  progress,
  size = 'md',
  variant = 'gradient',
  label,
  showPercentage = false,
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const variants = {
    default: 'bg-cyan-500',
    gradient: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
    animated: 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-[length:200%] animate-pulse-glow',
  };

  return (
    <div className="w-full">
      {/* Label */}
      {(label || showPercentage) && (
        <div className="mb-2 flex justify-between">
          {label && <span className="text-xs font-semibold text-slate-300">{label}</span>}
          {showPercentage && <span className="text-xs font-bold text-cyan-400">{clampedProgress.toFixed(0)}%</span>}
        </div>
      )}

      {/* Progress Bar */}
      <div className={`w-full rounded-full bg-slate-800 overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={variants[variant]}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
