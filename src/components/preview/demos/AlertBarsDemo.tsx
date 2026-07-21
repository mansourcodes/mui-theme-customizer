import { Alert, Button, Link, Stack } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';

export function AlertBarsDemo() {
  return (
    <Stack spacing={1.5}>
      <Alert
        icon={<MailOutlineIcon fontSize="inherit" />}
        variant="filled"
        severity="info"
        action={
          <Button color="inherit" size="small">
            View
          </Button>
        }
      >
        There are 9 new messages
      </Alert>
      <Alert variant="outlined" severity="success">
        Verification process completed
      </Alert>
      <Alert variant="outlined" severity="warning">
        <Link href="#" color="inherit" onClick={(e) => e.preventDefault()}>
          Click
        </Link>{' '}
        to verify your email
      </Alert>
      <Alert
        variant="standard"
        severity="error"
        action={
          <Button color="inherit" size="small">
            Support
          </Button>
        }
      >
        Access denied
      </Alert>
    </Stack>
  );
}
