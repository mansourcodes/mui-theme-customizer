import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { defaultThemeSpec } from './defaultTheme';
import type { ThemeSpec } from './types';

interface ThemeSpecContextValue {
  spec: ThemeSpec;
  setSpec: (spec: ThemeSpec) => void;
  resetSpec: () => void;
}

const ThemeSpecContext = createContext<ThemeSpecContextValue | null>(null);

// The in-progress spec is in-memory only — it does not persist across
// reloads. The only way to keep a theme is the explicit "Hold to save
// theme" action (ThemesSidebar), which writes a named copy to
// savedThemesStorage. Reloading without saving always starts fresh from
// defaultThemeSpec.
export function ThemeSpecProvider({ children }: { children: ReactNode }) {
  const [spec, setSpecState] = useState<ThemeSpec>(defaultThemeSpec);

  const setSpec = useCallback((next: ThemeSpec) => {
    setSpecState(next);
  }, []);

  const resetSpec = useCallback(() => {
    setSpecState(defaultThemeSpec);
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
