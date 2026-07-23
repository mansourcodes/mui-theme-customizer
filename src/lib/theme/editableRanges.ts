/**
 * Single source of truth for the bounds each customizer control lets the
 * user pick from — shared by the control itself (slider min/max/marks) and
 * by randomizePalette's siblings in randomTheme.ts (Random button), so the
 * two can never drift apart.
 */

/** inspireUI's radius steps: 0 / 0.25 / 0.5 / 1 / 2 rem. */
export const RADIUS_STEPS = [0, 4, 8, 16, 32] as const;

export const BORDER_WIDTH_RANGE = { min: 0, max: 4, step: 0.5 } as const;
export const FIELD_SIZE_RANGE = { min: 24, max: 56 } as const;
export const SELECTOR_SIZE_RANGE = { min: 18, max: 28 } as const;
export const BASE_FONT_SIZE_RANGE = { min: 12, max: 20 } as const;
export const HEADING_SCALE_RANGE = { min: 0.8, max: 1.4, step: 0.05 } as const;
