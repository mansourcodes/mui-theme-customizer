import { Button, Stack, TextField } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

export function SearchCard() {
  return (
    <PreviewCard>
      <Stack direction="row" spacing={1}>
        <TextField fullWidth size="small" placeholder="Search" />
        <Button variant="contained" sx={{ flexShrink: 0 }}>
          Find
        </Button>
      </Stack>
    </PreviewCard>
  );
}
