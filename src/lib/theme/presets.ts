import { defaultThemeSpec } from './defaultTheme';
import type { ModePalette, PaletteMode, ThemeSpec } from './types';

type PresetSwatch = Pick<ModePalette, 'primary' | 'secondary'>;

export interface ThemePreset {
  id: string;
  name: string;
  colors: Record<PaletteMode, PresetSwatch>;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      light: { primary: defaultThemeSpec.palettes.light.primary, secondary: defaultThemeSpec.palettes.light.secondary },
      dark: { primary: defaultThemeSpec.palettes.dark.primary, secondary: defaultThemeSpec.palettes.dark.secondary },
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      light: { primary: '#0277bd', secondary: '#00897b' },
      dark: { primary: '#4fc3f7', secondary: '#4db6ac' },
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      light: { primary: '#ef6c00', secondary: '#d81b60' },
      dark: { primary: '#ffb74d', secondary: '#f06292' },
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      light: { primary: '#2e7d32', secondary: '#558b2f' },
      dark: { primary: '#81c784', secondary: '#aed581' },
    },
  },
  {
    id: 'grape',
    name: 'Grape',
    colors: {
      light: { primary: '#6a1b9a', secondary: '#ab47bc' },
      dark: { primary: '#ce93d8', secondary: '#e1bee7' },
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    colors: {
      light: { primary: '#c2185b', secondary: '#f06292' },
      dark: { primary: '#f48fb1', secondary: '#f8bbd0' },
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    colors: {
      light: { primary: '#455a64', secondary: '#78909c' },
      dark: { primary: '#b0bec5', secondary: '#cfd8dc' },
    },
  },
  {
    id: 'amber',
    name: 'Amber',
    colors: {
      light: { primary: '#ff8f00', secondary: '#ffca28' },
      dark: { primary: '#ffca28', secondary: '#ffe082' },
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    colors: {
      light: { primary: '#00897b', secondary: '#26a69a' },
      dark: { primary: '#4db6ac', secondary: '#80cbc4' },
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    colors: {
      light: { primary: '#3949ab', secondary: '#5c6bc0' },
      dark: { primary: '#7986cb', secondary: '#9fa8da' },
    },
  },
  {
    id: 'coral',
    name: 'Coral',
    colors: {
      light: { primary: '#e64a19', secondary: '#ff7043' },
      dark: { primary: '#ff8a65', secondary: '#ffab91' },
    },
  },
  {
    id: 'crimson',
    name: 'Crimson',
    colors: {
      light: { primary: '#b71c1c', secondary: '#c62828' },
      dark: { primary: '#e57373', secondary: '#ef9a9a' },
    },
  },
];

/** Presets only touch primary/secondary — the user's typography/shape/size choices and other palette fields are preserved. */
export function applyThemePreset(spec: ThemeSpec, preset: ThemePreset): ThemeSpec {
  return {
    ...spec,
    palettes: {
      light: { ...spec.palettes.light, ...preset.colors.light },
      dark: { ...spec.palettes.dark, ...preset.colors.dark },
    },
  };
}
