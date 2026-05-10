// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { TournamentDetailOrganizer } from '@/pages/organizer';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/organizer/tournaments/$id')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <TournamentDetailOrganizer navigate={navigate} />;
}
