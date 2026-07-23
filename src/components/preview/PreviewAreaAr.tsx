import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { buildMuiTheme } from '../../lib/theme/buildMuiTheme';
import { previewRtlCache } from '../../lib/i18n/rtlCache';
import { FilterListCardAr } from './cardsAr/FilterListCardAr';
import { CalendarCardAr } from './cardsAr/CalendarCardAr';
import { PriceRangeCardAr } from './cardsAr/PriceRangeCardAr';
import { ProductCardAr } from './cardsAr/ProductCardAr';
import { SearchCardAr } from './cardsAr/SearchCardAr';
import { RegisterCardAr } from './cardsAr/RegisterCardAr';
import { SalesChartCardAr } from './cardsAr/SalesChartCardAr';
import { PageScoreCardAr } from './cardsAr/PageScoreCardAr';
import { RecentOrdersCardAr } from './cardsAr/RecentOrdersCardAr';
import { RevenueCardAr } from './cardsAr/RevenueCardAr';
import { NewPostCardAr } from './cardsAr/NewPostCardAr';
import { ChatCardAr } from './cardsAr/ChatCardAr';
import { AdminPanelCardAr } from './cardsAr/AdminPanelCardAr';
import { MusicPlayerCardAr } from './cardsAr/MusicPlayerCardAr';
import { TerminalCardAr } from './cardsAr/TerminalCardAr';
import { NotificationBannersCardAr } from './cardsAr/NotificationBannersCardAr';
import { TimelineCardAr } from './cardsAr/TimelineCardAr';
import { PricingCardAr } from './cardsAr/PricingCardAr';

/**
 * Arabic/RTL clone of PreviewArea — same gallery, Arabic-text cards, mirrored
 * to RTL. Kept as a full clone (not a shared/parameterized gallery) since the
 * cards' content is hardcoded demo copy, not theme-spec-driven data; this is
 * the only part of the app whose text changes with the preview direction
 * switch (see CustomizerPanel's "Preview direction" control).
 *
 * Font family is pinned to Rubik regardless of the spec's chosen font: most
 * of the Google Fonts catalog has no Arabic glyph coverage (see
 * `supportsArabic` in `googleFontsCatalog.json`), so honoring an arbitrary
 * user pick here would silently fall back to the browser default and break
 * this clone's whole purpose of showing realistic Arabic text.
 */
export function PreviewAreaAr() {
  const { spec } = useThemeSpec();
  const previewTheme = buildMuiTheme(
    { ...spec, typography: { ...spec.typography, fontFamily: 'Rubik' } },
    'rtl',
  );

  return (
    <CacheProvider value={previewRtlCache}>
      <ThemeProvider theme={previewTheme}>
        <Box component="main" dir="rtl" sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: 'background.default' }}>
          <Box sx={{ columnWidth: '280px', columnGap: '24px' }}>
            <FilterListCardAr />
            <CalendarCardAr />
            <PriceRangeCardAr />
            <ProductCardAr />
            <SearchCardAr />
            <RegisterCardAr />

            <SalesChartCardAr />
            <PageScoreCardAr />
            <RecentOrdersCardAr />
            <RevenueCardAr />
            <NewPostCardAr />
            <ChatCardAr />
            <AdminPanelCardAr />

            <MusicPlayerCardAr />
            <TerminalCardAr />
            <NotificationBannersCardAr />
            <TimelineCardAr />
            <PricingCardAr />
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
