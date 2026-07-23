import { Alert, Box, Stack } from '@mui/material';

const DOT_COLORS = ['#ff5f56', '#ffbd2e', '#27c93f'];

// Shell/CLI output is left in English — terminal commands aren't localized
// even in Arabic UIs.
const LINES = ['$ npm i inspireUI', '> installing...', '> Done!'];

export function TerminalCardAr() {
  return (
     <Alert sx={{ bgcolor: '#2b2b2b', mb: 1.5,  p: 1.5 }}>
        <Stack direction="row" spacing={0.75} sx={{ mb: 1.5 }}>
          {DOT_COLORS.map((color) => (
            <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
          ))}
        </Stack>
        <Box
          component="pre"
          dir="ltr"
          sx={{ m: 0, fontFamily: 'monospace', fontSize: 13, color: '#e0e0e0' }}
          style={{ textAlign: 'left' }}
        >
          {LINES.join('\n')}
        </Box>
      </Alert>
  );
}
