// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { QRPoster } from '@/pages/qr';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/qr/poster')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <QRPoster navigate={navigate} />;
}
