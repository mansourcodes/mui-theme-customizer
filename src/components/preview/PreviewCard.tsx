import type { ReactNode } from 'react';
import { Card } from '@mui/material';

interface PreviewCardProps {
  children: ReactNode;
}

/**
 * Shared frame for every showcase card in the masonry preview grid. Uses
 * `Card` (not `Paper`) so its radius follows `MuiCard.styleOverrides`, i.e.
 * the "Boxes" radius dial — these ARE the card/dialog/alert group that dial
 * targets, not neutral chrome around it.
 */
export function PreviewCard({ children }: PreviewCardProps) {
  return (
    <Card variant="outlined" sx={{ p: 2.5, breakInside: 'avoid', mb: 3 }}>
      {children}
    </Card>
  );
}
