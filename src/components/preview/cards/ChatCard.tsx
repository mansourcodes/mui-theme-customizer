import { useState, type SyntheticEvent } from 'react';
import { Avatar, Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import { PreviewCard } from '../PreviewCard';

// Free avatar photo service (pravatar.cc) — decorative demo content only.
const AVATAR_URL = 'https://i.pravatar.cc/64?img=13';

export function ChatCard() {
  const [tab, setTab] = useState(1);

  const handleTabChange = (_event: SyntheticEvent, next: number) => {
    setTab(next);
  };

  return (
    <PreviewCard>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
        <Avatar src={AVATAR_URL} sx={{ width: 32, height: 32 }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Obi-Wan Kenobi
          </Typography>
          <Typography variant="caption" color="text.secondary">
            12:45
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={1} sx={{ mb: 1.5 }}>
        <Box
          sx={{
            alignSelf: 'flex-start',
            bgcolor: 'action.hover',
            borderRadius: 2,
            px: 1.5,
            py: 1,
            maxWidth: '75%',
          }}
        >
          <Typography variant="body2">It's over Anakin</Typography>
        </Box>
        <Box
          sx={{
            alignSelf: 'flex-start',
            bgcolor: 'action.hover',
            borderRadius: 2,
            px: 1.5,
            py: 1,
            maxWidth: '75%',
          }}
        >
          <Typography variant="body2">I have the high ground</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Delivered
        </Typography>
        <Box
          sx={{
            alignSelf: 'flex-end',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            px: 1.5,
            py: 1,
            maxWidth: '75%',
          }}
        >
          <Typography variant="body2">You underestimate my power</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'flex-end' }}>
          Seen at 12:46
        </Typography>
      </Stack>

      <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ minHeight: 40 }}>
        <Tab icon={<PhoneIcon fontSize="small" />} sx={{ minHeight: 40, minWidth: 0 }} />
        <Tab icon={<ChatBubbleIcon fontSize="small" />} sx={{ minHeight: 40, minWidth: 0 }} />
        <Tab icon={<SettingsIcon fontSize="small" />} sx={{ minHeight: 40, minWidth: 0 }} />
      </Tabs>
    </PreviewCard>
  );
}
