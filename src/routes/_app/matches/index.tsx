// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { MatchHistory } from '@/pages/player';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/matches/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <MatchHistory navigate={navigate} />;
}
