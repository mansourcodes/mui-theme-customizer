export type PaletteMode = 'light' | 'dark';

/** Mirrors MUI's own `PaletteColorOptions` shape — `contrastText` left unset means MUI auto-computes it from `main`. */
export interface PaletteColorSpec {
  main: string;
  contrastText?: string;
}

export interface ModePalette {
  primary: PaletteColorSpec;
  secondary: PaletteColorSpec;
  error: PaletteColorSpec;
  warning: PaletteColorSpec;
  info: PaletteColorSpec;
  success: PaletteColorSpec;
  background: {
    default: string;
    paper: string;
  };
  /** MUI's `palette.divider` token — used for borders (the "300" base swatch). */
  divider: string;
  text: {
    primary: string;
    secondary: string;
  };
}

export interface TypographySpec {
  /** A single Google Fonts family name, e.g. "Roboto" — buildMuiTheme appends the CSS fallback stack. */
  fontFamily: string;
  baseFontSize: number;
  headingScale: number;
}

export interface ShapeSpec {
  /** Card, Dialog, Alert */
  boxRadius: number;
  /** Button, TextField/Select input */
  fieldRadius: number;
  /** Chip, Badge, Switch, Checkbox/Radio icon */
  selectorRadius: number;
  /** Outlined variant border width (Button, TextField) */
  borderWidth: number;
}

export interface SizeSpec {
  /** Base height in px for Button, TextField/Select input, Tabs */
  fieldSize: number;
  /** Base size in px for Chip, Badge, Switch, Checkbox/Radio icon */
  selectorSize: number;
}

export interface ThemeSpec {
  /** Display name shown in the Name row and used when saving to My themes */
  name: string;
  /** Only affects the `mode` value in the exported code — does not change the palette below. */
  mode: PaletteMode;
  palette: ModePalette;
  typography: TypographySpec;
  shape: ShapeSpec;
  size: SizeSpec;
}
