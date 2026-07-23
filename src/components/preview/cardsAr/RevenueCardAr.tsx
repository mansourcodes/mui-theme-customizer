import { Stack, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { PreviewCard } from '../PreviewCard';

export function RevenueCardAr() {
  return (
    <PreviewCard>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
        إيرادات يوليو
      </Typography>
      <Typography variant="h4" sx={{ mb: 1 }}>
        $32,400
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <ArrowUpwardIcon fontSize="small" color="success" />
        <Typography variant="body2" color="success.main">
          زيادة 21% عن الشهر الماضي
        </Typography>
      </Stack>
    </PreviewCard>
  );
}
