import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PeopleIcon from '@mui/icons-material/People';
import TuneIcon from '@mui/icons-material/Tune';
import { PreviewCard } from '../PreviewCard';

const ROWS = [
  { label: 'Databases', icon: <StorageIcon fontSize="small" />, count: 7 },
  { label: 'Products', icon: <Inventory2Icon fontSize="small" />, count: null },
  { label: 'Messages', icon: <MailIcon fontSize="small" />, count: 29 },
  { label: 'Access tokens', icon: <VpnKeyIcon fontSize="small" />, count: null },
  { label: 'Users', icon: <PeopleIcon fontSize="small" />, count: null, dot: true },
  { label: 'Settings', icon: <TuneIcon fontSize="small" />, count: null },
];

export function AdminPanelCard() {
  return (
    <PreviewCard>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Admin panel
      </Typography>
      <List dense disablePadding>
        {ROWS.map((row) => (
          <ListItemButton key={row.label} disableGutters sx={{ borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>{row.icon}</ListItemIcon>
            <ListItemText primary={row.label} />
            {row.count != null && (
              <Typography variant="body2" color="text.secondary">
                {row.count}
              </Typography>
            )}
            {row.dot && (
              <Box
                sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'info.main', mr: 0.5 }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </PreviewCard>
  );
}
