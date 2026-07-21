import { Box, Card, CardContent, IconButton, Slider, Stack, Typography } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import HeadphonesIcon from '@mui/icons-material/Headphones';

export function MediaPlayerDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <IconButton sx={{ bgcolor: 'action.hover' }}>
              <FastRewindIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'action.hover' }}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'action.hover' }}>
              <FastForwardIcon />
            </IconButton>
          </Stack>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              PM Zoomcall ASMR
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Project Manager talking for 2 hours
            </Typography>
          </Box>
          <Box>
            <Slider size="small" defaultValue={11} />
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                13:39
              </Typography>
              <Typography variant="caption" color="text.secondary">
                120:00
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
            {[VolumeUpIcon, ShuffleIcon, RepeatIcon, HeadphonesIcon].map((Icon, index) => (
              <IconButton key={index} size="small" sx={{ bgcolor: 'action.hover' }}>
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
