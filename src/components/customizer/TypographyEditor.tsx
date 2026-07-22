import { useEffect, useState } from 'react';
import { Autocomplete, Slider, Stack, TextField, Typography } from '@mui/material';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { loadFontCatalog, type FontCatalogEntry } from '../../lib/fonts/fontCatalog';
import { loadGoogleFont } from '../../lib/fonts/loadGoogleFont';
import { BASE_FONT_SIZE_RANGE, HEADING_SCALE_RANGE } from '../../lib/theme/editableRanges';
import type { TypographySpec } from '../../lib/theme/types';

export function TypographyEditor() {
  const { spec, setSpec } = useThemeSpec();
  const [catalog, setCatalog] = useState<FontCatalogEntry[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadFontCatalog().then((entries) => {
      if (!cancelled) {
        setCatalog(entries);
        setLoadingCatalog(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedEntry = catalog.find((entry) => entry.family === spec.typography.fontFamily) ?? null;

  const updateTypography = (patch: Partial<TypographySpec>) => {
    setSpec({ ...spec, typography: { ...spec.typography, ...patch } });
  };

  return (
    <Stack spacing={3}>
      <Autocomplete
        options={catalog}
        loading={loadingCatalog}
        getOptionLabel={(option) => option.family}
        isOptionEqualToValue={(option, value) => option.family === value.family}
        value={selectedEntry}
        onChange={(_event, next) => {
          if (next) {
            loadGoogleFont(next.family);
            updateTypography({ fontFamily: next.family });
          }
        }}
        renderInput={(params) => <TextField {...params} label="Font family" size="small" />}
      />

      <div>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Base font size: {spec.typography.baseFontSize}px
        </Typography>
        <Slider
          value={spec.typography.baseFontSize}
          onChange={(_event, value) => updateTypography({ baseFontSize: value as number })}
          min={BASE_FONT_SIZE_RANGE.min}
          max={BASE_FONT_SIZE_RANGE.max}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
      </div>

      <div>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Heading scale: {spec.typography.headingScale.toFixed(2)}x
        </Typography>
        <Slider
          value={spec.typography.headingScale}
          onChange={(_event, value) => updateTypography({ headingScale: value as number })}
          min={HEADING_SCALE_RANGE.min}
          max={HEADING_SCALE_RANGE.max}
          step={HEADING_SCALE_RANGE.step}
          valueLabelDisplay="auto"
        />
      </div>
    </Stack>
  );
}
