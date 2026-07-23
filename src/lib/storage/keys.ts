// ThemeSpec shape history (relevant to isThemeSpec's validation in
// themeSpecStorage.ts, used when reading back SAVED_THEMES_STORAGE_KEY):
// v2: ShapeSpec split into boxRadius/fieldRadius/selectorRadius/borderWidth, and SizeSpec was added.
// v3: name field added to ThemeSpec.
// v4: palettes (per-mode light/dark) collapsed into a single palette — mode is export-only now.
// v5: semantic colors (primary/secondary/error/warning/info/success) became
//     { main, contrastText? } to match MUI's real PaletteColorOptions shape
//     (contrastText is now user-editable); a top-level `divider` token was added.
export const SAVED_THEMES_STORAGE_KEY = 'mui-theme-customizer:saved-themes:v1';
export const LANGUAGE_STORAGE_KEY = 'mui-theme-customizer:language:v1';
