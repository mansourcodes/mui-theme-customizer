import { Alert, Link, Stack } from '@mui/material';

export function NotificationBannersCard() {
  return (
    <Stack spacing={1.5} sx={{ breakInside: 'avoid', mb: 3 }}>
      <Alert severity="info" variant="filled">
        There are 9 new messages
      </Alert>
      <Alert severity="success" variant="filled">
        Verification process completed
      </Alert>
      <Alert severity="warning" variant="filled">
        Click to verify your email
      </Alert>
      <Alert
        severity="error"
        variant="filled"
        action={
          <Link href="#" underline="hover" variant="body2" color="inherit">
            Support
          </Link>
        }
      >
        Access denied
      </Alert>
    </Stack>
  );
}
