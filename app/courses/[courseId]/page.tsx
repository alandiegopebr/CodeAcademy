import { courseDetails } from '@/data/courses';
import { getCourseById } from '@/lib/firestore';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { courseId: string } }) {
  const firebaseCourse = await getCourseById(params.courseId);
  const course = firebaseCourse || courseDetails[params.courseId];
  return {
    title: course ? `${course.title} - CodeAcademy` : 'Course - CodeAcademy',
  };
}

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const firebaseCourse = await getCourseById(params.courseId);
  const course = firebaseCourse || courseDetails[params.courseId];

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
        <h1 className="text-4xl font-semibold text-white">{course.title}</h1>
        <p className="mt-4 text-slate-300">{course.description}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Overview</h2>
            <p className="mt-3 text-sm text-slate-400">A complete path that includes videos, quizzes, and hands-on projects to build real-world skills.</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Lessons:</strong> {course.lessons}</p>
            </div>
          </section>
          <section className="rounded-3xl bg-slate-950/70 p-6">
            <h2 className="text-lg font-semibold text-white">Next lesson</h2>
            <p className="mt-3 text-sm text-slate-400">Continue with responsive layout patterns and interactive UI components.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
