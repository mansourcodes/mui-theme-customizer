import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PreviewCard } from '../PreviewCard';

const EVENTS = [
  "Harry Potter and Sorcerer's Stack",
  'Harry Potter and Chamber of Servers',
  'Harry Potter and Prisoner of Azure',
  'Harry Potter and Goblet of Firebase',
  'Harry Potter and Elixir of Phoenix',
  'Harry Potter and Half-Deployed App',
  'Harry Potter and Deathly Frameworks',
];

export function TimelineCard() {
  return (
    <PreviewCard>
      <Stack spacing={0}>
        {EVENTS.map((event, index) => (
          <Stack key={event} direction="row" spacing={1.5}>
            <Stack sx={{ alignItems: 'center', width: 20 }}>
              <CheckCircleIcon fontSize="small" color={index < 4 ? 'primary' : 'action'} />
              {index < EVENTS.length - 1 && (
                <Box sx={{ width: 2, flex: 1, bgcolor: 'divider', my: 0.25 }} />
              )}
            </Stack>
            <Typography variant="body2" sx={{ pb: 1.5 }}>
              {event}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </PreviewCard>
  );
}
