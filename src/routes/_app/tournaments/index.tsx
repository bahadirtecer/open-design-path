// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { BrowseTournaments } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/tournaments/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <BrowseTournaments navigate={navigate} />;
}
