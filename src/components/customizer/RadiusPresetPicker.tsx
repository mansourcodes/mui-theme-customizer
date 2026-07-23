import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { RADIUS_STEPS } from '../../lib/theme/editableRanges';

interface RadiusPresetPickerProps {
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
}

/**
 * Clone of the inspireUI theme-generator radius picker: a row of gray chips,
 * each showing a top-end corner arc at the option's radius. Hover darkens
 * the chip; the selected option is marked only by its arc turning primary.
 */
export function RadiusPresetPicker({ label, hint, value, onChange }: RadiusPresetPickerProps) {
  return (
    <Stack spacing={1}>
      <div>
        <Typography sx={{ fontSize: 11, lineHeight: 1.4 }} color="text.secondary">
          {label}
        </Typography>
        <Typography sx={{ fontSize: 10, fontStyle: 'italic', lineHeight: 1.4 }} color="text.disabled">
          {hint}
        </Typography>
      </div>
      <Stack direction="row" spacing={1} role="radiogroup" aria-label={`${label} border radius`}>
        {RADIUS_STEPS.map((step) => {
          const selected = value === step;
          return (
            <ButtonBase
              key={step}
              role="radio"
              aria-checked={selected}
              aria-label={`${step}px border radius`}
              title={`${step}px`}
              onClick={() => onChange(step)}
              sx={(theme) => ({
                borderRadius: '4px',
                overflow: 'hidden',
                bgcolor: theme.palette.action.hover,
                transition: theme.transitions.create('background-color', { duration: 150 }),
                '&:hover': { bgcolor: theme.palette.action.selected },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.text.primary}`,
                  outlineOffset: '2px',
                },
              })}
            >
              <Box aria-hidden sx={{ paddingInlineEnd: '12px', paddingTop: '8px' }}>
                <Box
                  sx={(theme) => ({
                    width: 32,
                    height: 24,
                    borderTop: '2px solid',
                    borderInlineEnd: '2px solid',
                    borderColor: selected ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.2),
                    borderStartEndRadius: `${step}px`,
                    transition: theme.transitions.create('border-color', { duration: 150 }),
                  })}
                />
              </Box>
            </ButtonBase>
          );
        })}
      </Stack>
    </Stack>
  );
}
