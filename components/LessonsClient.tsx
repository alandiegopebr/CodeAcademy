'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { sampleLessons } from '../data/sampleLessons';
import { completeUserLesson, getLessons, getUserCompletedLessons, getUserXP, type Lesson } from '../lib/firestore';

function readLocalCompletedLessons() {
  if (typeof window === 'undefined') return [];

  try {
    const storage = localStorage.getItem('codeacademy_completed');
    const parsed = storage ? JSON.parse(storage) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export default function LessonsClient() {
  const { user, loading } = useAuthContext();
  const [lessons, setLessons] = useState<Lesson[]>(sampleLessons);
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [savingLessonId, setSavingLessonId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      let items: Lesson[] = sampleLessons;

      try {
        const firestoreLessons = await getLessons();
        if (firestoreLessons.length > 0) {
          items = firestoreLessons;
        }
      } catch {
        if (active) {
          setStatus('Mostrando aulas de exemplo enquanto o Firestore não responde.');
        }
      }

      if (!active) return;
      setLessons(items);

      if (user && !loading) {
        try {
          const [userXP, userCompleted] = await Promise.all([
            getUserXP(user.uid),
            getUserCompletedLessons(user.uid),
          ]);

          if (!active) return;
          setCompleted(userCompleted);
          setPoints(userXP);
        } catch {
          if (!active) return;
          setStatus('Não foi possível carregar seu progresso agora.');
        }
      } else if (!user && !loading) {
        const done = readLocalCompletedLessons();
        const localPoints = done.reduce((acc, id) => {
          const lesson = items.find((item) => item.id === id);
          return acc + (lesson ? lesson.points : 0);
        }, 0);

        setCompleted(done);
        setPoints(localPoints);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [user, loading]);

  const totalPoints = useMemo(() => lessons.reduce((sum, lesson) => sum + lesson.points, 0), [lessons]);
  const completedCount = completed.filter((lessonId) => lessons.some((lesson) => lesson.id === lessonId)).length;
  const progress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  const nextLesson = lessons.find((lesson) => !completed.includes(lesson.id));

  async function completeLesson(lesson: Lesson) {
    if (completed.includes(lesson.id) || savingLessonId) return;

    setSavingLessonId(lesson.id);
    setStatus(null);

    try {
      if (user) {
        const result = await completeUserLesson(user.uid, lesson.id, lesson.points, user.email || '');
        setCompleted(result.completedLessons);
        setPoints(result.totalXP);
        setStatus(result.alreadyCompleted ? 'Essa aula já estava concluída.' : 'Progresso salvo com sucesso.');
      } else {
        const nextCompleted = [...completed, lesson.id];
        setCompleted(nextCompleted);
        setPoints((currentPoints) => currentPoints + lesson.points);

        if (typeof window !== 'undefined') {
          localStorage.setItem('codeacademy_completed', JSON.stringify(nextCompleted));
        }

        setStatus('Progresso salvo neste dispositivo. Entre na conta para sincronizar.');
      }
    } catch {
      setStatus('Não foi possível salvar essa aula. Tente novamente em instantes.');
    } finally {
      setSavingLessonId(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-300">
        Carregando aulas...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 md:col-span-2">
          <p className="text-sm text-slate-400">Progresso da trilha</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <strong className="block text-3xl text-white">{progress}%</strong>
            <span className="text-sm text-slate-400">
              {completedCount}/{lessons.length} aulas
            </span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <p className="text-sm text-slate-400">XP conquistado</p>
          <strong className="mt-2 block text-3xl text-white">
            {points}
            <span className="text-base font-medium text-slate-500"> / {totalPoints}</span>
          </strong>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <p className="text-sm text-slate-400">Próxima aula</p>
          <strong className="mt-2 block text-base text-white">{nextLesson ? nextLesson.title : 'Trilha concluída'}</strong>
        </div>
      </div>

      {status && (
        <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          {status}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
        {lessons.map((lesson, index) => {
          const done = completed.includes(lesson.id);
          const isSaving = savingLessonId === lesson.id;

          return (
            <article
              key={lesson.id}
              className="grid gap-4 border-b border-slate-800 p-5 last:border-b-0 md:grid-cols-[72px_1fr_auto] md:items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-cyan-300">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h2 className="font-semibold text-white">{lesson.title}</h2>
                {lesson.description && <p className="mt-1 text-sm text-slate-400">{lesson.description}</p>}
                <p className="mt-2 text-sm font-medium text-slate-300">{lesson.points} XP</p>
              </div>
              <button
                className="h-10 rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-400"
                onClick={() => completeLesson(lesson)}
                disabled={done || Boolean(savingLessonId)}
              >
                {done ? 'Concluída' : isSaving ? 'Salvando...' : 'Concluir'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
