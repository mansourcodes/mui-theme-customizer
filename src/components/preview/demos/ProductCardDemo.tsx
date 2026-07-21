import { Box, Card, CardContent, CardMedia, Chip, Rating, Stack, Typography } from '@mui/material';

export function ProductCardDemo() {
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="180" image="/preview/shoe.jpg" alt="Nike Shoes" />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Nike Shoes
            </Typography>
            <Chip label="SALE" size="small" color="success" />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Rating value={5} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              420 reviews
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              $120
            </Typography>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', fontSize: 14 }}
            >
              $150
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
