// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { GoLive } from '@/pages/live';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/live/go')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <GoLive navigate={navigate} />;
}
