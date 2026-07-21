import type { ModePalette, ThemeSpec } from './types';

const lightPalette: ModePalette = {
  primary: '#1976d2',
  secondary: '#9c27b0',
  error: '#d32f2f',
  warning: '#ed6c02',
  info: '#0288d1',
  success: '#2e7d32',
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
};

const darkPalette: ModePalette = {
  primary: '#90caf9',
  secondary: '#ce93d8',
  error: '#f44336',
  warning: '#ffa726',
  info: '#29b6f6',
  success: '#66bb6a',
  background: {
    default: '#121212',
    paper: '#121212',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
  },
};

export const defaultThemeSpec: ThemeSpec = {
  name: 'my theme',
  mode: 'light',
  palettes: {
    light: lightPalette,
    dark: darkPalette,
  },
  typography: {
    fontFamily: 'Roboto',
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
