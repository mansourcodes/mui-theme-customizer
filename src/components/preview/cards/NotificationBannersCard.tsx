import { Alert, Link, Stack } from '@mui/material';

export function NotificationBannersCard() {
  return (
    <Stack spacing={1.5} sx={{ breakInside: 'avoid', mb: 3 }}>
      <Alert severity="info" variant="filled" sx={{ borderRadius: '8px' }}>
        There are 9 new messages
      </Alert>
      <Alert severity="success" variant="outlined" sx={{ borderRadius: '8px' }}>
        Verification process completed
      </Alert>
      <Alert severity="warning" variant="outlined" sx={{ borderRadius: '8px' }}>
        Click to verify your email
      </Alert>
      <Alert
        severity="error"
        variant="outlined"
        sx={{ borderRadius: '8px' }}
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
