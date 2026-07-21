import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CancelIcon from '@mui/icons-material/Cancel';

export function CreateAccountDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Create new account
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Registration is free and only takes a minute
          </Typography>
          <TextField
            placeholder="Username"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            placeholder="password"
            type="password"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <CancelIcon color="error" sx={{ fontSize: 16 }} />
            <Typography variant="caption" color="error">
              Password must be 8+ characters
            </Typography>
          </Stack>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={<Typography variant="body2">Accept terms without reading</Typography>}
          />
          <FormControlLabel
            control={<Switch size="small" />}
            label={<Typography variant="body2">Subscribe to spam emails</Typography>}
          />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button variant="contained" disableElevation>
              Register
            </Button>
            <Link href="#" underline="hover" variant="body2" onClick={(e) => e.preventDefault()}>
              Or login
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
