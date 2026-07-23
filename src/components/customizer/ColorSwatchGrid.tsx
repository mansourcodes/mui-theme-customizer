import { useState, type MouseEvent } from 'react';
import { Alert, ButtonBase, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import type { ModePalette } from '../../lib/theme/types';
import { toRgba } from '../../lib/theme/colorConvert';
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
  'Background default': '100',
  'Background paper': '200',
  Border: '300',
  Text: 'A',
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
  cornerLabel?: string;
  cornerLabelColor?: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  ariaLabel: string;
}

function Swatch({ color, letter, letterColor, cornerLabel, cornerLabelColor, onClick, ariaLabel }: SwatchProps) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        position: 'relative',
        width: SWATCH_SIZE,
        height: SWATCH_SIZE,
        borderRadius: SWATCH_RADIUS,
        border: 1,
        borderColor: 'divider',
        bgcolor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {letter && (
        <Typography sx={{ fontWeight: 800, fontSize: 22, color: letterColor, lineHeight: 1 }}>{letter}</Typography>
      )}
      {cornerLabel && (
        <Typography
          sx={{
            position: 'absolute',
            insetInlineStart: 6,
            bottom: 4,
            fontSize: 11,
            fontWeight: 700,
            color: cornerLabelColor,
            lineHeight: 1,
          }}
        >
          {cornerLabel}
        </Typography>
      )}
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

  // Computed content/contrast color for the base "A" swatch and the 100/200/300 corner labels.
  const contentOn = (background: string) => theme.palette.getContrastText(background);

  const markers: PickerMarker[] = [
    { code: MARKER_CODES['Background default'], color: palette.background.default, active: false },
    { code: MARKER_CODES['Background paper'], color: palette.background.paper, active: false },
    { code: MARKER_CODES.Border, color: palette.divider, active: false },
    { code: MARKER_CODES.Text, color: palette.text.primary, active: false },
    { code: MARKER_CODES.primary, color: palette.primary.main, active: false },
    { code: MARKER_CODES.secondary, color: palette.secondary.main, active: false },
    { code: MARKER_CODES.info, color: palette.info.main, active: false },
    { code: MARKER_CODES.success, color: palette.success.main, active: false },
    { code: MARKER_CODES.warning, color: palette.warning.main, active: false },
    { code: MARKER_CODES.error, color: palette.error.main, active: false },
  ].map((marker) => ({ ...marker, active: editing !== null && marker.code === editing.code }));

  return (
    <Stack spacing={2.5}>
      {/* base: background/paper/border/text, matching inspireUI's base-100/200/300/content model
          mapped onto real MUI tokens (background.default/paper, divider, text.primary). */}
      <Stack spacing={0.75}>
        <Stack direction="row" spacing={1}>
          <Swatch
            color={palette.background.default}
            cornerLabel="100"
            cornerLabelColor={contentOn(palette.background.default)}
            ariaLabel="Background default (preview background)"
            onClick={openEditor('Background default', palette.background.default, (p, v) => ({
              ...p,
              background: { ...p.background, default: v },
            }))}
          />
          <Swatch
            color={palette.background.paper}
            cornerLabel="200"
            cornerLabelColor={contentOn(palette.background.paper)}
            ariaLabel="Background paper (paper background)"
            onClick={openEditor('Background paper', palette.background.paper, (p, v) => ({
              ...p,
              background: { ...p.background, paper: v },
            }))}
          />
          <Swatch
            color={palette.divider}
            cornerLabel="300"
            cornerLabelColor={contentOn(palette.divider)}
            ariaLabel="Border color"
            onClick={openEditor('Border', palette.divider, (p, v) => ({ ...p, divider: v }))}
          />
          <Swatch
            color={palette.background.paper}
            letter="A"
            letterColor={palette.text.primary}
            ariaLabel="Text color"
            onClick={openEditor('Text', palette.text.primary, (p, v) => ({
              ...p,
              text: { primary: v, secondary: toRgba(v, 0.6) },
            }))}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          base
        </Typography>
      </Stack>

      {semanticRows.map(([left, right]) => (
        <Stack key={`${left}-${right}`} direction="row" spacing={1}>
          {[left, right].map((key) => {
            const contrastText = palette[key].contrastText ?? contentOn(palette[key].main);
            return (
              <Stack key={key} spacing={0.75}>
                <Stack direction="row" spacing={1}>
                  <Swatch
                    color={palette[key].main}
                    ariaLabel={key}
                    onClick={openEditor(key, palette[key].main, (p, v) => ({
                      ...p,
                      [key]: { ...p[key], main: v },
                    }))}
                  />
                  <Swatch
                    color={palette[key].main}
                    letter="A"
                    letterColor={contrastText}
                    ariaLabel={`${key} text color`}
                    onClick={openEditor(`${key} text`, contrastText, (p, v) => ({
                      ...p,
                      [key]: { ...p[key], contrastText: v },
                    }))}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {key}
                </Typography>
              </Stack>
            );
          })}
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
