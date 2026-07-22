import { Box, Button, Stack, Typography } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

const BAR_HEIGHTS = [8, 10, 14, 12, 20, 26, 34, 30, 42, 50, 60, 72, 86, 100];

export function SalesChartCard() {
  return (
    <PreviewCard>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ alignItems: 'flex-end', height: 90, mb: 2 }}
      >
        {BAR_HEIGHTS.map((height, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              height: `${height}%`,
              bgcolor: 'primary.main',
              borderRadius: '2px 2px 0 0',
              opacity: 0.4 + (index / BAR_HEIGHTS.length) * 0.6,
            }}
          />
        ))}
      </Stack>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Sales volume reached <strong>$12,450</strong> this week, showing a 15% increase from the
        previous period.
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" size="small">
          Charts
        </Button>
        <Button variant="contained" size="small">
          Details
        </Button>
      </Stack>
    </PreviewCard>
  );
}
