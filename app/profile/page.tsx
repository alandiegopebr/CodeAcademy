'use client';

import Quiz from '@/components/Quiz';
import { usePreferences } from '@/contexts/PreferencesContext';
import useAuth from '@/hooks/useAuth';
import useXP from '@/hooks/useXP';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { xp, level } = useXP();
  const { preferences, updatePreference } = usePreferences();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleToggleSetting = (key: keyof typeof preferences, value: boolean) => {
    updatePreference(key, value);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.section
          className="section-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="section-label">Seu Espaço</span>
              <h1 className="section-title mt-2">Perfil Pessoal</h1>
              <p className="text-muted mt-3">
                Gerencie suas preferências, acompanhe seu progresso e revise suas conquistas recentes.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Email Registrado</p>
              <p className="text-lg font-semibold text-cyan-400">
                {loading ? 'Carregando...' : user?.email ?? 'Guest'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Profile Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Overview */}
            <motion.section
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="section-subtitle mb-4">Visão Geral da Conta</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-slate-800/50 border border-cyan-500/20 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Nível</p>
                  <p className="text-3xl font-bold text-cyan-400">{level}</p>
                  <p className="text-xs text-slate-500 mt-2">{xp.toLocaleString()} XP</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-slate-800/50 border border-emerald-500/20 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Sequência</p>
                  <p className="text-3xl font-bold text-emerald-400">7</p>
                  <p className="text-xs text-slate-500 mt-2">dias em sequência</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-slate-800/50 border border-violet-500/20 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Modo Foco</p>
                  <p className="text-3xl font-bold text-violet-400">🎯</p>
                  <p className="text-xs text-slate-500 mt-2">Deep Work</p>
                </div>
              </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="section-subtitle mb-4">Ações Rápidas</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/lessons" className="btn btn-primary justify-center">
                  Continuar Aulas
                </Link>
                <Link href="/certificates" className="btn btn-secondary justify-center">
                  Ver Certificados
                </Link>
                <Link href="/become-teacher" className="btn btn-ghost justify-center">
                  Ser Professor
                </Link>
              </div>
            </motion.section>

            {/* Settings */}
            <motion.section
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-subtitle">Preferências</h2>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="text-2xl cursor-pointer hover:scale-110 transition"
                >
                  {settingsOpen ? '✕' : '⚙️'}
                </button>
              </div>

              {settingsOpen && (
                <div className="space-y-4">
                  {/* Email Notifications */}
                  <motion.div
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">📧 Notificações por Email</p>
                      <p className="text-xs text-slate-500 mt-1">Receba atualizações sobre seu progresso</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting('emailNotifications', !preferences.emailNotifications)}
                      className={`w-12 h-6 rounded-full transition ${
                        preferences.emailNotifications
                          ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-700'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white"
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          marginLeft: preferences.emailNotifications ? '1.5rem' : '0.25rem',
                          marginTop: '0.25rem',
                        }}
                      />
                    </button>
                  </motion.div>

                  {/* Dark Mode */}
                  <motion.div
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">🌙 Tema Escuro</p>
                      <p className="text-xs text-slate-500 mt-1">Usar tema escuro por padrão</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting('darkMode', !preferences.darkMode)}
                      className={`w-12 h-6 rounded-full transition ${
                        preferences.darkMode
                          ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-700'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white"
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          marginLeft: preferences.darkMode ? '1.5rem' : '0.25rem',
                          marginTop: '0.25rem',
                        }}
                      />
                    </button>
                  </motion.div>

                  {/* Sound Effects */}
                  <motion.div
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">🔊 Efeitos Sonoros</p>
                      <p className="text-xs text-slate-500 mt-1">Ativar sons de feedback</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting('soundEnabled', !preferences.soundEnabled)}
                      className={`w-12 h-6 rounded-full transition ${
                        preferences.soundEnabled
                          ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-700'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white"
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          marginLeft: preferences.soundEnabled ? '1.5rem' : '0.25rem',
                          marginTop: '0.25rem',
                        }}
                      />
                    </button>
                  </motion.div>

                  {/* Compact Mode */}
                  <motion.div
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">📦 Modo Compacto</p>
                      <p className="text-xs text-slate-500 mt-1">Interface mais condensada</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting('compactMode', !preferences.compactMode)}
                      className={`w-12 h-6 rounded-full transition ${
                        preferences.compactMode
                          ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-700'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white"
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          marginLeft: preferences.compactMode ? '1.5rem' : '0.25rem',
                          marginTop: '0.25rem',
                        }}
                      />
                    </button>
                  </motion.div>

                  {/* Auto Save Progress */}
                  <motion.div
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">💾 Auto-salvar Progresso</p>
                      <p className="text-xs text-slate-500 mt-1">Salvar progresso automaticamente</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting('autoSaveProgress', !preferences.autoSaveProgress)}
                      className={`w-12 h-6 rounded-full transition ${
                        preferences.autoSaveProgress
                          ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-700'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white"
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                          marginLeft: preferences.autoSaveProgress ? '1.5rem' : '0.25rem',
                          marginTop: '0.25rem',
                        }}
                      />
                    </button>
                  </motion.div>

                  {/* Language Preference */}
                  <motion.div
                    className="p-3 rounded-lg hover:bg-slate-800/50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block">
                      <p className="font-semibold text-slate-200 mb-2">🌐 Idioma</p>
                      <select
                        value={preferences.languagePreference}
                        onChange={(e) =>
                          updatePreference('languagePreference', e.target.value as 'pt-BR' | 'en-US')
                        }
                        className="w-full input-field"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                      </select>
                    </label>
                  </motion.div>
                </div>
              )}
            </motion.section>
          </div>

          {/* Sidebar - Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Quiz />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
