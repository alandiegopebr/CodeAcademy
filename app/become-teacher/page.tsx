'use client';

import useAuth from '@/hooks/useAuth';
import { getTeacherStatus, requestTeacherApproval } from '@/lib/firestore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BecomeTeacherPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [teacherStatus, setTeacherStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    const checkStatus = async () => {
      try {
        const status = await getTeacherStatus(user.uid);
        setTeacherStatus(status?.status || null);
      } catch (err) {
        console.error('Error checking teacher status:', err);
      }
      setIsChecking(false);
    };

    checkStatus();
  }, [user, loading]);

  if (loading || isChecking) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-950">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-slate-400">Carregando...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  // If already a teacher
  if (teacherStatus === 'approved') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-950">
        <motion.section
          className="section-container w-full max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">✅</div>
          <h1 className="section-title mb-2">Você é um Professor!</h1>
          <p className="text-muted mb-6">Sua solicitação foi aprovada. Acesse a área de professores para começar.</p>
          <div className="space-y-3">
            <a href="/teacher" className="btn btn-primary w-full justify-center">
              Ir para Painel de Professor
            </a>
            <a href="/profile" className="btn btn-secondary w-full justify-center">
              Voltar ao Perfil
            </a>
          </div>
        </motion.section>
      </main>
    );
  }

  // If pending approval
  if (teacherStatus === 'pending') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-950">
        <motion.section
          className="section-container w-full max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="section-title mb-2">Solicitação em Análise</h1>
          <p className="text-muted mb-6">
            Sua solicitação para se tornar professor foi enviada. Você será notificado quando ela for aprovada.
          </p>
          <a href="/profile" className="btn btn-primary w-full justify-center">
            Voltar ao Perfil
          </a>
        </motion.section>
      </main>
    );
  }

  // If rejected
  if (teacherStatus === 'rejected') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-950">
        <motion.section
          className="section-container w-full max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">❌</div>
          <h1 className="section-title mb-2">Solicitação Rejeitada</h1>
          <p className="text-muted mb-6">
            Sua solicitação foi rejeitada. Entre em contato com o administrador para mais informações.
          </p>
          <a href="/profile" className="btn btn-primary w-full justify-center">
            Voltar ao Perfil
          </a>
        </motion.section>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    if (!displayName.trim()) {
      setError('Por favor, informe seu nome completo.');
      setIsSubmitting(false);
      return;
    }

    if (displayName.length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres.');
      setIsSubmitting(false);
      return;
    }

    if (!user?.email) {
      setError('Email não encontrado. Por favor, faça login novamente.');
      setIsSubmitting(false);
      return;
    }

    try {
      await requestTeacherApproval(user.uid, user.email, displayName);
      setSuccess(true);
      setDisplayName('');
      setBio('');
      setExperience('');
      setTeacherStatus('pending');
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch (err) {
      setError('Erro ao enviar solicitação. Tente novamente mais tarde.');
      console.error('Teacher request error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form to request teacher status
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-950">
      <motion.section
        className="section-container w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 space-y-3">
          <h1 className="section-title">Become a Teacher 🎓</h1>
          <p className="text-muted">
            Compartilhe seu conhecimento com a comunidade CodeAcademy e ajude outros a aprender programação.
          </p>
        </div>

        {/* Benefits */}
        <motion.div
          className="mb-8 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-semibold text-cyan-300 mb-3">Benefícios de ser Professor:</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✨ Crie suas próprias aulas e cursos</li>
            <li>🎯 Organize classes e atividades</li>
            <li>📊 Acompanhe o progresso dos alunos</li>
            <li>⭐ Ganhe reconhecimento na comunidade</li>
          </ul>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Display Name */}
          <motion.label
            className="block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="mb-2 block section-label">Nome Completo</span>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input-field"
              placeholder="Como você quer ser chamado"
              required
            />
          </motion.label>

          {/* Bio */}
          <motion.label
            className="block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="mb-2 block section-label">Sua Bio (Opcional)</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="textarea-field"
              placeholder="Conte um pouco sobre você e sua experiência de ensino..."
              rows={4}
            />
          </motion.label>

          {/* Experience */}
          <motion.label
            className="block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="mb-2 block section-label">Anos de Experiência (Opcional)</span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="input-field"
            >
              <option value="">Selecione uma opção</option>
              <option value="0-1">Menos de 1 ano</option>
              <option value="1-3">1-3 anos</option>
              <option value="3-5">3-5 anos</option>
              <option value="5+">Mais de 5 anos</option>
            </select>
          </motion.label>

          {/* Error Message */}
          {error && (
            <motion.div
              className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✅ Solicitação enviada com sucesso! Redirecionando...
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Enviando...
              </span>
            ) : (
              'Enviar Solicitação'
            )}
          </motion.button>

          {/* Cancel */}
          <motion.a
            href="/profile"
            className="btn btn-ghost w-full justify-center block text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Cancelar
          </motion.a>
        </form>
      </motion.section>
    </main>
  );
}
