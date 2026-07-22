import { Box, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { PreviewCard } from '../PreviewCard';

export function MusicPlayerCard() {
  return (
    <PreviewCard>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 2 }}>
        <IconButton size="small">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          <PlayArrowIcon />
        </IconButton>
        <IconButton size="small">
          <SkipNextIcon />
        </IconButton>
      </Stack>

      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          PM Zoomcall ASMR
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Project Manager talking for 2 hours
        </Typography>
      </Box>

      <LinearProgress variant="determinate" value={11} sx={{ mb: 0.5, height: 6, borderRadius: 3 }} />
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          13:39
        </Typography>
        <Typography variant="caption" color="text.secondary">
          120:00
        </Typography>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
        <VolumeUpIcon fontSize="small" color="action" />
        <ShuffleIcon fontSize="small" color="action" />
        <RepeatIcon fontSize="small" color="action" />
        <HeadphonesIcon fontSize="small" color="action" />
      </Stack>
    </PreviewCard>
  );
}
