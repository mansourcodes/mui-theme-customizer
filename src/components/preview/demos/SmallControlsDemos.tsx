import { useState, type SyntheticEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export function TabsDemo() {
  const [tab, setTab] = useState(1);
  const handleChange = (_event: SyntheticEvent, next: number) => setTab(next);

  return (
    <Card variant="outlined">
      <Tabs value={tab} onChange={handleChange} variant="fullWidth">
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
      <CardContent>
        <Typography variant="body2">Tab content {tab + 1}</Typography>
      </CardContent>
    </Card>
  );
}

export function PriceRangeDemo() {
  const [price, setPrice] = useState(50);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TuneIcon fontSize="small" />
            <Typography variant="subtitle2">Price range</Typography>
          </Stack>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 600 }}>
            {price}
          </Typography>
          <Slider value={price} onChange={(_e, v) => setPrice(v as number)} min={0} max={100} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SearchFindDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1}>
          <TextField
            placeholder="Search"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box>
            <Button variant="contained" disableElevation sx={{ height: '100%' }}>
              Find
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
