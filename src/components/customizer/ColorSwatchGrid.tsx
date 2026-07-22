import { useState, type MouseEvent } from 'react';
import { Alert, Box, ButtonBase, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import type { ModePalette } from '../../lib/theme/types';
import { contrastRatio, MIN_AA_CONTRAST } from '../../lib/theme/colorContrast';
import { ColorPickerModal, type PickerMarker } from './ColorPickerModal';

const SWATCH_SIZE = 52;
const SWATCH_RADIUS = '12px';

type SemanticKey = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

/** Pairs laid out two per row, matching the reference grid. */
const semanticRows: [SemanticKey, SemanticKey][] = [
  ['primary', 'secondary'],
  ['info', 'success'],
  ['warning', 'error'],
];

interface EditingToken {
  label: string;
  code: string;
  value: string;
  apply: (palette: ModePalette, value: string) => ModePalette;
}

/** Short code shown on the palette grid overlay for each editable token. */
const MARKER_CODES: Record<string, string> = {
  'Background default': 'BG',
  'Background paper': 'PA',
  'Text primary': 'T1',
  'Text secondary': 'T2',
  primary: 'P',
  secondary: 'S',
  info: 'I',
  success: 'SU',
  warning: 'W',
  error: 'E',
};

interface SwatchProps {
  color: string;
  letter?: string;
  letterColor?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
}

function Swatch({ color, letter, letterColor, onClick, ariaLabel }: SwatchProps) {
  const shared = {
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: SWATCH_RADIUS,
    border: 1,
    borderColor: 'divider',
    bgcolor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as const;

  const letterNode = letter ? (
    <Typography sx={{ fontWeight: 800, fontSize: 22, color: letterColor, lineHeight: 1 }}>{letter}</Typography>
  ) : null;

  if (!onClick) {
    // Derived content-color preview — not editable, MUI computes it from the main color.
    return (
      <Box sx={shared} title="Content color — computed automatically from the main color">
        {letterNode}
      </Box>
    );
  }

  return (
    <ButtonBase onClick={onClick} aria-label={ariaLabel} sx={shared}>
      {letterNode}
    </ButtonBase>
  );
}

export function ColorSwatchGrid() {
  const { spec, setSpec } = useThemeSpec();
  const theme = useTheme();
  const palette = spec.palette;
  const [editing, setEditing] = useState<EditingToken | null>(null);

  const updatePalette = (next: ModePalette) => {
    setSpec({ ...spec, palette: next });
  };

  const openEditor = (label: string, value: string, apply: EditingToken['apply']) => () => {
    setEditing({ label, code: MARKER_CODES[label] ?? '?', value, apply });
  };

  const primaryTextContrast = contrastRatio(palette.text.primary, palette.background.default);
  const lowContrast = primaryTextContrast !== null && primaryTextContrast < MIN_AA_CONTRAST;

  const markers: PickerMarker[] = [
    { code: MARKER_CODES['Background default'], color: palette.background.default, active: false },
    { code: MARKER_CODES['Background paper'], color: palette.background.paper, active: false },
    { code: MARKER_CODES['Text primary'], color: palette.text.primary, active: false },
    { code: MARKER_CODES['Text secondary'], color: palette.text.secondary, active: false },
    { code: MARKER_CODES.primary, color: palette.primary, active: false },
    { code: MARKER_CODES.secondary, color: palette.secondary, active: false },
    { code: MARKER_CODES.info, color: palette.info, active: false },
    { code: MARKER_CODES.success, color: palette.success, active: false },
    { code: MARKER_CODES.warning, color: palette.warning, active: false },
    { code: MARKER_CODES.error, color: palette.error, active: false },
  ].map((marker) => ({ ...marker, active: editing !== null && marker.code === editing.code }));

  return (
    <Stack spacing={2.5}>
      {/* base: backgrounds + text colors, the MUI equivalent of the reference's base row */}
      <Stack spacing={0.75}>
        <Stack direction="row" spacing={1}>
          <Swatch
            color={palette.background.default}
            ariaLabel="Background default"
            onClick={openEditor('Background default', palette.background.default, (p, v) => ({
              ...p,
              background: { ...p.background, default: v },
            }))}
          />
          <Swatch
            color={palette.background.paper}
            ariaLabel="Background paper"
            onClick={openEditor('Background paper', palette.background.paper, (p, v) => ({
              ...p,
              background: { ...p.background, paper: v },
            }))}
          />
          <Swatch
            color={palette.background.default}
            letter="A"
            letterColor={palette.text.primary}
            ariaLabel="Text primary"
            onClick={openEditor('Text primary', palette.text.primary, (p, v) => ({
              ...p,
              text: { ...p.text, primary: v },
            }))}
          />
          <Swatch
            color={palette.background.default}
            letter="A"
            letterColor={palette.text.secondary}
            ariaLabel="Text secondary"
            onClick={openEditor('Text secondary', palette.text.secondary, (p, v) => ({
              ...p,
              text: { ...p.text, secondary: v },
            }))}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          base
        </Typography>
      </Stack>

      {semanticRows.map(([left, right]) => (
        <Stack key={`${left}-${right}`} direction="row" spacing={1}>
          {[left, right].map((key) => (
            <Stack key={key} spacing={0.75}>
              <Stack direction="row" spacing={1}>
                <Swatch
                  color={palette[key]}
                  ariaLabel={key}
                  onClick={openEditor(key, palette[key], (p, v) => ({ ...p, [key]: v }))}
                />
                <Swatch color={palette[key]} letter="A" letterColor={theme.palette[key].contrastText} />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {key}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}

      {lowContrast && (
        <Alert severity="warning">
          Primary text on the default background has a contrast ratio of {primaryTextContrast?.toFixed(2)}:1, below
          the WCAG AA minimum of {MIN_AA_CONTRAST}:1.
        </Alert>
      )}

      <ColorPickerModal
        open={editing !== null}
        label={editing?.label ?? ''}
        value={editing?.value ?? '#000000'}
        background={palette.background.default}
        markers={markers}
        onChange={(hex) => {
          if (!editing) return;
          setEditing({ ...editing, value: hex });
          updatePalette(editing.apply(palette, hex));
        }}
        onClose={() => setEditing(null)}
      />
    </Stack>
  );
}
