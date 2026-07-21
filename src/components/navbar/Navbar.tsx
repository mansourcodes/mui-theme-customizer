import { AppBar, Toolbar, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import type { LanguageCode } from '../../lib/i18n/dictionaries';

export function Navbar() {
  const { language, setLanguage, dictionary } = useLanguage();

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {dictionary.navbar.appName}
        </Typography>
        <ToggleButtonGroup
          value={language}
          exclusive
          size="small"
          aria-label={dictionary.navbar.languageLabel}
          onChange={(_event, next: LanguageCode | null) => {
            if (next) setLanguage(next);
          }}
        >
          <ToggleButton value="en" aria-label="English">
            EN
          </ToggleButton>
          <ToggleButton value="ar" aria-label="العربية">
            AR
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
