import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { dictionaries, type Dictionary, type LanguageCode } from './dictionaries';
import { loadLanguage, saveLanguage } from '../storage/languageStorage';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => loadLanguage() ?? 'en');

  const setLanguage = useCallback((next: LanguageCode) => {
    setLanguageState(next);
    saveLanguage(next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, dictionary: dictionaries[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
