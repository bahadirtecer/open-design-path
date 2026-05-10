// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { OrganizerDashboard } from '@/pages/dashboards';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/organizer/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <OrganizerDashboard navigate={navigate} />;
}
