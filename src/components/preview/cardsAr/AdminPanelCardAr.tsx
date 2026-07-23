import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PeopleIcon from '@mui/icons-material/People';
import TuneIcon from '@mui/icons-material/Tune';
import { PreviewCard } from '../PreviewCard';

const ROWS = [
  { label: 'قواعد البيانات', icon: <StorageIcon fontSize="small" />, count: 7 },
  { label: 'المنتجات', icon: <Inventory2Icon fontSize="small" />, count: null },
  { label: 'الرسائل', icon: <MailIcon fontSize="small" />, count: 29 },
  { label: 'رموز الوصول', icon: <VpnKeyIcon fontSize="small" />, count: null },
  { label: 'المستخدمون', icon: <PeopleIcon fontSize="small" />, count: null, dot: true },
  { label: 'الإعدادات', icon: <TuneIcon fontSize="small" />, count: null },
];

export function AdminPanelCardAr() {
  return (
    <PreviewCard>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        لوحة الإدارة
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
