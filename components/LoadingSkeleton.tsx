'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'button' | 'bar';
  width?: string;
  height?: string;
  count?: number;
}

export default function LoadingSkeleton({
  type = 'card',
  width = 'w-full',
  height = 'h-12',
  count = 1,
}: LoadingSkeletonProps) {
  const shimmer = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
    },
  };

  const skeleton = (
    <motion.div
      className={`${width} ${height} rounded-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%] ${type !== 'card' ? 'bg-clip-text' : ''}`}
      variants={shimmer}
      animate="animate"
      transition={{ duration: 2, repeat: Infinity }}
    />
  );

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card space-y-3">
            <div className="h-4 w-24 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse" />
            <div className="h-8 w-3/4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse" />
            <div className="h-4 w-full rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse" />
            <div className="h-4 w-2/3 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse ${
              i === count - 1 ? 'w-2/3' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  if (type === 'button') {
    return (
      <div className="h-10 w-full rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
    );
  }

  if (type === 'bar') {
    return <div className="h-2 w-full rounded-full bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse" />;
  }

  return skeleton;
}
