import { useState, type SyntheticEvent } from 'react';
import { Avatar, Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import { PreviewCard } from '../PreviewCard';

// Free avatar photo service (pravatar.cc) — decorative demo content only.
const AVATAR_URL = 'https://i.pravatar.cc/64?img=13';

export function ChatCardAr() {
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
            خالد العتيبي
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
          <Typography variant="body2">انتهى الأمر</Typography>
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
          <Typography variant="body2">أنا في موقع أعلى منك</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          تم التسليم
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
          <Typography variant="body2">أنت تستهين بقوتي</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'flex-end' }}>
          شوهدت الساعة 12:46
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
