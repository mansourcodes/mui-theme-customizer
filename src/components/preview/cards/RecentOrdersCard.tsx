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
  { name: 'Charlie Chapman', status: 'Send', color: 'info' },
  { name: 'Howard Hudson', status: 'Failed', color: 'error' },
  { name: 'Fiona Fisher', status: 'In progress', color: 'warning' },
  { name: 'Nick Nelson', status: 'Completed', color: 'success' },
  { name: 'Amanda Anderson', status: 'Completed', color: 'success' },
];

export function RecentOrdersCard() {
  return (
    <PreviewCard>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
        <TrendingUpIcon fontSize="small" color="action" />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Recent orders
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
