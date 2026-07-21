import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useThemeSpec } from '../../lib/theme/ThemeSpecContext';
import { generateThemeCode } from '../../lib/theme/exportTheme';

interface CodeExportDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CodeExportDialog({ open, onClose }: CodeExportDialogProps) {
  const { spec } = useThemeSpec();
  const [copied, setCopied] = useState(false);
  const code = generateThemeCode(spec);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable — the user can still select the text manually.
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Theme code</DialogTitle>
      <DialogContent dividers>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: 13,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {code}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
