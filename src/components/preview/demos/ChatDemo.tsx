import { Avatar, Box, Card, CardContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

interface Bubble {
  text: string;
  fromMe: boolean;
  meta?: string;
}

const messages: Bubble[] = [
  { text: "It's over Anakin", fromMe: false },
  { text: 'I have the high ground', fromMe: true, meta: 'Delivered' },
  { text: 'You underestimate my power', fromMe: false, meta: 'Seen at 12:46' },
];

export function ChatDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Avatar src="/preview/avatar-1.jpg" sx={{ width: 28, height: 28 }} />
            <Typography variant="subtitle2">Obi-Wan Kenobi</Typography>
            <Typography variant="caption" color="text.secondary">
              12:45
            </Typography>
          </Stack>

          {messages.map((message, index) => (
            <Stack
              key={index}
              spacing={0.25}
              sx={{ alignItems: message.fromMe ? 'flex-end' : 'flex-start' }}
            >
              <Box
                sx={{
                  maxWidth: '75%',
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: message.fromMe ? 'primary.main' : 'action.hover',
                  color: message.fromMe ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
              {message.meta && (
                <Typography variant="caption" color="text.secondary">
                  {message.meta}
                </Typography>
              )}
            </Stack>
          ))}

          <Divider />
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
            <IconButton size="small">
              <CallIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
