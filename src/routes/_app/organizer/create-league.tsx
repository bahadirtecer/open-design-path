// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { CreateLeague } from '@/pages/organizer';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/organizer/create-league')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <CreateLeague navigate={navigate} />;
}
