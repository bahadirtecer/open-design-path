// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { BrowseLeagues } from '@/pages/player';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/leagues/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <BrowseLeagues navigate={navigate} />;
}
