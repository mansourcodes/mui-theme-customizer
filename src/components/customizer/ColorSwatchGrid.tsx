import { useState, type MouseEvent } from 'react';
import { Alert, Box, ButtonBase, Popover, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import type { ModePalette } from '../../lib/theme/types';
import { contrastRatio, MIN_AA_CONTRAST } from '../../lib/theme/colorContrast';
import { ColorField } from './ColorField';

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
  anchor: HTMLElement;
  value: string;
  apply: (palette: ModePalette, value: string) => ModePalette;
}

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
  const palette = spec.palettes[spec.mode];
  const [editing, setEditing] = useState<EditingToken | null>(null);

  const updatePalette = (next: ModePalette) => {
    setSpec({ ...spec, palettes: { ...spec.palettes, [spec.mode]: next } });
  };

  const openEditor =
    (label: string, value: string, apply: EditingToken['apply']) => (event: MouseEvent<HTMLElement>) => {
      setEditing({ label, anchor: event.currentTarget, value, apply });
    };

  const primaryTextContrast = contrastRatio(palette.text.primary, palette.background.default);
  const lowContrast = primaryTextContrast !== null && primaryTextContrast < MIN_AA_CONTRAST;

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
        <Box key={`${left}-${right}`} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
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
        </Box>
      ))}

      {lowContrast && (
        <Alert severity="warning">
          Primary text on the default background has a contrast ratio of {primaryTextContrast?.toFixed(2)}:1, below
          the WCAG AA minimum of {MIN_AA_CONTRAST}:1.
        </Alert>
      )}

      <Popover
        open={editing !== null}
        anchorEl={editing?.anchor ?? null}
        onClose={() => setEditing(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {editing && (
          <Box sx={{ p: 2, width: 260 }}>
            <ColorField
              label={editing.label}
              value={editing.value}
              onChange={(value) => {
                setEditing({ ...editing, value });
                updatePalette(editing.apply(palette, value));
              }}
            />
          </Box>
        )}
      </Popover>
    </Stack>
  );
}
