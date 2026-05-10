// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { AdminUsers } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/admin/users')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <AdminUsers navigate={navigate} />;
}
