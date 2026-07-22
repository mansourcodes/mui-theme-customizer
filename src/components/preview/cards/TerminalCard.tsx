import { Box, Stack } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

const DOT_COLORS = ['#ff5f56', '#ffbd2e', '#27c93f'];

const LINES = ['$ npm i daisyui', '> installing...', '> Done!'];

export function TerminalCard() {
  return (
    <PreviewCard>
      {/* A terminal window is inherently dark chrome, like an IDE — fixed
          colors here are intentional decorative demo content, not a
          themeable component (mirrors the reference screenshot). */}
      <Box sx={{ bgcolor: '#2b2b2b', borderRadius: 1, p: 1.5 }}>
        <Stack direction="row" spacing={0.75} sx={{ mb: 1.5 }}>
          {DOT_COLORS.map((color) => (
            <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
          ))}
        </Stack>
        <Box component="pre" sx={{ m: 0, fontFamily: 'monospace', fontSize: 13, color: '#e0e0e0' }}>
          {LINES.join('\n')}
        </Box>
      </Box>
    </PreviewCard>
  );
}
