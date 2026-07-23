import { Button, FormControlLabel, Link, Stack, Switch, TextField, Typography } from '@mui/material';
import { PreviewCard } from '../PreviewCard';

export function RegisterCardAr() {
  return (
    <PreviewCard>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        إنشاء حساب جديد
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        التسجيل مجاني ويستغرق دقيقة واحدة فقط
      </Typography>

      <Stack spacing={1.5} sx={{ mb: 1.5 }}>
        <TextField size="small" label="اسم المستخدم" fullWidth />
        <TextField
          size="small"
          type="password"
          label="كلمة المرور"
          fullWidth
          helperText="يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"
        />
      </Stack>

      <Stack sx={{ mb: 2 }}>
        <FormControlLabel control={<Switch size="small" />} label="الموافقة على الشروط دون قراءتها" />
        <FormControlLabel control={<Switch size="small" />} label="الاشتراك في رسائل البريد المزعج" />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Button variant="contained" color="secondary">
          تسجيل
        </Button>
        <Link href="#" underline="hover" variant="body2">
          أو تسجيل الدخول
        </Link>
      </Stack>
    </PreviewCard>
  );
}
