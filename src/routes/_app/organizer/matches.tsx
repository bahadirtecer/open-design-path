// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { MatchManagement } from '@/pages/organizer';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/organizer/matches')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <MatchManagement navigate={navigate} />;
}
