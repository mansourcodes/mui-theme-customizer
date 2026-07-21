import { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  InputBase,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import DataObjectIcon from '@mui/icons-material/DataObject';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import RoundedCornerIcon from '@mui/icons-material/RoundedCorner';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StraightenIcon from '@mui/icons-material/Straighten';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { randomizePalette } from '../../lib/theme/randomTheme';
import type { ShapeSpec, SizeSpec } from '../../lib/theme/types';
import { SectionHeader } from './SectionHeader';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import { RadiusPresetPicker } from './RadiusPresetPicker';
import { SizeSlider } from './SizeSlider';
import { TypographyEditor } from './TypographyEditor';
import { CodeExportDialog } from '../export/CodeExportDialog';

export function CustomizerPanel() {
  const { spec, setSpec } = useThemeSpec();
  const [exportOpen, setExportOpen] = useState(false);

  const updateShape = (patch: Partial<ShapeSpec>) => {
    setSpec({ ...spec, shape: { ...spec.shape, ...patch } });
  };

  const updateSize = (patch: Partial<SizeSpec>) => {
    setSpec({ ...spec, size: { ...spec.size, ...patch } });
  };

  const handleRandomize = () => {
    setSpec({
      ...spec,
      palettes: { ...spec.palettes, [spec.mode]: randomizePalette(spec.palettes[spec.mode]) },
    });
  };

  return (
    <Box
      component="aside"
      sx={{ width: 340, flexShrink: 0, borderInlineEnd: 1, borderColor: 'divider', overflowY: 'auto' }}
    >
      <Stack spacing={3} sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 700 }}>
            Name
          </Typography>
          <InputBase
            value={spec.name}
            onChange={(event) => setSpec({ ...spec, name: event.target.value })}
            sx={{ flex: 1, fontWeight: 700, fontSize: 18 }}
            inputProps={{ 'aria-label': 'Theme name' }}
          />
          <EditOutlinedIcon fontSize="small" color="action" />
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<CasinoOutlinedIcon />}
            onClick={handleRandomize}
            sx={{ flex: 1, fontWeight: 700, borderColor: 'divider' }}
          >
            Random
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<DataObjectIcon />}
            onClick={() => setExportOpen(true)}
            sx={{
              flex: 1,
              fontWeight: 700,
              bgcolor: 'text.primary',
              color: 'background.paper',
              '&:hover': { bgcolor: 'text.primary' },
            }}
          >
            Code
          </Button>
        </Stack>

        <SectionHeader icon={<FormatColorFillIcon fontSize="small" />} label="Change Colors" />
        <ColorSwatchGrid />

        <SectionHeader icon={<RoundedCornerIcon fontSize="small" />} label="Radius" />
        <RadiusPresetPicker
          label="Boxes"
          hint="card, dialog, alert"
          value={spec.shape.boxRadius}
          onChange={(value) => updateShape({ boxRadius: value })}
        />
        <RadiusPresetPicker
          label="Fields"
          hint="button, input, select, tab"
          value={spec.shape.fieldRadius}
          onChange={(value) => updateShape({ fieldRadius: value })}
        />
        <RadiusPresetPicker
          label="Selectors"
          hint="checkbox, toggle, badge"
          value={spec.shape.selectorRadius}
          onChange={(value) => updateShape({ selectorRadius: value })}
        />

        <SectionHeader icon={<StraightenIcon fontSize="small" />} label="Sizes" />
        <SizeSlider
          label="Fields base size"
          hint="button, input, select, tab"
          value={spec.size.fieldSize}
          onChange={(value) => updateSize({ fieldSize: value })}
          min={24}
          max={56}
          steps={[24, 32, 40, 48, 56]}
        />
        <SizeSlider
          label="Selectors base size"
          hint="checkbox, toggle, badge"
          value={spec.size.selectorSize}
          onChange={(value) => updateSize({ selectorSize: value })}
          min={16}
          max={32}
          steps={[16, 20, 24, 28, 32]}
        />

        <div>
          <Typography variant="body2">Border Width</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block' }}>
            All components
          </Typography>
          <Box sx={{ bgcolor: 'action.hover', borderRadius: '8px', px: 2, py: 1, mt: 1 }}>
            <Slider
              value={spec.shape.borderWidth}
              onChange={(_event, value) => updateShape({ borderWidth: value as number })}
              min={0}
              max={4}
              step={0.5}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}px`}
            />
          </Box>
        </div>

        <SectionHeader icon={<TextFieldsIcon fontSize="small" />} label="Typography" />
        <TypographyEditor />

        <SectionHeader icon={<SettingsOutlinedIcon fontSize="small" />} label="Options" />
        <FormControlLabel
          control={
            <Switch
              checked={spec.mode === 'dark'}
              onChange={(_event, checked) => setSpec({ ...spec, mode: checked ? 'dark' : 'light' })}
            />
          }
          label="Dark color scheme"
          labelPlacement="start"
          sx={{ justifyContent: 'space-between', ml: 0 }}
        />
      </Stack>

      <CodeExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </Box>
  );
}
