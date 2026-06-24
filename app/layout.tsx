import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
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
        <AuthProvider>
          <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
