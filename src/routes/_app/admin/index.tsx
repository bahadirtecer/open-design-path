// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { AdminDashboard } from '@/pages/dashboards';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/admin/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <AdminDashboard navigate={navigate} />;
}
