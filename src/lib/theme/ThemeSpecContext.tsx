import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { defaultThemeSpec } from './defaultTheme';
import { loadThemeSpec, saveThemeSpec } from '../storage/themeSpecStorage';
import type { ThemeSpec } from './types';

interface ThemeSpecContextValue {
  spec: ThemeSpec;
  setSpec: (spec: ThemeSpec) => void;
  resetSpec: () => void;
}

const ThemeSpecContext = createContext<ThemeSpecContextValue | null>(null);

export function ThemeSpecProvider({ children }: { children: ReactNode }) {
  const [spec, setSpecState] = useState<ThemeSpec>(() => loadThemeSpec() ?? defaultThemeSpec);

  const setSpec = useCallback((next: ThemeSpec) => {
    setSpecState(next);
    saveThemeSpec(next);
  }, []);

  const resetSpec = useCallback(() => {
    setSpecState(defaultThemeSpec);
    saveThemeSpec(defaultThemeSpec);
  }, []);

  const value = useMemo<ThemeSpecContextValue>(
    () => ({ spec, setSpec, resetSpec }),
    [spec, setSpec, resetSpec],
  );

  return <ThemeSpecContext.Provider value={value}>{children}</ThemeSpecContext.Provider>;
}

export function useThemeSpec(): ThemeSpecContextValue {
  const context = useContext(ThemeSpecContext);
  if (!context) {
    throw new Error('useThemeSpec must be used within a ThemeSpecProvider');
  }
  return context;
}
