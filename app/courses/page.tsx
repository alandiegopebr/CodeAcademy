import { courses as fallbackCourses } from '@/data/courses';
import { getCourses } from '@/lib/firestore';
import Link from 'next/link';

export const metadata = {
  title: 'Courses - CodeAcademy',
  description: 'Browse available learning paths',
};

export default async function CoursesPage() {
  const firebaseCourses = await getCourses();
  const courses = firebaseCourses.length > 0 ? firebaseCourses : fallbackCourses;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-white">Courses</h1>
          <p className="mt-2 text-slate-400">Browse available paths and jump back into your learning.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="block rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-cyan-500 hover:bg-slate-900">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                    <p className="mt-2 text-sm text-slate-400">{course.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                    <span className="rounded-full bg-slate-800 px-3 py-1">{course.progress}</span>
                    <span>{course.duration}</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
