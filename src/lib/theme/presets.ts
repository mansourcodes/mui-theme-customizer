import { defaultThemeSpec } from './defaultTheme';
import type { ThemeSpec } from './types';

interface PresetSwatch {
  primary: string;
  secondary: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  colors: PresetSwatch;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      primary: defaultThemeSpec.palette.primary.main,
      secondary: defaultThemeSpec.palette.secondary.main,
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: { primary: '#0277bd', secondary: '#00897b' },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: { primary: '#ef6c00', secondary: '#d81b60' },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: { primary: '#2e7d32', secondary: '#558b2f' },
  },
  {
    id: 'grape',
    name: 'Grape',
    colors: { primary: '#6a1b9a', secondary: '#ab47bc' },
  },
  {
    id: 'rose',
    name: 'Rose',
    colors: { primary: '#c2185b', secondary: '#f06292' },
  },
  {
    id: 'slate',
    name: 'Slate',
    colors: { primary: '#455a64', secondary: '#78909c' },
  },
  {
    id: 'amber',
    name: 'Amber',
    colors: { primary: '#ff8f00', secondary: '#ffca28' },
  },
  {
    id: 'mint',
    name: 'Mint',
    colors: { primary: '#00897b', secondary: '#26a69a' },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    colors: { primary: '#3949ab', secondary: '#5c6bc0' },
  },
  {
    id: 'coral',
    name: 'Coral',
    colors: { primary: '#e64a19', secondary: '#ff7043' },
  },
  {
    id: 'crimson',
    name: 'Crimson',
    colors: { primary: '#b71c1c', secondary: '#c62828' },
  },
];

/**
 * Presets only touch primary/secondary `main` — the user's typography/shape/
 * size choices and other palette fields (including any custom contrastText
 * override) are preserved... except a manual contrastText override on
 * primary/secondary itself is reset to MUI's auto-computed value, since it
 * was picked for the old main color and may no longer read well.
 */
export function applyThemePreset(spec: ThemeSpec, preset: ThemePreset): ThemeSpec {
  return {
    ...spec,
    palette: {
      ...spec.palette,
      primary: { main: preset.colors.primary },
      secondary: { main: preset.colors.secondary },
    },
  };
}
