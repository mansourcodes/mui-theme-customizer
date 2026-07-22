import { useState } from 'react';
import { Box, Button, Chip, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { PreviewCard } from '../PreviewCard';

const FEATURES = [
  { label: '20 Tokens per day', included: true },
  { label: '10 Projects', included: true },
  { label: 'API Access', included: true },
  { label: 'Priority Support', included: false },
];

export function PricingCard() {
  const [period, setPeriod] = useState('yearly');

  return (
    <PreviewCard>
      <Stack direction="row" sx={{ justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={period}
          exclusive
          size="small"
          onChange={(_event, next) => next && setPeriod(next)}
        >
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">
            Yearly
            <Chip label="SALE" size="small" color="error" sx={{ ml: 1 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        Starter Plan
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography component="span" variant="h4" sx={{ fontWeight: 700 }}>
          $200
        </Typography>
        <Typography component="span" variant="body2" color="text.secondary">
          /month
        </Typography>
      </Box>

      <Stack spacing={1} sx={{ mb: 2 }}>
        {FEATURES.map((feature) => (
          <Stack key={feature.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {feature.included ? (
              <CheckIcon fontSize="small" color="success" />
            ) : (
              <CloseIcon fontSize="small" color="error" />
            )}
            <Typography variant="body2">{feature.label}</Typography>
          </Stack>
        ))}
      </Stack>

      <Button variant="contained" color="warning" fullWidth>
        Buy Now
      </Button>
    </PreviewCard>
  );
}
