import { useState } from 'react';
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const days = [
  { date: 12, day: 'M' },
  { date: 13, day: 'T' },
  { date: 14, day: 'W' },
  { date: 15, day: 'T' },
  { date: 16, day: 'F' },
  { date: 17, day: 'S' },
  { date: 18, day: 'S' },
];

export function CalendarDemo() {
  const [selected, setSelected] = useState(14);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'space-between' }}>
            {days.map(({ date, day }) => (
              <ButtonBase
                key={date}
                onClick={() => setSelected(date)}
                sx={{
                  flexDirection: 'column',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: selected === date ? 'primary.main' : 'transparent',
                  color: selected === date ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {date}
                </Typography>
                <Typography variant="caption">{day}</Typography>
              </ButtonBase>
            ))}
          </Stack>
          <TextField
            placeholder="Search for events"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControlLabel
            control={<Switch size="small" defaultChecked />}
            label={<Typography variant="body2">Show all day events</Typography>}
          />
          <Box sx={{ bgcolor: 'action.hover', p: 1.5, borderRadius: 1 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }} spacing={1}>
              <div>
                <Typography variant="subtitle2">Team Sync Meeting</Typography>
                <Typography variant="caption" color="text.secondary">
                  Weekly product review with design and development teams
                </Typography>
              </div>
              <Chip label="1h" size="small" />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
