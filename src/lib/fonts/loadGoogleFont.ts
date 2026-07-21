const injectedFamilies = new Set<string>();

/**
 * Injects a <link> to Google's public CSS delivery endpoint for a font
 * family. This endpoint is keyless and free to call directly from the
 * browser (unlike the Fonts Developer metadata API), so it needs no backend.
 */
export function loadGoogleFont(family: string): void {
  if (injectedFamilies.has(family)) return;
  injectedFamilies.add(family);

  const encodedFamily = encodeURIComponent(family).replace(/%20/g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@400;500;700&display=swap`;
  document.head.appendChild(link);
}
