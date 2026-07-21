import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

const bars = [30, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80, 72, 88, 95, 100];

export function SalesChartDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={0.75} sx={{ height: 120, alignItems: 'flex-end' }}>
            {bars.map((value, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: `${value}%`,
                  bgcolor: 'text.primary',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Sales volume reached $12,450 this week, showing a 15% increase from the previous period.
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" color="inherit" sx={{ flex: 1, borderColor: 'divider' }}>
              Charts
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{ flex: 1, bgcolor: 'text.primary', color: 'background.paper', '&:hover': { bgcolor: 'text.primary' } }}
            >
              Details
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
