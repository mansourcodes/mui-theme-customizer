import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PreviewCard } from '../PreviewCard';

export function PageScoreCard() {
  return (
    <PreviewCard>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Page Score
          </Typography>
          <Typography variant="h3" component="span">
            91
            <Typography component="span" variant="body1" color="text.secondary">
              /100
            </Typography>
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mt: 1 }}>
            <CheckCircleIcon fontSize="small" color="success" />
            <Typography variant="body2" color="success.main">
              All good
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={100} size={64} thickness={4} sx={{ color: 'action.hover' }} />
          <CircularProgress
            variant="determinate"
            value={91}
            size={64}
            thickness={4}
            sx={{ position: 'absolute', left: 0, color: 'primary.main' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              91
            </Typography>
          </Box>
        </Box>
      </Stack>
    </PreviewCard>
  );
}
