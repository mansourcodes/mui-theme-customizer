import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  Box,
  ButtonBase,
  Chip,
  InputBase,
  Menu,
  MenuItem,
  Popover,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import TuneIcon from '@mui/icons-material/Tune';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  COLOR_FORMATS,
  formatColor,
  hsvToRgb,
  parseColor,
  rgbToHex,
  rgbToHsv,
  type ColorFormat,
} from '../../lib/theme/colorConvert';
import { contrastRatio } from '../../lib/theme/colorContrast';
import {
  nearestTailwind,
  tailwindName,
  TAILWIND_COLOR_FAMILIES,
  TAILWIND_GRAY_FAMILIES,
  TAILWIND_PALETTE,
  TAILWIND_SHADES,
  type TailwindFamily,
} from '../../lib/theme/tailwindPalette';

/** A theme token drawn as an overlay marker on the palette grid. */
export interface PickerMarker {
  /** Short code shown on the swatch, e.g. "P", "PC", "B1". */
  code: string;
  /** The token's current color value. */
  color: string;
  /** True for the token currently being edited — gets a highlight ring. */
  active: boolean;
}

interface ColorPickerPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  /** Token label, e.g. "primary" — shown in the header. */
  label: string;
  /** Current color value (any CSS format the app stores). */
  value: string;
  /** Background the picked color is rated against for the contrast badge. */
  background: string;
  markers: PickerMarker[];
  onChange: (hex: string) => void;
  onClose: () => void;
}

const CELL = 18;
const CELL_GAP = 3;

const FORMAT_LABELS: Record<ColorFormat, string> = {
  oklch: 'OKLCH',
  hsl: 'HSL',
  rgb: 'RGB',
  hex: 'Hex',
};

interface ContrastRating {
  label: string;
  passes: boolean;
}

function ratingFor(ratio: number | null): ContrastRating {
  if (ratio === null) return { label: '—', passes: false };
  if (ratio >= 7) return { label: 'AAA', passes: true };
  if (ratio >= 4.5) return { label: 'AA', passes: true };
  if (ratio >= 3) return { label: 'AA Large', passes: true };
  return { label: 'Fail', passes: false };
}

/** Builds a cell → marker lookup keyed by the marker's nearest Tailwind swatch. */
function buildMarkerMap(markers: PickerMarker[]): Map<string, { codes: string[]; active: boolean }> {
  const map = new Map<string, { codes: string[]; active: boolean }>();
  for (const marker of markers) {
    const nearest = nearestTailwind(marker.color);
    if (!nearest) continue;
    const key = `${nearest.family}-${nearest.shade}`;
    const existing = map.get(key);
    if (existing) {
      existing.codes.push(marker.code);
      existing.active = existing.active || marker.active;
    } else {
      map.set(key, { codes: [marker.code], active: marker.active });
    }
  }
  return map;
}

interface PaletteGridProps {
  families: readonly TailwindFamily[];
  markerMap: Map<string, { codes: string[]; active: boolean }>;
  selectedHex: string | null;
  onPick: (hex: string) => void;
}

function PaletteGrid({ families, markerMap, selectedHex, onPick }: PaletteGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${families.length}, ${CELL}px)`,
        gridAutoRows: `${CELL}px`,
        gap: `${CELL_GAP}px`,
      }}
    >
      {TAILWIND_SHADES.map((shade) =>
        families.map((family) => {
          const hex = TAILWIND_PALETTE[family][shade];
          const cell = markerMap.get(`${family}-${shade}`);
          const isSelected = selectedHex?.toLowerCase() === hex.toLowerCase();
          const ring = cell?.active || isSelected;
          return (
            <Tooltip key={`${family}-${shade}`} title={`${family}-${shade}`} disableInteractive arrow>
              <ButtonBase
                onClick={() => onPick(hex)}
                aria-label={`${family} ${shade}`}
                sx={{
                  width: CELL,
                  height: CELL,
                  borderRadius: '50%',
                  bgcolor: hex,
                  boxShadow: ring ? '0 0 0 2px #000, 0 0 0 4px #fff' : 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                  transition: 'transform 120ms',
                  '&:hover': { transform: 'scale(1.35)', zIndex: 1 },
                }}
              >
                {cell && (
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 8,
                      fontWeight: 700,
                      lineHeight: 1,
                      color: '#fff',
                      textShadow: '0 0 2px rgba(0,0,0,0.9)',
                      pointerEvents: 'none',
                    }}
                  >
                    {cell.codes[0]}
                  </Typography>
                )}
              </ButtonBase>
            </Tooltip>
          );
        }),
      )}
    </Box>
  );
}

interface PickerSquareProps {
  value: string;
  onChange: (hex: string) => void;
}

/** Saturation/value square + hue slider — the freeform "Picker" tab. */
function PickerSquare({ value, onChange }: PickerSquareProps) {
  const rgb = parseColor(value) ?? { r: 0, g: 0, b: 0 };
  const hsv = rgbToHsv(rgb);
  const squareRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const emitFromSquare = (event: ReactPointerEvent | PointerEvent) => {
    const node = squareRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    onChange(rgbToHex(hsvToRgb({ h: hsv.h, s: x * 100, v: (1 - y) * 100 })));
  };

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (draggingRef.current) emitFromSquare(event);
    };
    const handleUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hsv.h, value]);

  return (
    <Stack spacing={2}>
      <Box
        ref={squareRef}
        onPointerDown={(event) => {
          draggingRef.current = true;
          emitFromSquare(event);
        }}
        sx={{
          position: 'relative',
          width: '100%',
          height: 150,
          borderRadius: 1.5,
          cursor: 'crosshair',
          touchAction: 'none',
          backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
          backgroundImage:
            'linear-gradient(to right, #fff, rgba(255,255,255,0)), linear-gradient(to top, #000, rgba(0,0,0,0))',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            width: 14,
            height: 14,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid #fff',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.4)',
            bgcolor: rgbToHex(rgb),
            pointerEvents: 'none',
          }}
        />
      </Box>
      <Box sx={{ px: 0.5 }}>
        <Slider
          value={hsv.h}
          min={0}
          max={360}
          onChange={(_event, next) =>
            onChange(rgbToHex(hsvToRgb({ h: next as number, s: hsv.s, v: hsv.v })))
          }
          aria-label="Hue"
          sx={{
            '& .MuiSlider-rail': {
              opacity: 1,
              background:
                'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
            },
            '& .MuiSlider-track': { border: 'none', background: 'transparent' },
            '& .MuiSlider-thumb': { bgcolor: '#fff', border: '2px solid rgba(0,0,0,0.4)' },
          }}
        />
      </Box>
    </Stack>
  );
}

export function ColorPickerPopover({
  open,
  anchorEl,
  label,
  value,
  background,
  markers,
  onChange,
  onClose,
}: ColorPickerPopoverProps) {
  const [tab, setTab] = useState<'palette' | 'picker'>('palette');
  const [format, setFormat] = useState<ColorFormat>('hex');
  const [draft, setDraft] = useState('');
  const [formatAnchor, setFormatAnchor] = useState<HTMLElement | null>(null);

  const rgb = parseColor(value);
  const formatted = rgb ? formatColor(rgb, format) : value;

  // Keep the editable text in sync with the value/format unless the user is
  // mid-edit with a still-invalid draft.
  useEffect(() => {
    setDraft(formatted);
  }, [formatted]);

  const commitDraft = (text: string) => {
    setDraft(text);
    const parsed = parseColor(text);
    if (parsed) onChange(rgbToHex(parsed));
  };

  const markerMap = buildMarkerMap(markers);
  const selectedHex = rgb ? rgbToHex(rgb) : null;
  const name = tailwindName(value);
  const rating = ratingFor(contrastRatio(value, background));

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      slotProps={{ paper: { sx: { borderRadius: 2, overflow: 'visible' } } }}
    >
      <Box sx={{ width: 520, p: 2 }}>
        {/* Header: current color chip + target token, tab toggle */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: value,
              border: 1,
              borderColor: 'divider',
              flexShrink: 0,
            }}
          />
          <Typography variant="body1" sx={{ flex: 1, color: 'text.secondary' }}>
            Pick a color for{' '}
            <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {label}
            </Box>
          </Typography>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={tab}
            onChange={(_event, next) => next && setTab(next)}
          >
            <ToggleButton value="palette" sx={{ textTransform: 'none', gap: 0.5, px: 1.25 }}>
              <GridViewIcon fontSize="small" /> Palette
            </ToggleButton>
            <ToggleButton value="picker" sx={{ textTransform: 'none', gap: 0.5, px: 1.25 }}>
              <TuneIcon fontSize="small" /> Picker
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* Body */}
        <Box sx={{ minHeight: 200, mb: 1.5 }}>
          {tab === 'palette' ? (
            <Box sx={{ overflowX: 'auto', pb: 0.5 }}>
              <Stack direction="row" spacing={1.25} sx={{ width: 'fit-content' }}>
                <PaletteGrid
                  families={TAILWIND_GRAY_FAMILIES}
                  markerMap={markerMap}
                  selectedHex={selectedHex}
                  onPick={onChange}
                />
                <PaletteGrid
                  families={TAILWIND_COLOR_FAMILIES}
                  markerMap={markerMap}
                  selectedHex={selectedHex}
                  onPick={onChange}
                />
              </Stack>
            </Box>
          ) : (
            <PickerSquare value={value} onChange={onChange} />
          )}
        </Box>

        {/* Footer: format switch + value + name + contrast rating */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ButtonBase
            onClick={(event) => setFormatAnchor(event.currentTarget)}
            sx={{
              px: 1,
              py: 0.75,
              gap: 0.5,
              borderRadius: 1.5,
              border: 1,
              borderColor: 'divider',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {FORMAT_LABELS[format]}
            <UnfoldMoreIcon sx={{ fontSize: 16 }} />
          </ButtonBase>
          <Menu
            open={formatAnchor !== null}
            anchorEl={formatAnchor}
            onClose={() => setFormatAnchor(null)}
          >
            <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 0.5, display: 'block' }}>
              Convert format
            </Typography>
            {COLOR_FORMATS.map((option) => (
              <MenuItem
                key={option}
                selected={option === format}
                onClick={() => {
                  setFormat(option);
                  setFormatAnchor(null);
                }}
              >
                {FORMAT_LABELS[option]}
              </MenuItem>
            ))}
          </Menu>

          <InputBase
            value={draft}
            onChange={(event) => commitDraft(event.target.value)}
            spellCheck={false}
            inputProps={{ 'aria-label': `${label} color value`, style: { fontFamily: 'monospace' } }}
            sx={{
              flex: 1,
              px: 1.25,
              py: 0.5,
              borderRadius: 1.5,
              bgcolor: 'action.hover',
              fontSize: 13,
            }}
          />

          {name && (
            <Chip
              size="small"
              label={name}
              variant="outlined"
              sx={{ fontWeight: 600, borderColor: 'divider' }}
            />
          )}

          <Tooltip
            title={`Contrast vs. background${
              contrastRatio(value, background) ? ` — ${contrastRatio(value, background)?.toFixed(2)}:1` : ''
            }`}
            arrow
          >
            <Chip
              size="small"
              icon={rating.passes ? <CheckCircleIcon /> : undefined}
              label={rating.label}
              color={rating.passes ? 'success' : 'default'}
              variant={rating.passes ? 'filled' : 'outlined'}
              sx={{ fontWeight: 700 }}
            />
          </Tooltip>
        </Stack>
      </Box>
    </Popover>
  );
}
