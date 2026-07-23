import { useState } from 'react';
import { AppBar, Box, Button, Chip, IconButton, Link, Snackbar, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PaletteIcon from '@mui/icons-material/Palette';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CodeExportDialog } from '../export/CodeExportDialog';
import packageJson from '../../../package.json';

export function Navbar() {
  const [exportOpen, setExportOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
    } catch {
      // Clipboard may be unavailable — nothing else to fall back to here.
    }
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <PaletteIcon fontSize="small" />
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            MUI Theme Customizer
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
            <Link
              href="https://github.com/mansourcodes/mui-theme-customizer"
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              underline="hover"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              Made with <FavoriteIcon sx={{ fontSize: 14, color: 'error.main' }} /> by mansourcodes
            </Link>
          </Stack>

          <Chip
            label={`@mui/material v${packageJson.dependencies['@mui/material'].replace('^', '')}`}
            size="small"
            sx={{ display: { xs: 'none', sm: 'flex' }, bgcolor: 'action.hover', color: 'text.secondary' }}
          />

          <Tooltip title="View on GitHub">
            <IconButton
              component="a"
              href="https://github.com/mui/material-ui"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label="View material-ui on GitHub"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Copy share link">
            <IconButton onClick={handleShare} size="small" aria-label="Copy share link">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>

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
        </Stack>
      </Toolbar>
      <CodeExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
      <Snackbar
        open={shareCopied}
        autoHideDuration={2000}
        onClose={() => setShareCopied(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </AppBar>
  );
}
