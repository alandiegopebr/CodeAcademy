import CourseCard from '@/components/CourseCard';
import { courses as fallbackCourses } from '@/data/courses';
import { getCourses } from '@/lib/firestore';
import Link from 'next/link';

export const metadata = {
  title: 'Cursos - CodeAcademy',
  description: 'Explore trilhas de aprendizagem',
};

export default async function CoursesPage() {
  const firebaseCourses = await getCourses();
  const courses = firebaseCourses.length > 0 ? firebaseCourses : fallbackCourses;

  // Group courses by level
  const courseLevels = {
    'Iniciante': courses.filter(c => !c.level || c.level === 'Iniciante'),
    'Intermediário': courses.filter(c => c.level === 'Intermediário'),
    'Avançado': courses.filter(c => c.level === 'Avançado'),
  };

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <section className="section-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="section-label">Explorar</span>
              <h1 className="section-title mt-2">Trilhas de Aprendizagem</h1>
              <p className="text-muted mt-3 max-w-2xl">
                Escolha um caminho para evoluir com foco em tecnologia, produtividade e desenvolvimento profissional. Ganhe XP, suba de level e conquiste certificados.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
              📚 {courses.length} cursos
            </div>
          </div>
        </section>

        {/* Beginner Courses */}
        {courseLevels['Iniciante'].length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white mb-2">
                <span className="badge badge-success">INICIANTE</span>
              </h2>
              <p className="text-muted">Comece do zero e aprenda os fundamentos</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseLevels['Iniciante'].map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  progress={course.progress}
                  duration={course.duration}
                  lessons={course.lessons}
                  level="Iniciante"
                  icon="🎯"
                />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate Courses */}
        {courseLevels['Intermediário'].length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white mb-2">
                <span className="badge badge-warning">INTERMEDIÁRIO</span>
              </h2>
              <p className="text-muted">Aprofunde seus conhecimentos e construa projetos reais</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseLevels['Intermediário'].map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  progress={course.progress}
                  duration={course.duration}
                  lessons={course.lessons}
                  level="Intermediário"
                  icon="📈"
                />
              ))}
            </div>
          </section>
        )}

        {/* Advanced Courses */}
        {courseLevels['Avançado'].length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white mb-2">
                <span className="badge badge-danger">AVANÇADO</span>
              </h2>
              <p className="text-muted">Domine técnicas avançadas e torne-se especialista</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseLevels['Avançado'].map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  progress={course.progress}
                  duration={course.duration}
                  lessons={course.lessons}
                  level="Avançado"
                  icon="🚀"
                />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-container bg-gradient-to-br from-cyan-500/10 to-slate-900/80">
          <div className="text-center space-y-4">
            <h3 className="section-subtitle">Pronto para começar?</h3>
            <p className="text-muted max-w-xl mx-auto">
              Escolha um curso e comece sua jornada de aprendizado. Você pode pausar a qualquer momento e continuar depois.
            </p>
            <Link href="/dashboard" className="btn btn-primary inline-flex">
              Ir para Dashboard →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
