import { useEffect, useRef, useState } from 'react';
import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { applyThemePreset, themePresets } from '../../lib/theme/presets';
import type { ModePalette, ThemeSpec } from '../../lib/theme/types';
import { loadSavedThemes, saveSavedThemes, type SavedTheme } from '../../lib/storage/savedThemesStorage';

const HOLD_DURATION_MS = 800;

function ThemeDots({ spec }: { spec: ThemeSpec }) {
  const palette = spec.palette;
  const dots = [palette.primary.main, palette.secondary.main, palette.info.main, palette.success.main];
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '6px',
        border: 1,
        borderColor: 'divider',
        bgcolor: palette.background.default,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {dots.map((color, index) => (
        <Box key={index} sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: color }} />
      ))}
    </Box>
  );
}

function PresetDots({ palette }: { palette: ModePalette }) {
  const dots = [palette.primary.main, palette.secondary.main, palette.info.main, palette.text.primary];
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '6px',
        border: 1,
        borderColor: 'divider',
        bgcolor: palette.background.default,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {dots.map((color, index) => (
        <Box key={index} sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: color }} />
      ))}
    </Box>
  );
}

function HoldToAddButton({ onSave }: { onSave: () => void }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const cancelHold = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    rafRef.current = null;
    timeoutRef.current = null;
    startRef.current = null;
    setProgress(0);
  };

  const startHold = () => {
    startRef.current = performance.now();
    // setTimeout drives the actual save — rAF is animation-only, since the
    // browser pauses/throttles rAF in hidden tabs and on low-power devices.
    timeoutRef.current = window.setTimeout(() => {
      cancelHold();
      onSave();
    }, HOLD_DURATION_MS);
    const tick = () => {
      if (startRef.current === null) return;
      const elapsed = performance.now() - startRef.current;
      setProgress(Math.min(100, (elapsed / HOLD_DURATION_MS) * 100));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => cancelHold, []);

  return (
    <ButtonBase
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onKeyDown={(event) => {
        // Keyboard users can't hold — Enter/Space saves immediately.
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSave();
        }
      }}
      sx={{
        width: '100%',
        borderRadius: '10px',
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', py: 1.25 }}>
        <AutoFixHighIcon fontSize="small" />
        <Typography variant="body2">
          <Box component="span" sx={{ fontWeight: 700 }}>
            Hold
          </Box>{' '}
          to save theme
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 3, visibility: progress > 0 ? 'visible' : 'hidden' }} />
    </ButtonBase>
  );
}

export function ThemesSidebar() {
  const { spec, setSpec } = useThemeSpec();
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>(() => loadSavedThemes());

  const persistSaved = (next: SavedTheme[]) => {
    setSavedThemes(next);
    saveSavedThemes(next);
  };

  const handleSaveCurrent = () => {
    const saved: SavedTheme = {
      id: crypto.randomUUID(),
      name: spec.name.trim() || 'my theme',
      spec,
    };
    persistSaved([saved, ...savedThemes]);
  };

  return (
    <Box
      component="aside"
      sx={{ width: 230, flexShrink: 0, borderInlineEnd: 1, borderColor: 'divider', overflowY: 'auto', p: 2 }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Themes
        </Typography>

        <HoldToAddButton onSave={handleSaveCurrent} />

        {savedThemes.length > 0 && (
          <>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>
              My themes
            </Typography>
            <List disablePadding>
              {savedThemes.map((saved) => (
                <ListItemButton
                  key={saved.id}
                  onClick={() => setSpec(saved.spec)}
                  sx={{ borderRadius: '8px', mb: 0.5, pr: 1 }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <ThemeDots spec={saved.spec} />
                    <ListItemText primary={saved.name} slotProps={{ primary: { noWrap: true } }} />
                  </Stack>
                  <IconButton
                    size="small"
                    aria-label={`Delete ${saved.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      persistSaved(savedThemes.filter((theme) => theme.id !== saved.id));
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
            <Divider />
          </>
        )}

        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>
          Built-in themes
        </Typography>
        <List disablePadding>
          {themePresets.map((preset) => {
            const activePalette = spec.palette;
            const presetPalette = preset.spec.palette;
            const active =
              activePalette.primary.main === presetPalette.primary.main &&
              activePalette.secondary.main === presetPalette.secondary.main;

            return (
              <ListItemButton
                key={preset.id}
                selected={active}
                onClick={() => setSpec(applyThemePreset(spec, preset))}
                sx={{ borderRadius: '8px', mb: 0.5 }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <PresetDots palette={presetPalette} />
                  <ListItemText primary={preset.name} />
                </Stack>
              </ListItemButton>
            );
          })}
        </List>
      </Stack>
    </Box>
  );
}
