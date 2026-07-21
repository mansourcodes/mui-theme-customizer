import { useState, type SyntheticEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const features = [
  { label: '20 Tokens per day', ok: true },
  { label: '10 Projects', ok: true },
  { label: 'API Access', ok: true },
  { label: 'Priority Support', ok: false },
];

export function PricingDemo() {
  const [billing, setBilling] = useState('yearly');
  const handleChange = (_event: SyntheticEvent, next: string | null) => {
    if (next) setBilling(next);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <ToggleButtonGroup value={billing} exclusive size="small" onChange={handleChange}>
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="yearly">Yearly</ToggleButton>
            </ToggleButtonGroup>
            <Chip label="SALE" size="small" color="success" />
          </Stack>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Starter Plan
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              $200<Box component="span" sx={{ fontSize: 14, color: 'text.secondary' }}>/month</Box>
            </Typography>
          </Box>
          <Stack spacing={1}>
            {features.map((feature) => (
              <Stack key={feature.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                {feature.ok ? (
                  <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                ) : (
                  <CancelIcon color="error" sx={{ fontSize: 18 }} />
                )}
                <Typography variant="body2">{feature.label}</Typography>
              </Stack>
            ))}
          </Stack>
          <Button variant="contained" color="warning" disableElevation fullWidth>
            Buy Now
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
