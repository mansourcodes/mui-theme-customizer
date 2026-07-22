import { Box, Card, CardContent, CardMedia, Chip, Rating, Stack, Typography } from '@mui/material';

// Deterministic placeholder photo from picsum.photos (free, no API key) —
// decorative demo content only, not a themeable token.
const PRODUCT_IMAGE_URL = 'https://picsum.photos/seed/mui-customizer-sneaker/600/400';

export function ProductCard() {
  return (
    <Card variant="outlined" sx={{ breakInside: 'avoid', mb: 3 }}>
      <CardMedia component="img" image={PRODUCT_IMAGE_URL} alt="Product" sx={{ height: 200 }} />
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Running Shoes
          </Typography>
          <Chip label="SALE" size="small" color="secondary" />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
          <Rating value={5} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            420 reviews
          </Typography>
        </Stack>
        <Box>
          <Typography component="span" variant="h6" sx={{ mr: 1 }}>
            $120
          </Typography>
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            $150
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
