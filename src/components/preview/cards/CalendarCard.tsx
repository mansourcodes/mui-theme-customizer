import { type SyntheticEvent, useState } from 'react';
import {
  Box,
  FormControlLabel,
  InputAdornment,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PreviewCard } from '../PreviewCard';

const DAYS = [
  { date: 12, label: 'M' },
  { date: 13, label: 'T' },
  { date: 14, label: 'W' },
  { date: 15, label: 'T' },
  { date: 16, label: 'F' },
  { date: 17, label: 'S' },
  { date: 18, label: 'S' },
];

export function CalendarCard() {
  const [tab, setTab] = useState(1);

  const handleTabChange = (_event: SyntheticEvent, next: number) => {
    setTab(next);
  };

  return (
    <PreviewCard>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {DAYS.map((day) => {
          const isActive = day.date === 14;
          return (
            <Box
              key={day.date}
              sx={{
                flex: 1,
                textAlign: 'center',
                py: 0.75,
                borderRadius: 1.5,
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {day.date}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {day.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <TextField
        fullWidth
        size="small"
        placeholder="Search for events"
        sx={{ mb: 1.5 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControlLabel control={<Switch size="small" />} label="Show all day events" sx={{ mb: 1.5 }} />

      <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'action.hover' }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Team Sync Meeting
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Weekly product review with design and development teams
        </Typography>
      </Paper>

      <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 1.5, minHeight: 36 }}>
        <Tab label="Tab 1" sx={{ minHeight: 36 }} />
        <Tab label="Tab 2" sx={{ minHeight: 36 }} />
        <Tab label="Tab 3" sx={{ minHeight: 36 }} />
      </Tabs>
      <Typography variant="body2" color="text.secondary">
        Tab content {tab + 1}
      </Typography>
    </PreviewCard>
  );
}
