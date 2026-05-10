// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { NotificationsPage } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/notifications')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <NotificationsPage navigate={navigate} />;
}
