import type { ThemeSpec } from './types';

export interface ThemePreset {
  id: string;
  name: string;
  /**
   * Everything a preset controls — `name` is excluded since that's the
   * user's own display name, and `typography` is excluded since font
   * choice is left to the user/default rather than switched per preset.
   */
  spec: Omit<ThemeSpec, 'name' | 'typography'>;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'brick',
    name: 'Brick',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#9d2f3a' },
        secondary: { main: '#c6ad53' },
        error: { main: '#ba2e2c' },
        warning: { main: '#de6b12' },
        info: { main: '#236cb8' },
        success: { main: '#328536' },
        background: { default: '#faf7f7', paper: '#fdfcfc' },
        divider: 'rgba(88, 65, 67, 0.12)',
        text: { primary: 'rgba(41, 31, 32, 0.87)', secondary: 'rgba(107, 87, 89, 0.75)' },
      },
      shape: { boxRadius: 8, fieldRadius: 4, selectorRadius: 4, borderWidth: 2 },
      size: { fieldSize: 40, selectorSize: 22 },
    },
  },
  {
    id: 'clay',
    name: 'Clay',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#b75a24' },
        secondary: { main: '#abce4b' },
        error: { main: '#ba372c' },
        warning: { main: '#de7a12' },
        info: { main: '#236cb8' },
        success: { main: '#328536' },
        background: { default: '#faf8f7', paper: '#fdfcfc' },
        divider: 'rgba(88, 73, 65, 0.12)',
        text: { primary: 'rgba(41, 34, 31, 0.87)', secondary: 'rgba(107, 94, 87, 0.75)' },
      },
      shape: { boxRadius: 16, fieldRadius: 16, selectorRadius: 16, borderWidth: 1 },
      size: { fieldSize: 44, selectorSize: 24 },
    },
  },
  {
    id: 'harvest',
    name: 'Harvest',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#ae852d' },
        secondary: { main: '#7aa338' },
        error: { main: '#ba3e2c' },
        warning: { main: '#de8312' },
        info: { main: '#2392b8' },
        success: { main: '#328536' },
        background: { default: '#faf9f7', paper: '#fdfdfc' },
        divider: 'rgba(88, 81, 65, 0.12)',
        text: { primary: 'rgba(41, 38, 31, 0.87)', secondary: 'rgba(107, 100, 87, 0.75)' },
      },
      shape: { boxRadius: 8, fieldRadius: 8, selectorRadius: 8, borderWidth: 1 },
      size: { fieldSize: 40, selectorSize: 22 },
    },
  },
  {
    id: 'olive',
    name: 'Olive',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#abab2b' },
        secondary: { main: '#4eb323' },
        error: { main: '#ba3f2c' },
        warning: { main: '#de8d12' },
        info: { main: '#2392b8' },
        success: { main: '#328536' },
        background: { default: '#fafaf7', paper: '#fdfdfc' },
        divider: 'rgba(88, 88, 65, 0.12)',
        text: { primary: 'rgba(41, 41, 31, 0.87)', secondary: 'rgba(107, 107, 87, 0.75)' },
      },
      shape: { boxRadius: 16, fieldRadius: 16, selectorRadius: 16, borderWidth: 1 },
      size: { fieldSize: 44, selectorSize: 26 },
    },
  },
  {
    id: 'meadow',
    name: 'Meadow',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#6ba62b' },
        secondary: { main: '#3dbd59' },
        error: { main: '#ba3f2c' },
        warning: { main: '#de9312' },
        info: { main: '#2392b8' },
        success: { main: '#328538' },
        background: { default: '#f9faf7', paper: '#fcfdfc' },
        divider: 'rgba(77, 88, 65, 0.12)',
        text: { primary: 'rgba(36, 41, 31, 0.87)', secondary: 'rgba(97, 107, 87, 0.75)' },
      },
      shape: { boxRadius: 8, fieldRadius: 8, selectorRadius: 8, borderWidth: 1 },
      size: { fieldSize: 40, selectorSize: 22 },
    },
  },
  {
    id: 'fern',
    name: 'Fern',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#27a529' },
        secondary: { main: '#45c9be' },
        error: { main: '#ba3f2c' },
        warning: { main: '#de9312' },
        info: { main: '#2392b8' },
        success: { main: '#32853e' },
        background: { default: '#f7faf7', paper: '#fcfdfc' },
        divider: 'rgba(65, 88, 65, 0.12)',
        text: { primary: 'rgba(31, 41, 31, 0.87)', secondary: 'rgba(87, 107, 88, 0.75)' },
      },
      shape: { boxRadius: 16, fieldRadius: 8, selectorRadius: 8, borderWidth: 1 },
      size: { fieldSize: 42, selectorSize: 24 },
    },
  },
  {
    id: 'jade',
    name: 'Jade',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#20b15f' },
        secondary: { main: '#45a7c4' },
        error: { main: '#ba3f2c' },
        warning: { main: '#de9312' },
        info: { main: '#2392b8' },
        success: { main: '#328544' },
        background: { default: '#f7faf8', paper: '#fcfdfc' },
        divider: 'rgba(65, 88, 75, 0.12)',
        text: { primary: 'rgba(31, 41, 35, 0.87)', secondary: 'rgba(87, 107, 96, 0.75)' },
      },
      shape: { boxRadius: 16, fieldRadius: 16, selectorRadius: 8, borderWidth: 1 },
      size: { fieldSize: 40, selectorSize: 22 },
    },
  },
  {
    id: 'lagoon',
    name: 'Lagoon',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#25a78b' },
        secondary: { main: '#4279b3' },
        error: { main: '#ba3f2c' },
        warning: { main: '#de9312' },
        info: { main: '#238cb8' },
        success: { main: '#328548' },
        background: { default: '#f7fafa', paper: '#fcfdfd' },
        divider: 'rgba(65, 88, 83, 0.12)',
        text: { primary: 'rgba(31, 41, 39, 0.87)', secondary: 'rgba(87, 107, 102, 0.75)' },
      },
      shape: { boxRadius: 16, fieldRadius: 16, selectorRadius: 16, borderWidth: 1 },
      size: { fieldSize: 44, selectorSize: 24 },
    },
  },
  {
    id: 'lake',
    name: 'Lake',
    spec: {
      mode: 'dark',
      palette: {
        primary: { main: '#69b7d3' },
        secondary: { main: '#6a64d8' },
        error: { main: '#e25a5f' },
        warning: { main: '#ebba47' },
        info: { main: '#5fafdd' },
        success: { main: '#59c07a' },
        background: { default: '#12191c', paper: '#1b2427' },
        divider: 'rgba(163, 186, 194, 0.14)',
        text: { primary: 'rgba(240, 243, 245, 0.87)', secondary: 'rgba(198, 207, 210, 0.72)' },
      },
      shape: { boxRadius: 8, fieldRadius: 8, selectorRadius: 8, borderWidth: 1 },
      size: { fieldSize: 40, selectorSize: 22 },
    },
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    spec: {
      mode: 'dark',
      palette: {
        primary: { main: '#648bd8' },
        secondary: { main: '#a95fdd' },
        error: { main: '#e25a5f' },
        warning: { main: '#eb9947' },
        info: { main: '#5fa7dd' },
        success: { main: '#59c07a' },
        background: { default: '#12151c', paper: '#1b1f27' },
        divider: 'rgba(163, 173, 194, 0.14)',
        text: { primary: 'rgba(240, 241, 245, 0.87)', secondary: 'rgba(198, 202, 210, 0.72)' },
      },
      shape: { boxRadius: 8, fieldRadius: 8, selectorRadius: 8, borderWidth: 1 },
      size: { fieldSize: 42, selectorSize: 22 },
    },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    spec: {
      mode: 'dark',
      palette: {
        primary: { main: '#5f6cdd' },
        secondary: { main: '#d75fdd' },
        error: { main: '#e25a5f' },
        warning: { main: '#eb9947' },
        info: { main: '#5fa1dd' },
        success: { main: '#59c07a' },
        background: { default: '#12121c', paper: '#1c1b27' },
        divider: 'rgba(164, 163, 194, 0.14)',
        text: { primary: 'rgba(240, 240, 245, 0.87)', secondary: 'rgba(198, 198, 210, 0.72)' },
      },
      shape: { boxRadius: 16, fieldRadius: 16, selectorRadius: 16, borderWidth: 1 },
      size: { fieldSize: 44, selectorSize: 24 },
    },
  },
  {
    id: 'violet',
    name: 'Violet',
    spec: {
      mode: 'dark',
      palette: {
        primary: { main: '#9b69d3' },
        secondary: { main: '#d3699e' },
        error: { main: '#e25a5f' },
        warning: { main: '#eb9947' },
        info: { main: '#5f9ddd' },
        success: { main: '#59c07a' },
        background: { default: '#18121c', paper: '#221b27' },
        divider: 'rgba(181, 163, 194, 0.14)',
        text: { primary: 'rgba(243, 240, 245, 0.87)', secondary: 'rgba(205, 198, 210, 0.72)' },
      },
      shape: { boxRadius: 8, fieldRadius: 4, selectorRadius: 4, borderWidth: 1 },
      size: { fieldSize: 40, selectorSize: 20 },
    },
  },
  {
    id: 'orchid',
    name: 'Orchid',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#ab24b7' },
        secondary: { main: '#d24665' },
        error: { main: '#ba2c35' },
        warning: { main: '#de6a12' },
        info: { main: '#236cb8' },
        success: { main: '#32854b' },
        background: { default: '#faf7fa', paper: '#fdfcfd' },
        divider: 'rgba(86, 65, 88, 0.12)',
        text: { primary: 'rgba(40, 31, 41, 0.87)', secondary: 'rgba(105, 87, 107, 0.75)' },
      },
      shape: { boxRadius: 16, fieldRadius: 16, selectorRadius: 16, borderWidth: 1 },
      size: { fieldSize: 46, selectorSize: 26 },
    },
  },
  {
    id: 'magenta',
    name: 'Magenta',
    spec: {
      mode: 'light',
      palette: {
        primary: { main: '#9f1d74' },
        secondary: { main: '#c13f33' },
        error: { main: '#ba2c35' },
        warning: { main: '#de6a12' },
        info: { main: '#236cb8' },
        success: { main: '#328536' },
        background: { default: '#faf7f9', paper: '#fdfcfd' },
        divider: 'rgba(88, 65, 80, 0.12)',
        text: { primary: 'rgba(41, 31, 37, 0.87)', secondary: 'rgba(107, 87, 100, 0.75)' },
      },
      shape: { boxRadius: 8, fieldRadius: 8, selectorRadius: 8, borderWidth: 2 },
      size: { fieldSize: 42, selectorSize: 22 },
    },
  },
  {
    id: 'berry',
    name: 'Berry',
    spec: {
      mode: 'dark',
      palette: {
        primary: { main: '#d36989' },
        secondary: { main: '#d3a269' },
        error: { main: '#e25c5a' },
        warning: { main: '#eb9947' },
        info: { main: '#5f9ddd' },
        success: { main: '#59c060' },
        background: { default: '#1c1215', paper: '#271b1f' },
        divider: 'rgba(194, 163, 172, 0.14)',
        text: { primary: 'rgba(245, 240, 241, 0.87)', secondary: 'rgba(210, 198, 202, 0.72)' },
      },
      shape: { boxRadius: 4, fieldRadius: 4, selectorRadius: 4, borderWidth: 1 },
      size: { fieldSize: 40, selectorSize: 20 },
    },
  },
];

/**
 * A preset carries palette (incl. semantic colors, background, divider,
 * text), shape, size, and mode — applying one replaces all of that outright
 * rather than merging. The user's own display `name` and current
 * `typography` both survive the switch — presets never change font choice.
 */
export function applyThemePreset(spec: ThemeSpec, preset: ThemePreset): ThemeSpec {
  return {
    ...preset.spec,
    name: spec.name,
    typography: spec.typography,
  };
}
