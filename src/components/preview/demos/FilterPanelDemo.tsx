import { Card, CardContent, Checkbox, Chip, FormControlLabel, Link, Stack, Typography } from '@mui/material';

const filterItems = [
  { label: 'Hoodies', count: 25, checked: true, color: 'default' as const },
  { label: 'Bags', count: 3, checked: true, color: 'default' as const },
  { label: 'Shoes', count: 8, checked: false, color: 'warning' as const },
  { label: 'Accessories', count: 4, checked: false, color: 'default' as const },
];

export function FilterPanelDemo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">Preview</Typography>
            <Link href="#" underline="always" variant="caption" onClick={(e) => e.preventDefault()}>
              more
            </Link>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="Shoes" size="small" onDelete={() => {}} />
            <Chip label="Bags" size="small" onDelete={() => {}} />
          </Stack>
          <Stack>
            {filterItems.map((item) => (
              <Stack key={item.label} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked={item.checked} />}
                  label={<Typography variant="body2">{item.label}</Typography>}
                />
                <Chip label={item.count} size="small" color={item.color} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
