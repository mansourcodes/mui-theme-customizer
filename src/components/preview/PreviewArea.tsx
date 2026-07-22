import { Box, Button, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { buildMuiTheme } from '../../lib/theme/buildMuiTheme';
import { FilterListCard } from './cards/FilterListCard';
import { CalendarCard } from './cards/CalendarCard';
import { PriceRangeCard } from './cards/PriceRangeCard';
import { ProductCard } from './cards/ProductCard';
import { SearchCard } from './cards/SearchCard';
import { RegisterCard } from './cards/RegisterCard';
import { SalesChartCard } from './cards/SalesChartCard';
import { PageScoreCard } from './cards/PageScoreCard';
import { RecentOrdersCard } from './cards/RecentOrdersCard';
import { RevenueCard } from './cards/RevenueCard';
import { NewPostCard } from './cards/NewPostCard';
import { ChatCard } from './cards/ChatCard';
import { AdminPanelCard } from './cards/AdminPanelCard';
import { MusicPlayerCard } from './cards/MusicPlayerCard';
import { TerminalCard } from './cards/TerminalCard';
import { NotificationBannersCard } from './cards/NotificationBannersCard';
import { TimelineCard } from './cards/TimelineCard';
import { PricingCard } from './cards/PricingCard';
import { PreviewCard } from './PreviewCard';

export function PreviewArea() {
  const { spec } = useThemeSpec();
  const previewTheme = buildMuiTheme(spec);

  return (
    <ThemeProvider theme={previewTheme}>
      <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: 'background.default' }}>


        <Box sx={{ columnWidth: '280px', columnGap: '24px' }}>
          <FilterListCard />
          <CalendarCard />
          <PriceRangeCard />
          <ProductCard />
          <SearchCard />
          <RegisterCard />

          <SalesChartCard />
          <PageScoreCard />
          <RecentOrdersCard />
          <RevenueCard />
          <NewPostCard />
          <ChatCard />
          <AdminPanelCard />

          <MusicPlayerCard />
          <TerminalCard />
          <NotificationBannersCard />
          <TimelineCard />
          <PricingCard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
