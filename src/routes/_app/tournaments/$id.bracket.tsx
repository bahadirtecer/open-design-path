// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { TournamentBracket } from '@/pages/organizer';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/tournaments/$id/bracket')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <TournamentBracket navigate={navigate} />;
}
