import { createTheme, type Theme, type ThemeOptions, type TypographyVariantsOptions } from '@mui/material/styles';
import { isValidCssColor } from './colorContrast';
import { defaultThemeSpec } from './defaultTheme';
import type { ModePalette, ShapeSpec, SizeSpec, ThemeSpec } from './types';

const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

/**
 * Every palette color — swatches, background, and text — can flow through
 * MUI's alpha()/lighten()/darken() (e.g. text.primary is used to derive
 * divider and hover-overlay colors), which throws on an unparseable string.
 * Editors commit on every keystroke, so a mid-edit value like "#f" must not
 * crash the app — fall back to the default color until it's valid again.
 */
function sanitizeColor(value: string, fallback: string): string {
  return isValidCssColor(value) ? value : fallback;
}

function sanitizePalette(palette: ModePalette, fallback: ModePalette): ModePalette {
  return {
    primary: sanitizeColor(palette.primary, fallback.primary),
    secondary: sanitizeColor(palette.secondary, fallback.secondary),
    error: sanitizeColor(palette.error, fallback.error),
    warning: sanitizeColor(palette.warning, fallback.warning),
    info: sanitizeColor(palette.info, fallback.info),
    success: sanitizeColor(palette.success, fallback.success),
    background: {
      default: sanitizeColor(palette.background.default, fallback.background.default),
      paper: sanitizeColor(palette.background.paper, fallback.background.paper),
    },
    text: {
      primary: sanitizeColor(palette.text.primary, fallback.text.primary),
      secondary: sanitizeColor(palette.text.secondary, fallback.text.secondary),
    },
  };
}

function sanitizeNumber(value: number, fallback: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function buildFontFamilyStack(family: string): string {
  const trimmed = family.trim();
  const resolvedFamily = trimmed.length > 0 ? trimmed : defaultThemeSpec.typography.fontFamily;
  return `"${resolvedFamily}", "Helvetica Neue", Arial, sans-serif`;
}

function scaleRemSize(value: string | number | undefined, scale: number): string | number | undefined {
  if (typeof value !== 'string' || !value.endsWith('rem')) return value;
  const numeric = Number.parseFloat(value);
  if (Number.isNaN(numeric)) return value;
  return `${numeric * scale}rem`;
}

function buildHeadingOverrides(baseFontSize: number, headingScale: number): TypographyVariantsOptions {
  const baseTheme = createTheme({ typography: { fontSize: baseFontSize } });
  const overrides: TypographyVariantsOptions = {};
  for (const variant of headingVariants) {
    const base = baseTheme.typography[variant];
    overrides[variant] = {
      ...base,
      fontSize: scaleRemSize(base.fontSize, headingScale),
    };
  }
  return overrides;
}

interface SanitizedShape {
  boxRadius: number;
  fieldRadius: number;
  selectorRadius: number;
  borderWidth: number;
}

interface SanitizedSize {
  fieldSize: number;
  selectorSize: number;
}

function sanitizeShape(shape: ShapeSpec, fallback: ShapeSpec): SanitizedShape {
  return {
    boxRadius: sanitizeNumber(shape.boxRadius, fallback.boxRadius, 0, 32),
    fieldRadius: sanitizeNumber(shape.fieldRadius, fallback.fieldRadius, 0, 32),
    selectorRadius: sanitizeNumber(shape.selectorRadius, fallback.selectorRadius, 0, 32),
    borderWidth: sanitizeNumber(shape.borderWidth, fallback.borderWidth, 0, 4),
  };
}

function sanitizeSize(size: SizeSpec, fallback: SizeSpec): SanitizedSize {
  return {
    fieldSize: sanitizeNumber(size.fieldSize, fallback.fieldSize, 24, 64),
    selectorSize: sanitizeNumber(size.selectorSize, fallback.selectorSize, 12, 40),
  };
}

/**
 * Maps the 3-way radius split (Boxes/Fields/Selectors) and the size/border-
 * width dials onto real MUI component style overrides. Switch/Checkbox/Radio
 * are scaled via `transform` rather than resized property-by-property —
 * their internal layout is made of fixed-px sub-elements, so a uniform
 * transform is the only way to resize them proportionally without the parts
 * drifting out of alignment.
 */
function buildComponentOverrides(shape: SanitizedShape, size: SanitizedSize): ThemeOptions['components'] {
  const fieldPaddingInline = Math.max(8, Math.round(size.fieldSize * 0.4));
  const inputPaddingBlock = Math.max(4, Math.round((size.fieldSize - 24) / 2));
  const selectorScale = size.selectorSize / 24;

  return {
    MuiCard: { styleOverrides: { root: { borderRadius: shape.boxRadius } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: shape.boxRadius } } },
    MuiAlert: { styleOverrides: { root: { borderRadius: shape.boxRadius } } },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.fieldRadius,
          minHeight: size.fieldSize,
          paddingInline: fieldPaddingInline,
        },
        outlined: { borderWidth: shape.borderWidth },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: shape.fieldRadius },
        input: { paddingTop: inputPaddingBlock, paddingBottom: inputPaddingBlock },
        notchedOutline: { borderWidth: shape.borderWidth },
      },
    },
    MuiTabs: { styleOverrides: { root: { minHeight: size.fieldSize } } },
    MuiTab: { styleOverrides: { root: { minHeight: size.fieldSize } } },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: shape.selectorRadius,
          height: size.selectorSize,
          fontSize: Math.max(10, Math.round(size.selectorSize * 0.5)),
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: shape.selectorRadius,
          minWidth: size.selectorSize,
          height: size.selectorSize,
          fontSize: Math.max(9, Math.round(size.selectorSize * 0.45)),
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { transform: `scale(${selectorScale.toFixed(2)})`, transformOrigin: 'left center' },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { '& .MuiSvgIcon-root': { fontSize: size.selectorSize } },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: { '& .MuiSvgIcon-root': { fontSize: size.selectorSize } },
      },
    },
  };
}

/**
 * The single ThemeSpec → MUI ThemeOptions mapping, shared by the live
 * preview (via buildMuiTheme) and the exported code (via generateThemeCode).
 * `spec.mode` only ever lands in the returned `palette.mode` — every color
 * below comes from the single `spec.palette`, so toggling mode changes
 * nothing else about what's shown or exported (by design: the light/dark
 * switch is purely an export-time flag, not a second palette to preview).
 */
export function buildThemeOptions(spec: ThemeSpec, direction: 'ltr' | 'rtl' = 'ltr'): ThemeOptions {
  const palette = sanitizePalette(spec.palette, defaultThemeSpec.palette);
  const baseFontSize = sanitizeNumber(spec.typography.baseFontSize, defaultThemeSpec.typography.baseFontSize, 10, 24);
  const headingScale = sanitizeNumber(spec.typography.headingScale, defaultThemeSpec.typography.headingScale, 0.5, 2);
  const shape = sanitizeShape(spec.shape, defaultThemeSpec.shape);
  const size = sanitizeSize(spec.size, defaultThemeSpec.size);

  return {
    direction,
    palette: {
      mode: spec.mode,
      primary: { main: palette.primary },
      secondary: { main: palette.secondary },
      error: { main: palette.error },
      warning: { main: palette.warning },
      info: { main: palette.info },
      success: { main: palette.success },
      background: palette.background,
      text: palette.text,
    },
    typography: {
      fontFamily: buildFontFamilyStack(spec.typography.fontFamily),
      fontSize: baseFontSize,
      ...buildHeadingOverrides(baseFontSize, headingScale),
    },
    shape: {
      borderRadius: shape.fieldRadius,
    },
    components: buildComponentOverrides(shape, size),
  };
}

/**
 * The live preview always renders as `mode: 'light'` regardless of
 * `spec.mode` — the mode toggle is an export-only flag (see
 * buildThemeOptions), so the app you're editing in must never re-skin
 * itself when you flip it.
 */
export function buildMuiTheme(spec: ThemeSpec, direction: 'ltr' | 'rtl' = 'ltr'): Theme {
  return createTheme(buildThemeOptions({ ...spec, mode: 'light' }, direction));
}
