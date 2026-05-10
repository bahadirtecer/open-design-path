// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { MyCompetitions } from '@/pages/player';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/my')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <MyCompetitions navigate={navigate} />;
}
