'use client';

import useAuth from '@/hooks/useAuth';
import { createActivity, getClassActivities, getClassLeaderboard, getStudentsInClass } from '@/lib/firestore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Student {
  uid: string;
  email: string;
  displayName?: string;
  totalXP?: number;
}

interface Activity {
  id: string;
  title: string;
  description?: string;
  points: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
}

export default function ClassPage() {
  const { user, loading } = useAuth();
  const params = useParams();
  const classId = params.classId as string;
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [activityForm, setActivityForm] = useState({ title: '', description: '', points: 10 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loading || !user) return;

    const loadClassData = async () => {
      try {
        const [studentsData, activitiesData, leaderboardData] = await Promise.all([
          getStudentsInClass(classId),
          getClassActivities(classId),
          getClassLeaderboard(classId),
        ]);

        setStudents(studentsData);
        setActivities(activitiesData);
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error loading class data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadClassData();
  }, [classId, user, loading]);

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const activityId = await createActivity(
        classId,
        activityForm.title,
        activityForm.description,
        activityForm.points,
        user!.uid
      );

      if (activityId) {
        setActivities([
          { id: activityId, ...activityForm },
          ...activities,
        ]);
        setActivityForm({ title: '', description: '', points: 10 });
        setShowCreateActivity(false);
      }
    } catch (error) {
      console.error('Error creating activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-300">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/teacher" className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
          ← Voltar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Classe</h1>
              <p className="text-slate-300">{students.length} alunos</p>
            </div>

            {/* Atividades */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Atividades</h2>
                <button
                  onClick={() => setShowCreateActivity(!showCreateActivity)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
                >
                  {showCreateActivity ? '✕ Cancelar' : '+ Nova Atividade'}
                </button>
              </div>

              {showCreateActivity && (
                <form onSubmit={handleCreateActivity} className="mb-6 p-4 bg-slate-800 rounded-lg space-y-4">
                  <input
                    type="text"
                    value={activityForm.title}
                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                    placeholder="Título da atividade"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    required
                    disabled={isSubmitting}
                  />
                  <textarea
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                    placeholder="Descrição (opcional)"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    disabled={isSubmitting}
                  />
                  <input
                    type="number"
                    value={activityForm.points}
                    onChange={(e) => setActivityForm({ ...activityForm, points: parseInt(e.target.value) })}
                    placeholder="Pontos"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    min="1"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white rounded transition"
                  >
                    {isSubmitting ? 'Criando...' : 'Criar Atividade'}
                  </button>
                </form>
              )}

              {activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <h3 className="font-semibold text-white">{activity.title}</h3>
                      {activity.description && (
                        <p className="text-slate-400 text-sm mt-1">{activity.description}</p>
                      )}
                      <div className="mt-2 text-cyan-400 text-sm">{activity.points} XP</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">Nenhuma atividade criada</p>
              )}
            </div>

            {/* Alunos */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Alunos</h2>
              {students.length > 0 ? (
                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.uid} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-white">{student.displayName || student.email}</p>
                        <p className="text-slate-400 text-sm">{student.email}</p>
                      </div>
                      <div className="text-cyan-400 font-semibold">{student.totalXP || 0} XP</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">Nenhum aluno na classe</p>
              )}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-4">Placar da Classe</h2>
            {leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-semibold w-6">{entry.rank}</span>
                      <span className="text-white">{entry.name}</span>
                    </div>
                    <span className="text-cyan-400 font-semibold">{entry.xp}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-4 text-sm">Nenhum dado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
