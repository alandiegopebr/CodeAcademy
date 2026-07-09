import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import PreferencesProvider from '@/contexts/PreferencesContext';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeAcademy',
  description: 'A learning platform with courses, dashboards, and AI tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PreferencesProvider>
          <AuthProvider>
            <div className="min-h-screen bg-transparent text-slate-100">
              <Navbar />
              <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
            </div>
          </AuthProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
