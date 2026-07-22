import { useState } from 'react';
import { AppBar, Button, Stack, Toolbar, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import type { LanguageCode } from '../../lib/i18n/dictionaries';
import { CodeExportDialog } from '../export/CodeExportDialog';

export function Navbar() {
  const { language, setLanguage, dictionary } = useLanguage();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {dictionary.navbar.appName}
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Button
            variant="contained"
            disableElevation
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={() => setExportOpen(true)}
            sx={{
              fontWeight: 700,
              bgcolor: 'text.primary',
              color: 'background.paper',
              '&:hover': { bgcolor: 'text.primary' },
            }}
          >
            Export
          </Button>
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
        </Stack>
      </Toolbar>
      <CodeExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </AppBar>
  );
}
