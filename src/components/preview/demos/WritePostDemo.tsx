import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export function WritePostDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <EditIcon fontSize="small" />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Write a new post
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
            <ToggleButtonGroup size="small">
              <ToggleButton value="bold">
                <FormatBoldIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="italic">
                <FormatItalicIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="underline">
                <FormatUnderlinedIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" color="inherit" startIcon={<AttachFileIcon />} sx={{ borderColor: 'divider' }}>
              Add files
            </Button>
          </Stack>
          <TextField placeholder="What's happening?" size="small" fullWidth multiline rows={2} />
          <Typography variant="caption" color="text.secondary">
            1200 characters remaining
          </Typography>
          <Divider />
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" color="inherit" sx={{ flex: 1, borderColor: 'divider' }}>
              Draft
            </Button>
            <Button variant="contained" disableElevation sx={{ flex: 1 }}>
              Publish
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
