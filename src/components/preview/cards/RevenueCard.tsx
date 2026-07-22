import { Stack, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { PreviewCard } from '../PreviewCard';

export function RevenueCard() {
  return (
    <PreviewCard>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
        July Revenue
      </Typography>
      <Typography variant="h4" sx={{ mb: 1 }}>
        $32,400
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <ArrowUpwardIcon fontSize="small" color="success" />
        <Typography variant="body2" color="success.main">
          21% more than last month
        </Typography>
      </Stack>
    </PreviewCard>
  );
}
