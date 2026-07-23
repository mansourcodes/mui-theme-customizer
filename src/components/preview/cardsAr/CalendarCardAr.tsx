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
  { date: 12, label: 'ن' },
  { date: 13, label: 'ث' },
  { date: 14, label: 'ر' },
  { date: 15, label: 'خ' },
  { date: 16, label: 'ج' },
  { date: 17, label: 'س' },
  { date: 18, label: 'ح' },
];

export function CalendarCardAr() {
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
        placeholder="البحث عن الفعاليات"
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

      <FormControlLabel control={<Switch size="small" />} label="إظهار فعاليات اليوم كامل" sx={{ mb: 1.5 }} />

      <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'action.hover' }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          اجتماع تنسيق الفريق
        </Typography>
        <Typography variant="caption" color="text.secondary">
          مراجعة أسبوعية للمنتج مع فرق التصميم والتطوير
        </Typography>
      </Paper>

      <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 1.5, minHeight: 36 }}>
        <Tab label="التبويب 1" sx={{ minHeight: 36 }} />
        <Tab label="التبويب 2" sx={{ minHeight: 36 }} />
        <Tab label="التبويب 3" sx={{ minHeight: 36 }} />
      </Tabs>
      <Typography variant="body2" color="text.secondary">
        محتوى التبويب {tab + 1}
      </Typography>
    </PreviewCard>
  );
}
