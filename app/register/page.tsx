'use client';

import { register } from '@/lib/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Não foi possível criar a conta. Verifique suas informações e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-slate-950">
      <motion.section
        className="section-container w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="mb-8 space-y-3"
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="section-title">Crie sua conta</h1>
          <p className="text-muted">Junte-se ao CodeAcademy e comece a construir suas habilidades.</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <motion.label
            className="block"
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="mb-2 block section-label">Nome Completo</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Seu nome completo"
              required
            />
          </motion.label>

          {/* Email Field */}
          <motion.label
            className="block"
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="mb-2 block section-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="seu@email.com"
              required
            />
          </motion.label>

          {/* Password Field */}
          <motion.label
            className="block"
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="mb-2 block section-label">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Crie uma senha forte"
              required
            />
            <p className="mt-2 text-xs text-slate-500">Mínimo de 8 caracteres</p>
          </motion.label>

          {/* Confirm Password Field */}
          <motion.label
            className="block"
            custom={4}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="mb-2 block section-label">Confirme a Senha</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="Confirme sua senha"
              required
            />
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            custom={5}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Criando conta...
              </span>
            ) : (
              'Criar Conta'
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <motion.p
          className="mt-8 text-center text-sm text-slate-400"
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Já tem uma conta?{' '}
          <Link href="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
            Faça login
          </Link>
        </motion.p>
      </motion.section>
    </main>
  );
}
