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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RoundedCornerIcon from '@mui/icons-material/RoundedCorner';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StraightenIcon from '@mui/icons-material/Straighten';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { randomizeMode, randomizePalette, randomizeShape, randomizeSize } from '../../lib/theme/randomTheme';
import { BORDER_WIDTH_RANGE, FIELD_SIZE_RANGE, SELECTOR_SIZE_RANGE } from '../../lib/theme/editableRanges';
import type { ShapeSpec, SizeSpec } from '../../lib/theme/types';
import { SectionHeader } from './SectionHeader';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import { RadiusPresetPicker } from './RadiusPresetPicker';
import { SizeSlider } from './SizeSlider';
import { TypographyEditor } from './TypographyEditor';

export function CustomizerPanel() {
  const { spec, setSpec, resetSpec } = useThemeSpec();

  const updateShape = (patch: Partial<ShapeSpec>) => {
    setSpec({ ...spec, shape: { ...spec.shape, ...patch } });
  };

  const updateSize = (patch: Partial<SizeSpec>) => {
    setSpec({ ...spec, size: { ...spec.size, ...patch } });
  };

  const handleRandomize = () => {
    setSpec({
      ...spec,
      mode: randomizeMode(),
      palette: randomizePalette(spec.palette),
      shape: randomizeShape(),
      size: randomizeSize(),
    });
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 340,
        flexShrink: 0,
        borderInlineEnd: 1,
        borderColor: 'divider',
        overflowY: 'auto',
        bgcolor: 'background.paper',
      }}
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
            variant="outlined"
            color="inherit"
            startIcon={<RestartAltIcon />}
            onClick={resetSpec}
            sx={{ flex: 1, fontWeight: 700, borderColor: 'divider' }}
          >
            Reset
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
          hint="badge"
          value={spec.shape.selectorRadius}
          onChange={(value) => updateShape({ selectorRadius: value })}
        />

        <SectionHeader icon={<StraightenIcon fontSize="small" />} label="Sizes" />
        <SizeSlider
          label="Fields base size"
          hint="button, input, select, tab"
          value={spec.size.fieldSize}
          onChange={(value) => updateSize({ fieldSize: value })}
          min={FIELD_SIZE_RANGE.min}
          max={FIELD_SIZE_RANGE.max}
          steps={[24, 32, 40, 48, 56]}
        />
        <SizeSlider
          label="Selectors base size"
          hint="checkbox, toggle, badge"
          value={spec.size.selectorSize}
          onChange={(value) => updateSize({ selectorSize: value })}
          min={SELECTOR_SIZE_RANGE.min}
          max={SELECTOR_SIZE_RANGE.max}
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
              min={BORDER_WIDTH_RANGE.min}
              max={BORDER_WIDTH_RANGE.max}
              step={BORDER_WIDTH_RANGE.step}
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
          label="Dark mode (export only)"
          labelPlacement="start"
          sx={{ justifyContent: 'space-between', ml: 0 }}
        />
      </Stack>
    </Box>
  );
}
