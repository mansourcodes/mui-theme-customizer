import type { ThemeSpec } from '../theme/types';
import { isThemeSpec } from './themeSpecStorage';
import { SAVED_THEMES_STORAGE_KEY } from './keys';

export interface SavedTheme {
  id: string;
  name: string;
  spec: ThemeSpec;
}

function isSavedTheme(value: unknown): value is SavedTheme {
  if (typeof value !== 'object' || value === null) return false;
  const theme = value as Record<string, unknown>;
  return typeof theme.id === 'string' && typeof theme.name === 'string' && isThemeSpec(theme.spec);
}

export function loadSavedThemes(): SavedTheme[] {
  try {
    const raw = localStorage.getItem(SAVED_THEMES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedTheme);
  } catch {
    return [];
  }
}

export function saveSavedThemes(themes: SavedTheme[]): void {
  try {
    localStorage.setItem(SAVED_THEMES_STORAGE_KEY, JSON.stringify(themes));
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded) — persistence is best-effort
  }
}
