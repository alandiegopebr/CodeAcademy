'use client';

import useAuth from '@/hooks/useAuth';
import { createClass } from '@/lib/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateClassPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center text-slate-300">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!name.trim()) {
        setError('Nome da classe é obrigatório');
        return;
      }

      const classId = await createClass(user.uid, name, description);
      if (classId) {
        router.push(`/teacher/classes/${classId}`);
      } else {
        setError('Erro ao criar classe. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao criar classe. Tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/teacher" className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
          ← Voltar
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Criar Nova Classe</h1>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Nome da Classe</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Turma de JavaScript"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Descrição (Opcional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Turma de introdução ao JavaScript para iniciantes"
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition"
            >
              {isSubmitting ? 'Criando...' : 'Criar Classe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
