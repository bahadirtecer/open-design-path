// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { AdminOrgs } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/admin/orgs')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <AdminOrgs navigate={navigate} />;
}
