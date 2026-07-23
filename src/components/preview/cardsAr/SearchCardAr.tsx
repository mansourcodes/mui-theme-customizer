import { Button, Stack, TextField } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

export function SearchCardAr() {
  return (
    <PreviewCard>
      <Stack direction="row" spacing={1}>
        <TextField fullWidth size="small" placeholder="بحث" />
        <Button variant="contained" sx={{ flexShrink: 0 }}>
          ابحث
        </Button>
      </Stack>
    </PreviewCard>
  );
}
