import type { ReactNode } from 'react';
import { Paper } from '@mui/material';

interface PreviewCardProps {
  children: ReactNode;
}

/**
 * Shared Paper frame for every showcase card in the masonry preview grid.
 * Fixed 8px radius (not the `borderRadius: 2` sx shorthand, which multiplies
 * by the live `theme.shape.borderRadius`) — these cards are chrome framing
 * around the previewed content, not previewed content themselves.
 */
export function PreviewCard({ children }: PreviewCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '8px', breakInside: 'avoid', mb: 3 }}>
      {children}
    </Paper>
  );
}
