import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

/**
 * Emotion cache with the RTL stylis plugin, scoped to the Arabic preview
 * clone only — physical left/right CSS (margin, padding, position, etc.)
 * gets mirrored automatically so cards built with mr/ml-style sx props
 * still read correctly under `dir="rtl"` without per-component changes.
 */
export const previewRtlCache = createCache({
  key: 'preview-rtl',
  stylisPlugins: [rtlPlugin],
});
