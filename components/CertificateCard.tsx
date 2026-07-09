'use client';

import type { Certificate } from '@/lib/certificates';
import { motion } from 'framer-motion';

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <motion.div
      className="card-interactive relative overflow-hidden group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-5xl">{certificate.badge}</p>
          </motion.div>
          
          <span className="badge badge-success">✓ Verificado</span>
        </div>

        {/* Title */}
        <h3 className="section-subtitle mb-2 group-hover:text-cyan-300 transition">
          {certificate.title}
        </h3>

        {/* Description */}
        <p className="text-muted mb-6 line-clamp-3">{certificate.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            <span className="text-slate-400">Emitido em</span>
            <br />
            <span className="font-semibold text-slate-300">{certificate.issuedAt}</span>
          </p>
          <motion.button
            className="btn btn-ghost btn-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Detalhes →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
