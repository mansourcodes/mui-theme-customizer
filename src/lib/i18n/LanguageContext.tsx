import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { loadLanguage, saveLanguage } from '../storage/languageStorage';

export type LanguageCode = 'en' | 'ar';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds only the preview area's direction preference ('en' = LTR, 'ar' = RTL
 * with Arabic-text cards) — the customizer's own chrome always stays English/LTR
 * regardless of this value (see architecture.md Invariant 4).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => loadLanguage() ?? 'en');

  const setLanguage = useCallback((next: LanguageCode) => {
    setLanguageState(next);
    saveLanguage(next);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
