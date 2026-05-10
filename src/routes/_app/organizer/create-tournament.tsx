// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { CreateTournament } from '@/pages/organizer';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/organizer/create-tournament')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <CreateTournament navigate={navigate} />;
}
