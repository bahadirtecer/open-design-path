// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { MatchResultEntry } from '@/pages/player';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/matches/entry')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <MatchResultEntry navigate={navigate} />;
}
