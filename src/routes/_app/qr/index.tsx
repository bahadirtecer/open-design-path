// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { QRScanner } from '@/pages/qr';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/qr/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <QRScanner navigate={navigate} />;
}
