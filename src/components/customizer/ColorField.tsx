import { Box, TextField } from '@mui/material';

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function toColorInputValue(value: string): string {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : '#000000';
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        component="input"
        type="color"
        value={toColorInputValue(value)}
        onChange={(event) => onChange(event.target.value)}
        aria-label={`${label} color picker`}
        sx={{
          width: 36,
          height: 36,
          p: 0,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      />
      <TextField label={label} value={value} onChange={(event) => onChange(event.target.value)} size="small" fullWidth />
    </Box>
  );
}
