import type { ModePalette } from './types';

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

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function jitterHue(baseHue: number, spread: number): number {
  return (baseHue + randomBetween(-spread, spread) + 360) % 360;
}

/**
 * Randomizes primary/secondary freely for variety, while keeping error/
 * warning/info/success near their conventional hues (with a little jitter)
 * so they still read as recognizable status colors after randomizing.
 * Background/text are left untouched — see project-overview.md's
 * "Randomize theme (generates a harmonious random palette)".
 */
export function randomizePalette(current: ModePalette): ModePalette {
  const primaryHue = Math.random() * 360;
  const secondaryHue = jitterHue(primaryHue, 90);

  return {
    ...current,
    primary: hslToHex(primaryHue, randomBetween(55, 80), randomBetween(38, 55)),
    secondary: hslToHex(secondaryHue, randomBetween(50, 80), randomBetween(38, 58)),
    error: hslToHex(jitterHue(4, 8), randomBetween(60, 80), randomBetween(40, 50)),
    warning: hslToHex(jitterHue(35, 8), randomBetween(70, 90), randomBetween(40, 52)),
    info: hslToHex(jitterHue(200, 10), randomBetween(55, 80), randomBetween(40, 52)),
    success: hslToHex(jitterHue(140, 10), randomBetween(45, 70), randomBetween(32, 45)),
  };
}
