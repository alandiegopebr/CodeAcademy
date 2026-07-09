'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Preferences {
  emailNotifications: boolean;
  darkMode: boolean;
  soundEnabled: boolean;
  compactMode: boolean;
  languagePreference: 'pt-BR' | 'en-US';
  autoSaveProgress: boolean;
}

const defaultPreferences: Preferences = {
  emailNotifications: true,
  darkMode: true,
  soundEnabled: true,
  compactMode: false,
  languagePreference: 'pt-BR',
  autoSaveProgress: true,
};

interface PreferencesContextType {
  preferences: Preferences;
  updatePreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export default function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('codeacademy_preferences');
      if (saved) {
        setPreferences(JSON.parse(saved));
        applyTheme(JSON.parse(saved).darkMode);
      } else {
        applyTheme(defaultPreferences.darkMode);
      }
    } catch (e) {
      console.error('Failed to load preferences:', e);
      applyTheme(defaultPreferences.darkMode);
    }
    setMounted(true);
  }, []);

  const applyTheme = (isDark: boolean) => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (isDark) {
        html.classList.remove('light');
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
      }
    }
  };

  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    
    try {
      localStorage.setItem('codeacademy_preferences', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save preferences:', e);
    }

    // Apply theme change immediately
    if (key === 'darkMode') {
      applyTheme(value as boolean);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    // Return default context if not within provider
    return {
      preferences: defaultPreferences,
      updatePreference: () => {},
    };
  }
  return context;
}
