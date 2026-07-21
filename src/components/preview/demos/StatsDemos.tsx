import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export function PageScoreDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Page Score
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              91<Box component="span" sx={{ fontSize: 16, color: 'text.secondary' }}>/100</Box>
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 16 }} />
              <Typography variant="caption" color="success.main">
                All good
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={91} size={56} thickness={4} color="inherit" />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                91
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

const orders = [
  { name: 'Charlie Chapman', status: 'Send', color: 'info' as const },
  { name: 'Howard Hudson', status: 'Failed', color: 'error' as const },
  { name: 'Fiona Fisher', status: 'In progress', color: 'warning' as const },
  { name: 'Nick Nelson', status: 'Completed', color: 'success' as const },
  { name: 'Amanda Anderson', status: 'Completed', color: 'success' as const },
];

export function RecentOrdersDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendingUpIcon fontSize="small" />
            <Typography variant="subtitle2">Recent orders</Typography>
          </Stack>
          {orders.map((order) => (
            <Stack
              key={order.name}
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="body2">{order.name}</Typography>
              <Chip label={order.status} size="small" color={order.color} />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function RevenueDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            July Revenue
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            $32,400
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <TrendingUpIcon color="success" sx={{ fontSize: 16 }} />
            <Typography variant="caption" color="text.secondary">
              21% more than last month
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
