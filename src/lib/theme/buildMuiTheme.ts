import { alpha, createTheme, type Theme, type ThemeOptions, type TypographyVariantsOptions } from '@mui/material/styles';
import { isValidCssColor } from './colorContrast';
import { defaultThemeSpec } from './defaultTheme';
import type { ModePalette, PaletteColorSpec, ShapeSpec, SizeSpec, ThemeSpec } from './types';

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

/**
 * `contrastText` is optional by design — unset means MUI auto-computes a
 * readable black/white from `main`. An invalid draft value (mid-edit) drops
 * the override entirely rather than forcing a fallback color, so typing
 * never produces a jarring wrong-but-valid contrast color.
 */
function sanitizePaletteColor(color: PaletteColorSpec, fallback: PaletteColorSpec): PaletteColorSpec {
  const main = sanitizeColor(color.main, fallback.main);
  if (!color.contrastText || !isValidCssColor(color.contrastText)) return { main };
  return { main, contrastText: color.contrastText };
}

function sanitizePalette(palette: ModePalette, fallback: ModePalette): ModePalette {
  return {
    primary: sanitizePaletteColor(palette.primary, fallback.primary),
    secondary: sanitizePaletteColor(palette.secondary, fallback.secondary),
    error: sanitizePaletteColor(palette.error, fallback.error),
    warning: sanitizePaletteColor(palette.warning, fallback.warning),
    info: sanitizePaletteColor(palette.info, fallback.info),
    success: sanitizePaletteColor(palette.success, fallback.success),
    background: {
      default: sanitizeColor(palette.background.default, fallback.background.default),
      paper: sanitizeColor(palette.background.paper, fallback.background.paper),
    },
    divider: sanitizeColor(palette.divider, fallback.divider),
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

// Every render needs MUI's default heading font sizes for the current base
// font size, which only `createTheme()` can compute — but a full theme build
// (palette, components, transitions, etc., all discarded except typography)
// is too expensive to redo on every slider-drag tick. baseFontSize only
// changes via the font-size editor, so caching by that key means dragging an
// unrelated slider (radius, border width, sizes) hits the cache instead of
// rebuilding a whole discarded theme.
const baseTypographyThemeCache = new Map<number, Theme>();

function getBaseTypographyTheme(baseFontSize: number): Theme {
  let theme = baseTypographyThemeCache.get(baseFontSize);
  if (!theme) {
    theme = createTheme({ typography: { fontSize: baseFontSize } });
    baseTypographyThemeCache.set(baseFontSize, theme);
  }
  return theme;
}

function buildHeadingOverrides(baseFontSize: number, headingScale: number): TypographyVariantsOptions {
  const baseTheme = getBaseTypographyTheme(baseFontSize);
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
      primary: palette.primary,
      secondary: palette.secondary,
      error: palette.error,
      warning: palette.warning,
      info: palette.info,
      success: palette.success,
      background: palette.background,
      divider: palette.divider,
      text: palette.text,
      // MUI's default action.* colors are hardcoded to black/white and
      // ignore the custom palette, so icons (which mostly render via
      // IconButton's default color="default" → action.active) stayed a
      // fixed black regardless of the chosen text color. Deriving them
      // from text.primary keeps that same "muted icon" convention while
      // actually tracking the theme.
      action: {
        active: alpha(palette.text.primary, 0.54),
        hover: alpha(palette.text.primary, 0.04),
        selected: alpha(palette.text.primary, 0.08),
        disabled: alpha(palette.text.primary, 0.26),
        disabledBackground: alpha(palette.text.primary, 0.12),
        focus: alpha(palette.text.primary, 0.12),
      },
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
 *
 * `cssVariables: true` is preview-only (never added to `buildThemeOptions`,
 * so the exported `createTheme()` code stays a plain literal theme) — it
 * makes every preview component reference palette colors through CSS custom
 * properties instead of baking each literal hex into its own Emotion class.
 * Without it, every Randomize/color-edit rebuilds a brand-new `Theme`
 * object, and since the palette is drawn from a continuous, effectively
 * never-repeating value space, MUI/Emotion (which never garbage-collects
 * injected styles) permanently accumulates a fresh, never-reused `<style>`
 * insertion per component per edit — across ~18 preview cards this
 * compounds every click for the life of the session, which is what made
 * Randomize/color edits get progressively slower the longer a session ran.
 * With CSS variables, only the small `:root` custom-property block needs
 * updating per edit, so the accumulation stops.
 */
export function buildMuiTheme(spec: ThemeSpec, direction: 'ltr' | 'rtl' = 'ltr'): Theme {
  return createTheme({ cssVariables: true, ...buildThemeOptions({ ...spec, mode: 'light' }, direction) });
}
