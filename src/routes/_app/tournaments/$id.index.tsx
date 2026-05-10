// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { TournamentDetailPlayer } from '@/pages/player';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/tournaments/$id/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  const { id } = Route.useParams();
  return <TournamentDetailPlayer navigate={navigate} id={id} />;
}
