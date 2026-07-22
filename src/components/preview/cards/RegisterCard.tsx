import { Button, FormControlLabel, Link, Stack, Switch, TextField, Typography } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

export function RegisterCard() {
  return (
    <PreviewCard>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Create new account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registration is free and only takes a minute
      </Typography>

      <Stack spacing={1.5} sx={{ mb: 1.5 }}>
        <TextField size="small" label="Username" fullWidth />
        <TextField
          size="small"
          type="password"
          label="Password"
          fullWidth
          helperText="Password must be 8+ characters"
        />
      </Stack>

      <Stack sx={{ mb: 2 }}>
        <FormControlLabel control={<Switch size="small" />} label="Accept terms without reading" />
        <FormControlLabel control={<Switch size="small" />} label="Subscribe to spam emails" />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Button variant="contained" color="secondary">
          Register
        </Button>
        <Link href="#" underline="hover" variant="body2">
          Or login
        </Link>
      </Stack>
    </PreviewCard>
  );
}
