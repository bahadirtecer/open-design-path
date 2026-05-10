// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { QRConfirm } from '@/pages/qr';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/qr/confirm')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <QRConfirm navigate={navigate} />;
}
