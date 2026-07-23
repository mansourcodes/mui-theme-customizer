import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  type ChipProps,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PreviewCard } from '../PreviewCard';

const ORDERS: { name: string; status: string; color: ChipProps['color'] }[] = [
  { name: 'خالد الشمري', status: 'إرسال', color: 'info' },
  { name: 'هاشم الحربي', status: 'فشل', color: 'error' },
  { name: 'فاطمة الفارسي', status: 'قيد التنفيذ', color: 'warning' },
  { name: 'ناصر النعيمي', status: 'مكتمل', color: 'success' },
  { name: 'أمل العمري', status: 'مكتمل', color: 'success' },
];

export function RecentOrdersCardAr() {
  return (
    <PreviewCard>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
        <TrendingUpIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          الطلبات الأخيرة
        </Typography>
      </Stack>
      <List dense disablePadding>
        {ORDERS.map((order) => (
          <ListItem
            key={order.name}
            disableGutters
            secondaryAction={<Chip label={order.status} size="small" color={order.color} />}
          >
            <ListItemText primary={order.name} />
          </ListItem>
        ))}
      </List>
    </PreviewCard>
  );
}
