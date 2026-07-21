export interface FontCatalogEntry {
  family: string;
  category: string;
  supportsArabic: boolean;
}

let cachedCatalog: FontCatalogEntry[] | null = null;

/**
 * The catalog is ~110KB of family names/metadata generated from the full
 * Google Fonts dataset (see googleFontsCatalog.json). It's dynamic-imported
 * so it only loads when the typography editor's font picker is opened,
 * instead of bloating the initial bundle.
 */
export async function loadFontCatalog(): Promise<FontCatalogEntry[]> {
  if (cachedCatalog) return cachedCatalog;
  const module = await import('./googleFontsCatalog.json');
  cachedCatalog = module.default as FontCatalogEntry[];
  return cachedCatalog;
}
