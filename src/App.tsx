import { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Navbar } from './components/navbar/Navbar';
import { ThemesSidebar } from './components/customizer/ThemesSidebar';
import { CustomizerPanel } from './components/customizer/CustomizerPanel';
import { PreviewArea } from './components/preview/PreviewArea';
import { PreviewAreaAr } from './components/preview/PreviewAreaAr';
import { LanguageProvider, useLanguage } from './lib/i18n/LanguageContext';
import { ThemeSpecProvider, useThemeSpec } from './lib/theme/ThemeSpecContext';
import { chromeTheme } from './lib/theme/chromeTheme';
import { loadGoogleFont } from './lib/fonts/loadGoogleFont';

function AppShell() {
  const { spec } = useThemeSpec();
  const { language } = useLanguage();

  useEffect(() => {
    if (spec.typography.fontFamily.trim().length > 0) {
      loadGoogleFont(spec.typography.fontFamily);
    }
  }, [spec.typography.fontFamily]);

  // Preload the two preview-direction default fonts up front — Rubik (Arabic
  // glyph coverage, used by PreviewAreaAr) and Albert Sans (the English
  // default) — so switching direction never shows a fallback-font flash.
  useEffect(() => {
    loadGoogleFont('Rubik');
    loadGoogleFont('Albert Sans');
  }, []);

  return (
    <ThemeProvider theme={chromeTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <ThemesSidebar />
          <CustomizerPanel />
          {language === 'ar' ? <PreviewAreaAr /> : <PreviewArea />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeSpecProvider>
        <AppShell />
      </ThemeSpecProvider>
    </LanguageProvider>
  );
}

export default App;
