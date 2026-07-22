import { useState } from 'react';
import { Slider, Stack, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { PreviewCard } from '../PreviewCard';

export function PriceRangeCard() {
  const [value, setValue] = useState(50);

  return (
    <PreviewCard>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
        <TuneIcon fontSize="small" color="action" />
        <Typography variant="subtitle2">Price range</Typography>
      </Stack>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        {value}
      </Typography>
      <Slider value={value} onChange={(_event, next) => setValue(next as number)} />
    </PreviewCard>
  );
}
