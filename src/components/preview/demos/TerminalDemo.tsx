import { Box, Stack } from '@mui/material';

export function TerminalDemo() {
  return (
    <Box sx={{ bgcolor: 'grey.900', borderRadius: 2, p: 2, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <Stack direction="row" spacing={0.75} sx={{ mb: 1.5 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((color) => (
          <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
        ))}
      </Stack>
      <Box sx={{ color: 'grey.100', fontSize: 13, lineHeight: 1.8 }}>
        <div>$ npm i daisyui</div>
        <div>&gt; installing...</div>
        <div>&gt; Done!</div>
      </Box>
    </Box>
  );
}
