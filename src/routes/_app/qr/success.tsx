// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { QRSuccess } from '@/pages/qr';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/qr/success')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <QRSuccess navigate={navigate} />;
}
