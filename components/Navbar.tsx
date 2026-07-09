'use client';

import useAuth from '@/hooks/useAuth';
import { isAdmin } from '@/lib/admin';
import { getTeacherStatus } from '@/lib/firestore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Cursos', href: '/courses' },
  { label: 'Aulas', href: '/lessons' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Perfil', href: '/profile' },
];

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isTeacher, setIsTeacher] = useState(false);
  const [isTeacherLoading, setIsTeacherLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showAdmin = !loading && !!user && isAdmin(user);

  useEffect(() => {
    if (!user || loading) return;

    const checkTeacherStatus = async () => {
      const teacherStatus = await getTeacherStatus(user.uid);
      setIsTeacher(teacherStatus?.status === 'approved');
      setIsTeacherLoading(false);
    };

    checkTeacherStatus();
  }, [user, loading]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-bold gradient-text">
              CodeAcademy
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.href}>
                <Link
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-cyan-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
                      layoutId="underline"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Teacher Link */}
            {isTeacher && (
              <motion.div>
                <Link
                  href="/teacher"
                  className="relative text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Professor
                </Link>
              </motion.div>
            )}

            {/* Admin Link */}
            {showAdmin && (
              <motion.div>
                <Link
                  href="/admin"
                  className="relative text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  Admin
                </Link>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {!loading && user ? (
              <>
                <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 lg:inline-block">
                  {user.email ?? 'Learner'}
                </span>
                <motion.button
                  onClick={handleSignOut}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sair
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost hidden sm:flex">
                  Entrar
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Registrar
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`h-0.5 w-6 bg-slate-300 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-6 bg-slate-300 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-6 bg-slate-300 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 space-y-3 border-t border-slate-800 pt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isTeacher && (
              <Link
                href="/teacher"
                className="block px-3 py-2 rounded-lg text-yellow-400 hover:bg-slate-800/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Professor
              </Link>
            )}
            {showAdmin && (
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-lg text-red-400 hover:bg-slate-800/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
