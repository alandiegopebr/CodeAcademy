'use client';

import useAuth from '@/hooks/useAuth';
import { getTeacherClasses, getTeacherStatus } from '@/lib/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Class {
  id: string;
  name: string;
  description?: string;
  studentIds: string[];
}

export default function TeacherPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const checkTeacherStatus = async () => {
      const teacherStatus = await getTeacherStatus(user.uid);
      if (teacherStatus) {
        setStatus(teacherStatus.status);
        if (teacherStatus.status === 'approved') {
          const teacherClasses = await getTeacherClasses(user.uid);
          setClasses(teacherClasses);
        }
      }
      setIsLoading(false);
    };

    checkTeacherStatus();
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-slate-300">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Aguardando Aprovação</h1>
            <p className="text-slate-300 mb-6">
              Sua solicitação para se tornar professor está pendente de aprovação do administrador. 
              Você receberá uma notificação quando for aprovado.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-red-800 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-red-400 mb-4">Solicitação Rejeitada</h1>
            <p className="text-slate-300 mb-6">
              Sua solicitação para se tornar professor foi rejeitada. 
              Entre em contato com o administrador para mais informações.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Professor Dashboard</h1>
          <p className="text-slate-300">Gerencie suas classes e atividades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/teacher/classes/create"
            className="bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 rounded-lg p-6 text-white transition transform hover:scale-105"
          >
            <div className="text-4xl mb-2">➕</div>
            <h2 className="text-2xl font-bold mb-2">Criar Nova Classe</h2>
            <p className="text-cyan-100">Comece uma nova classe e adicione alunos</p>
          </Link>
        </div>

        {classes.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Minhas Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Link
                  key={classItem.id}
                  href={`/teacher/classes/${classItem.id}`}
                  className="bg-slate-800 border border-slate-700 hover:border-cyan-600 rounded-lg p-6 transition"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{classItem.name}</h3>
                  {classItem.description && (
                    <p className="text-slate-400 text-sm mb-4">{classItem.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold">
                      {classItem.studentIds?.length || 0} alunos
                    </span>
                    <span className="text-slate-400">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-400 mb-4">Você não tem classes ainda</p>
            <Link
              href="/teacher/classes/create"
              className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
            >
              Criar Primeira Classe
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
