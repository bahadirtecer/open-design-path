// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { PlayerDashboard } from '@/pages/dashboards';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/dashboard')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <PlayerDashboard navigate={navigate} />;
}
