import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PreviewCard } from '../PreviewCard';

const EVENTS = [
  'بدء المشروع على الخادم السحابي',
  'نشر قاعدة البيانات الأولى',
  'تفعيل نظام المصادقة',
  'إطلاق الواجهة التجريبية',
  'دمج نظام الدفع الإلكتروني',
  'اختبار الأداء تحت الضغط',
  'الإطلاق الرسمي للتطبيق',
];

export function TimelineCardAr() {
  return (
    <PreviewCard>
      <Stack spacing={0}>
        {EVENTS.map((event, index) => (
          <Stack key={event} direction="row" spacing={1.5}>
            <Stack sx={{ alignItems: 'center', width: 20 }}>
              <CheckCircleIcon fontSize="small" color={index < 4 ? 'primary' : 'action'} />
              {index < EVENTS.length - 1 && (
                <Box sx={{ width: 2, flex: 1, bgcolor: 'divider', my: 0.25 }} />
              )}
            </Stack>
            <Typography variant="body2" sx={{ pb: 1.5 }}>
              {event}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </PreviewCard>
  );
}
