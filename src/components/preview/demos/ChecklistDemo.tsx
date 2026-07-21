import { Chip, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const items = [
  { label: "Harry Potter and Sorcerer's Stack", done: true },
  { label: 'Harry Potter and Chamber of Servers', done: true },
  { label: 'Harry Potter and Prisoner of Azure', done: true },
  { label: 'Harry Potter and Goblet of Files', done: true },
  { label: 'Harry Potter and Elixir of Phoenix', done: false },
  { label: 'Harry Potter and Half-Deployed App', done: false },
  { label: 'Harry Potter and Deathly Frameworks', done: false },
];

export function ChecklistDemo() {
  return (
    <Stack spacing={1}>
      {items.map((item) => (
        <Stack key={item.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 18 }} color={item.done ? 'success' : 'primary'} />
          <Chip label={<Typography variant="body2">{item.label}</Typography>} variant="outlined" sx={{ flex: 1, justifyContent: 'flex-start' }} />
        </Stack>
      ))}
    </Stack>
  );
}
