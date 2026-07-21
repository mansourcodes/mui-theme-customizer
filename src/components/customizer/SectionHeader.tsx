import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: ReactNode;
  label: string;
}

export function SectionHeader({ icon, label }: SectionHeaderProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {icon}
      <Typography variant="subtitle1" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1, borderBottom: 1, borderColor: 'divider' }} />
    </Stack>
  );
}
