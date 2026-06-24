"use client";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { sampleLessons } from "../data/sampleLessons";
import { db } from "../lib/firebase";
import { addUserXP, getUserCompletedLessons, getUserXP, markLessonComplete } from "../lib/firestore";

type Lesson = {
  id: string;
  title: string;
  description?: string;
  points: number;
};

export default function LessonsClient() {
  const { user, loading } = useAuthContext();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      let items: Lesson[] = sampleLessons;

      try {
        const snap = await getDocs(collection(db, "lessons"));
        if (!snap.empty) {
          items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      } catch (e) {
        // keep sampleLessons as fallback
      }

      setLessons(items);

      // Load user data from Firestore if authenticated
      if (user && !loading) {
        try {
          const userXP = await getUserXP(user.uid);
          const userCompleted = await getUserCompletedLessons(user.uid);
          setCompleted(userCompleted);
          const pts = userCompleted.reduce((acc: number, id: string) => {
            const l = items.find((s) => s.id === id);
            return acc + (l ? l.points : 0);
          }, 0);
          setPoints(userXP);
        } catch (e) {
          console.error("Error loading user data:", e);
        }
      } else if (!user && !loading) {
        // Fallback to localStorage if not authenticated
        const storage = typeof window !== "undefined" ? localStorage.getItem("codeacademy_completed") : null;
        const done = storage ? JSON.parse(storage) : [];
        setCompleted(done);
        const pts = done.reduce((acc: number, id: string) => {
          const l = items.find((s) => s.id === id);
          return acc + (l ? l.points : 0);
        }, 0);
        setPoints(pts);
      }
    }
    load();
  }, [user, loading]);

  async function completeLesson(l: Lesson) {
    if (completed.includes(l.id) || saving) return;
    
    setSaving(true);
    try {
      if (user) {
        // Save to Firestore
        await addUserXP(user.uid, l.points, user.email || '');
        await markLessonComplete(user.uid, l.id);
      }
      
      // Update local state
      const next = [...completed, l.id];
      setCompleted(next);
      setPoints((p) => p + l.points);
      
      // Also save to localStorage as backup
      if (typeof window !== "undefined") {
        localStorage.setItem("codeacademy_completed", JSON.stringify(next));
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center text-gray-400">Carregando aulas...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Aulas disponíveis</h2>
      <div className="mb-4">
        Pontos ganhos: <strong>{points}</strong>
        {user && <span className="ml-2 text-sm text-gray-500">(usuário: {user.email})</span>}
      </div>
      <ul className="space-y-3">
        {lessons.map((l) => (
          <li key={l.id} className="p-3 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{l.title}</div>
                {l.description && <div className="text-sm text-gray-600">{l.description}</div>}
                <div className="text-sm text-gray-700">Pontos: {l.points}</div>
              </div>
              <div>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                  onClick={() => completeLesson(l)}
                  disabled={completed.includes(l.id) || saving}
                >
                  {completed.includes(l.id) ? "Concluída" : saving ? "Salvando..." : "Marcar como concluída"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
