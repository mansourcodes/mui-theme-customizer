import { useState, type SyntheticEvent } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export function PreviewArea() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_event: SyntheticEvent, next: number) => {
    setTab(next);
  };

  return (
    <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: 'background.default' }}>
      {/* Fixed 8px radius (not the "borderRadius: 2" shorthand, which multiplies by the live theme.shape.borderRadius) — this chrome frame must stay visually distinct from the previewed content, per ui-context.md. */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: '8px' }}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" gutterBottom>
              Preview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This gallery renders live against the current theme spec.
            </Typography>
          </div>

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Chip label="Chip" color="primary" />
            <Switch defaultChecked />
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon color="action" />
            </Badge>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
            <RadioGroup row defaultValue="a">
              <FormControlLabel value="a" control={<Radio />} label="Radio A" />
              <FormControlLabel value="b" control={<Radio />} label="Radio B" />
            </RadioGroup>
          </Stack>

          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="One" />
            <Tab label="Two" />
            <Tab label="Three" />
          </Tabs>

          <TextField label="Text field" size="small" sx={{ maxWidth: 320 }} />

          <Card variant="outlined" sx={{ maxWidth: 320 }}>
            <CardContent>
              <Typography variant="h6">Card title</Typography>
              <Typography variant="body2" color="text.secondary">
                Card content reflecting the current theme.
              </Typography>
            </CardContent>
          </Card>

          <Alert severity="info">This is an info alert.</Alert>
        </Stack>
      </Paper>
    </Box>
  );
}
