import { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CodeExportDialog } from '../export/CodeExportDialog';

export function Navbar() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          MUI Theme Customizer
        </Typography>
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
      </Toolbar>
      <CodeExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </AppBar>
  );
}
