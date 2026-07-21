import { Box, Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const items = [
  { label: 'Databases', icon: <StorageIcon fontSize="small" />, badge: 7 },
  { label: 'Products', icon: <Inventory2Icon fontSize="small" /> },
  { label: 'Messages', icon: <MailOutlineIcon fontSize="small" />, badge: 29 },
  { label: 'Access tokens', icon: <KeyIcon fontSize="small" /> },
  { label: 'Users', icon: <PeopleOutlineIcon fontSize="small" />, dot: true },
  { label: 'Settings', icon: <SettingsIcon fontSize="small" /> },
];

export function AdminPanelDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Admin panel
          </Typography>
          <List disablePadding>
            {items.map((item) => (
              <ListItemButton key={item.label} sx={{ borderRadius: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} slotProps={{ primary: { variant: 'body2' } }} />
                {item.badge !== undefined && <Typography variant="body2" color="text.secondary">{item.badge}</Typography>}
                {item.dot && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />}
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
