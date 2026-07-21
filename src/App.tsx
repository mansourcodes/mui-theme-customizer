import { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Navbar } from './components/navbar/Navbar';
import { ThemesSidebar } from './components/customizer/ThemesSidebar';
import { CustomizerPanel } from './components/customizer/CustomizerPanel';
import { PreviewArea } from './components/preview/PreviewArea';
import { LanguageProvider } from './lib/i18n/LanguageContext';
import { ThemeSpecProvider, useThemeSpec } from './lib/theme/ThemeSpecContext';
import { buildMuiTheme } from './lib/theme/buildMuiTheme';
import { loadGoogleFont } from './lib/fonts/loadGoogleFont';

function AppShell() {
  const { spec } = useThemeSpec();
  const muiTheme = buildMuiTheme(spec);

  useEffect(() => {
    if (spec.typography.fontFamily.trim().length > 0) {
      loadGoogleFont(spec.typography.fontFamily);
    }
  }, [spec.typography.fontFamily]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <ThemesSidebar />
          <CustomizerPanel />
          <PreviewArea />
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
