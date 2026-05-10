// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { LiveDashboard } from '@/pages/live';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/live/dashboard')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <LiveDashboard navigate={navigate} />;
}
