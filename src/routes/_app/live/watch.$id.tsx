// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { WatchLive } from '@/pages/live';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/live/watch/$id')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <WatchLive navigate={navigate} />;
}
