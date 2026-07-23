import { Alert, Link, Stack } from '@mui/material';

export function NotificationBannersCardAr() {
  return (
    <Stack spacing={1.5} sx={{ breakInside: 'avoid', mb: 3 }}>
      <Alert severity="info" variant="filled">
        لديك 9 رسائل جديدة
      </Alert>
      <Alert severity="success" variant="outlined">
        اكتملت عملية التحقق
      </Alert>
      <Alert severity="warning" variant="outlined">
        انقر لتأكيد بريدك الإلكتروني
      </Alert>
      <Alert
        severity="error"
        variant="outlined"
        action={
          <Link href="#" underline="hover" variant="body2" color="inherit">
            الدعم
          </Link>
        }
      >
        تم رفض الوصول
      </Alert>
    </Stack>
  );
}
