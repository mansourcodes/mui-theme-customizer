import { useState } from 'react';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { PreviewCard } from '../PreviewCard';

const MAX_CHARS = 1200;

export function NewPostCard() {
  const [text, setText] = useState('');

  return (
    <PreviewCard>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
        Write a new post
      </Typography>

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Stack direction="row">
          <IconButton size="small">
            <FormatBoldIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <FormatItalicIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Button size="small" startIcon={<AttachFileIcon fontSize="small" />}>
          Add files
        </Button>
      </Stack>

      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="What's happening?"
        value={text}
        onChange={(event) => setText(event.target.value.slice(0, MAX_CHARS))}
        sx={{ mb: 1 }}
      />

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        {MAX_CHARS - text.length} characters remaining
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button variant="outlined">Draft</Button>
        <Button variant="contained" color="secondary">
          Publish
        </Button>
      </Stack>
    </PreviewCard>
  );
}
