// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { LeagueDetailPlayer } from '@/pages/player';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/leagues/$id')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <LeagueDetailPlayer navigate={navigate} />;
}
