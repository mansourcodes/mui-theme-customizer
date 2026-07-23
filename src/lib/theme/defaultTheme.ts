import type { ModePalette, ThemeSpec } from './types';

const lightPalette: ModePalette = {
  primary: { main: '#1976d2' },
  secondary: { main: '#9c27b0' },
  error: { main: '#d32f2f' },
  warning: { main: '#ed6c02' },
  info: { main: '#0288d1' },
  success: { main: '#2e7d32' },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
};

export const defaultThemeSpec: ThemeSpec = {
  name: 'my theme',
  mode: 'light',
  palette: lightPalette,
  typography: {
    fontFamily: 'Albert Sans',
    baseFontSize: 14,
    headingScale: 1,
  },
  shape: {
    boxRadius: 4,
    fieldRadius: 4,
    selectorRadius: 4,
    borderWidth: 1,
  },
  size: {
    fieldSize: 40,
    selectorSize: 24,
  },
};
