import { BORDER_WIDTH_RANGE, FIELD_SIZE_RANGE, RADIUS_STEPS, SELECTOR_SIZE_RANGE } from './editableRanges';
import type { ModePalette, PaletteMode, ShapeSpec, SizeSpec } from './types';

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (n: number) =>
    Math.round(f(n) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(0)}${toHex(8)}${toHex(4)}`;
}

/**
 * Rounded to whole degrees/percent (visually indistinguishable from raw
 * floats) so repeated Randomize clicks land on a bounded, finite set of hex
 * values instead of an effectively-never-repeating continuum — matching
 * randomizeShape/randomizeSize's use of discrete steps below. This lets
 * Emotion's style cache actually hit on repeats instead of permanently
 * accumulating a brand-new, never-reused <style> insertion for every single
 * click for the lifetime of the session (see ColorSwatchGrid's `bgcolor:
 * color` swatches, which bake this value straight into sx).
 */
function randomBetween(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

function jitterHue(baseHue: number, spread: number): number {
  return Math.round(baseHue + randomBetween(-spread, spread) + 360) % 360;
}

function randomFrom<T>(options: readonly T[]): T {
  return options[Math.floor(Math.random() * options.length)];
}

/** Picks a random value on the `step` grid between `min` and `max`, inclusive of both ends. */
function randomStepped(min: number, max: number, step: number): number {
  const stepCount = Math.round((max - min) / step);
  const value = min + Math.floor(Math.random() * (stepCount + 1)) * step;
  return Math.round(value * 100) / 100;
}

/**
 * Randomizes primary/secondary freely for variety, while keeping error/
 * warning/info/success near their conventional hues (with a little jitter)
 * so they still read as recognizable status colors after randomizing.
 * Background/divider/text are randomized too, as a shared-hue "base" family
 * (a subtle tint of the primary hue, same hue across all four base tokens —
 * background default (100) lightest, paper (200) near it, divider (300) a
 * mid-tone border shade, text (A) darkest) so the page stays readable and
 * the AA contrast check in ColorSwatchGrid keeps passing — see
 * project-overview.md's "Randomize theme (generates a harmonious random
 * palette)". Any manual `contrastText` override on a semantic color is reset
 * to MUI's auto-computed value, consistent with every other field rerolling.
 *
 * The base family's lightness is flipped on a coin flip so Randomize also
 * produces dark-looking themes (dark background, light text) about half the
 * time — independent of `spec.mode`, which stays a separate, export-only
 * flag (see ThemeSpec.mode / buildMuiTheme.ts) and is never read here.
 */
export function randomizePalette(current: ModePalette): ModePalette {
  const primaryHue = Math.round(Math.random() * 360);
  const secondaryHue = jitterHue(primaryHue, 90);
  const baseHue = jitterHue(primaryHue, 20);
  const baseSat = randomBetween(4, 14);
  const darkBase = Math.random() < 0.5;

  const background = darkBase
    ? {
        default: hslToHex(baseHue, baseSat, randomBetween(6, 12)),
        paper: hslToHex(baseHue, baseSat * 0.6, randomBetween(14, 20)),
      }
    : {
        default: hslToHex(baseHue, baseSat, randomBetween(92, 97)),
        paper: hslToHex(baseHue, baseSat * 0.6, randomBetween(97, 100)),
      };

  const divider = darkBase
    ? hslToHex(baseHue, Math.min(baseSat * 2.5, 40), randomBetween(24, 34))
    : hslToHex(baseHue, Math.min(baseSat * 2.5, 40), randomBetween(72, 82));

  const text = darkBase
    ? {
        primary: hslToHex(baseHue, baseSat, randomBetween(88, 96)),
        secondary: hslToHex(baseHue, baseSat, randomBetween(64, 74)),
      }
    : {
        primary: hslToHex(baseHue, baseSat, randomBetween(10, 20)),
        secondary: hslToHex(baseHue, baseSat, randomBetween(32, 42)),
      };

  return {
    ...current,
    primary: { main: hslToHex(primaryHue, randomBetween(55, 80), randomBetween(38, 55)) },
    secondary: { main: hslToHex(secondaryHue, randomBetween(50, 80), randomBetween(38, 58)) },
    error: { main: hslToHex(jitterHue(4, 8), randomBetween(60, 80), randomBetween(40, 50)) },
    warning: { main: hslToHex(jitterHue(35, 8), randomBetween(70, 90), randomBetween(40, 52)) },
    info: { main: hslToHex(jitterHue(200, 10), randomBetween(55, 80), randomBetween(40, 52)) },
    success: { main: hslToHex(jitterHue(140, 10), randomBetween(45, 70), randomBetween(32, 45)) },
    background,
    divider,
    text,
  };
}

/** The exported `mode` flag is export-only (see buildMuiTheme.ts) — Random flips it like any other field. */
export function randomizeMode(): PaletteMode {
  return randomFrom(['light', 'dark']);
}

export function randomizeShape(): ShapeSpec {
  return {
    boxRadius: randomFrom(RADIUS_STEPS),
    fieldRadius: randomFrom(RADIUS_STEPS),
    selectorRadius: randomFrom(RADIUS_STEPS),
    borderWidth: randomStepped(BORDER_WIDTH_RANGE.min, BORDER_WIDTH_RANGE.max, BORDER_WIDTH_RANGE.step),
  };
}

export function randomizeSize(): SizeSpec {
  return {
    fieldSize: Math.round(randomBetween(FIELD_SIZE_RANGE.min, FIELD_SIZE_RANGE.max)),
    selectorSize: Math.round(randomBetween(SELECTOR_SIZE_RANGE.min, SELECTOR_SIZE_RANGE.max)),
  };
}
