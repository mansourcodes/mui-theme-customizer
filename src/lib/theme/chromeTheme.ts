import { createTheme } from '@mui/material/styles';

/**
 * The customizer's own chrome (navbar, sidebar, panel) always renders with
 * this fixed theme, independent of the in-progress ThemeSpec — otherwise the
 * app you're editing in would re-skin itself on every color/shape/size edit.
 * Only `PreviewArea` renders with the spec-driven theme (see buildMuiTheme).
 */
export const chromeTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
