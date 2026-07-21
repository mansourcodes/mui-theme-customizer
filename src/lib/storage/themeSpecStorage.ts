import type { ModePalette, ThemeSpec } from '../theme/types';
import { THEME_SPEC_STORAGE_KEY } from './keys';

function isModePalette(value: unknown): value is ModePalette {
  if (typeof value !== 'object' || value === null) return false;
  const palette = value as Record<string, unknown>;
  const colorKeys = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
  if (!colorKeys.every((key) => typeof palette[key] === 'string')) return false;

  const background = palette.background as Record<string, unknown> | undefined;
  if (typeof background !== 'object' || background === null) return false;
  if (typeof background.default !== 'string' || typeof background.paper !== 'string') return false;

  const text = palette.text as Record<string, unknown> | undefined;
  if (typeof text !== 'object' || text === null) return false;
  if (typeof text.primary !== 'string' || typeof text.secondary !== 'string') return false;

  return true;
}

export function isThemeSpec(value: unknown): value is ThemeSpec {
  if (typeof value !== 'object' || value === null) return false;
  const spec = value as Record<string, unknown>;

  if (typeof spec.name !== 'string') return false;
  if (spec.mode !== 'light' && spec.mode !== 'dark') return false;

  const palettes = spec.palettes as Record<string, unknown> | undefined;
  if (typeof palettes !== 'object' || palettes === null) return false;
  if (!isModePalette(palettes.light) || !isModePalette(palettes.dark)) return false;

  const typography = spec.typography as Record<string, unknown> | undefined;
  if (typeof typography !== 'object' || typography === null) return false;
  if (typeof typography.fontFamily !== 'string') return false;
  if (typeof typography.baseFontSize !== 'number') return false;
  if (typeof typography.headingScale !== 'number') return false;

  const shape = spec.shape as Record<string, unknown> | undefined;
  if (typeof shape !== 'object' || shape === null) return false;
  if (typeof shape.boxRadius !== 'number') return false;
  if (typeof shape.fieldRadius !== 'number') return false;
  if (typeof shape.selectorRadius !== 'number') return false;
  if (typeof shape.borderWidth !== 'number') return false;

  const size = spec.size as Record<string, unknown> | undefined;
  if (typeof size !== 'object' || size === null) return false;
  if (typeof size.fieldSize !== 'number') return false;
  if (typeof size.selectorSize !== 'number') return false;

  return true;
}

export function loadThemeSpec(): ThemeSpec | null {
  try {
    const raw = localStorage.getItem(THEME_SPEC_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isThemeSpec(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveThemeSpec(spec: ThemeSpec): void {
  try {
    localStorage.setItem(THEME_SPEC_STORAGE_KEY, JSON.stringify(spec));
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded) — persistence is best-effort
  }
}
