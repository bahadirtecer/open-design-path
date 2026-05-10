// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { AdminReports } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/admin/reports')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <AdminReports navigate={navigate} />;
}
