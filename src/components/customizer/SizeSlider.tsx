import { Box, Slider, Stack, Typography } from '@mui/material';

interface SizeSliderProps {
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  steps: number[];
}

const STEP_LABELS = ['XS', 'SM', 'MD', 'LG', 'XL'];

export function SizeSlider({ label, hint, value, onChange, min, max, steps }: SizeSliderProps) {
  const maxStep = Math.max(...steps);

  return (
    <Stack spacing={1.5} sx={{ bgcolor: 'action.hover', borderRadius: 1, p: 2 }}>
      <div>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block' }}>
          {hint}
        </Typography>
      </div>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end', height: 48 }}>
          {steps.map((step, index) => (
            <Stack key={step} spacing={0.5} sx={{ alignItems: 'center', width: 22 }}>
              <Box
                sx={{
                  width: 6,
                  height: Math.max(6, (step / maxStep) * 40),
                  bgcolor: 'text.primary',
                  borderRadius: 0.5,
                }}
              />
              <Typography variant="caption" sx={{ fontSize: 9 }} color="text.secondary">
                {STEP_LABELS[index]}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack sx={{ flex: 1, alignItems: 'center' }}>
          <Typography variant="h6">{value.toFixed(1)}</Typography>
          <Typography variant="caption" color="text.secondary">
            Pixels
          </Typography>
        </Stack>
      </Stack>

      <Slider
        value={value}
        onChange={(_event, next) => onChange(next as number)}
        min={min}
        max={max}
        step={1}
        marks={steps.map((step) => ({ value: step }))}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
}
