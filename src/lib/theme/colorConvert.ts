/**
 * Color-space conversions for the color picker: hex ↔ rgb ↔ hsl(v) ↔ oklch,
 * plus format-aware parsing/serialization. Everything funnels through `Rgb`
 * (0–255) as the working space. The picker always *stores* hex so the value
 * stays compatible with MUI's own color math (lighten/darken/getContrastText),
 * which does not understand `oklch()`; the other formats are display/input
 * conveniences only.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Hue 0–360, saturation/lightness 0–100. */
export interface Hsl {
  h: number;
  s: number;
  l: number;
}

/** Hue 0–360, saturation/value 0–100 — the space the picker square edits. */
export interface Hsv {
  h: number;
  s: number;
  v: number;
}

/** Lightness 0–1, chroma 0–~0.4, hue 0–360. */
export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

export const COLOR_FORMATS: ColorFormat[] = ['oklch', 'hsl', 'rgb', 'hex'];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mod360 = (h: number) => ((h % 360) + 360) % 360;

// ── hex ↔ rgb ──────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): Rgb | null {
  const match = hex.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  let value = match[1];
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const num = Number.parseInt(value, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (channel: number) =>
    clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ── rgb ↔ hsl ──────────────────────────────────────────────────────────────

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
    }
    h *= 60;
  }
  return { h: mod360(h), s: clamp(s * 100, 0, 100), l: clamp(l * 100, 0, 100) };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = mod360(h) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = ln - c / 2;
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

// ── rgb ↔ hsv (picker square) ────────────────────────────────────────────────

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
    }
    h *= 60;
  }
  const s = max === 0 ? 0 : delta / max;
  return { h: mod360(h), s: s * 100, v: max * 100 };
}

export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const sn = s / 100;
  const vn = v / 100;
  const c = vn * sn;
  const hp = mod360(h) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = vn - c;
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

// ── rgb ↔ oklch (via OKLab, Björn Ottosson) ──────────────────────────────────

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const linearToSrgb = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function rgbToOklch({ r, g, b }: Rgb): Oklch {
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const okL = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const okA = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const okB = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  return {
    l: okL,
    c: Math.hypot(okA, okB),
    h: mod360((Math.atan2(okB, okA) * 180) / Math.PI),
  };
}

export function oklchToRgb({ l, c, h }: Oklch): Rgb {
  const hr = (mod360(h) * Math.PI) / 180;
  const okA = c * Math.cos(hr);
  const okB = c * Math.sin(hr);

  const l_ = l + 0.3963377774 * okA + 0.2158037573 * okB;
  const m_ = l - 0.1055613458 * okA - 0.0638541728 * okB;
  const s_ = l - 0.0894841775 * okA - 1.291485548 * okB;

  const lCube = l_ ** 3;
  const mCube = m_ ** 3;
  const sCube = s_ ** 3;

  const lr = 4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube;
  const lg = -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube;
  const lb = -0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube;

  return {
    r: clamp(linearToSrgb(lr), 0, 1) * 255,
    g: clamp(linearToSrgb(lg), 0, 1) * 255,
    b: clamp(linearToSrgb(lb), 0, 1) * 255,
  };
}

// ── parse / serialize ────────────────────────────────────────────────────────

/** Parses hex, rgb(), rgba(), hsl(), or oklch() into working-space RGB. */
export function parseColor(value: string): Rgb | null {
  const trimmed = value.trim();

  const hex = hexToRgb(trimmed);
  if (hex) return hex;

  const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(/[,/\s]+/).filter(Boolean);
    if (parts.length >= 3) {
      return { r: Number(parts[0]), g: Number(parts[1]), b: Number(parts[2]) };
    }
    return null;
  }

  const hslMatch = trimmed.match(/^hsla?\(([^)]+)\)$/i);
  if (hslMatch) {
    const parts = hslMatch[1].split(/[,/\s]+/).filter(Boolean);
    if (parts.length >= 3) {
      return hslToRgb({ h: parseFloat(parts[0]), s: parseFloat(parts[1]), l: parseFloat(parts[2]) });
    }
    return null;
  }

  const oklchMatch = trimmed.match(/^oklch\(([^)]+)\)$/i);
  if (oklchMatch) {
    const parts = oklchMatch[1].split(/[,/\s]+/).filter(Boolean);
    if (parts.length >= 3) {
      const lRaw = parts[0];
      const l = lRaw.endsWith('%') ? parseFloat(lRaw) / 100 : parseFloat(lRaw);
      return oklchToRgb({ l, c: parseFloat(parts[1]), h: parseFloat(parts[2]) });
    }
    return null;
  }

  return null;
}

/** Serializes RGB into the given CSS format string, matching the reference's rounding. */
export function formatColor(rgb: Rgb, format: ColorFormat): string {
  switch (format) {
    case 'hex':
      return rgbToHex(rgb);
    case 'rgb': {
      const round = (channel: number) => clamp(Math.round(channel), 0, 255);
      return `rgb(${round(rgb.r)}, ${round(rgb.g)}, ${round(rgb.b)})`;
    }
    case 'hsl': {
      const { h, s, l } = rgbToHsl(rgb);
      return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    }
    case 'oklch': {
      const { l, c, h } = rgbToOklch(rgb);
      return `oklch(${Math.round(l * 100)}% ${c.toFixed(3)} ${h.toFixed(3)})`;
    }
  }
}
