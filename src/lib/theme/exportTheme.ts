import { buildThemeOptions } from './buildMuiTheme';
import type { ThemeSpec } from './types';

/**
 * Serializes the exact ThemeOptions the preview is built from into a
 * ready-to-paste TypeScript module. buildThemeOptions only ever emits
 * JSON-serializable values (strings/numbers/plain objects), so
 * JSON.stringify is a faithful code generator here — direction is omitted
 * because it's a runtime concern of this app, not of the user's theme.
 */
export function generateThemeCode(spec: ThemeSpec): string {
  const { direction: _direction, ...options } = buildThemeOptions(spec);
  const optionsLiteral = JSON.stringify(options, null, 2);
  return [
    `import { createTheme } from '@mui/material/styles';`,
    ``,
    `// ${spec.name}`,
    `export const theme = createTheme(${optionsLiteral});`,
    ``,
  ].join('\n');
}
