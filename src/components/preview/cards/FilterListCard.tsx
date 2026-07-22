import { useState } from 'react';
import { Checkbox, Chip, FormControlLabel, Link, Stack, Typography } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

const ROWS = [
  { label: 'Hoodies', count: 25, defaultChecked: true },
  { label: 'Bags', count: 3, defaultChecked: true },
  { label: 'Shoes', count: 0, defaultChecked: false },
  { label: 'Accessories', count: 4, defaultChecked: false },
];

export function FilterListCard() {
  const [tags] = useState(['Shoes', 'Bags']);

  return (
    <PreviewCard>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Preview
        </Typography>
        <Link href="#" underline="hover" variant="body2">
          more
        </Link>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => {}} size="small" />
        ))}
      </Stack>

      <Stack spacing={0.5}>
        {ROWS.map((row) => (
          <Stack
            key={row.label}
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked={row.defaultChecked} size="small" />}
              label={row.label}
            />
            <Chip
              label={row.count}
              size="small"
              color={row.count === 0 ? 'error' : 'default'}
              variant={row.count === 0 ? 'filled' : 'outlined'}
            />
          </Stack>
        ))}
      </Stack>
    </PreviewCard>
  );
}
